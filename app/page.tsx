"use client";

import React from "react";
import {
  PersonalInfo,
  Project,
  Experience,
  Certification,
  SkillsData,
} from "@/types";

import CursorLightning from "@/components/ui/shared/CursorLightning";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

import personalInfoData from "@/data/personalInfo.json";
import projectsData from "@/data/projects.json";
import experiencesData from "@/data/experiences.json";
import certificationsData from "@/data/certifications.json";
import skillsData from "@/data/skills.json";

const personalInfo: PersonalInfo = personalInfoData;
const projects: Project[] = projectsData;
const experiences: Experience[] = experiencesData as Experience[];
const certifications: Certification[] = certificationsData;
const skills: SkillsData = skillsData;

export default function PortfolioPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 antialiased selection:bg-sky-500/20">
      <CursorLightning />
      <Header personalInfo={personalInfo} />

      <main className="relative z-10 w-full">
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
