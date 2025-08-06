'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation, useScroll, useTransform, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Menu, X, Code, Award, Database, AppWindow, Briefcase, GraduationCap, HeartHandshake } from 'lucide-react';
import { SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiReact, SiVuedotjs, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiBootstrap, SiPostgresql, SiMongodb, SiFirebase, SiSupabase, SiMysql, SiGit, SiGithub, SiExpress } from 'react-icons/si';

// Importando os dados e o hook
import personalInfo from "../data/personalInfo.json";
import projects from "../data/projects.json";
import experiences from "../data/experiences.json";
import certifications from "../data/certifications.json";
import { useGoogleFormSubmit } from './hooks/useGoogleFormSubmit';

// --- DADOS MOCKADOS (para os ícones) ---
const skills = {
  languages: [
    { name: "JavaScript", icon: <SiJavascript/> }, { name: "TypeScript", icon: <SiTypescript/> },
    { name: "Python", icon: <SiPython/> }, { name: "HTML5", icon: <SiHtml5/> }, { name: "CSS3", icon: <SiCss3/> },
  ],
  frameworks: [
    { name: "React", icon: <SiReact/> }, { name: "Vue.js", icon: <SiVuedotjs/> }, { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Node.js", icon: <SiNodedotjs/> }, { name: "Express", icon: <SiExpress /> }, { name: "Tailwind CSS", icon: <SiTailwindcss/> },
    { name: "Bootstrap", icon: <SiBootstrap/> },
  ],
  databases: [
    { name: "PostgreSQL", icon: <SiPostgresql/> }, { name: "MongoDB", icon: <SiMongodb/> },
    { name: "MySQL", icon: <SiMysql/> }, { name: "Firebase", icon: <SiFirebase/> },
    { name: "Supabase", icon: <SiSupabase/> }, { name: "Git", icon: <SiGit/> }, { name: "GitHub", icon: <SiGithub /> },
  ]
};

// --- NOVOS COMPONENTES E HOOKS ---

// Componente para o efeito de "holofote" no cursor
const CursorSpotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></motion.div>
  );
};

