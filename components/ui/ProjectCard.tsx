import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group transition-all duration-300 hover:!border-sky-500/50 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-sky-900/30 relative flex flex-col"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="aspect-[3/2] w-full relative">
        <Image
          src={project.imageUrl}
          alt={`Thumbnail do projeto ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
          {project.name}
        </h3>
        <p className="text-sm mb-4 text-slate-600 dark:text-slate-400 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/50">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 text-sky-600 hover:text-sky-800 dark:hover:text-sky-400 flex items-center gap-1 font-semibold text-sm transition-colors"
            >
              Ver Online <ArrowUpRight size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 text-slate-600 hover:text-slate-800 dark:hover:text-slate-400 flex items-center gap-1 font-semibold text-sm transition-colors"
            >
              Código <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
