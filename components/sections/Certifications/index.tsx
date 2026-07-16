"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Certification } from "@/types";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const targetScrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const smoothScroll = () => {
    if (!scrollRef.current) return;
    const current = scrollRef.current.scrollLeft;
    const target = targetScrollLeft.current;
    const diff = target - current;
    const speed = 0.12; // Easing coefficient (12% of remaining distance per frame)

    if (Math.abs(diff) > 0.5) {
      scrollRef.current.scrollLeft = current + diff * speed;
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    } else {
      scrollRef.current.scrollLeft = target;
      animationFrameId.current = null;
      setIsMouseDown(false); // Re-enable snapping only after smooth glide finishes
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft: currentScroll, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? currentScroll - clientWidth * 0.75 : currentScroll + clientWidth * 0.75;
      
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const target = Math.max(0, Math.min(maxScroll, scrollTo));
      
      targetScrollLeft.current = target;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      setIsMouseDown(true);
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
      
      setTimeout(() => {
        setIsMouseDown(false);
      }, 400);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    setIsMouseDown(true); // Disable snap
    setIsDragging(false);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    targetScrollLeft.current = scrollRef.current.scrollLeft;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (!animationFrameId.current) {
      setIsMouseDown(false);
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (!animationFrameId.current) {
      setIsMouseDown(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(x - startX.current) > 5) {
      setIsDragging(true);
    }
    
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    targetScrollLeft.current = Math.max(0, Math.min(maxScroll, scrollLeft.current - walk));
    
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <section
      id="certifications"
      className="py-24 bg-slate-50 dark:bg-slate-950/80 overflow-hidden transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest border border-sky-500/20 mb-4 select-none">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Educação Continuada
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight select-none">
              Certificações & Cursos
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light mt-3 select-none">
              Compromisso com o aprendizado contínuo nas tecnologias mais modernas e requisitadas pelo mercado de tecnologia.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex gap-3 self-start md:self-auto select-none">
            <button
              onClick={() => scroll("left")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Cursos anteriores"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-sky-500/30 transition-all text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-sky-500/50 outline-none cursor-pointer shadow-sm active:scale-95"
              aria-label="Próximos cursos"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-none pb-8 -mx-6 px-6 cursor-grab active:cursor-grabbing select-none ${
            isMouseDown ? "" : "snap-x snap-mandatory"
          }`}
          style={{ scrollbarWidth: "none" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
              viewport={{ once: true, margin: "-50px" }}
              className="min-w-[78vw] sm:min-w-[45vw] md:min-w-[32vw] lg:min-w-[23vw] snap-start p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-md shadow-slate-900/5 hover:shadow-xl hover:border-sky-500/30 dark:hover:border-sky-500/10 transition-all duration-300 flex flex-col justify-between h-[230px] group select-none"
            >
              {/* Top Certificate Icon */}
              <div className="flex items-center justify-between mb-4 select-none">
                <div className="p-3 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-inner select-none pointer-events-none">
                  <Award size={20} className="pointer-events-none select-none" />
                </div>
                <span className="text-[9px] font-black text-sky-500 dark:text-sky-400 uppercase tracking-widest bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/10 px-2 py-1 rounded-md select-none">
                  {cert.period}
                </span>
              </div>

              {/* Title & Issuer details */}
              <div className="flex-grow flex flex-col justify-end select-none">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors tracking-tight line-clamp-2 leading-snug mb-1 select-none">
                  {cert.title}
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 select-none">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
