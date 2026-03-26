"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-white dark:bg-slate-900 overflow-hidden w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">
              Projetos em Destaque
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Soluções digitais que unem performance, estética e usabilidade para resultados reais.
            </p>
          </div>
          
          <div className="flex gap-4 self-start md:self-auto">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500 outline-none"
              aria-label="Projetos anteriores"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500 outline-none"
              aria-label="Próximos projetos"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 -mx-6 px-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[88vw] sm:min-w-[65vw] md:min-w-[45vw] lg:min-w-[32vw] snap-start bg-slate-50 dark:bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20 hover:scale-110 active:scale-90"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-sky-500 rounded-2xl text-white hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/30 hover:scale-110 active:scale-90"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1.5 rounded-lg border border-sky-500/5">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-sky-500 transition-colors tracking-tight">
                  {project.name}
                </h3>
                
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 line-clamp-3 font-light leading-relaxed mb-8 h-[4.5rem]">
                  {project.description}
                </p>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={project.liveUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-sky-500 transition-colors group/link"
                  >
                    Ver Detalhes
                    <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                  
                  <div className="flex gap-2 opacity-60">
                    {/* Indicador visual simples para mobile */}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
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
