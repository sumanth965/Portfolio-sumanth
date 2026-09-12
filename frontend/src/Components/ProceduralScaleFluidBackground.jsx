import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FluidSimulation } from '../utils/fluidSimulation';
import { createScaleGeometry, generateScaleInstances } from '../utils/scaleGenerator';
import scalesVert from '../shaders/scales/scalesVert.glsl';
import scalesFrag from '../shaders/scales/scalesFrag.glsl';

export default function ProceduralScaleFluidBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;
        
        // 1. Core Three.js Setup
        const width = window.innerWidth;
        const height = window.innerHeight;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        const dpr = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(dpr);
        mountRef.current.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 200);
        camera.position.set(0, -3, 12);
        camera.lookAt(0, 0, 0);

        // 2. Fluid Simulation Setup
        const fluid = new FluidSimulation(renderer);

        // 3. Scale System Setup
        const scaleSize = 0.45;
        const geometry = createScaleGeometry(scaleSize);
        const { instanceCount, positions, randomness } = generateScaleInstances(camera, scaleSize);
        
        geometry.setAttribute("instancePosition", new THREE.InstancedBufferAttribute(positions, 3));
        geometry.setAttribute("instanceRandomness", new THREE.InstancedBufferAttribute(randomness, 4));

        const uniforms = {
            u_mousePos: { value: new THREE.Vector2(-1000, -1000) },
            u_cameraPos: { value: new THREE.Vector3().copy(camera.position) },
            u_lightDirection: { value: new THREE.Vector3(-1.0, 1.0, 0.5).normalize() },
            u_colorDark: { value: new THREE.Color(0x050505) },
            u_colorLight: { value: new THREE.Color(0x151515) },
            u_colorHighlight: { value: new THREE.Color(0xaaaaaa) },
            u_fluidTexture: { value: null },
            u_resolution: { value: new THREE.Vector2(width * dpr, height * dpr) }
        };

        const material = new THREE.ShaderMaterial({ 
            vertexShader: scalesVert, 
            fragmentShader: scalesFrag, 
            uniforms, 
            side: THREE.DoubleSide 
        });

        const mesh = new THREE.InstancedMesh(geometry, material, instanceCount);
        mesh.frustumCulled = false;
        for (let i = 0; i < instanceCount; i++) mesh.setMatrixAt(i, new THREE.Matrix4());
        scene.add(mesh);

        // 4. Mouse Interaction Setup
        const raycaster = new THREE.Raycaster();
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const mouseXY = new THREE.Vector2(-1000, -1000);
        const mouseTarget = new THREE.Vector3(-1000, -1000, 0);
        const smoothMouse = new THREE.Vector3(-1000, -1000, 0);
        
        // Fluid Mouse State
        let pointerDown = false;
        let pointerInitialized = false;
        const pointerPos = { x: 0, y: 0 };
        const prevPointerPos = { x: 0, y: 0 };

        const onMouseMove = (e) => { 
            const clientX = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : pointerPos.x);
            const clientY = e.clientY || (e.touches && e.touches.length > 0 ? e.touches[0].clientY : pointerPos.y);
            
            pointerDown = true;
            if (!pointerInitialized) {
                prevPointerPos.x = clientX;
                prevPointerPos.y = clientY;
                pointerInitialized = true;
            }
            pointerPos.x = clientX;
            pointerPos.y = clientY;
            
            mouseXY.x = (clientX / window.innerWidth) * 2 - 1; 
            mouseXY.y = -(clientY / window.innerHeight) * 2 + 1; 
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onMouseMove, { passive: true });
        window.addEventListener('touchstart', onMouseMove, { passive: true });

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight; 
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio());
            fluid.resize();
        };
        window.addEventListener('resize', onResize);

        // Colors for Fluid
        const colors = [
            new THREE.Color(0x00FF88), // Neon Green
            new THREE.Color(0x8A2BE2), // Electric Purple
            new THREE.Color(0x00DFFF)  // Soft Cyan
        ];
        let colorCycleT = Math.random();

        // 5. Animation Loop
        let frameId;
        let lastTime = performance.now();
        
        const animate = () => {
            const now = performance.now();
            let dt = (now - lastTime) / 1000;
            dt = Math.min(dt, 0.016667 * 2);
            lastTime = now;

            // Update 3D Raycast for Scales
            raycaster.setFromCamera(mouseXY, camera);
            raycaster.ray.intersectPlane(groundPlane, mouseTarget);
            smoothMouse.lerp(mouseTarget, 0.1);
            uniforms.u_mousePos.value.set(smoothMouse.x, smoothMouse.y);

            // Cycle colors smoothly over time
            colorCycleT += dt * 0.2;
            const h = colorCycleT % 1.0;
            const colorIdx = Math.floor(h * colors.length);
            const nextColorIdx = (colorIdx + 1) % colors.length;
            const lerpFactor = (h * colors.length) - colorIdx;
            const splatColor = new THREE.Color().lerpColors(colors[colorIdx], colors[nextColorIdx], lerpFactor);

            // Update Fluid Simulation
            if (pointerDown) {
                let rawDx = pointerPos.x - prevPointerPos.x;
                let rawDy = prevPointerPos.y - pointerPos.y; // WebGL Y is flipped
                
                // Prevent insanely huge delta from breaking the simulation
                let safeDx = Math.sign(rawDx) * Math.min(Math.abs(rawDx), 60);
                let safeDy = Math.sign(rawDy) * Math.min(Math.abs(rawDy), 60);
                
                const dx = safeDx * fluid.config.SPLAT_FORCE * 0.1; 
                const dy = safeDy * fluid.config.SPLAT_FORCE * 0.1;
                
                if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                    const u = pointerPos.x / window.innerWidth;
                    const v = 1.0 - (pointerPos.y / window.innerHeight);
                    
                    fluid.splat(u, v, dx, dy, splatColor);
                    
                    // Reset prev so it doesn't continuously splat if stopped moving
                    prevPointerPos.x = pointerPos.x;
                    prevPointerPos.y = pointerPos.y;
                }
            }

            // Step fluid
            fluid.step(dt);
            
            // Bind fluid texture to scale shader
            uniforms.u_fluidTexture.value = fluid.getTexture();

            // Render scales
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
            
            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove); 
            window.removeEventListener('touchmove', onMouseMove); 
            window.removeEventListener('touchstart', onMouseMove); 
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frameId); 
            geometry.dispose(); 
            renderer.dispose();
            if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#030303' }} />;
}
