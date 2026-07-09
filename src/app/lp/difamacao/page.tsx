import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/PremiumLanding";

export const metadata: Metadata = {
  title: "Advogada para Difamação na Internet | Dra. Gisele Gabriel",
  description:
    "Análise jurídica para casos de difamação na internet, ataques à reputação, publicações ofensivas e acusações falsas em redes sociais.",
};

const content = {
  eyebrow: "Difamação na internet",
  title: "Foi difamado na internet?",
  subtitle:
    "Publicações ofensivas, acusações falsas e ataques à reputação podem gerar prejuízos pessoais e profissionais. A análise jurídica permite verificar quais medidas podem ser avaliadas para proteger seus direitos.",
  problem:
    "A difamação na internet pode ocorrer em publicações, comentários, vídeos, avaliações e acusações públicas que atingem a reputação de uma pessoa, empresa ou profissional. Cada situação precisa ser avaliada com cautela, considerando contexto, autoria, alcance e provas disponíveis.",
  examples: [
    "Posts, stories e comentários ofensivos em redes sociais",
    "Vídeos com acusações falsas ou exposição indevida",
    "Avaliações falsas em plataformas públicas",
    "Acusações públicas que prejudicam reputação pessoal ou profissional",
  ],
  evidence:
    "Provas importantes incluem prints, links, datas, nomes de perfis, identificação de testemunhas e registros que demonstrem o alcance da publicação.",
  measures: [
    "Notificação extrajudicial",
    "Remoção de conteúdo, quando cabível",
    "Direito de resposta",
    "Indenização, quando cabível",
    "Queixa-crime",
    "Preservação de provas",
  ],
};

export default function DefamationLandingPage() {
  return <LandingPageTemplate content={content} />;
}
