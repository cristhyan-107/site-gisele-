import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Defesa jurídica para exposição e ataques na internet",
  description:
    "Atuação jurídica para vítimas de conteúdos ofensivos, perfis falsos, difamação, deepfakes e divulgação indevida de informações pessoais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
