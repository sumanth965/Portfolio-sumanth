import * as THREE from 'three';
import { 
    baseVertexShader, copyShader, clearShader, splatShader, advectionShader, 
    divergenceShader, curlShader, vorticityShader, pressureShader, gradientSubtractShader 
} from '../shaders/fluidShaders';

export class FluidSimulation {
    constructor(renderer) {
        this.renderer = renderer;
        
        // Fluid simulation configuration
        this.config = {
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            DENSITY_DISSIPATION: 0.98, // Keep it visible slightly longer
            VELOCITY_DISSIPATION: 0.2,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.005, 
            SPLAT_FORCE: 6000
        };

        // Screen quad setup
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();
        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry);
        this.scene.add(this.mesh);

        this.initMaterials();
        this.initRenderTargets();
    }

    initMaterials() {
        this.materials = {
            clear: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: clearShader,
                uniforms: { uTexture: { value: null }, value: { value: this.config.PRESSURE }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            copy: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: copyShader,
                uniforms: { uTexture: { value: null }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            splat: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: splatShader,
                uniforms: { uTarget: { value: null }, aspectRatio: { value: 1 }, color: { value: new THREE.Vector3() }, point: { value: new THREE.Vector2() }, radius: { value: 0 }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            advection: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: advectionShader,
                uniforms: { uVelocity: { value: null }, uSource: { value: null }, dt: { value: 0.016 }, dissipation: { value: 1.0 }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            divergence: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: divergenceShader,
                uniforms: { uVelocity: { value: null }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            curl: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: curlShader,
                uniforms: { uVelocity: { value: null }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            vorticity: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: vorticityShader,
                uniforms: { uVelocity: { value: null }, uCurl: { value: null }, curl: { value: this.config.CURL }, dt: { value: 0.016 }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            pressure: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: pressureShader,
                uniforms: { uPressure: { value: null }, uDivergence: { value: null }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            }),
            gradientSubtract: new THREE.ShaderMaterial({
                vertexShader: baseVertexShader,
                fragmentShader: gradientSubtractShader,
                uniforms: { uPressure: { value: null }, uVelocity: { value: null }, texelSize: { value: new THREE.Vector2() } },
                depthWrite: false, depthTest: false
            })
        };
    }

    createRenderTarget(width, height, format = THREE.RGBAFormat, type = THREE.HalfFloatType) {
        return new THREE.WebGLRenderTarget(width, height, {
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: format,
            type: type,
            depthBuffer: false,
            stencilBuffer: false
        });
    }

    createDoubleRenderTarget(width, height, format = THREE.RGBAFormat, type = THREE.HalfFloatType) {
        return {
            read: this.createRenderTarget(width, height, format, type),
            write: this.createRenderTarget(width, height, format, type),
            swap: function() {
                const temp = this.read;
                this.read = this.write;
                this.write = temp;
            }
        };
    }

    getResolution(resolution) {
        let aspectRatio = window.innerWidth / window.innerHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);
        if (window.innerWidth > window.innerHeight) return { width: max, height: min };
        return { width: min, height: max };
    }

    initRenderTargets() {
        const simRes = this.getResolution(this.config.SIM_RESOLUTION);
        const dyeRes = this.getResolution(this.config.DYE_RESOLUTION);

        // Disposing old targets if re-initing
        if (this.dye) {
            this.dye.read.dispose(); this.dye.write.dispose();
            this.velocity.read.dispose(); this.velocity.write.dispose();
            this.divergence.dispose(); this.curl.dispose();
            this.pressure.read.dispose(); this.pressure.write.dispose();
        }

        this.dye = this.createDoubleRenderTarget(dyeRes.width, dyeRes.height);
        this.velocity = this.createDoubleRenderTarget(simRes.width, simRes.height);
        this.divergence = this.createRenderTarget(simRes.width, simRes.height);
        this.curl = this.createRenderTarget(simRes.width, simRes.height);
        this.pressure = this.createDoubleRenderTarget(simRes.width, simRes.height);
    }

    resize() {
        this.initRenderTargets();
    }

    renderPass(material, target) {
        this.mesh.material = material;
        if (target) {
            this.renderer.setRenderTarget(target);
            this.renderer.render(this.scene, this.camera);
        } else {
            this.renderer.setRenderTarget(null);
            this.renderer.render(this.scene, this.camera);
        }
    }

    splat(x, y, dx, dy, color) {
        const aspect = window.innerWidth / window.innerHeight;
        
        // Velocity splat
        this.materials.splat.uniforms.uTarget.value = this.velocity.read.texture;
        this.materials.splat.uniforms.aspectRatio.value = aspect;
        this.materials.splat.uniforms.point.value.set(x, y);
        this.materials.splat.uniforms.color.value.set(dx, dy, 0.0);
        this.materials.splat.uniforms.radius.value = this.config.SPLAT_RADIUS;
        this.renderPass(this.materials.splat, this.velocity.write);
        this.velocity.swap();

        // Dye splat
        this.materials.splat.uniforms.uTarget.value = this.dye.read.texture;
        this.materials.splat.uniforms.color.value.set(color.r, color.g, color.b);
        this.renderPass(this.materials.splat, this.dye.write);
        this.dye.swap();
    }

    step(dt) {
        const velTexelSize = new THREE.Vector2(1.0 / this.velocity.read.width, 1.0 / this.velocity.read.height);
        const dyeTexelSize = new THREE.Vector2(1.0 / this.dye.read.width, 1.0 / this.dye.read.height);

        // Curl
        this.materials.curl.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.curl.uniforms.texelSize.value.copy(velTexelSize);
        this.renderPass(this.materials.curl, this.curl);

        // Vorticity
        this.materials.vorticity.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.vorticity.uniforms.uCurl.value = this.curl.texture;
        this.materials.vorticity.uniforms.texelSize.value.copy(velTexelSize);
        this.materials.vorticity.uniforms.dt.value = dt;
        this.renderPass(this.materials.vorticity, this.velocity.write);
        this.velocity.swap();

        // Divergence
        this.materials.divergence.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.divergence.uniforms.texelSize.value.copy(velTexelSize);
        this.renderPass(this.materials.divergence, this.divergence);

        // Clear pressure
        this.materials.clear.uniforms.uTexture.value = this.pressure.read.texture;
        this.materials.clear.uniforms.value.value = this.config.PRESSURE;
        this.materials.clear.uniforms.texelSize.value.copy(velTexelSize);
        this.renderPass(this.materials.clear, this.pressure.write);
        this.pressure.swap();

        // Pressure Jacobi iterations
        this.materials.pressure.uniforms.uDivergence.value = this.divergence.texture;
        this.materials.pressure.uniforms.texelSize.value.copy(velTexelSize);
        for (let i = 0; i < this.config.PRESSURE_ITERATIONS; i++) {
            this.materials.pressure.uniforms.uPressure.value = this.pressure.read.texture;
            this.renderPass(this.materials.pressure, this.pressure.write);
            this.pressure.swap();
        }

        // Gradient Subtract
        this.materials.gradientSubtract.uniforms.uPressure.value = this.pressure.read.texture;
        this.materials.gradientSubtract.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.gradientSubtract.uniforms.texelSize.value.copy(velTexelSize);
        this.renderPass(this.materials.gradientSubtract, this.velocity.write);
        this.velocity.swap();

        // Advection (Velocity)
        this.materials.advection.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.advection.uniforms.uSource.value = this.velocity.read.texture;
        this.materials.advection.uniforms.texelSize.value.copy(velTexelSize);
        this.materials.advection.uniforms.dt.value = dt;
        this.materials.advection.uniforms.dissipation.value = this.config.VELOCITY_DISSIPATION;
        this.renderPass(this.materials.advection, this.velocity.write);
        this.velocity.swap();

        // Advection (Dye)
        this.materials.advection.uniforms.uVelocity.value = this.velocity.read.texture;
        this.materials.advection.uniforms.uSource.value = this.dye.read.texture;
        this.materials.advection.uniforms.texelSize.value.copy(velTexelSize); // Uses vel texel size for advection coordinate mapping
        this.materials.advection.uniforms.dissipation.value = this.config.DENSITY_DISSIPATION;
        this.renderPass(this.materials.advection, this.dye.write);
        this.dye.swap();

        // Reset render target back to null for main scene
        this.renderer.setRenderTarget(null);
    }

    getTexture() {
        return this.dye.read.texture;
    }
}
