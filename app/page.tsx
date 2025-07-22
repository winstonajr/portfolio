'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useGoogleFormSubmit } from './useGoogleFormSubmit';
import { 
    Github, 
    Linkedin,
    Instagram,
    Mail, 
    ArrowUpRight, 
    Menu, 
    X, 
    Code,
    Database, 
    AppWindow,
    Briefcase,
    GraduationCap,
    HeartHandshake
} from 'lucide-react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiMysql,
  SiGit,
  SiGithub,
  SiExpress,
} from 'react-icons/si'

// --- DADOS MOCKADOS ---

const personalInfo = {
  name: "Winston A. Jr",
  title: "Desenvolvedor Web",
  tagline: "Construindo soluções digitais que resolvem problemas reais.",
  about: "Sou um desenvolvedor apaixonado por tecnologia e design, com experiência na criação de aplicações web modernas e responsivas. Meu foco é transformar ideias em produtos digitais intuitivos e eficientes, utilizando as melhores práticas do mercado. Fora do código, sou um entusiasta de games de estratégia, ficção científica e um explorador de distribuições Linux no meu tempo livre.",
  email: "winston.almeidamjr@gmail.com",
  linkedin: "https://linkedin.com/in/winstonajr",
  github: "https://github.com/winstonajr",
  instagram: "https://instagram.com/win_ajr"
};

const projects = [
  {
    name: "Site da Igreja IADEVIB",
    description: "Website institucional da Igreja Assembleia de Deus Vila Brasil (IADEVIB), com design moderno, agenda de eventos, localização de suas congregações, notifições push via onesignal e painel administrativo para gerenciamento de conteúdo.",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Supabase", "OneSignal", "Git & Github"],
    liveUrl: "https://www.iadevib.com.br",
    githubUrl: "#",
    imageUrl: "/project-iadevib.png",
  }/*,
  {
    name: "App de Gerenciamento de Tarefas",
    description: "Um Kanban board interativo com funcionalidade de arrastar e soltar, autenticação de usuários e persistência de dados em tempo real com Firebase.",
    technologies: ["React", "Vite", "Firebase", "Zustand", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/project-default.png",
  },
  {
    name: "Landing Page para SaaS",
    description: "Página de captura de leads com design moderno, animações e integração com Mailchimp para campanhas de marketing.",
    technologies: ["Astro", "Solid.js", "Tailwind CSS", "GSAP"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/project-default.png",
  },*/
];

