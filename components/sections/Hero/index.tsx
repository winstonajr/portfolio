"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Download } from "lucide-react";
import { PersonalInfo } from "@/types";

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-6 pt-20 md:pt-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[40%] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 w-full max-w-5xl"
      >
        <span className="inline-block px-3 py-1 mb-6 text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full">
          Disponível para novas oportunidades
        </span>

        <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-slate-100 mb-6 leading-[1.1] md:leading-none">
          <span className="inline-block mr-2 md:mr-4">Winston</span>
          <span className="inline-block whitespace-nowrap">Almeida Jr.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-xl md:text-3xl text-slate-600 dark:text-slate-400 mb-10 font-light leading-relaxed px-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {personalInfo.title.split(" • ").map((tech, i, arr) => (
            <React.Fragment key={i}>
              <span className="whitespace-nowrap">{tech}</span>
              {i < arr.length - 1 && (
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5"
          >
            Ver Projetos
          </a>

          <a
            href={personalInfo.curriculumLink}
            download
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Baixar CV <Download size={20} />
          </a>

          <div className="flex gap-3 mt-4 sm:mt-0">
            {[
              { icon: <Github size={20} />, href: personalInfo.github },
              { icon: <Linkedin size={20} />, href: personalInfo.linkedin },
              {
                icon: <Mail size={20} />,
                href: `mailto:${personalInfo.email}`,
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-500 transition-all shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 lg:bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="animate-bounce" size={18} />
      </motion.div>
    </section>
  );
}
