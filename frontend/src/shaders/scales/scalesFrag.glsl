uniform vec3 u_lightDirection;
uniform vec3 u_cameraPos;
uniform vec2 u_mousePos;
uniform vec3 u_colorDark;
uniform vec3 u_colorLight;
uniform vec3 u_colorHighlight;
uniform float u_time;

// NEW FLUID UNIFORMS
uniform sampler2D u_fluidTexture;
uniform vec2 u_resolution;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec4 vRandomness;
varying vec3 vInstancePos;
varying vec3 vLocalPos;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float octaveNoise(vec2 uv, int octaves) {
  float total = 0.0; float frequency = 1.0; float amplitude = 1.0; float maxValue = 0.0;
  for (int i = 0 ; i < 4 ; i++) {
    if (i >= octaves) break;
    total += snoise(uv * frequency) * amplitude; maxValue += amplitude;
    amplitude *= 0.5; frequency *= 2.0;
  }
  return total / maxValue;
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(u_cameraPos - vWorldPos);
    
    vec2 noiseUV = vWorldPos.xy * 20.0;
    float noiseVal = octaveNoise(noiseUV, 3);
    
    float delta = 0.02;
    vec2 gradient = vec2(octaveNoise(noiseUV + vec2(delta, 0.0), 3) - noiseVal, octaveNoise(noiseUV + vec2(0.0, delta), 3) - noiseVal) / delta;
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    vec3 bitangent = normalize(cross(normal, tangent));
    normal = normalize(normal - gradient.x * tangent * (0.04 + (vRandomness.w - 0.5) * 0.2) - gradient.y * bitangent * (0.04 + (vRandomness.w - 0.5) * 0.2));
    
    vec3 color = mix(u_colorDark, u_colorLight, max(0.0, normal.y) * 0.5 + max(0.0, normal.z) * 0.5) + ((vRandomness.w - 0.5) * 0.16);
    color = mix(color, color * 0.2, smoothstep(0.1, -0.1, normal.y) * smoothstep(0.1, 0.0, vWorldPos.z - vInstancePos.z) * 0.8);
    
    float diffuse = max(0.0, dot(normal, u_lightDirection)) * 0.7 + 0.3;
    vec3 halfDir = normalize(u_lightDirection + viewDir);
    float NdotH = max(0.0, dot(normal, halfDir));
    
    float spec = exp(-((dot(tangent, halfDir) * dot(tangent, halfDir) / 0.36) + (dot(bitangent, halfDir) * dot(bitangent, halfDir) / 0.0225)) / max(NdotH * NdotH, 0.001));
    vec3 specular = u_colorHighlight * spec * 1.5;
    vec3 rimLight = u_colorHighlight * pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0) * 0.6;
    
    // IRIDESCENT SHEEN: Subtle biological color shift based on angle and time
    float iridPhase = dot(viewDir, normal) * 3.0 + u_time * 0.8 + vWorldPos.x * 0.2;
    vec3 iridColor = vec3(0.5 + 0.5 * sin(iridPhase), 0.5 + 0.5 * cos(iridPhase + 1.05), 0.5 + 0.5 * sin(iridPhase + 2.09));
    vec3 iridSheen = iridColor * pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5) * 0.25;

    // THE HOVER LIGHT: Highlight the area near the mouse
    vec2 distVecHover = vWorldPos.xy - u_mousePos;
    float mouseDist = length(distVecHover);
    float mouseLight = exp(-mouseDist * mouseDist * 0.5);
    vec3 interactiveLight = u_colorHighlight * mouseLight * 0.6;
    
    // THE FLUID MASK: Calculate screen-space coordinates
    vec2 screenUV = gl_FragCoord.xy / u_resolution;
    vec4 fluidData = texture2D(u_fluidTexture, screenUV);
    vec3 fluidColor = fluidData.rgb;
    
    // Calculate gap mask: vLocalPos.xy is 0,0 at center of scale, ~0.45 at edges
    float distFromCenter = length(vLocalPos.xy);
    float gapMask = smoothstep(0.28, 0.46, distFromCenter); // Sharper edge gap mask
    
    // Also use the depth Z value (the bevel slopes down to Z ~ -0.05)
    float depthMask = smoothstep(0.01, -0.05, vLocalPos.z);
    
    // Combine masks: Gaps are either radially far out OR physically deep
    float combinedMask = clamp(max(gapMask, depthMask), 0.0, 1.0);
    
    // Fluid Emission: Glowing neon green, purple & cyan fluid emerges & leaks from scale gaps
    vec3 fluidEmission = fluidColor * combinedMask * 3.2;
    
    // Fluid Reflection: Fluid reflects against the metallic scale rims
    vec3 fluidReflection = fluidColor * rimLight * 3.5;

    // FIERY BOTTOM SCALE FLAME EMISSION: Heat flicker emanating from bottom scale crevices
    float bottomScaleEdge = smoothstep(-0.1, -0.45, vLocalPos.y) * gapMask;
    float fireNoise = octaveNoise(vWorldPos.xy * 6.0 + vec2(0.0, -u_time * 2.5), 2);
    float firePulse = max(0.0, fireNoise * 1.4 + 0.3);
    vec3 fireBaseColor = mix(vec3(1.0, 0.2, 0.0), vec3(1.0, 0.75, 0.05), fireNoise * 0.5 + 0.5);
    vec3 fireFlameGlow = fireBaseColor * bottomScaleEdge * firePulse * (0.8 + mouseLight * 2.8);

    gl_FragColor = vec4(color * diffuse + specular + rimLight + iridSheen + interactiveLight + fluidEmission + fluidReflection + fireFlameGlow, 1.0);
}
