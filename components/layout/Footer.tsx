import { PersonalInfo } from "@/types";

export default function Footer({
  personalInfo,
}: {
  personalInfo: PersonalInfo;
}) {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-sm text-slate-500 dark:text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} {personalInfo.name}. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
