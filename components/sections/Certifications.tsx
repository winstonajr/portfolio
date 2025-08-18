"use client";
import { useState } from "react";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import CertificationCard from "../ui/CertificationCard";
import { Certification } from "@/types";

export default function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const displayedCerts = showAllCertifications
    ? certifications
    : certifications.slice(0, 4);

  return (
    <Section id="certifications">
      <SectionTitle>Certificações</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {displayedCerts.map((cert, idx) => (
          <CertificationCard key={idx} certification={cert} index={idx} />
        ))}
      </div>
      {certifications.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAllCertifications(!showAllCertifications)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
          >
            {showAllCertifications ? "Ver Menos" : "Ver Mais"}
          </button>
        </div>
      )}
    </Section>
  );
}
