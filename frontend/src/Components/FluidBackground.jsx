
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const shaders = {
  "baseVertexShader": "\n    precision highp float;\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n",
  "copyShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n",
  "clearShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n",
  "displayShader": "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform vec3 bgColor;\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n        // gentle filmic-ish tone mapping so bright splats bloom softly instead of clipping\n        c = c / (c + vec3(0.9));\n        c = pow(c, vec3(0.85));\n        vec3 outc = bgColor + c;\n        gl_FragColor = vec4(outc, 1.0);\n    }\n",
  "splatShader": "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n",
  "advectionShader": "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    #ifdef MANUAL_FILTERING\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n    #endif\n\n    void main () {\n        #ifdef MANUAL_FILTERING\n            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n            vec4 result = bilerp(uSource, coord, dyeTexelSize);\n        #else\n            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n            vec4 result = texture2D(uSource, coord);\n        #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }\n",
  "divergenceShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n",
  "curlShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n",
  "vorticityShader": "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        vel += force * dt;\n        vel = clamp(vel, -1000.0, 1000.0);\n        gl_FragColor = vec4(vel, 0.0, 1.0);\n    }\n",
  "pressureShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n",
  "gradientSubtractShader": "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"
};

const FluidBackground = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const configRef = useRef(null);
  const actionsRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setConfig: (newConfig) => {
      if (configRef.current) {
        Object.assign(configRef.current, newConfig);
      }
    },
    splat: () => {
      if (actionsRef.current) actionsRef.current.multipleSplats(Math.floor(Math.random() * 3) + 3);
    },
    clear: () => {
      if (actionsRef.current) actionsRef.current.initFramebuffers();
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let rafId;

    const fluidSystem = (() => {
      let rafId;



resizeCanvas();

// ---------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------
const config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 1.0,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 8,
    AUTOPLAY: true,
    PAUSED: false,
    BACK_COLOR: { r: 0.01, g: 0.01, b: 0.015 },
};

// lower defaults a touch on small / mobile screens for performance
if (Math.min(window.innerWidth, window.innerHeight) < 500) {
    config.DYE_RESOLUTION = 768;
    config.SIM_RESOLUTION = 96;
}

// ---------------------------------------------------------------------
// WebGL context + extensions
// ---------------------------------------------------------------------
const { gl, ext } = getWebGLContext(canvas);

if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = Math.min(config.DYE_RESOLUTION, 512);
}

function getWebGLContext (canvas) {
    const params = { alpha: false, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) {
        gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    }

    let halfFloat, supportLinearFiltering;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);
    let formatRGBA, formatRG, formatR;

    if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return {
        gl,
        ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering,
            isWebGL2,
        }
    };
}

function getSupportedFormat (gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
            case gl.R16F:
                return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
                return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
                return null;
        }
    }
    return { internalFormat, format };
}

function supportRenderTextureFormat (gl, internalFormat, format, type) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status === gl.FRAMEBUFFER_COMPLETE;
}

// ---------------------------------------------------------------------
// Shader helpers
// ---------------------------------------------------------------------
function compileShader (type, source, keywords) {
    source = addKeywords(source, keywords);
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    }
    return shader;
}

function addKeywords (source, keywords) {
    if (!keywords) return source;
    let keywordsString = '';
    keywords.forEach(k => { keywordsString += '#define ' + k + '\n'; });
    return keywordsString + source;
}

function getShaderSrc (id) { return shaders[id]; }

class Program {
    constructor (vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(this.program));
        }
        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const info = gl.getActiveUniform(this.program, i);
            this.uniforms[info.name] = gl.getUniformLocation(this.program, info.name);
        }
    }
    bind () { gl.useProgram(this.program); }
}

class Material {
    constructor (vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = {};
        this.activeProgram = null;
        this.uniforms = {};
    }
    setKeywords (keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        let program = this.programs[hash];
        if (program == null) {
            const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = new Program(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.uniforms = program.uniforms;
        this.activeProgram = program;
    }
    bind () { gl.useProgram(this.activeProgram.program); }
}

function hashCode (s) {
    if (s.length === 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

// fullscreen quad blit
const blit = (() => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target, clear) => {
        if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
})();

// ---------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------
const baseVertexShader = compileShader(gl.VERTEX_SHADER, getShaderSrc('baseVertexShader'));
const copyShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('copyShader'));
const clearShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('clearShader'));
const splatShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('splatShader'));
const divergenceShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('divergenceShader'));
const curlShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('curlShader'));
const vorticityShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('vorticityShader'));
const pressureShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('pressureShader'));
const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, getShaderSrc('gradientSubtractShader'));

