import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/PremiumLanding";

export const metadata: Metadata = {
  title: "Uso Indevido de Imagem na Internet | Dra. Gisele Gabriel",
  description:
    "Análise jurídica para casos de fotos, vídeos ou imagens divulgadas sem autorização na internet.",
};

const content = {
  eyebrow: "Uso indevido de imagem",
  title: "Usaram sua imagem sem autorização?",
  subtitle:
    "Fotos, vídeos e montagens divulgados sem consentimento podem atingir sua privacidade, honra e reputação. A situação pode ser analisada para avaliar as medidas jurídicas adequadas.",
  problem:
    "O uso indevido de imagem pode envolver divulgação de fotos, vídeos, montagens ou uso comercial não autorizado. A avaliação considera a forma de divulgação, o contexto, a finalidade e os prejuízos percebidos.",
  examples: [
    "Fotos publicadas sem autorização",
    "Vídeos compartilhados sem consentimento",
    "Montagens ou exposições em redes sociais",
    "Uso comercial indevido de imagem pessoal ou profissional",
  ],
  evidence:
    "Provas importantes incluem prints, links, vídeos, identificação dos perfis envolvidos e data de publicação ou compartilhamento.",
  measures: [
    "Remoção de conteúdo, quando cabível",
    "Preservação de provas",
    "Indenização, quando cabível",
    "Notificação extrajudicial",
    "Medidas judiciais adequadas ao caso concreto",
  ],
};

export default function ImageMisuseLandingPage() {
  return <LandingPageTemplate content={content} />;
}
