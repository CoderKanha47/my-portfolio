"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
      // Use the viewport size, not the (potentially taller) scrollable container,
      // since the canvas is now fixed to the viewport.
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

  // Mouse position needs to be relative to the viewport now, since the canvas
  // is fixed instead of absolutely positioned inside a scrollable container.
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
      active: true,
    });
  };

  const menuItems = [
    { title: "About me", desc: "Background & skills", path: "/about" },
    { title: "Projects", desc: "Things I've shipped", path: "/project" },
    { title: "GitHub", desc: "Source & commits", path: "https://github.com/CoderKanha47", external: true }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setMouse(prev => ({ ...prev, active: false }));
        setHoveredIndex(null);
      }}
      // min-h-screen instead of h-screen: lets the page grow past one
      // viewport on mobile instead of clipping content with overflow-hidden.
      className="relative w-full min-h-screen bg-[#000000] flex flex-col justify-center items-center select-none p-6 py-12"
    >
      {/* BACKGROUND PARTICLE LAYER — fixed so it still covers the screen after scrolling */}
      <motion.div
        animate={{ filter: hoveredIndex !== null ? "blur(4px)" : "blur(0px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </motion.div>

      {/* EDITORIAL TEXT BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="z-10 text-center mb-10 md:mb-16 space-y-3 md:space-y-4 pointer-events-none max-w-2xl"
      >
        <span className="block font-mono text-[11px] tracking-[0.35em] text-white/40 uppercase">
          Kanha // Product Engineer
        </span>
        <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
          I build AI-native tools that turn
          <br className="hidden md:block" />{" "}
          <span className="font-normal text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            manual work into automated systems.
          </span>
        </h1>
        <p className="text-sm md:text-base text-white/40 font-light pt-1">
          Final-year CS engineer · Next.js, TypeScript, AI-assisted architecture
        </p>
      </motion.div>

      {/* HORIZONTAL GLASS BLOCK ROW */}
      <div className="z-10 flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6 w-full max-w-5xl">
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
            // Shorter cards on mobile (min-h-28 vs old min-h-56) so three
            // stacked cards actually fit within a normal phone viewport.
            className="flex-1 min-h-28 md:min-h-44 flex flex-col items-start justify-between p-6 md:p-8 rounded-2xl border border-white/25 bg-white/4 relative group cursor-pointer transition-all duration-300 ease-out hover:border-white/60 hover:bg-white/[0.07] shadow-[0_0_25px_rgba(255,255,255,0.06),inset_0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_45px_rgba(255,255,255,0.14),inset_0_0_25px_rgba(255,255,255,0.04)]"
          >
            {/* RE-ARCHITECTED RADIAL LIGHT ILLUMINATION */}
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* TOP ROW: TITLE + ARROW */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-lg md:text-2xl font-light tracking-wide text-white/90 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-200 font-sans">
                {item.title}
              </span>
              <ArrowUpRight
                size={20}
                className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </div>

            {/* SUPPORTING LABEL */}
            <span className="text-xs font-mono tracking-wide text-white/35 group-hover:text-white/60 transition-colors duration-200 z-10">
              {item.desc}
            </span>
          </MotionLink>
        ))}
      </div>

      {/* SYSTEM TELEMETRY */}
      <div className="fixed bottom-6 left-6 font-mono text-[10px] text-white/15 tracking-widest hidden sm:block">
        {mouse.active ? `X: ${Math.round(mouse.x)} Y: ${Math.round(mouse.y)}` : "IDLE"}
      </div>
    </div>
  );
}
