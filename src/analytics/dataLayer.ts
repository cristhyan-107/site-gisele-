export type DataLayerItem = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerItem[];
  }
}

export function pushToDataLayer(data: DataLayerItem): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
