"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticlesProps {
  className?: string;
  style?: React.CSSProperties;
  /** Number of back (slower, smaller) particles. Default 60 */
  backCount?: number;
  /** Number of front (faster, larger) particles. Default 35 */
  frontCount?: number;
}

function makeParticle(w: number, h: number, layer: "back" | "front"): Particle {
  const back = layer === "back";
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * (back ? 0.18 : 0.32),
    vy: (Math.random() - 0.5) * (back ? 0.18 : 0.32),
    // back: ~0.15rem equiv (~2.4px at 16px base), front: ~0.235rem (~3.76px)
    size: back ? 2.4 : 3.76,
    opacity: back
      ? 0.12 + Math.random() * 0.14   // 0.12–0.26
      : 0.18 + Math.random() * 0.20,  // 0.18–0.38
  };
}

export default function Particles({
  className = "",
  style,
  backCount = 60,
  frontCount = 35,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let back: Particle[] = [];
    let front: Particle[] = [];

    function init() {
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w;
      canvas!.height = h;
      back = Array.from({ length: backCount }, () => makeParticle(w, h, "back"));
      front = Array.from({ length: frontCount }, () => makeParticle(w, h, "front"));
    }

    function drawLayer(particles: Particle[], color: string) {
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx!.fillStyle = color.replace("OPACITY", String(p.opacity));
        ctx!.fill();
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h);

      // Back layer: white with slight blue-purple tint
      drawLayer(back, "rgba(210, 200, 255, OPACITY)");
      // Front layer: slightly warmer white
      drawLayer(front, "rgba(240, 230, 255, OPACITY)");

      for (const p of [...back, ...front]) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap at edges
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
      }

      raf = requestAnimationFrame(tick);
    }

    init();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      init();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [backCount, frontCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
