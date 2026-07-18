const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (
  configuredSiteUrl && /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "Dra. Gisele Gabriel";

export const siteDescription =
  "Atendimento jurídico em casos envolvendo planos de saúde, seguros, contas bloqueadas, golpes bancários e companhias aéreas.";

export const siteRoutes = [
  "/",
  "/politica-de-privacidade",
  "/lp/difamacao",
  "/lp/perfil-falso",
  "/lp/uso-indevido-de-imagem",
] as const;