const copyProgram = new Program(baseVertexShader, copyShader);
const clearProgram = new Program(baseVertexShader, clearShader);
const splatProgram = new Program(baseVertexShader, splatShader);
const divergenceProgram = new Program(baseVertexShader, divergenceShader);
const curlProgram = new Program(baseVertexShader, curlShader);
const vorticityProgram = new Program(baseVertexShader, vorticityShader);
const pressureProgram = new Program(baseVertexShader, pressureShader);
const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
const displayMaterial = new Material(baseVertexShader, getShaderSrc('displayShader'));
const advectionMaterial = new Material(baseVertexShader, getShaderSrc('advectionShader'));

// ---------------------------------------------------------------------
// Framebuffers
// ---------------------------------------------------------------------
let dye, velocity, divergence, curlFBO, pressure;

function createFBO (w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const texelSizeX = 1.0 / w;
    const texelSizeY = 1.0 / h;
    return {
        texture, fbo, width: w, height: h, texelSizeX, texelSizeY,
        attach (id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };
}

function createDoubleFBO (w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
        width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
        get read () { return fbo1; },
        set read (v) { fbo1 = v; },
        get write () { return fbo2; },
        set write (v) { fbo2 = v; },
        swap () { const tmp = fbo1; fbo1 = fbo2; fbo2 = tmp; }
    };
}

function resizeFBO (target, w, h, internalFormat, format, type, param) {
    const newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
}

function resizeDoubleFBO (target, w, h, internalFormat, format, type, param) {
    if (target.width === w && target.height === h) return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
}

function getResolution (resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);
    if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
    return { width: min, height: max };
}

function initFramebuffers () {
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(config.DYE_RESOLUTION);
    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (!dye) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    } else {
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    }
    if (!velocity) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    } else {
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    }
    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
}

initFramebuffers();

// ---------------------------------------------------------------------
// Pointer input
// ---------------------------------------------------------------------
function pointerPrototype () {
    return {
        id: -1, texcoordX: 0, texcoordY: 0, prevTexcoordX: 0, prevTexcoordY: 0,
        deltaX: 0, deltaY: 0, down: false, moved: false,
        color: [30, 0, 300]
    };
}
const pointers = [pointerPrototype()];

function scaleByPixelRatio (input) {
    const pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
}

function correctDeltaX (delta) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
}
function correctDeltaY (delta) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
}

function HSVtoRGB (h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return { r, g, b };
}


function generateColor () {
    const palette = [
        { r: 0.1, g: 0.8, b: 1.0 }, // Cyan
        { r: 0.5, g: 0.1, b: 1.0 }, // Violet
        { r: 1.0, g: 0.1, b: 0.7 }, // Magenta
        { r: 0.1, g: 0.3, b: 1.0 }, // Blue
        { r: 1.0, g: 0.4, b: 0.6 }  // Pink
    ];
    const c = palette[Math.floor(Math.random() * palette.length)];
    // Add subtle variation
    const mix = HSVtoRGB(Math.random(), 1.0, 1.0);
    return {
        r: c.r * 0.15 + mix.r * 0.03,
        g: c.g * 0.15 + mix.g * 0.03,
        b: c.b * 0.15 + mix.b * 0.03
    };
}


function updatePointerDownData (pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
}

function updatePointerMoveData (pointer, posX, posY, color) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    pointer.color = color;
}

function updatePointerUpData (pointer) { pointer.down = false; }

let lastInteractionTime = performance.now();
function markInteraction () { lastInteractionTime = performance.now(); hideOverlays(); }

window.addEventListener('mousedown', e => {
    const posX = scaleByPixelRatio(e.clientX);
    const posY = scaleByPixelRatio(e.clientY);
    const pointer = pointers[0];
    updatePointerDownData(pointer, -1, posX, posY);
    markInteraction();
});

window.addEventListener('mousemove', e => {
    const pointer = pointers[0];
    const posX = scaleByPixelRatio(e.clientX);
    const posY = scaleByPixelRatio(e.clientY);
    if (!pointer.down) {
        updatePointerDownData(pointer, -1, posX, posY);
    }
    updatePointerMoveData(pointer, posX, posY, pointer.color);
});

window.addEventListener('mouseup', () => { updatePointerUpData(pointers[0]); });

window.addEventListener('touchstart', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    while (touches.length >= pointers.length) pointers.push(pointerPrototype());
    for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
    }
    markInteraction();
}, { passive: false });

window.addEventListener('touchmove', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        const pointer = pointers[i + 1];
        if (!pointer || !pointer.down) continue;
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
    }
}, { passive: false });

window.addEventListener('touchend', e => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const pointer = pointers.find(p => p.id === touches[i].identifier);
        if (pointer) updatePointerUpData(pointer);
    }
});

function hideOverlays() {}

