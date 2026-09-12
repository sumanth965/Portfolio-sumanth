import * as THREE from 'three';

export function createScaleGeometry(scaleSize = 0.45) {
    const shape = new THREE.Shape();
    // Rounded diamond/shield shape
    shape.moveTo(0, 0.5);
    shape.quadraticCurveTo(0.4, 0.3, 0.4, 0.0);
    shape.quadraticCurveTo(0.3, -0.4, 0.0, -0.5);
    shape.quadraticCurveTo(-0.3, -0.4, -0.4, 0.0);
    shape.quadraticCurveTo(-0.4, 0.3, 0.0, 0.5);
    
    // Extrude for physical depth
    const geometry = new THREE.ExtrudeGeometry(shape, { 
        depth: 0.05, 
        bevelEnabled: true, 
        bevelSegments: 4, 
        steps: 1, 
        bevelSize: 0.1, 
        bevelThickness: 0.1 
    });
    
    geometry.computeBoundingBox(); 
    // Shift so pivot is exactly at the surface for easier Z-manipulation
    geometry.translate(0, 0, -geometry.boundingBox.min.z);
    
    const scaleFactor = scaleSize / 0.8;
    geometry.scale(scaleFactor, scaleFactor, scaleFactor);

    return geometry;
}

export function generateScaleInstances(camera, scaleSize = 0.45) {
    const dist = camera.position.z;
    const viewHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
    // Add extra padding outside viewport so edges aren't visible
    const w = viewHeight * camera.aspect + 10.0; 
    const h = viewHeight + 10.0;
    
    const cols = Math.ceil(w / (scaleSize * 0.95)); 
    const rows = Math.ceil(h / (scaleSize * 0.6));
    const instanceCount = cols * rows;

    const positions = new Float32Array(instanceCount * 3);
    const randomness = new Float32Array(instanceCount * 4);
    let idx = 0;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Hex-like staggered grid
            positions[idx * 3] = (-w / 2) + c * (scaleSize * 0.95) + ((r % 2 === 0) ? 0 : (scaleSize * 0.95 * 0.5));
            positions[idx * 3 + 1] = (-h / 2) + r * (scaleSize * 0.6);
            // Slight Z-layering so lower scales sit slightly above upper scales
            positions[idx * 3 + 2] = r * 0.001;
            
            // Assign 4 random variables per instance
            randomness[idx * 4] = Math.random(); 
            randomness[idx * 4 + 1] = Math.random();
            randomness[idx * 4 + 2] = Math.random(); 
            randomness[idx * 4 + 3] = Math.random();
            idx++;
        }
    }
    
    return { instanceCount, positions, randomness };
}
