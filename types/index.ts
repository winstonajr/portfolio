// Para seus dados pessoais em personalInfo.json
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  about: string;
  curriculumLink: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
}

// Para cada projeto em projects.json
export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string; // A '?' torna a propriedade opcional
  githubUrl?: string;
}

// Para cada item de experiência em experiences.json
export interface Experience {
  type: "work" | "education" | "volunteer"; // Tipo literal para mais segurança
  period: string;
  title: string;
  company: string;
  description: string;
}

// Para cada certificação em certifications.json
export interface Certification {
  title: string;
  issuer: string;
  period: string;
}

// Para os dados de skills em skills.json
export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}
