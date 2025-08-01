import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Winston Jr. | Desenvolvedor Full Stack Moderno",
  description:
    "Portfólio de Winston Almeida Jr., desenvolvedor web full stack especializado em soluções digitais modernas, interfaces elegantes e performance. Conheça projetos, habilidades e formações.",
  keywords: [
    "Winston Jr.",
    "Winston Almeida Jr.",
    "Desenvolvedor Web",
    "Full Stack",
    "Desenvolvedor Front-end",
    "Desenvolvedor Back-end",
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Portfólio",
    "Programador",
    "UI/UX",
    "Sites profissionais",
    "Landing pages",
    "Dev moderno",
  ],
  authors: [{ name: "Winston Almeida Jr.", url: "https://seu-dominio.com" }],
  creator: "Winston Almeida Jr.",
  publisher: "Winston Almeida Jr.",
  generator: "Next.js",
  metadataBase: new URL("https://www.winstonajr.com.br"),

  openGraph: {
    title: "Winston Jr. | Desenvolvedor Full Stack Moderno",
    description:
      "Conheça o portfólio de Winston Almeida Jr., com projetos modernos, foco em performance, UI/UX e tecnologias como React, Next.js e Tailwind.",
    url: "https://www.winstonajr.com.br",
    siteName: "Winston Jr. | Portfólio",
    locale: "pt_BR",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  themeColor: "#0f172a",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
