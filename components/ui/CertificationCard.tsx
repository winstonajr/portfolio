import { Certification } from "@/types";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function CertificationCard({
  certification,
  index,
}: {
  certification: Certification;
  index: number;
}) {
  return (
    <motion.div
      className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4 mb-2 text-sky-500 dark:text-sky-400">
        <Award size={24} className="flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {certification.title}
          </h3>
          <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold">
            {certification.issuer} • {certification.period}
          </p>
        </div>
      </div>
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-10">
        {certification.description}
      </p>
    </motion.div>
  );
}
