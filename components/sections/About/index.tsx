"use client";

import React from "react";
import { motion } from "framer-motion";
import { PersonalInfo } from "@/types";
import { Briefcase, FolderGit2, GraduationCap, MapPin } from "lucide-react";

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  const stats = [
    {
      label: "Experiência",
      value: "Estágio Ativo",
      detail: "Prefeitura de São Luís (Full Stack)",
      icon: <Briefcase size={20} className="text-sky-500" />,
    },
    {
      label: "Projetos",
      value: "+10 Concluídos",
      detail: "Institucionais, Freelance & RAG",
      icon: <FolderGit2 size={20} className="text-indigo-500" />,
    },
    {
      label: "Formação",
      value: "ADS em Curso",
      detail: "Faculdade Facint & UFMA",
      icon: <GraduationCap size={20} className="text-pink-500" />,
    },
    {
      label: "Localização",
      value: "São Luís, MA",
      detail: "Disponível Híbrido/Presencial/Remoto",
      icon: <MapPin size={20} className="text-emerald-500" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950/80 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Tagline Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Sobre Mim
            </div>

            {/* Big Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl">
              Unindo lógica de software impecável com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
                designs centrados no ser humano.
              </span>
            </h2>

            {/* Body & Stats Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
              
              {/* Text Paragraphs */}
              <div className="lg:col-span-7 space-y-6">
                {personalInfo.about.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bento Stats Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-md shadow-slate-900/5 hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-sky-500 dark:text-sky-400 uppercase tracking-widest">
                        {stat.label}
                      </p>
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                        {stat.icon}
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                        {stat.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
