"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const targetScrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const smoothScroll = () => {
    if (!scrollRef.current) return;
    const current = scrollRef.current.scrollLeft;
    const target = targetScrollLeft.current;
    const diff = target - current;
    const speed = 0.12; // Easing coefficient (12% of remaining distance per frame)

    if (Math.abs(diff) > 0.5) {
      scrollRef.current.scrollLeft = current + diff * speed;
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    } else {
      scrollRef.current.scrollLeft = target;
      animationFrameId.current = null;
      setIsMouseDown(false); // Re-enable snapping only after smooth glide finishes
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
      setIsMouseDown(true); // Disable snapping during manual scroll to prevent fighting scroll behavior
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
      
      // Re-enable snapping after smooth scroll completes (approx. 400ms)
      setTimeout(() => {
        setIsMouseDown(false);
      }, 400);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    setIsMouseDown(true); // Disable snap
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

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-slate-900 overflow-hidden w-full transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 mb-4 select-none">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Portfólio
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight select-none">
              Projetos em Destaque
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-3 select-none">
              Soluções digitais autorais e profissionais que aliam engenharia de software de ponta, design responsivo e excelente experiência de uso.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 self-start md:self-auto select-none">
            <button
              onClick={() => scroll("left")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Projetos anteriores"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Próximos projetos"
            >
              <ChevronRight size={20} />
            </button>
          </div>
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
              viewport={{ once: true, margin: "-50px" }}
              className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[32vw] snap-start bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800/80 group shadow-md hover:shadow-2xl hover:shadow-sky-500/5 dark:hover:shadow-sky-500/2 hover:border-sky-500/20 dark:hover:border-sky-500/10 transition-all duration-500 select-none"
            >
              {/* Project Image Panel */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 select-none pointer-events-none"
                />
                
                {/* Floating Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-slate-955/70 dark:bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all shadow-lg flex items-center gap-2 text-xs font-bold select-none"
                    >
                      <Github size={18} className="pointer-events-none select-none" /> Código
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="p-3.5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl transition-all shadow-lg shadow-sky-500/30 flex items-center gap-2 text-xs font-bold select-none"
                    >
                      <ExternalLink size={18} className="pointer-events-none select-none" /> Demo Live
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-8 flex flex-col justify-between h-[300px] select-none">
                <div>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4 select-none">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/10 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md select-none">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors tracking-tight line-clamp-1 select-none">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-4 font-light leading-relaxed select-none">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Footer Actions */}
                <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between mt-4 select-none">
                  <a
                    href={project.liveUrl || project.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 text-xs font-black text-slate-900 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors group/link cursor-pointer select-none"
                  >
                    Ver Detalhes
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1 text-sky-500 pointer-events-none select-none"
                    />
                  </a>

                  {/* Tiny Interactive Indicator */}
                  <div className="flex items-center gap-1.5 select-none">
                    <Compass size={14} className="text-slate-300 dark:text-slate-700 animate-spin-slow group-hover:text-sky-500/50 transition-colors pointer-events-none select-none" />
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest select-none">
                      Interactive
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
