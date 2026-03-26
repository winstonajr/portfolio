"use client";

import React from "react";
import { motion } from "framer-motion";
import { PersonalInfo } from "@/types";

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Sobre Mim
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-tight">
              Unindo lógica impecável com <span className="text-sky-500">design centrado no humano.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6">
                {personalInfo.about.map((paragraph, i) => (
                  <p key={i} className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Experiência", value: "Estágio Ativo" },
                  { label: "Projetos", value: "+10 Concluídos" },
                  { label: "Formação", value: "ADS em curso" },
                  { label: "Localização", value: "São Luís, MA" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
