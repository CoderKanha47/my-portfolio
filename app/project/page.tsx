"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

interface Project {
  id: string;
  title: string;
  tagline: string;
  status: "PRODUCTION" | "ACTIVE" | "ARCHIVED";
  tech: string[];
  metrics: { label: string; value: string }[];
  description: string;
  features: string[];
  videoUrl?: string; 
  links: { label: string; url: string }[];
}

export default function ProjectsMatrix() {
  const projects: Project[] = [
    {
      id: "sector-guard",
      title: "Sector Guard",
      tagline: "AI-Powered Expense Reimbursement Auditing Platform",
      status: "ACTIVE",
      tech: ["Next.js", "TypeScript", "Groq API", "Prisma", "Neon (Postgres)", "TailwindCSS"],
      metrics: [
        { label: "AUDIT LAYER", value: "Rule-Based Fraud Core" },
        { label: "INFERENCE ENGINE", value: "GROQ - Qwen 3.6 27B" },
      ],
      description: "Designed a comprehensive platform for expense auditing, where employees upload receipts, a hosted LLM does the extraction of structured data, and the fraud detection engine determines whether policies were violated before payment is made.",
      features: [
        "Vision LLM extracts structured receipt data, persisted via Prisma into Postgres, then run through fraudCore.ts for tier-limit checks, split-receipt detection within a 3hr same-merchant window, and temporal conflict analysis.",
        "Every expense receives a risk score and an APPROVED / FLAGGED / DENIED status, with employee trust ratings auto-adjusted based on audit history.",
        "Employee CRUD with cascade delete, locked MonthlyPayout records broken down by category (TRAVEL / FOOD / STAY / OTHER), and an AuditReasonModal for reviewing and reopening flagged decisions.",
        "Scope of the audit trail: No auth layer, cascade delete over audit trail preservation, and rule-based (not ML) fraud detection — specifically chosen for explainability in an auditing context.",
      ],
      
      videoUrl: "https://drive.google.com/file/d/1Pbul_tVUaozk6Cb10z0YaRcZJOy0dHi2/preview",
      links: [
        { label: "REPOSITORY_SRC", url: "https://github.com/CoderKanha47/sector-guard" },
        { label: "WORKING_LINK", url: "https://sector-guard.vercel.app/" }
      ]
    },
    {
      id: "silent-cartographer",
      title: "The Silent Cartographer",
      tagline: "Autonomous AI Logistics Auditing & Document Verification Engine",
      status: "ACTIVE",
      tech: ["Next.js", "Groq API", "Supabase", "LlamaVision", "TailwindCSS"],
      metrics: [
        { label: "AUDIT LAYER", value: "Visual Structural Parsing" },
        { label: "INFERENCE ENGINE", value: "GROQ - llama-3.3-70b-versatile" },
      ],
      description: "Designed a high-throughput document verification matrix for auditing international supply chain documentation and detecting compliance anomalies. Swapped vector-segmentation models for remote cloud LPUs to read layout geometry in real time.",
      features: [
        "Developed a multi-modal pipeline using Groq cloud inference for secure parsing and auditing of Bills of Lading, custom manifests and business invoices.",
        "Developed robust cross-referencing engines for automatic detection of data mismatches and compliance issues within distinct documentation paths.",
        "Created a glassmorphic interface to represent logistics data trees in a visual form.",
      ],
      
      videoUrl: "https://drive.google.com/file/d/1Rtab7_L69nrHyldszQFVoiFYHdfW6X62/preview", 
      links: [
        { label: "REPOSITORY_SRC", url: "https://github.com/CoderKanha47/silent-cartographer" },
        { label: "WORKING_LINK", url: "https://silent-cartographer-79t7j7989-coderkanha47s-projects.vercel.app/dashboard" }
      ]
    }
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"TELEMETRY" | "VIDEO">("TELEMETRY");

  return (
    <div className="relative w-full min-h-screen bg-[#000000] select-none p-6 md:p-12 text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans">

      {/* GLOW BACKGROUND ORNAMENTATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-100 h-100 bg-white/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[30%] right-[15%] w-125 h-125 bg-white/2 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col">
        {/* HEADER NAVIGATION */}
        <header className="w-full mb-16 flex justify-between items-center">
          <MotionLink
            href="/"
            className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-xs font-mono tracking-[0.25em] text-white/60 transition hover:text-white group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            RETURN // HOME
          </MotionLink>

          <nav className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-mono tracking-widest text-white/40">
            <Link href="/about" className="hover:text-white transition-colors">
              [01] ABOUT
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">[02] PROJECTS →</span>
          </nav>
        </header>

        {/* SECTION TITLE */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-mono tracking-[0.4em] text-white/40 block mb-2">// PRODUCTION_INDEX</span>
          <h1 className="text-3xl font-extralight tracking-wider text-white">MY PROJECTS</h1>
        </div>

        {/* 2-COLUMN DESIGN HORIZON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 mb-12">

          {/* LEFT: GRID CARD LIST */}
          <div className="lg:col-span-6 space-y-4">
            {projects.map((project, idx) => {
              const isSelected = selectedProject?.id === project.id;

              return (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveConsoleTab("TELEMETRY");
                  }}
                  animate={{
                    scale: isSelected ? 1.01 : hoveredIdx === idx ? 1.015 : 1,
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`group p-6 rounded-2xl border text-left cursor-pointer transition-all duration-200 relative bg-zinc-950/80 backdrop-blur-xl flex flex-col justify-between min-h-35 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
                    isSelected ? "border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-light tracking-wide text-white/90 group-hover:text-white">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/50 font-light mt-1 max-w-md line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.status === "ACTIVE" ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"}`} />
                      <span className="font-mono text-[9px] tracking-widest text-white/40">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="rounded border border-white/5 bg-white/2 px-2 py-0.5 font-mono text-[9px] text-white/40 group-hover:text-white/60 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="absolute right-6 bottom-5 text-white/20 group-hover:text-white/60 transition-colors text-sm font-light">
                    →
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: INTERACTIVE SLIDING TELEMETRY / VIDEO CONSOLE */}
          <div className="lg:col-span-6 h-full lg:sticky lg:top-12">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl border border-white/20 bg-zinc-950/90 backdrop-blur-2xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center flex flex-col items-center min-h-125 justify-between relative overflow-hidden"
                >
                  {/* MONITOR CONTROLS & HEADER */}
                  <div className="w-full border-b border-white/10 pb-4 mb-4 flex justify-between items-center">
                    <div className="text-left">
                      <h2 className="text-xl font-light tracking-wide text-white">{selectedProject.title}</h2>
                      <p className="text-[10px] text-white/40 font-mono tracking-wider">{selectedProject.tagline}</p>
                    </div>

                    {/* CONSOLE VIEW TOGGLE SWITCHES */}
                    <div className="flex items-center bg-black/50 border border-white/10 rounded-lg p-1 font-mono text-[9px]">
                      <button 
                        onClick={() => setActiveConsoleTab("TELEMETRY")}
                        className={`px-2 py-1 rounded transition-colors ${activeConsoleTab === "TELEMETRY" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                      >
                        INFO
                      </button>
                      <button 
                        onClick={() => setActiveConsoleTab("VIDEO")}
                        className={`px-2 py-1 rounded transition-colors ${activeConsoleTab === "VIDEO" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                      >
                        DEMO VIDEO
                      </button>
                    </div>
                  </div>

                  {/* SLIDING SCREEN CONTROLLER */}
                  <div className="w-full flex-1 flex flex-col justify-center relative overflow-hidden min-h-64">
                    <AnimatePresence mode="wait">
                      {activeConsoleTab === "TELEMETRY" ? (
                        <motion.div
                          key="telemetry_view"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="w-full flex flex-col gap-4"
                        >
                          {/* METRICS */}
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {selectedProject.metrics.map((m, i) => (
                              <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex flex-col items-center justify-center">
                                <span className="text-[9px] font-mono text-white/30 tracking-wider mb-1 uppercase">// {m.label}</span>
                                <span className="text-xs text-white/80 font-light text-center">{m.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* CORE DESCRIPTION */}
                          <div className="w-full text-left bg-white/1 border border-white/5 rounded-xl p-4">
                            <p className="text-xs text-white/70 font-light leading-relaxed mb-3">
                              {selectedProject.description}
                            </p>
                            <ul className="space-y-2 border-t border-white/5 pt-3">
                              {selectedProject.features.map((feat, idx) => (
                                <li key={idx} className="text-[11px] text-white/50 font-light flex items-start gap-2">
                                  <span className="text-emerald-500/60 font-mono mt-0.5">▪</span>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="video_view"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="w-full h-full min-h-64 rounded-xl border border-white/10 bg-black/60 overflow-hidden relative flex items-center justify-center aspect-video shadow-inner"
                        >
                          {selectedProject.videoUrl ? (
                            <iframe
                              src={selectedProject.videoUrl}
                              className="w-full h-full"
                              allow="autoplay"
                              allowFullScreen
                            />
                          ) : (
                            <div className="text-center p-6 space-y-2">
                              <span className="text-[10px] font-mono text-amber-400/60 tracking-widest block animate-pulse">
                                // LINK_EMPTY_OR_DISCONNECTED
                              </span>
                              <p className="text-xs text-white/30 max-w-64 mx-auto font-light">
                                Connect your hosted mp4 vector stream in your file configuration matrix to initialize remote stream.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* OPERATIONAL REDIRECT FOOTER ACTIONS */}
                  <div className="w-full flex gap-3 justify-center pt-5 mt-4 border-t border-white/10 z-20 relative">
                    {selectedProject.links.map((link, idx) => {
                      const isWorkingApp = link.label.toUpperCase().includes("WORKING") || link.label.toUpperCase().includes("LAUNCH");
                      return (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Prevents event capture bubbling
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] tracking-widest transition-all duration-150 group z-30 ${
                            isWorkingApp
                              ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                              : "border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30"
                          }`}
                        >
                          <span>{link.label}</span>
                          <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">↗</span>
                        </a>
                      );
                    })}
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-white/10. bg-zinc-950/40 backdrop-blur-md p-8 text-center flex flex-col items-center justify-center min-h-125 border-dashed border-white/10"
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 animate-pulse mb-2">// SYSTEM_IDLE</span>
                  <p className="text-xs font-mono text-white/40 tracking-wide max-w-50">
                    SELECT A PROJECT NODE TO INITIALIZE MONITOR TELEMETRY
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* SYSTEM META STATUS */}
      <footer className="relative w-full mt-auto pt-4 border-t border-white/5 flex justify-between font-mono text-[10px] text-white/30 tracking-[0.2em] z-10">
        <span>CORE_METRIC // PROJECT_VAULT</span>
        <span className="hidden sm:block">
          {selectedProject ? `SYSTEM_STATUS // VIEW: ${activeConsoleTab} // COMPILING: ${selectedProject.id.toUpperCase()}` : "SYSTEM_STATUS // COMPILING"}
        </span>
      </footer>
    </div>
  );
}
