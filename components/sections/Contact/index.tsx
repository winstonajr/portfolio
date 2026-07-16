"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGoogleFormSubmit } from "@/hooks/useGoogleFormSubmit";
import { Mail, Send, CheckCircle2, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const { isSubmitting, statusMessage, submitForm } = useGoogleFormSubmit();

  const formsName = process.env.NEXT_PUBLIC_ENTRY_NAME;
  const formsEmail = process.env.NEXT_PUBLIC_ENTRY_EMAIL;
  const formsMessage = process.env.NEXT_PUBLIC_ENTRY_MENSAGEM;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL as string;
    await submitForm(formData, formUrl);
    form.reset();
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Contato
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Vamos criar algo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
                  extraordinário?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-md">
                Estou sempre aberto a novos desafios de estágio, trabalhos freelance ou colaborações. Sinta-se à vontade para enviar uma mensagem ou se conectar pelas redes sociais!
              </p>
            </div>

            {/* Email Card Info */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="p-3 bg-sky-500 text-white rounded-2xl shadow-md shadow-sky-500/10">
                <Mail size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-0.5">E-mail Comercial</p>
                <a
                  href="mailto:winston.almeidamjr@gmail.com"
                  className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors break-all"
                >
                  winston.almeidamjr@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Connect Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/winstonajr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-all shadow-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/winstonajr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-all shadow-sm"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Right Column: Google Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 p-8 md:p-12 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/5 relative"
          >
            {/* Soft glow in top right */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    name={formsName}
                    required
                    placeholder="Winston Jr."
                    className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    name={formsEmail}
                    required
                    placeholder="voce@exemplo.com"
                    className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                  Sua Mensagem
                  </label>
                <textarea
                  name={formsMessage}
                  required
                  rows={4}
                  placeholder="Como podemos colaborar em um novo projeto?"
                  className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white text-sm resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 dark:bg-slate-100 hover:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-md shadow-slate-950/10 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem <Send size={16} />
                  </>
                )}
              </button>

              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sky-600 dark:text-sky-400 justify-center font-bold text-sm mt-4"
                >
                  <CheckCircle2 size={16} /> {statusMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
