import { Experience } from "@/types";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

const iconMap = {
  work: <Briefcase size={14} className="text-sky-500" />,
  education: <GraduationCap size={14} className="text-sky-500" />,
  volunteer: <HeartHandshake size={14} className="text-sky-500" />,
};

export default function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      className="mb-12 relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute -left-[30px] md:-left-[46px] top-1.5 h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-950 border-2 border-sky-500 flex items-center justify-center">
        {iconMap[experience.type as keyof typeof iconMap]}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
        {experience.period}
      </p>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
        {experience.title}
      </h3>
      <p className="text-sky-500 dark:text-sky-400 font-semibold">
        {experience.company}
      </p>
      <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
        {experience.description}
      </p>
    </motion.div>
  );
}
