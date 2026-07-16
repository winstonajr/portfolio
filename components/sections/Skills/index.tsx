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
  const getIcon = (iconName: string, size = 18) => {
    const LucideIcon = (LucideIcons as any)[iconName];
    const SimpleIcon = (SimpleIcons as any)[iconName];
    const TablerIcon = (TablerIcons as any)[iconName];

    const Icon = LucideIcon || SimpleIcon || TablerIcon || LucideIcons.Code2;
    return <Icon size={size} />;
  };

  // Cores personalizadas para dar identidade a cada categoria
  const categoryStyles = [
    {
      borderHover: "hover:border-sky-500/30 dark:hover:border-sky-500/20",
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      glowBg: "from-sky-500/5 to-transparent",
    },
    {
      borderHover: "hover:border-indigo-500/30 dark:hover:border-indigo-500/20",
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
      glowBg: "from-indigo-500/5 to-transparent",
    },
    {
      borderHover: "hover:border-pink-500/30 dark:hover:border-pink-500/20",
      iconBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
      glowBg: "from-pink-500/5 to-transparent",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-slate-50 dark:bg-slate-950/80 transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Minhas Habilidades
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Stack Tecnológica
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-4 max-w-2xl mx-auto">
            Ferramentas, linguagens e metodologias que domino para construir soluções digitais inteligentes, reativas e de alta performance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.categories.map((category, idx) => {
            const style = categoryStyles[idx % categoryStyles.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-md shadow-slate-900/5 hover:shadow-xl transition-all duration-350 overflow-hidden group ${style.borderHover}`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${style.iconBg} shadow-inner`}>
                    {getIcon(category.icon, 20)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800/60 hover:border-sky-500/20 dark:hover:border-sky-500/10 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-500/5 transition-all duration-200 cursor-default group/item"
                    >
                      <span className="text-slate-400 group-hover/item:text-sky-500 dark:group-hover/item:text-sky-400 transition-colors">
                        {getIcon(skill.icon, 16)}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
