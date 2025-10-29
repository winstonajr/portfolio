"use client";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiMysql,
  SiGit,
  SiGithub,
  SiExpress,
  SiSanity,
  SiVercel,
  SiFramer,
  SiPrisma,
  SiAxios,
  SiRender,
  SiJsonwebtokens,
  SiPostman,
} from "react-icons/si";
import { Code, AppWindow, Database } from "lucide-react";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import { Skill, SkillCategory, SkillsData } from "@/types";

// Mapeamento de strings para componentes de ícones
const iconMap: { [key: string]: React.ReactNode } = {
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiReact: <SiReact />,
  SiVuedotjs: <SiVuedotjs />,
  SiNextdotjs: <SiNextdotjs />,
  SiNodedotjs: <SiNodedotjs />,
  SiTailwindcss: <SiTailwindcss />,
  SiPostgresql: <SiPostgresql />,
  SiMongodb: <SiMongodb />,
  SiSupabase: <SiSupabase />,
  SiMysql: <SiMysql />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiExpress: <SiExpress />,
  SiSanity: <SiSanity />,
  SiVercel: <SiVercel />,
  SiFramer: <SiFramer />,
  SiPrisma: <SiPrisma />,
  SiAxios: <SiAxios />,
  SiRender: <SiRender />,
  SiJsonwebtokens: <SiJsonwebtokens />,
  SiPostman: <SiPostman />,
  Code: <Code size={24} className="text-sky-500" />,
  AppWindow: <AppWindow size={24} className="text-sky-500" />,
  Database: <Database size={24} className="text-sky-500" />,
};

export default function Skills({ skills }: { skills: SkillsData }) {
  return (
    <Section id="skills">
      <SectionTitle>Skills & Tecnologias</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.categories.map((category: SkillCategory) => (
          <div key={category.title}>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-200">
              {iconMap[category.icon]} {category.title}
            </h3>
            <ul className="flex flex-wrap gap-4">
              {category.items.map((skill: Skill, idx: number) => (
                <motion.li
                  key={idx}
                  className="flex flex-col items-center gap-2 text-center w-20 p-2 rounded-lg transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <div className="text-4xl text-slate-700 dark:text-slate-300">
                    {iconMap[skill.icon]}
                  </div>
                  <span className="text-xs font-medium">{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
