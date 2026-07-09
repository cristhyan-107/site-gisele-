"use client";

type DataLayerEvent = Record<string, unknown> & {
  event: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export const ORIGIN = "site_google_ads";

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

export function pushDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

export function trackWhatsappClick() {
  pushDataLayer({
    event: "click_whatsapp",
    origem: ORIGIN,
  });
}
