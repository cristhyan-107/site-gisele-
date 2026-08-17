"use client";

import { pushToDataLayer, DataLayerItem } from "@/analytics/dataLayer";

export const ORIGIN = "site_google_ads";

type WhatsappClickContext = {
  area?: string;
  cta?: string;
  location?: string;
};

export function getUrlAttribution() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      gclid: "",
      fbclid: "",
      landing_page: "",
      page_url: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    gclid: params.get("gclid") ?? "",
    fbclid: params.get("fbclid") ?? "",
    landing_page: window.location.pathname,
    page_url: window.location.href,
  };
}

export function pushDataLayer(event: DataLayerItem) {
  pushToDataLayer(event);
}

export function trackWhatsappClick(context: WhatsappClickContext = {}) {
  pushToDataLayer({
    event: "click_whatsapp",
    origem: ORIGIN,
    area: context.area ?? "geral",
    cta: context.cta ?? "Falar pelo WhatsApp",
    localizacao_cta: context.location ?? "nao_informada",
    pagina:
      typeof window === "undefined" ? "" : window.location.pathname,
  });
}
