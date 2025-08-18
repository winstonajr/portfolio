import { ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-16 text-center">
      {children}
    </h2>
  );
}
