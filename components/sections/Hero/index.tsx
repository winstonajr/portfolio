"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Download, Sparkles, Terminal, Cpu } from "lucide-react";
import { PersonalInfo } from "@/types";

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  // Configuração de animações do Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const floatAnimation = (delay: number) => ({
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay: delay,
    },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Background Tech Grid & Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)]" />
        
        {/* Glowing meshes */}
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
        <div className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
        
        {/* Left Column: Text & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="w-fit mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Disponível para novas oportunidades
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6"
          >
            Olá, eu sou o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
              Winston Almeida
            </span>
          </motion.h1>

          {/* Subtitle / Tech Tags */}
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap gap-2">
            {["Next.js", "Node.js", "Flutter", "RAG & IA", "TypeScript"].map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 text-xs font-bold rounded-lg shadow-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-650 dark:text-slate-400 font-light leading-relaxed max-w-xl mb-10"
          >
            {personalInfo.tagline} Especialista em desenvolver interfaces elegantes com <span className="font-semibold text-slate-800 dark:text-slate-200">Next.js</span>, aplicativos mobile <span className="font-semibold text-slate-800 dark:text-slate-200">offline-first</span> e integrações inteligentes com IA.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-center font-bold rounded-2xl hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-slate-950/10 dark:shadow-white/5 cursor-pointer"
            >
              Ver Projetos
            </a>

            <a
              href={personalInfo.curriculumLink}
              download
              className="px-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-center font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
            >
              Download CV <Download size={18} />
            </a>

            {/* Social Icons Group */}
            <div className="flex justify-center gap-3 mt-2 sm:mt-0">
              {[
                { icon: <Github size={20} />, href: personalInfo.github, label: "GitHub" },
                { icon: <Linkedin size={20} />, href: personalInfo.linkedin, label: "LinkedIn" },
                {
                  icon: <Mail size={20} />,
                  href: `mailto:${personalInfo.email}`,
                  label: "E-mail",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-500 dark:hover:text-sky-400 hover:scale-110 active:scale-90 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Profile Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 flex justify-center items-center relative py-8 lg:py-0"
        >
          {/* Main Photo Card with Glow */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2.5rem] overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-3 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md group">
            <div
              className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-205 dark:bg-slate-955"
              onDragStart={(e) => e.preventDefault()}
            >
              <Image
                src="/me.webp"
                alt="Winston Almeida Jr."
                width={400}
                height={400}
                priority
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-955/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Glowing borders inside card */}
            <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-sky-500/30 transition-colors duration-550 pointer-events-none" />
          </div>

          {/* Orbiting Floating Cards */}
          
          {/* Card 1: Next.js */}
          <motion.div
            animate={floatAnimation(0)}
            className="absolute top-2 -left-4 sm:-left-8 p-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 z-20 cursor-default select-none"
          >
            <div className="p-2 bg-sky-500/10 text-sky-500 rounded-xl">
              <Terminal size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Frontend</p>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Next.js Expert</h4>
            </div>
          </motion.div>

          {/* Card 2: Flutter */}
          <motion.div
            animate={floatAnimation(1.5)}
            className="absolute bottom-8 -right-4 sm:-right-8 p-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 z-20 cursor-default select-none"
          >
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Cpu size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mobile</p>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Flutter Dev</h4>
            </div>
          </motion.div>

          {/* Card 3: RAG & IA */}
          <motion.div
            animate={floatAnimation(3)}
            className="absolute -bottom-4 left-6 sm:left-12 p-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 z-20 cursor-default select-none"
          >
            <div className="p-2 bg-pink-500/10 text-pink-555 rounded-xl">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Inteligência Artificial</p>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">RAG Systems</h4>
            </div>
          </motion.div>

          {/* Background Decorative Rings */}
          <div className="absolute inset-0 border border-dashed border-sky-500/20 dark:border-sky-500/10 rounded-full w-[110%] h-[110%] left-[-5%] top-[-5%] -z-10 pointer-events-none hidden sm:block animate-[spin_100s_linear_infinite]" />
        </motion.div>

      </div>

      {/* Down Chevron Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">Deslizar</span>
        <ChevronDown className="animate-bounce" size={16} />
      </motion.div>
    </section>
  );
}
