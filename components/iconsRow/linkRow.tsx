import Link, { LinkProps } from "next/link";

type iconsRowProps = {
  children: React.ReactNode;
} & LinkProps;

export const IconsRow = ({ children, ...rest }: iconsRowProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
    >
      {children}
    </Link>
  );
};
