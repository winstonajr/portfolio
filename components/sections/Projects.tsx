"use client";
import { useState } from "react";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { Project } from "@/types";

export default function Projects({ projects }: { projects: Project[] }) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 2);

  return (
    <Section id="projects">
      <SectionTitle>Projetos em Destaque</SectionTitle>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
      {projects.length > 2 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
          >
            {showAllProjects ? "Ver Menos" : "Ver Mais"}
          </button>
        </div>
      )}
    </Section>
  );
}
