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
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        const maxDpr = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ? 1.0 : 1.5;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
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
            u_resolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
            u_time: { value: 0 }
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

        // 4. Mouse & Click Interaction Setup
        const raycaster = new THREE.Raycaster();
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const mouseXY = new THREE.Vector2(-1000, -1000);
        const mouseTarget = new THREE.Vector3(-1000, -1000, 0);
        const smoothMouse = new THREE.Vector3(-1000, -1000, 0);
        
        // Reusable Vector/Color instances to prevent garbage collection frame spikes
        const reusableSplatColor = new THREE.Color();

        // Fluid Mouse State & Scroll Performance Mode State
        let pointerDown = false;
        let pointerInitialized = false;
        let lastInteractionTime = performance.now();
        let isScrolling = false;
        let scrollTimeout = null;
        const pointerPos = { x: 0, y: 0 };
        const prevPointerPos = { x: 0, y: 0 };

        const onMouseMove = (e) => { 
            const clientX = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : pointerPos.x);
            const clientY = e.clientY || (e.touches && e.touches.length > 0 ? e.touches[0].clientY : pointerPos.y);
            
            pointerDown = true;
            lastInteractionTime = performance.now();

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

        const onWindowScroll = () => {
            isScrolling = true;
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        };

        // Click Shockwave Burst
        const onClick = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;
            const u = clientX / window.innerWidth;
            const v = 1.0 - (clientY / window.innerHeight);

            // Fire 6 radial burst splats outward
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const dx = Math.cos(angle) * fluid.config.SPLAT_FORCE * 0.4;
                const dy = Math.sin(angle) * fluid.config.SPLAT_FORCE * 0.4;
                const burstColor = colors[i % colors.length];
                fluid.splat(u, v, dx, dy, burstColor);
            }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('touchmove', onMouseMove, { passive: true });
        window.addEventListener('touchstart', onMouseMove, { passive: true });
        window.addEventListener('scroll', onWindowScroll, { passive: true });
        window.addEventListener('click', onClick, { passive: true });

        // Debounced Resize Handler
        let resizeTimeout = null;
        const onResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight; 
                camera.updateProjectionMatrix();
                const curDpr = Math.min(window.devicePixelRatio || 1, maxDpr);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(curDpr);
                uniforms.u_resolution.value.set(window.innerWidth * curDpr, window.innerHeight * curDpr);
                fluid.resize();
            }, 100);
        };
        window.addEventListener('resize', onResize, { passive: true });

        // Colors for Fluid: Neon Green, Electric Purple, and Cyan as requested
        const colors = [
            new THREE.Color(0x00FF88), // Neon Green
            new THREE.Color(0x8A2BE2), // Electric Purple
            new THREE.Color(0x00DFFF)  // Vibrant Cyan
        ];
        let colorCycleT = Math.random();
        let lastIdleSplatTime = 0;

        // 5. Animation Loop
        let frameId;
        let lastTime = performance.now();
        let isTabActive = true;

        const handleVisibilityChange = () => {
            isTabActive = !document.hidden;
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            if (!isTabActive) return;

            const now = performance.now();
            let dt = (now - lastTime) / 1000;
            dt = Math.min(dt, 0.033);
            lastTime = now;

            // Update Time Uniform for Breathing & Iridescence
            uniforms.u_time.value = now * 0.001;

            // Update 3D Raycast for Scales
            raycaster.setFromCamera(mouseXY, camera);
            raycaster.ray.intersectPlane(groundPlane, mouseTarget);
            smoothMouse.lerp(mouseTarget, 0.1);
            uniforms.u_mousePos.value.set(smoothMouse.x, smoothMouse.y);

            // Cycle through Neon Green, Electric Purple, and Cyan using REUSABLE color object
            colorCycleT += dt * 0.25;
            const h = colorCycleT % 1.0;
            const colorIdx = Math.floor(h * colors.length);
            const nextColorIdx = (colorIdx + 1) % colors.length;
            const lerpFactor = (h * colors.length) - colorIdx;
            reusableSplatColor.lerpColors(colors[colorIdx], colors[nextColorIdx], lerpFactor);

            // Update Fluid Simulation on Mouse Move (only if not fast scrolling to preserve GPU fill rate)
            if (pointerDown && !isScrolling) {
                let rawDx = pointerPos.x - prevPointerPos.x;
                let rawDy = prevPointerPos.y - pointerPos.y; // WebGL Y is flipped
                
                let safeDx = Math.sign(rawDx) * Math.min(Math.abs(rawDx), 60);
                let safeDy = Math.sign(rawDy) * Math.min(Math.abs(rawDy), 60);
                
                const dx = safeDx * fluid.config.SPLAT_FORCE * 0.12; 
                const dy = safeDy * fluid.config.SPLAT_FORCE * 0.12;
                
                if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                    const u = pointerPos.x / window.innerWidth;
                    const v = 1.0 - (pointerPos.y / window.innerHeight);
                    
                    fluid.splat(u, v, dx, dy, reusableSplatColor);
                    
                    prevPointerPos.x = pointerPos.x;
                    prevPointerPos.y = pointerPos.y;
                }
            }

            // AMBIENT IDLE EFFECT: Emit gentle fluid pulses when stationary for >2.5 sec
            if (!isScrolling && now - lastInteractionTime > 2500 && now - lastIdleSplatTime > 1500) {
                lastIdleSplatTime = now;
                const randomU = 0.1 + Math.random() * 0.8;
                const randomV = 0.1 + Math.random() * 0.8;
                const randomAngle = Math.random() * Math.PI * 2;
                const dx = Math.cos(randomAngle) * fluid.config.SPLAT_FORCE * 0.15;
                const dy = Math.sin(randomAngle) * fluid.config.SPLAT_FORCE * 0.15;
                const idleColor = colors[Math.floor(Math.random() * colors.length)];
                fluid.splat(randomU, randomV, dx, dy, idleColor);
            }

            // Step fluid simulation
            fluid.step(dt);
            
            // Bind fluid texture to scale shader
            uniforms.u_fluidTexture.value = fluid.getTexture();

            // Render scales
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove); 
            window.removeEventListener('touchmove', onMouseMove); 
            window.removeEventListener('touchstart', onMouseMove); 
            window.removeEventListener('scroll', onWindowScroll);
            window.removeEventListener('click', onClick);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            cancelAnimationFrame(frameId); 
            geometry.dispose(); 
            material.dispose();
            renderer.dispose();
            if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#030303' }} />;
}
