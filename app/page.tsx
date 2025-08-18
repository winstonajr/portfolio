"use client";

// --- IMPORTAÇÕES ---
import React, { useState, useEffect } from "react";

// Tipos para garantir a segurança de dados em todo o componente
import {
  PersonalInfo,
  Project,
  Experience,
  Certification,
  SkillsData,
} from "@/types";

// Componentes de Layout & Efeitos Visuais
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorSpotlight from "@/components/effects/CursorSpotlight";

// Componentes de Seção da Página
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

// Importação dos dados brutos dos arquivos JSON
import personalInfoData from "@/data/personalInfo.json";
import projectsData from "@/data/projects.json";
import experiencesData from "@/data/experiences.json";
import certificationsData from "@/data/certifications.json";
import skillsData from "@/data/skills.json";

// --- Atribuição de Tipos aos Dados Importados ---
// Garantimos que os dados importados sigam a estrutura que definimos.
const personalInfo: PersonalInfo = personalInfoData;
const projects: Project[] = projectsData;
// A correção crucial com a asserção de tipo para resolver o erro do TypeScript
const experiences: Experience[] = experiencesData as Experience[];
const certifications: Certification[] = certificationsData;
const skills: SkillsData = skillsData;

export default function PortfolioPage() {
  // Estado para verificar a preferência do usuário por movimento reduzido (acessibilidade).
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 antialiased selection:bg-sky-500/20">
      {!prefersReducedMotion && <CursorSpotlight />}
      <Header personalInfo={personalInfo} />

      <main className="relative z-10">
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Journey experiences={experiences} />
        <Certifications certifications={certifications} />
        <Contact />
      </main>

      <Footer personalInfo={personalInfo} />
    </div>
  );
}
