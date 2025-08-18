"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import TimelineItem from "../ui/TimelineItem";
import { Experience } from "@/types";

export default function Journey({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const timelineRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const displayedExperiences = showAllExperience
    ? experiences
    : experiences.slice(0, 2);

  return (
    <Section id="experience">
      <SectionTitle>Minha Jornada</SectionTitle>
      <div className="relative" ref={timelineRef}>
        <motion.div
          style={{ height: timelineHeight }}
          className="absolute left-[11px] top-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full"
        />
        <div className="relative pl-8 md:pl-12">
          {displayedExperiences.map((exp, index) => (
            <TimelineItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
      {experiences.length > 2 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllExperience(!showAllExperience)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
          >
            {showAllExperience ? "Ver Menos" : "Ver Mais"}
          </button>
        </div>
      )}
    </Section>
  );
}
