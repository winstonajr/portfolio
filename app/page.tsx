"use client";

// --- IMPORTAÇÕES ---
import React, { useState, useEffect } from "react";

// Layout & Effects
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorSpotlight from "@/components/effects/CursorSpotlight";

// Sections
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

// Data
import personalInfo from "@/data/personalInfo.json";
import projectsData from "@/data/projects.json";
import experiencesData from "@/data/experiences.json";
import certificationsData from "@/data/certifications.json";
import skillsData from "@/data/skills.json";

export default function PortfolioPage() {
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
        <Projects projects={projectsData} />
        <Skills skills={skillsData} />
        <Journey experiences={experiencesData} />
        <Certifications certifications={certificationsData} />
        <Contact />
      </main>

      <Footer personalInfo={personalInfo} />
    </div>
  );
}
