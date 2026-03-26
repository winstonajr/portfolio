"use client";

import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import { Briefcase, GraduationCap, Heart } from "lucide-react";

interface JourneyProps {
  experiences: Experience[];
}

export default function Journey({ experiences }: JourneyProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "work": return <Briefcase size={20} />;
      case "education": return <GraduationCap size={20} />;
      case "volunteer": return <Heart size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <section id="journey" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">
            Minha Jornada
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Uma trajetória focada no aprendizado contínuo, impacto social e excelência técnica.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full md:w-auto pl-16 md:pl-0">
                  <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500/30 transition-all">
                    <span className="text-sm font-bold text-sky-500 uppercase tracking-wider mb-2 block">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {exp.company}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Dot/Icon */}
                <div className="absolute left-8 md:static md:-mx-4 z-10">
                  <div className="p-3 bg-sky-500 text-white rounded-2xl shadow-lg shadow-sky-500/40">
                    {getIcon(exp.type)}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
