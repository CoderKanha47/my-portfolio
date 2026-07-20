"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);
const MotionSpan = motion.span;

export default function AboutMe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
          const maxDist = 125;

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

  const toggleSection = (id: string) => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const sections = [
    {
      id: "general",
      title: "General Profile",
      matrix: "01",
      content: (
        <div className="space-y-4 text-sm font-light pt-6 border-t border-white/10 w-full flex flex-col items-center">
          <p className="text-white"><strong className="font-mono text-white/50 mr-3 text-xs tracking-widest">IDENTITY //</strong> Kiran Kumar Jena</p>
          <p className="text-white"><strong className="font-mono text-white/50 mr-3 text-xs tracking-widest">LOCATION //</strong> Keonjhar, Odisha, India</p>
          <p className="text-white/70 leading-normal text-lg max-w-2xl mt-4">
            I concentrate on creating interactive software layouts. I also work on automating pipelines and improving user flows.
          </p>
        </div>
      )
    },
    {
      id: "education",
      title: "Education",
      matrix: "02",
      content: (
        <div className="space-y-6 text-xs font-light pt-6 border-t border-white/10 w-full flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-mono text-white/50 block tracking-widest">// UNDERGRADUATE</span>
            <p className="text-white font-normal text-base mt-1">Biju Patnaik University of Technology (BPUT)</p>
            <p className="text-white/70 text-xs mt-1">Computer Science & Engineering // 7th Semester</p>
            <p className="text-white font-normal text-sm mt-1">Score: 7.85 CGPA</p>
          </div>
          <div className="pt-4 border-t border-white/5 flex flex-col items-center text-center w-full">
            <span className="text-[10px] font-mono text-white/50 block tracking-widest">// SENIOR SECONDARY EDUCATION</span>
            <p className="text-white font-normal text-sm mt-1">D.A.V Public School, Pokhariput, Bhubaneswar</p>
            <p className="text-white font-normal text-sm mt-1">Score: 80%</p>
            <p className="text-white/60 text-xs mt-1 max-w-md">Subjects Focused: Physics, Chemistry, Mathematics, Computer Science</p>
          </div>
        </div>
      )
    },
    {
      id: "futureHorizon",
      title: "Eager to Learn",
      matrix: "03",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs font-mono text-white pt-6 border-t border-white/10 w-full">

          {/* SYSTEMS AUTOMATION (Old Business & ED) - 7 COLUMNS */}
          <div className="sm:col-span-7 p-4 bg-zinc-950/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col justify-between min-h-24 group hover:border-white/20 transition-all duration-150">
            <div className="flex justify-between items-start w-full">
              <span className="text-[9px] text-white/30 tracking-[0.2em]">// BUSINESS_INTEGRATION</span>
              <span className="text-[9px] text-cyan-400/80 bg-cyan-400/5 px-1.5 py-0.5 rounded border border-cyan-400/10">SYSTEM_WORKFLOWS</span>
            </div>
            <div className="text-sm font-light text-white/90 tracking-wide mt-2">
              Enterprise Logic & Systems Automation
            </div>
          </div>

          {/* PERFORMANCE OPTIMIZATION (Old Valorant) - 5 COLUMNS */}
          <div className="sm:col-span-5 p-4 bg-zinc-950/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col justify-between min-h-24 group hover:border-white/20 transition-all duration-150">
            <div className="flex justify-between items-start w-full">
              <span className="text-[9px] text-white/30 tracking-[0.2em]">// CORE_ARCHITECTURE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)] mt-1" />
            </div>
            <div className="text-sm font-light text-white/90 tracking-wide mt-2">
              High-Performance Full-Stack Dev
            </div>
          </div>

          {/* CORE COMPUTE ENGINE (Old Knowledge) - 5 COLUMNS */}
          <div className="sm:col-span-5 p-4 bg-zinc-950/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col justify-between min-h-24 group hover:border-white/20 transition-all duration-150">
            <div className="flex justify-between items-start w-full">
              <span className="text-[9px] text-white/30 tracking-[0.2em]">// COMPUTE_ENGINE</span>
            </div>
            <div className="text-sm font-light text-white/90 tracking-wide mt-2">
              Deep Learning & Multimodal AI Matrices
            </div>
          </div>

          {/* ALGORITHMIC INFERENCE (Old Intelligence) - 7 COLUMNS */}
          <div className="sm:col-span-7 p-4 bg-zinc-950/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col justify-between min-h-24 group hover:border-white/20 transition-all duration-150">
            <div className="flex justify-between items-start w-full">
              <span className="text-[9px] text-white/30 tracking-[0.2em]">// INTELLIGENCE_ROUTING</span>
              <span className="text-[9px] text-white/40">COMPLEXITY_O(N)</span>
            </div>
            <div className="text-sm font-light text-white/90 tracking-wide mt-2">
              Data Structures & Heuristic Problem Solving
            </div>
          </div>

        </div>
      )
    },
    {
      id: "experience",
      title: "Certifications",
      matrix: "04",
      content: (
        <div className="space-y-6 text-xs font-light pt-6 border-t border-white/10 w-full flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <p className="text-white font-normal text-sm">Artificial Intelligence Builder</p>
            <p className="text-white/70 text-xs mt-1 block tracking-wide">// Issued by: Indian Institute of Technology, Delhi (FITT DELHI)</p>
            <p className="text-white/60 text-xs mt-2 max-w-xl leading-relaxed">
              Completed the course on Artificial Intelligence Builder conducted online by Foundation for Innovation and Technology Transfer under IIT-Delhi.
            </p>
            <p className="text-white/40 font-mono text-[10px] mt-2">Date: 12-December-2024</p>
          </div>

          <div className="pt-5 border-t border-white/5 flex flex-col items-center text-center w-full">
            <p className="text-white font-normal text-sm">Illuminate Entrepreneurship Bootcamp</p>
            <p className="text-white/60 text-xs mt-2 max-w-xl leading-relaxed">
              Successfully organized and managed the campus-wide Illuminate Entrepreneurship Bootcamp at Government College of Engineering, Keonjhar, in direct collaboration with E-Cell, IIT Bombay.
            </p>
            <p className="text-white/40 font-mono text-[10px] mt-2">Date: 20-October-2025</p>
          </div>

          <div className="pt-5 border-t border-white/5 flex flex-col items-center text-center w-full">
            <p className="text-white font-normal text-sm">National Entrepreneurship Challenge</p>
            <p className="text-white/60 text-xs mt-2 max-w-xl leading-relaxed">
              Competed in a rigorous, 6-month-long nationwide challenge organized by E-Cell, IIT Bombay to establish and build an active entrepreneurship ecosystem. Achieved a team Rank: 31.
            </p>
            <p className="text-white/40 font-mono text-[10px] mt-2">Date: 20-March-2026</p>
          </div>

          <div className="pt-5 border-t border-white/5 flex flex-col items-center text-center w-full">
            <p className="text-white font-normal text-sm">Coursera AI & Machine Learning Suite</p>
            <p className="text-white/60 text-xs mt-2 max-w-xl leading-relaxed">
              Completed specialized verification pathways including Supervised Machine Learning (Regression & Classification), Introduction to Big Data Systems, and Data Science in Python execution models.
            </p>
            <p className="text-white/40 font-mono text-[10px] mt-2">Timeline: Dec 2024 – Apr 2025</p>
          </div>

          <p className="text-emerald-400/70 font-mono text-[9px] mt-4 tracking-widest uppercase">
            // ALL CERTIFICATES CAN BE VIEWED IN THE CERTIFICATE VAULT
          </p>
        </div>
      )
    },
    {
      id: "credentials_vault",
      title: "Certificate Vault",
      matrix: "05",
      content: (
        <div className="space-y-4 text-xs font-light pt-6 border-t border-white/10 w-full text-center flex flex-col items-center">
          <div>
            <p className="text-white font-normal text-sm mt-1">GOOGLE DRIVE REPOSITORY</p>
          </div>
          <p className="text-white/60 leading-relaxed text-xs max-w-xl">
            Click on the link below to see all the certificates
          </p>
          <div className="pt-2">
            <a
              href="https://drive.google.com/drive/folders/1qIo5_o7V47hrC5FXo3sLIsxbIOAszhiY?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 font-mono text-[10px] tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all duration-150 group"
            >
              <span>VISIT NOW</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">↗</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setMouse(prev => ({ ...prev, active: false }));
        setHoveredIndex(null);
      }}
      className="relative w-full min-h-screen bg-[#000000] overflow-x-hidden flex flex-col justify-between select-none p-6 md:p-12 text-slate-100 font-sans"
    >
      {/* INTERACTIVE BACKGROUND CANVAS */}
      <motion.div
        animate={{ filter: (hoveredIndex !== null || expandedSection !== null) ? "blur(4px)" : "blur(0px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </motion.div>

      {/* HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto mb-12 flex justify-between items-center">
        <MotionLink
          href="/"
          className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-xs font-mono tracking-[0.25em] text-white/60 transition hover:text-white group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          RETURN // HOME
        </MotionLink>

        {/* TRANS-LIGHT FLOATING NAVIGATION BAR COUPLING TO WORK MATRIX ROUTE */}
        <nav className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-mono tracking-widest text-white/40">
          <span className="text-white/80">[01] ABOUT</span>
          <span className="text-white/20">/</span>
          <Link href="/project" className="hover:text-white transition-colors">
            [02] PROJECTS →
          </Link>
        </nav>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 flex-1 flex items-center w-full my-auto">
        <div className="w-full max-w-7xl mx-auto">
          {/* 2x2 DISPLAY MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {sections.map((sec, idx) => {
              const isExpanded = expandedSection === sec.id;

              return (
                <motion.div
                  key={sec.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isExpanded ? 1.01 : hoveredIndex === idx ? 1.015 : 1,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                  className={`flex flex-col rounded-2xl border bg-zinc-950/90 backdrop-blur-2xl overflow-hidden transition-all duration-150 ${isExpanded
                    ? "border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.15)] md:col-span-2 h-auto"
                    : "border-white/25 shadow-[0_0_25px_rgba(255,255,255,0.06),inset_0_0_20px_rgba(255,255,255,0.02)] hover:border-white/50 hover:shadow-[0_0_45px_rgba(255,255,255,0.14),inset_0_0_25px_rgba(255,255,255,0.04)] min-h-55"
                    }`}
                >
                  {/* TRIGGER HEADER AREA */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className={`flex items-center justify-center gap-4 px-7 text-center group w-full bg-transparent border-none outline-none cursor-pointer relative ${isExpanded ? "py-6" : "flex-1 min-h-55"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                      <span className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">
                        {sec.matrix}
                      </span>
                      <h3 className="text-lg font-light tracking-wide text-white/80 group-hover:text-white transition-colors duration-150">
                        {sec.title}
                      </h3>
                    </div>

                    <MotionSpan
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/40 group-hover:text-white/80 transition-colors duration-150 text-sm absolute right-7"
                    >
                      ↓
                    </MotionSpan>
                  </button>

                  {/* COLLAPSIBLE DATA SUB-DRAWER */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-7 pb-7 pt-6 bg-linear-to-b from-transparent to-white/5 flex flex-col items-center text-center">
                          <div className="w-full flex flex-col items-center text-center">
                            {sec.content}
                          </div>

                          <div className="mt-8 flex justify-center w-full">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(sec.id);
                              }}
                              className="rounded-md border border-white/10 px-3 py-2 text-[10px] font-mono tracking-widest text-white/50 hover:border-white/30 hover:text-white transition-all duration-150 bg-white/5"
                            >
                              COLLAPSE
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER METRICS SYSTEM BAR */}
      <footer className="w-full mt-12 pt-4 border-t border-white/5 flex justify-between font-mono text-[10px] text-white/30 tracking-[0.2em] z-10 self-end">
        {/* <span>CORE_METRIC // ABOUT_SPACE</span> */}
        <span className="hidden sm:block">
          {/* {mouse.active ? ` ${Math.round(mouse.x)} Y: ${Math.round(mouse.y)}` : ""} */}
        </span>
      </footer>
    </div>
  );
}
