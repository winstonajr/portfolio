import { PersonalInfo } from "@/types";
import { Github, Linkedin, Instagram, Heart } from "lucide-react";

export default function Footer({
  personalInfo,
}: {
  personalInfo: PersonalInfo;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand & Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
            Winston Almeida Jr<span className="text-sky-500">.</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-550 mt-1">
            &copy; {currentYear} Todos os direitos reservados.
          </p>
        </div>

        {/* Middle Side: Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
          <a href="#about" className="hover:text-sky-500 transition-colors">Sobre</a>
          <a href="#projects" className="hover:text-sky-500 transition-colors">Projetos</a>
          <a href="#skills" className="hover:text-sky-500 transition-colors">Skills</a>
          <a href="#journey" className="hover:text-sky-500 transition-colors">Jornada</a>
          <a href="#contact" className="hover:text-sky-500 transition-colors">Contato</a>
        </div>

        {/* Right Side: Social Media links & Heart Credit */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-500 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
          
          <p className="text-[10px] text-slate-500 dark:text-slate-500 flex items-center gap-1">
            Feito com <Heart size={10} className="text-red-500 fill-red-500" /> & Next.js
          </p>
        </div>

      </div>
    </footer>
  );
}
