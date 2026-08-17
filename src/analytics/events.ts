import { pushToDataLayer } from "./dataLayer";

export type GenerateLeadEvent = {
  event: "generate_lead";
  origin: "site_google_ads";
  area: "formulario";
  cta: "Solicitar análise inicial";
  localizacao_cta: "formulario_principal";
  pagina: string;
  form_id: "analise_inicial";
};

export function trackGenerateLead(): void {
  if (typeof window === "undefined") {
    return;
  }

  const payload: GenerateLeadEvent = {
    event: "generate_lead",
    origin: "site_google_ads",
    area: "formulario",
    cta: "Solicitar análise inicial",
    localizacao_cta: "formulario_principal",
    pagina: window.location.pathname,
    form_id: "analise_inicial",
  };

  pushToDataLayer(payload);
}
