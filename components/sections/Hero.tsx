"use client";
import { PersonalInfo } from "@/types";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, FileDown } from "lucide-react";
import { IconsRowHero } from "../iconsRowHero/iconsRowHero";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero({ personalInfo }: { personalInfo: PersonalInfo }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center px-6"
    >
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4"
      >
        <motion.h1
          variants={heroItemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-slate-100"
        >
          {personalInfo.name}
        </motion.h1>
        <motion.p
          variants={heroItemVariants}
          className="text-xl md:text-2xl text-sky-500 dark:text-sky-400 font-medium"
        >
          {personalInfo.title}
        </motion.p>
        <motion.p
          variants={heroItemVariants}
          className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-2"
        >
          {personalInfo.tagline}
        </motion.p>
        <motion.div variants={heroItemVariants} className="flex gap-4 mt-6">
          <IconsRowHero href={personalInfo.github}>
            <Github size={24} />
          </IconsRowHero>
          <IconsRowHero href={personalInfo.linkedin}>
            <Linkedin size={24} />
          </IconsRowHero>
          <IconsRowHero href={personalInfo.instagram}>
            <Instagram size={24} />
          </IconsRowHero>
          <IconsRowHero href={`mailto:${personalInfo.email}`}>
            <Mail size={24} />
          </IconsRowHero>
          <IconsRowHero href={personalInfo.curriculumLink}>
            <FileDown size={24} />
          </IconsRowHero>
        </motion.div>
      </motion.div>
    </section>
  );
}
