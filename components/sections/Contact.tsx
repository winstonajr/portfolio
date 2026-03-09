"use client";
import { useGoogleFormSubmit } from "@/hooks/useGoogleFormSubmit";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { TbFileCv } from "react-icons/tb";
import personalInfo from "@/data/personalInfo.json";
import { IconsRow } from "../iconsRow";

export default function Contact() {
  const { isSubmitting, statusMessage, submitForm } = useGoogleFormSubmit();
  const formsName = process.env.NEXT_PUBLIC_ENTRY_NAME;
  const formsEmail = process.env.NEXT_PUBLIC_ENTRY_EMAIL;
  const formsMessage = process.env.NEXT_PUBLIC_ENTRY_MENSAGEM;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get("honeypot")) return;

    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL as string;
    await submitForm(formData, formUrl);
    form.reset();
  };

  return (
    <Section id="contact">
      <SectionTitle>Vamos Conversar</SectionTitle>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Estou sempre aberto a novas oportunidades, colaborações ou apenas um
          bom bate-papo sobre tecnologia. Sinta-se à vontade para entrar em
          contato!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            name="honeypot"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name={formsName}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name={formsEmail}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name={formsMessage}
              rows={4}
              required
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-slate-800 dark:text-slate-100">
            Ou me encontre por aqui:
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <IconsRow href={personalInfo.github}>
              <Github size={28} />
            </IconsRow>

            <IconsRow href={personalInfo.linkedin}>
              <Linkedin size={28} />
            </IconsRow>

            <IconsRow href={personalInfo.instagram}>
              <Instagram size={28} />
            </IconsRow>

            <IconsRow href={`mailto:${personalInfo.email}`}>
              <Mail size={28} />
            </IconsRow>

            <IconsRow href={personalInfo.curriculumLink}>
              <TbFileCv size={28} />
            </IconsRow>
          </div>
        </div>
      </div>
    </Section>
  );
}
