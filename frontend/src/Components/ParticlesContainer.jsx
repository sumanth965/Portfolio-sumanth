import { useEffect, useRef } from "react";

const PARTICLE_COLOR = "#e68e2e";
const LINK_COLOR = "245, 211, 147";
const INTERACTION_RADIUS = 220;

const ParticlesContainer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const random = (min, max) => Math.random() * (max - min) + min;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const targetCount = Math.max(36, Math.round((width * height * 80) / (1200 * 800)));

      while (particles.length < targetCount) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          radius: random(1, 5),
          vx: random(-0.7, 0.7) || 0.4,
          vy: random(-0.7, 0.7) || -0.4,
        });
      }

      particles.length = targetCount;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < INTERACTION_RADIUS) {
            const force = (1 - distance / INTERACTION_RADIUS) * 1.35;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 1.6) {
          particle.vx /= speed;
          particle.vy /= speed;
          particle.vx *= 1.6;
          particle.vy *= 1.6;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= particle.radius || particle.x >= width - particle.radius) {
          particle.vx *= -1;
          particle.x = Math.min(Math.max(particle.x, particle.radius), width - particle.radius);
        }

        if (particle.y <= particle.radius || particle.y >= height - particle.radius) {
          particle.vy *= -1;
          particle.y = Math.min(Math.max(particle.y, particle.radius), height - particle.radius);
        }

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const dx = particle.x - next.x;
          const dy = particle.y - next.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(${LINK_COLOR}, ${0.5 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }

          const minDistance = particle.radius + next.radius;
          if (distance > 0 && distance < minDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            particle.vx += nx * 0.08;
            particle.vy += ny * 0.08;
            next.vx -= nx * 0.08;
            next.vy -= ny * 0.08;
          }
        }

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      pointer.x = x;
      pointer.y = y;
      pointer.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default ParticlesContainer;
