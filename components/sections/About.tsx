import { motion } from "framer-motion";
import Image from "next/image";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import { PersonalInfo } from "@/types";

export default function About({
  personalInfo,
}: {
  personalInfo: PersonalInfo;
}) {
  return (
    <Section id="about">
      <SectionTitle>Sobre Mim</SectionTitle>
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 border-2 border-sky-500/10 dark:border-sky-500/30 shadow-xl dark:shadow-2xl dark:shadow-sky-900/20 flex items-center justify-center">
            <Image
              src="/me.png"
              alt="Foto de perfil"
              width={649}
              height={649}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
        </motion.div>
        <div className="md:col-span-3">
          {personalInfo.about.map((item, index) => (
            <p
              key={index}
              className="text-lg text-slate-600 dark:text-slate-400 pb-5 leading-relaxed"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
