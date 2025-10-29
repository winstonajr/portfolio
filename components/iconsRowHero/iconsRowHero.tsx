import Link, { LinkProps } from "next/link";

type iconsRowHeroProps = {
  children: React.ReactNode;
} & LinkProps;

export const IconsRowHero = ({ children, ...rest }: iconsRowHeroProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300"
    >
      {children}
    </Link>
  );
};
