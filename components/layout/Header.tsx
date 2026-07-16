"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Sun, Moon } from "lucide-react";
import { PersonalInfo } from "@/types";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export default function Header({ personalInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Jornada", href: "#journey" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300 pointer-events-none">
      <header
        className={`mx-auto w-full max-w-7xl transition-all duration-500 pointer-events-auto ${
          isScrolled
            ? "py-3 px-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-950/5 rounded-3xl"
            : "py-4 px-4 bg-transparent border border-transparent rounded-none"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group flex items-center gap-1"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">W</span>
            <span className="text-sky-500 font-extrabold group-hover:rotate-12 transition-transform duration-300">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-2xl border border-slate-200/30 dark:border-slate-800/30">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 rounded-xl hover:bg-white dark:hover:bg-slate-950/50 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 cursor-pointer"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Socials & Hire */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50"
            >
              <Github size={18} />
            </a>

            <a
              href="#contact"
              className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-slate-950/10 dark:shadow-white/5"
            >
              Contratar
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Switcher on Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-sky-500 rounded-xl cursor-pointer"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-slate-900 dark:text-white hover:text-sky-500 rounded-xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-4 md:hidden"
            >
              <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-lg">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 py-2.5 px-3 rounded-lg hover:bg-white dark:hover:bg-slate-950/50 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <hr className="border-slate-200 dark:border-slate-800 my-2" />
                <div className="flex items-center justify-between px-2">
                  <div className="flex gap-2">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:text-sky-500"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:text-sky-500"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:scale-105 transition-all"
                  >
                    Contratar
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
