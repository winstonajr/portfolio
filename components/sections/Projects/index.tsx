"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Layers, Smartphone, Globe } from "lucide-react";
import { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

type CategoryType = "all" | "systems" | "web";

export default function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  
  const targetScrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const isSystemProject = (project: Project) => {
    return project.technologies.some((tech) =>
      ["Kotlin", "Android", "Go", "Electron", "Flutter", "Room", "SQLCipher", "Ed25519"].includes(tech)
    );
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "systems") return isSystemProject(project);
    if (activeCategory === "web") return !isSystemProject(project);
    return true;
  });

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    if (scrollRef.current) {
      targetScrollLeft.current = 0;
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const smoothScroll = () => {
    if (!scrollRef.current) return;
    const current = scrollRef.current.scrollLeft;
    const target = targetScrollLeft.current;
    const diff = target - current;
    const speed = 0.12;

    if (Math.abs(diff) > 0.5) {
      scrollRef.current.scrollLeft = current + diff * speed;
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    } else {
      scrollRef.current.scrollLeft = target;
      animationFrameId.current = null;
      setIsMouseDown(false);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft: currentScroll, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? currentScroll - clientWidth * 0.75 : currentScroll + clientWidth * 0.75;
      
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const target = Math.max(0, Math.min(maxScroll, scrollTo));
      
      targetScrollLeft.current = target;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      setIsMouseDown(true);
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
      
      setTimeout(() => {
        setIsMouseDown(false);
      }, 400);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    setIsMouseDown(true);
    setIsDragging(false);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    targetScrollLeft.current = scrollRef.current.scrollLeft;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (!animationFrameId.current) {
      setIsMouseDown(false);
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (!animationFrameId.current) {
      setIsMouseDown(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(x - startX.current) > 5) {
      setIsDragging(true);
    }
    
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    targetScrollLeft.current = Math.max(0, Math.min(maxScroll, scrollLeft.current - walk));
    
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const getArchitectureBadge = (project: Project) => {
    if (project.name.includes("Finlo")) {
      return { label: "Offline-First Sync • Android Nativo", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (project.name.includes("Koryvi")) {
      return { label: "ERP Desktop & PDV • Go & Ed25519", color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" };
    }
    if (project.name.includes("DashDrop")) {
      return { label: "Self-Hosted LAN • Go & sqlc", color: "text-sky-500 bg-sky-500/10 border-sky-500/20" };
    }
    if (project.name.includes("Órbita")) {
      return { label: "Hardware Protocol • Android TV v2", color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" };
    }
    if (project.name.includes("FinanTrack")) {
      return { label: "Full Stack • REST API & JWT", color: "text-sky-500 bg-sky-500/10 border-sky-500/20" };
    }
    return { label: "Web Platform & Jamstack", color: "text-slate-500 bg-slate-500/10 border-slate-500/20" };
  };

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-slate-900 overflow-hidden w-full transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 mb-4 select-none">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Engenharia de Software
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight select-none">
              Projetos em Destaque
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-3 select-none">
              Sistemas distribuídos, aplicações mobile Offline-First e plataformas completas com foco em resiliência, arquitetura limpa e alta performance.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 self-start md:self-auto select-none">
            <button
              onClick={() => scroll("left")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Projetos anteriores"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Próximos projetos"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Linear Style) */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-wrap gap-2 select-none">
          {[
            { id: "all", label: "Todos os Projetos", icon: <Layers size={14} />, count: projects.length },
            {
              id: "systems",
              label: "Sistemas & Mobile Nativo",
              icon: <Smartphone size={14} />,
              count: projects.filter(isSystemProject).length,
            },
            {
              id: "web",
              label: "Web Full Stack & APIs",
              icon: <Globe size={14} />,
              count: projects.filter((p) => !isSystemProject(p)).length,
            },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id as CategoryType)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-950/10"
                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal scroll grid */}
        <div
          ref={scrollRef}
          className={`flex gap-6 md:gap-8 overflow-x-auto scrollbar-none pb-12 -mx-6 px-6 cursor-grab active:cursor-grabbing select-none ${
            isMouseDown ? "" : "snap-x snap-mandatory"
          }`}
          style={{ scrollbarWidth: "none" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const badge = getArchitectureBadge(project);

              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3) }}
                  className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[32vw] snap-start bg-slate-50 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 group shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-white/[0.02] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 select-none flex flex-col justify-between"
                >
                  {/* Top Image Panel */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      draggable={false}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                    />

                    {/* Architecture Tag on Image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-lg border backdrop-blur-md shadow-sm ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all shadow-lg flex items-center gap-2 text-xs font-bold"
                        >
                          <Github size={16} /> Código
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl transition-all shadow-lg shadow-sky-500/30 flex items-center gap-2 text-xs font-bold"
                        >
                          <ExternalLink size={16} /> Demo
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Content Panel */}
                  <div className="p-7 flex flex-col justify-between flex-1">
                    <div>
                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors tracking-tight line-clamp-1">
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-4 font-light leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Pills (Linear High-Density Style) */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mb-4">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100/50 dark:bg-slate-900/50 px-2 py-1 rounded-md border border-slate-200/50 dark:border-slate-800/50">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Direct Action Links (Accessible on Mobile & Desktop) */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 font-semibold transition-colors"
                          >
                            <Github size={14} />
                            Repositório
                          </a>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600 text-[11px]">Código Privado</span>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
