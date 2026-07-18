import type { Metadata } from "next";
import { PremiumLanding } from "@/components/PremiumLanding";
import { siteUrl } from "@/lib/site";

const title =
  "Dra. Gisele Gabriel | Planos de Saúde, Seguros e Direito do Consumidor";
const description =
  "Atendimento jurídico em casos envolvendo planos de saúde, seguros, contas bloqueadas, golpes bancários e companhias aéreas. Solicite uma análise inicial.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    siteName: "Dra. Gisele Gabriel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Dra. Gisele Gabriel",
    description,
    url: siteUrl,
    image: `${siteUrl}/images/dra-gisele-gabriel.jpg`,
    telephone: "+55 11 91623-9443",
    email: "gisgabri.adv@gmail.com",
    areaServed: {
      "@type": "State",
      name: "Goiás",
    },
    knowsAbout: [
      "Planos de saúde",
      "Seguros",
      "Contas bloqueadas",
      "Golpes bancários",
      "Companhias aéreas",
      "Direito digital",
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <PremiumLanding />
    </>
  );
}
