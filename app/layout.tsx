import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Seu arquivo de CSS global (ex: com as diretivas do Tailwind)

// Importando seus dados para usar nos metadados
import personalInfo from "@/data/personalInfo.json";

// Otimização de fontes do Google Fonts, uma prática padrão no Next.js
const inter = Inter({ subsets: ["latin"] });

// --- METADADOS (SEO) ---
// Isso controla o que aparece na aba do navegador e quando você compartilha o link
export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.tagline,
  // Adicione outras tags meta que desejar aqui, como open graph para redes sociais
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.tagline,
  },
};

// --- O COMPONENTE LAYOUT ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // A tag lang é importante para acessibilidade e SEO
    <html lang="pt-BR" className="scroll-smooth">
      {/*
        A classe `inter.className` aplica a fonte otimizada em todo o corpo do site.
        Como seu projeto usa tema escuro (dark mode), é uma boa prática adicionar `suppressHydrationWarning`.
      */}
      <body className={inter.className} suppressHydrationWarning={true}>
        {/*
          É aqui que a mágica acontece! 
          O `children` representa o seu `app/page.tsx`.
          O Next.js vai renderizar o conteúdo da sua página exatamente neste lugar.
        */}
        {children}
      </body>
    </html>
  );
}
