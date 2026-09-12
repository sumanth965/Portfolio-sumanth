uniform vec2 u_mousePos;
attribute vec3 instancePosition;
attribute vec4 instanceRandomness;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec4 vRandomness;
varying vec3 vInstancePos;
varying vec3 vLocalPos;

mat3 rotationZ(float angle) {
    float s = sin(angle); float c = cos(angle);
    return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}

void main() {
    float sizeScale = 1.0 + (instanceRandomness.x - 0.5) * 0.1;
    float rotAngle = (instanceRandomness.y - 0.5) * 0.1047;
    vec3 localPos = rotationZ(rotAngle) * (position * sizeScale);
    
    vec3 worldBasePos = instancePosition;
    worldBasePos.z += instanceRandomness.z * 0.05;

    // THE HOVER MATH: Calculate distance to mouse and displace
    vec2 distVec = worldBasePos.xy - u_mousePos;
    float dist = length(distVec);
    float hoverEffect = exp(-dist * dist * 0.5); // The invisible bubble
    
    localPos.z -= hoverEffect * 0.3; // Depress the scale (doubled for visibility)
    
    if (hoverEffect > 0.01) {
        vec3 tiltAxis = normalize(vec3(-distVec.y, distVec.x, 0.0));
        localPos += cross(tiltAxis, localPos) * (hoverEffect * 0.1); // Tilt the scale
    }

    vec3 worldPos = worldBasePos + localPos;
    
    vec3 localNormal = rotationZ(rotAngle) * normal;
    if (hoverEffect > 0.01) {
        vec3 tiltAxis = normalize(vec3(-distVec.y, distVec.x, 0.0));
        localNormal += cross(tiltAxis, localNormal) * (hoverEffect * 0.1);
    }
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(worldPos, 1.0);
    vNormal = normalize((modelMatrix * vec4(localNormal, 0.0)).xyz);
    vWorldPos = (modelMatrix * vec4(worldPos, 1.0)).xyz;
    vRandomness = instanceRandomness;
    vInstancePos = instancePosition;
    vLocalPos = position;
}