const skills = {
  languages: [
    { name: "JavaScript", icon: <SiJavascript/> },
    { name: "TypeScript", icon: <SiTypescript/> },
    { name: "Python", icon: <SiPython/> },
    { name: "HTML5", icon: <SiHtml5/> },
    { name: "CSS3", icon: <SiCss3/> },
  ],
  frameworks: [
    { name: "React", icon: <SiReact/> },
    { name: "Vue.js", icon: <SiVuedotjs/> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Node.js", icon: <SiNodedotjs/> },
    { name: "Express", icon: <SiExpress /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss/> },
    { name: "Bootstrap", icon: <SiBootstrap/> },
  ],
  databases: [
    { name: "PostgreSQL", icon: <SiPostgresql/> },
    { name: "MongoDB", icon: <SiMongodb/> },
    { name: "MySQL", icon: <SiMysql/> },
    { name: "Firebase", icon: <SiFirebase/> },
    { name: "Supabase", icon: <SiSupabase/> },
    { name: "Git", icon: <SiGit/> },
    { name: "GitHub", icon: <SiGithub /> },
  ]
}

const experiences = [
    {
      type: 'education',/*work or freelance*/
      title: "Análise e Desenvolvimento de Sistemas",
      company: "Faculdade Facint (Vincit)",
      period: "2025 - 2027",
      description: "Formação técnica e prática voltada para o desenvolvimento de software e aplicações web. Tenho aprofundado conhecimentos em lógica de programação, banco de dados, front-end, back-end e arquitetura de sistemas, alinhando os estudos ao que aplico em projetos reais."
    },
    {
      type: 'education',
      title: "Curso Web Moderno Completo com JavaScript + Projetos",
      company: "Udemy",
      period: "Fev 2025 - Mai 2025",
      description: "Formação intensiva em desenvolvimento full stack, cobrindo desde fundamentos de HTML, CSS e JavaScript até tecnologias modernas como React.js, Vue.js, Node.js, Next.js e Firebase. O curso abordou também práticas de UX/UI, versionamento com Git, consumo de APIs, bancos de dados (MongoDB e MySQL), testes, metodologias ágeis e ferramentas como Webpack, Gulp e Tailwind CSS."
    },
    {
      type: 'education',
      title: "Bacharelado Interdisciplinar em Ciência e Tecnologia",
      company: "Universidade Federal do Maranhão ― UFMA",
      period: "2020 - 2025",
      description: "Iniciei o curso buscando uma formação ampla em ciência e tecnologia, com forte foco em matemática e ciências exatas. No entanto, descobri minha verdadeira paixão na programação e decidi seguir esse caminho, aprofundando meus estudos de forma mais prática e aplicada na área de desenvolvimento web."
    }
];

// --- COMPONENTES INTERNOS (para organização) ---

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = '' }: SectionWrapperProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`w-full max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-12 text-center">
    {children}
  </h2>
);

export default function PortfolioApp() {


  const { isSubmitting, statusMessage, submitForm } = useGoogleFormSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Se honeypot tiver valor, é bot
    if (formData.get('honeypot')) {
      console.warn("Envio bloqueado por honeypot");
      return;
    }

    const formUrl = "https://docs.google.com/forms/d/1jdnpN78ItdhzynYOMXRoDVrmK8Gjk77K-yYEl-cDcic/formResponse";
    await submitForm(formData, formUrl);
    form.reset();
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Jornada" },
    { href: "#contact", label: "Contato" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 antialiased">
      {/* --- CABEÇALHO --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center h-20">
          <a href="#" className="text-2xl font-bold text-slate-900 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
            {personalInfo.name.split(' ')[0]}<span className="text-sky-500 dark:text-sky-400">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {/* Menu Mobile */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 absolute top-20 left-0 right-0 p-6 flex flex-col gap-6 border-b border-slate-200 dark:border-slate-800"
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-lg font-medium text-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <main>
        {/* --- SEÇÃO HERO --- */}
        <section id="home" className="min-h-screen flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-slate-100">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-sky-500 dark:text-sky-400 font-medium">{personalInfo.title}</p>
            <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-2">{personalInfo.tagline}</p>
            <div className="flex gap-4 mt-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300">
                <Github size={24} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300">
                <Linkedin size={24} />
              </a>
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300">
                <Instagram size={24} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- SEÇÃO SOBRE --- */}
        <SectionWrapper id="about">
          <SectionTitle>Sobre Mim</SectionTitle>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 border-2 border-sky-500/10 dark:border-sky-500/30 shadow-xl dark:shadow-2xl dark:shadow-sky-900/20 flex items-center justify-center">
                <Image
                    src="/me.webp" 
                    alt="Foto de perfil"
                    width={649}
                    height={649}
                    className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {personalInfo.about}
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* --- SEÇÃO PROJETOS --- */}
        <SectionWrapper id="projects">
          <SectionTitle>Projetos em Destaque</SectionTitle>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-sky-900/30 hover:border-sky-500/30 dark:hover:border-sky-500/50"
                whileHover={{ y: -5 }}
              >
                <Image 
                src={project.imageUrl} 
                alt={`Thumbnail do projeto ${project.name}`} 
                width={600}
                height={400}
                className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{project.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs font-semibold bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 px-2 py-1 rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                      Ver Online <ArrowUpRight size={16} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                      Código Fonte <Github size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* --- SEÇÃO SKILLS --- */}
        <SectionWrapper id="skills">
          <SectionTitle>Minha Stack de Tecnologias</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-sky-500 dark:text-sky-400 mb-6 capitalize flex items-center gap-3">
                  {category === 'languages' ? <Code/> : category === 'frameworks' ? <AppWindow/> : <Database/>}
                  {category === 'languages' ? 'Linguagens' : category === 'frameworks' ? 'Frameworks & Bibliotecas' : 'Bancos de Dados & Ferramentas'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map(skill => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      {React.cloneElement(skill.icon, { className: 'text-slate-400 dark:text-slate-500' })}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* --- SEÇÃO EXPERIÊNCIA E FORMAÇÃO --- */}
        <SectionWrapper id="experience">
            <SectionTitle>Minha Jornada</SectionTitle>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 md:pl-12">
                {experiences.map((exp, index) => (
                    <motion.div 
                        key={index} 
                        className="mb-12 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="absolute -left-[42px] md:-left-[58px] top-1.5 h-6 w-6 rounded-full bg-white dark:bg-slate-950 border-2 border-sky-500 flex items-center justify-center">
                            {exp.type === 'work' ? <Briefcase size={14} className="text-sky-500 dark:text-sky-400"/> : exp.type === 'education' ? <GraduationCap size={14} className="text-sky-500 dark:text-sky-400"/> : <HeartHandshake size={14} className="text-sky-500 dark:text-sky-400"/>}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">{exp.period}</p>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{exp.title}</h3>
                        <p className="text-sky-500 dark:text-sky-400 font-semibold">{exp.company}</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>

        {/* --- SEÇÃO CONTATO --- */}
        <SectionWrapper id="contact">
          <SectionTitle>Vamos Conversar</SectionTitle>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Estou sempre aberto a novas oportunidades, colaborações ou apenas um bom bate-papo sobre tecnologia. Sinta-se à vontade para entrar em contato!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off"/>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="entry.46536760"
                    required
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="entry.2099436681"
                    required
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mensagem</label>
                <textarea
                  id="message"
                  name="entry.206049528"
                  rows={4}
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-500 transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
            {statusMessage && (
              <p className="mt-4 text-center text-sm text-sky-600 dark:text-sky-400">
                {statusMessage}
              </p>
            )}

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

      {/* --- RODAPÉ --- */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
