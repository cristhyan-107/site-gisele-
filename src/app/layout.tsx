import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-MXH4SQ8C";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dra. Gisele Gabriel | Atendimento Jurídico",
  description: siteDescription,
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  openGraph: {
    locale: "pt_BR",
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#091a31",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
