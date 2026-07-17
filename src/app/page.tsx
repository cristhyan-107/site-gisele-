import type { Metadata } from "next";
import { PremiumLanding } from "@/components/PremiumLanding";

const title =
  "Dra. Gisele Gabriel | Planos de Saúde, Seguros e Direito do Consumidor";
const description =
  "Atendimento jurídico em casos envolvendo planos de saúde, seguros, contas bloqueadas, golpes bancários e companhias aéreas. Solicite uma análise inicial.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    siteName: "Dra. Gisele Gabriel",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function Home() {
  return <PremiumLanding />;
}