// ---------------------------------------------------------------------
// Simulation step
// ---------------------------------------------------------------------
function splat (x, y, dx, dy, color) {
    gl.viewport(0, 0, velocity.width, velocity.height);
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.viewport(0, 0, dye.width, dye.height);
    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
}

function correctRadius (radius) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) radius *= aspectRatio;
    return radius;
}

function multipleSplats (amount) {
    for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 6; color.g *= 6; color.b *= 6;
        const x = Math.random();
        const y = Math.random();
        const dx = 800 * (Math.random() - 0.5);
        const dy = 800 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
    }
}

let colorCycleT = 0;
function updatePointerColors (dt) {
    if (!config.COLORFUL) return;
    colorCycleT += dt * config.COLOR_UPDATE_SPEED / 100;
    for (const p of pointers) {
        if (!p.down) continue;
        let h = (colorCycleT + p.id * 0.13) % 1.0;
        if (h < 0) h += 1.0;
        const c = HSVtoRGB(h, 1.0, 1.0);
        c.r *= 0.18; c.g *= 0.18; c.b *= 0.18;
        p.color = c;
    }
}

function applyInputs () {
    for (const p of pointers) {
        if (p.moved) {
            p.moved = false;
            const dx = p.deltaX * config.SPLAT_FORCE;
            const dy = p.deltaY * config.SPLAT_FORCE;
            splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
        }
    }
}

function step (dt) {
    gl.disable(gl.BLEND);

    // curl
    gl.viewport(0, 0, velocity.width, velocity.height);
    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curlFBO);

    // vorticity confinement
    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    // divergence
    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    // clear / decay pressure
    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    // pressure jacobi iterations
    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
    }

    // subtract pressure gradient
    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    // advect velocity
    advectionMaterial.setKeywords(ext.supportLinearFiltering ? [] : ['MANUAL_FILTERING']);
    advectionMaterial.bind();
    gl.uniform2f(advectionMaterial.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionMaterial.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    }
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionMaterial.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionMaterial.uniforms.uSource, velocityId);
    gl.uniform1f(advectionMaterial.uniforms.dt, dt);
    gl.uniform1f(advectionMaterial.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    // advect dye
    gl.viewport(0, 0, dye.width, dye.height);
    if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionMaterial.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    }
    gl.uniform1i(advectionMaterial.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionMaterial.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionMaterial.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
}

function render (target) {
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.disable(gl.BLEND);
    displayMaterial.setKeywords([]);
    displayMaterial.bind();
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    gl.uniform3f(displayMaterial.uniforms.bgColor, config.BACK_COLOR.r, config.BACK_COLOR.g, config.BACK_COLOR.b);
    blit(target);
}

// ---------------------------------------------------------------------
// Resize handling
// ---------------------------------------------------------------------
function resizeCanvas () {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(canvas.clientWidth * pixelRatio) || Math.round(window.innerWidth * pixelRatio);
    const height = Math.round(canvas.clientHeight * pixelRatio) || Math.round(window.innerHeight * pixelRatio);
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

window.addEventListener('resize', () => {
    if (resizeCanvas()) initFramebuffers();
});

// ---------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------
let lastTime = performance.now();
let idleSplatTimer = 0;

function updateFrame () {
    const now = performance.now();
    let dt = (now - lastTime) / 1000;
    dt = Math.min(dt, 0.016667 * 2);
    lastTime = now;

    if (resizeCanvas()) initFramebuffers();

    if (!config.PAUSED) {
        updatePointerColors(dt);
        applyInputs();
        step(dt);
    }
    render(null);

    // ambient idle motion when nothing has happened for a while
    if (config.AUTOPLAY && !config.PAUSED) {
        const idleFor = (now - lastInteractionTime) / 1000;
        idleSplatTimer -= dt;
        if (idleFor > 1.2 && idleSplatTimer <= 0) {
            multipleSplats(1);
            idleSplatTimer = 1.6 + Math.random() * 1.4;
        }
    }

    rafId = requestAnimationFrame(updateFrame);
}

multipleSplats(Math.floor(Math.random() * 4) + 5);
rafId = requestAnimationFrame(updateFrame);


      
      return {
        config: config,
        multipleSplats,
        initFramebuffers,
        cleanup: () => {
          if (rafId) cancelAnimationFrame(rafId);
          window.removeEventListener('mousedown', () => {});
          window.removeEventListener('touchstart', () => {});
          window.removeEventListener('touchmove', () => {});
          window.removeEventListener('touchend', () => {});
        }
      };
    })();
    
    configRef.current = fluidSystem.config;
    actionsRef.current = {
        multipleSplats: fluidSystem.multipleSplats,
        initFramebuffers: fluidSystem.initFramebuffers
    };

    return fluidSystem.cleanup;
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#030305' // very dark charcoal fallback
      }}
    />
  );
});

export default FluidBackground;
