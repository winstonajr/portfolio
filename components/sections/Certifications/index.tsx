"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Certification } from "@/types";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">
              Certificações
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
              Compromisso com o aperfeiçoamento contínuo nas tecnologias mais modernas do mercado.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => scroll("left")} className="p-3 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll("right")} className="p-3 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="min-w-[75vw] md:min-w-[30vw] lg:min-w-[22vw] snap-start p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-sky-500/50 transition-all"
            >
              <div className="p-3 bg-sky-500/10 text-sky-500 rounded-2xl w-fit mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">
                {cert.issuer}
              </p>
              <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
                {cert.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
