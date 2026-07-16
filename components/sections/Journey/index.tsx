"use client";

import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import { Briefcase, GraduationCap, Heart, Calendar } from "lucide-react";

interface JourneyProps {
  experiences: Experience[];
}

export default function Journey({ experiences }: JourneyProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase size={18} />;
      case "education":
        return <GraduationCap size={18} />;
      case "volunteer":
        return <Heart size={18} />;
      default:
        return <Briefcase size={18} />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "work":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "education":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      case "volunteer":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Estágio / Carreira";
      case "education":
        return "Educação";
      case "volunteer":
        return "Voluntariado";
      default:
        return "Experiência";
    }
  };

  return (
    <section
      id="journey"
      className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Trajetória
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Minha Jornada
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-4 max-w-2xl mx-auto">
            Uma linha do tempo detalhada que destaca meus estágios ativos, contribuições voluntárias e formação acadêmica sólida.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card Container */}
                  <div className="flex-1 w-full pl-16 md:pl-0">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm hover:shadow-lg hover:border-sky-500/20 dark:hover:border-sky-500/10 transition-all duration-300 relative group"
                    >
                      {/* Period Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-sky-500 dark:text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2.5 py-1 rounded-md">
                          <Calendar size={12} /> {exp.period}
                        </span>
                        
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md border ${getBadgeStyle(
                            exp.type
                          )}`}
                        >
                          {getLabel(exp.type)}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-sky-500 transition-colors tracking-tight">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Dot / Icon */}
                  <div className="absolute left-8 md:static md:-mx-4 z-10 -translate-x-1/2 md:translate-x-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`p-3 text-white rounded-2xl shadow-lg transition-transform ${
                        exp.type === "work"
                          ? "bg-sky-500 shadow-sky-500/20"
                          : exp.type === "education"
                          ? "bg-pink-500 shadow-pink-500/20"
                          : "bg-emerald-500 shadow-emerald-500/20"
                      }`}
                    >
                      {getIcon(exp.type)}
                    </motion.div>
                  </div>

                  {/* Spacer to hold the layout balance on desktop */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
