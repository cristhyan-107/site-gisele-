import type { Metadata } from "next";
import { PremiumLanding } from "@/components/PremiumLanding";
import { siteUrl } from "@/lib/site";

const title =
  "Dra. Gisele Gabriel | Advocacia em Saúde, Seguros, Digital e Bancário";
const description =
  "Advocacia em planos de saúde, seguros, contas profissionais bloqueadas e questões bancárias, com avaliação de medidas judiciais e extrajudiciais cabíveis.";

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
    telephone: "+55 62 99292-8498",
    email: "gisgabri.adv@gmail.com",
    areaServed: {
      "@type": "State",
      name: "Goiás",
    },
    knowsAbout: [
      "Planos de saúde",
      "Seguros e seguradoras",
      "Contas profissionais bloqueadas",
      "Fraudes e questões bancárias",
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
