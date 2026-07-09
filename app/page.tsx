"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Create a motion-enabled Next.js Link component to keep smooth transitions
const MotionLink = motion.create(Link);

export default function HomeLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; ox: number; oy: number }> = [];
    const spacing = 45;

    const initParticles = () => {
      if (!canvas) return;
      particles = [];

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          particles.push({ x, y, ox: x, oy: y });
        }
      }
    };

    initParticles();
    const handleResize = () => initParticles();
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mouse.active) {
          const dx = mouse.x - p.ox;
          const dy = mouse.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x += (p.ox - (dx / dist) * maxDist * force - p.x) * 0.45;
            p.y += (p.oy - (dy / dist) * maxDist * force - p.y) * 0.45;
          } else {
            p.x += (p.ox - p.x) * 0.25;
            p.y += (p.oy - p.y) * 0.25;
          }
        } else {
          p.x += (p.ox - p.x) * 0.25;
          p.y += (p.oy - p.y) * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const menuItems = [
    { title: "About me", path: "/about" },
    { title: "Projects", path: "/project" },
    { title: "GitHub", path: "https://github.com/CoderKanha47", external: true }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setMouse(prev => ({ ...prev, active: false }));
        setHoveredIndex(null);
      }}
      className="relative w-full h-screen bg-[#000000] overflow-hidden flex flex-col justify-center items-center select-none p-6"
    >
      {/* BACKGROUND PARTICLE LAYER */}
      <motion.div
        animate={{ filter: hoveredIndex !== null ? "blur(4px)" : "blur(0px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </motion.div>

      {/* EDITORIAL TEXT BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="z-10 text-center mb-16 space-y-3 pointer-events-none max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
          Hi !<br /> I am a Product Engineer, <span className="font-normal text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Welcome to my</span> Portfolio.
        </h1>
      </motion.div>

      {/* HORIZONTAL GLASS BLOCK ROW */}
      <div className="z-10 flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-5xl">
  {menuItems.map((item, idx) => (
    <MotionLink
      key={idx}
      href={item.path}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: idx * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.15, ease: "linear" }
      }}

      className="flex-1 min-h-35 max-md:min-h-50 flex items-center justify-center p-8 rounded-xl border border-white/10 bg-transparent relative group cursor-pointer shadow-lg transition-all duration-300 ease-out hover:border-white/30"
    >
      {/* BACKGROUND MATTE LAYER: Keeps the card distinct without destroying background elements */}
      <div className="absolute inset-0 rounded-xl bg-white/2 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />

      {/* RE-ARCHITECTED RADIAL LIGHT ILLUMINATION */}
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* TEXT ELEMENT */}
      <span className="text-lg md:text-xl font-light tracking-wide text-white/50 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-200 font-sans z-10">
        {item.title}
      </span>
    </MotionLink>
  ))}
</div>

      {/* SYSTEM TELEMETRY */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-white/15 tracking-widest hidden sm:block">
        {mouse.active ? `X: ${Math.round(mouse.x)} Y: ${Math.round(mouse.y)}` : "IDLE"}
      </div>
    </div>
  );
}