"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillsData } from "@/types";
import * as LucideIcons from "lucide-react";
import * as SimpleIcons from "react-icons/si";
import * as TablerIcons from "react-icons/tb";

interface SkillsProps {
  skills: SkillsData;
}

export default function Skills({ skills }: SkillsProps) {
  const getIcon = (iconName: string) => {
    // Procura nos diferentes conjuntos de ícones
    const LucideIcon = (LucideIcons as any)[iconName];
    const SimpleIcon = (SimpleIcons as any)[iconName];
    const TablerIcon = (TablerIcons as any)[iconName];
    
    const Icon = LucideIcon || SimpleIcon || TablerIcon || LucideIcons.Code2;
    return <Icon size={24} />;
  };

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">
            Stack Tecnológica
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Ferramentas e tecnologias que utilizo para transformar ideias em realidade digital de alta performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-sky-500/10 text-sky-500 rounded-2xl">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-sky-500/50 hover:text-sky-500 transition-all cursor-default group"
                  >
                    <span className="text-slate-400 group-hover:text-sky-500 transition-colors">
                      {getIcon(skill.icon)}
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