// --- COMPONENTES INTERNOS ---

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = '' }: SectionWrapperProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id={id} ref={ref} initial="hidden" animate={controls} variants={variants}
      className={`w-full max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-16 text-center">
    {children}
  </h2>
);

// --- COMPONENTE PRINCIPAL ---

export default function PortfolioApp() {
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { isSubmitting, statusMessage, submitForm } = useGoogleFormSubmit();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get('honeypot')) return;

    // Lembre-se de adicionar esta variável de ambiente!
    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL as string;
    await submitForm(formData, formUrl);
    form.reset();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "#about", label: "Sobre" }, { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" }, { href: "#experience", label: "Jornada" },
    { href: "#certifications", label: "Certificações"}, { href: "#contact", label: "Contato" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const timelineRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const formsName = process.env.NEXT_PUBLIC_ENTRY_NAME
    const formsEmail = process.env.NEXT_PUBLIC_ENTRY_EMAIL
    const formsMessage = process.env.NEXT_PUBLIC_ENTRY_MENSAGEM
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 antialiased selection:bg-sky-500/20">
      {!prefersReducedMotion && <CursorSpotlight />}

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}
        ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center h-20">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-bold text-slate-900 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
            {personalInfo.name.split(' ')[0]}<span className="text-sky-500 dark:text-sky-400">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }} animate={{ rotate: isMenuOpen ? 90 : 0 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu"
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-50 dark:bg-slate-900 absolute top-20 left-0 right-0 p-6 flex flex-col gap-6 border-b border-slate-200 dark:border-slate-800">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-lg font-medium text-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <main className="relative z-10">
        <section id="home" className="min-h-screen flex items-center justify-center text-center px-6">
          <motion.div variants={heroVariants} initial="hidden" animate="visible" className="flex flex-col items-center gap-4">
            <motion.h1 variants={heroItemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-slate-100">{personalInfo.name}</motion.h1>
            <motion.p variants={heroItemVariants} className="text-xl md:text-2xl text-sky-500 dark:text-sky-400 font-medium">{personalInfo.title}</motion.p>
            <motion.p variants={heroItemVariants} className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-2">{personalInfo.tagline}</motion.p>
            <motion.div variants={heroItemVariants} className="flex gap-4 mt-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="Github" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300"><Github size={24} /></a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Linkedin" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300"><Linkedin size={24} /></a>
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300"><Instagram size={24} /></a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300"><Mail size={24} /></a>
            </motion.div>
          </motion.div>
        </section>

        <SectionWrapper id="about">
          <SectionTitle>Sobre Mim</SectionTitle>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div className="md:col-span-2" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
              <div className="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 border-2 border-sky-500/10 dark:border-sky-500/30 shadow-xl dark:shadow-2xl dark:shadow-sky-900/20 flex items-center justify-center">
                <Image src="/me.webp" alt="Foto de perfil" width={649} height={649} className="w-full h-full object-cover rounded-lg" priority />
              </div>
            </motion.div>
            <div className="md:col-span-3">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{personalInfo.about}</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="projects">
          <SectionTitle>Projetos em Destaque</SectionTitle>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {(showAllProjects ? projects : projects.slice(0, 2)).map((project, index) => (
              <motion.div key={index}
                className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group transition-all duration-300 hover:!border-sky-500/50 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-sky-900/30 relative"
                whileHover={{ y: -8 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-white/5"></div>
                <div className="aspect-[3/2] w-full">
                  <Image src={project.imageUrl} alt={`Thumbnail do projeto ${project.name}`} width={600} height={400} className="w-full h-56 md:h-72 lg:h-80 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{project.name}</h3>
                    <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (<span key={idx} className="bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 text-xs font-semibold px-2 py-1 rounded-full">{tech}</span>))}
                    </div>
                    <div className="flex gap-4 mt-4">
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 dark:hover:text-sky-400 flex items-center gap-1 font-semibold text-sm transition-colors">Ver Online <ArrowUpRight size={16} /></a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 dark:hover:text-slate-400 flex items-center gap-1 font-semibold text-sm transition-colors">Código <Github size={16} /></a>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-12"><button onClick={() => setShowAllProjects(!showAllProjects)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300">{showAllProjects ? "Ver Menos" : "Ver Mais"}</button></div>
        </SectionWrapper>

        <SectionWrapper id="skills">
            <SectionTitle>Skills & Tecnologias</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Linguagens', icon: <Code size={24} className="text-sky-500"/>, items: skills.languages },
                { title: 'Frameworks & Bibliotecas', icon: <AppWindow size={24} className="text-sky-500"/>, items: skills.frameworks },
                { title: 'Banco de Dados & Ferramentas', icon: <Database size={24} className="text-sky-500"/>, items: skills.databases }
              ].map(category => (
                <div key={category.title}>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-200">{category.icon} {category.title}</h3>
                  <ul className="flex flex-wrap gap-4">
                    {category.items.map((skill, idx) => (
                      <motion.li key={idx} className="flex flex-col items-center gap-2 text-center w-20 p-2 rounded-lg transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50" whileHover={{ y: -5, scale: 1.1 }}>
                        <div className="text-4xl text-slate-700 dark:text-slate-300">{skill.icon}</div>
                        <span className="text-xs font-medium">{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </SectionWrapper>

        <SectionWrapper id="experience">
            <SectionTitle>Minha Jornada</SectionTitle>
            <div className="relative" ref={timelineRef}>
              <motion.div style={{ height: timelineHeight }} className="absolute left-[11px] top-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="relative pl-8 md:pl-12">
                {(showAllExperience ? experiences : experiences.slice(0, 2)).map((exp, index) => (
                  <motion.div key={index} className="mb-12 relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <div className="absolute -left-[30px] md:-left-[46px] top-1.5 h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-950 border-2 border-sky-500 flex items-center justify-center">
                      {exp.type === 'work' ? <Briefcase size={14} className="text-sky-500" /> : exp.type === 'education' ? <GraduationCap size={14} className="text-sky-500" /> : <HeartHandshake size={14} className="text-sky-500" />}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">{exp.period}</p>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{exp.title}</h3>
                    <p className="text-sky-500 dark:text-sky-400 font-semibold">{exp.company}</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-8"><button onClick={() => setShowAllExperience(!showAllExperience)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300">{showAllExperience ? "Ver Menos" : "Ver Mais"}</button></div>
        </SectionWrapper>

        <SectionWrapper id="certifications">
          <SectionTitle>Certificações</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
          {(showAllCertifications ? certifications : certifications.slice(0, 4)).map((cert, idx) => (
            <motion.div key={idx} className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <div className="flex items-start gap-4 mb-2 text-sky-500 dark:text-sky-400">
                <Award size={24} className="flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{cert.title}</h3>
                    <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold">{cert.issuer} • {cert.period}</p>
                </div>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-10">{cert.description}</p>
            </motion.div>
          ))}
          </div>
            <div className="flex justify-center mt-12"><button onClick={() => setShowAllCertifications(!showAllCertifications)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300">{showAllCertifications ? "Ver Menos" : "Ver Mais"}</button></div>
        </SectionWrapper>

        <SectionWrapper id="contact">
          <SectionTitle>Vamos Conversar</SectionTitle>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Estou sempre aberto a novas oportunidades, colaborações ou apenas um bom bate-papo sobre tecnologia. Sinta-se à vontade para entrar em contato!</p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off"/>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome</label>
                    <input type="text" id="name" name={formsName} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input type="email" id="email" name={formsEmail} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mensagem</label>
                  <textarea id="message" name={formsMessage} rows={4} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? "Enviando..." : "Enviar Mensagem"}</button>
            </form>
            {statusMessage && <p className="mt-4 text-center text-sm text-sky-600 dark:text-sky-400">{statusMessage}</p>}
            <div className="mt-12">
              <p className="text-slate-800 dark:text-slate-100">Ou me encontre por aqui:</p>
              <div className="flex justify-center gap-6 mt-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><Github size={28} /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><Linkedin size={28} /></a>
                <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><Instagram size={28} /></a>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><Mail size={28} /></a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}