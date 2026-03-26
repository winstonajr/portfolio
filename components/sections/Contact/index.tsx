"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGoogleFormSubmit } from "@/hooks/useGoogleFormSubmit";
import { Mail, Send, CheckCircle2 } from "lucide-react";

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
    <section id="contact" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 tracking-tighter">
              Vamos conversar?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light mb-8 leading-relaxed">
              Estou sempre em busca de novos desafios e colaborações. Sinta-se à vontade para me enviar uma mensagem!
            </p>
            
            <div className="flex items-center gap-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 w-full sm:w-fit max-w-full overflow-hidden">
              <div className="p-3 bg-sky-500 text-white rounded-2xl shrink-0">
                <Mail size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">E-mail</p>
                <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 break-all sm:break-normal">
                  winston.almeidamjr@gmail.com
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome</label>
                  <input
                    type="text"
                    name={formsName}
                    required
                    placeholder="Seu nome"
                    className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">E-mail</label>
                  <input
                    type="email"
                    name={formsEmail}
                    required
                    placeholder="seu@email.com"
                    className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Mensagem</label>
                <textarea
                  name={formsMessage}
                  required
                  rows={4}
                  placeholder="Como posso te ajudar?"
                  className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem <Send size={18} />
                  </>
                )}
              </button>

              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sky-600 dark:text-sky-400 justify-center font-bold"
                >
                  <CheckCircle2 size={18} /> {statusMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
