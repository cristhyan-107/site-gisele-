import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/PremiumLanding";

export const metadata: Metadata = {
  title: "Advogada para Perfil Falso | Dra. Gisele Gabriel",
  description:
    "Atuação jurídica em casos de perfil falso, uso indevido de nome ou imagem e ataques por perfis anônimos na internet.",
};

const content = {
  eyebrow: "Perfil falso",
  title: "Criaram um perfil falso usando seu nome ou imagem?",
  subtitle:
    "Perfis falsos podem prejudicar sua imagem, enganar terceiros e causar danos à reputação. O caso pode ser analisado para verificar medidas jurídicas e extrajudiciais cabíveis.",
  problem:
    "Perfis falsos podem usar nome, foto, marca ou dados de uma pessoa ou empresa para atacar, expor, enganar terceiros ou tentar aplicar golpes. A análise jurídica verifica a viabilidade das medidas conforme o caso concreto.",
  examples: [
    "Uso de foto, nome ou marca sem autorização",
    "Tentativa de golpe com identidade falsa",
    "Ataques feitos por perfil anônimo",
    "Perfil falso prejudicando pessoa, empresa ou profissional",
  ],
  evidence:
    "Provas importantes incluem link do perfil, prints, mensagens recebidas, datas, usuários envolvidos e registros de eventuais prejuízos causados.",
  measures: [
    "Remoção de perfil falso",
    "Identificação de responsável, quando cabível",
    "Preservação de provas",
    "Notificação extrajudicial",
    "Medidas judiciais adequadas à situação apresentada",
  ],
};

export default function FakeProfileLandingPage() {
  return <LandingPageTemplate content={content} />;
}
