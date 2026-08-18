import test from "node:test";
import assert from "node:assert/strict";
import { trackWhatsappClick } from "../../src/lib/analytics";

test("click de WhatsApp preserva evento canônico, contexto e proteção de PII", () => {
  const dataLayer: Record<string, unknown>[] = [];
  (
    globalThis as unknown as {
      window: {
        dataLayer: Record<string, unknown>[];
        location: { pathname: string };
      };
    }
  ).window = {
    dataLayer,
    location: { pathname: "/" },
  };

  trackWhatsappClick({
    area: "geral",
    cta: "Falar com a equipe jurídica",
    location: "hero",
  });

  assert.equal(dataLayer.length, 1);
  assert.deepEqual(dataLayer[0], {
    event: "click_whatsapp",
    origem: "site_google_ads",
    area: "geral",
    cta: "Falar com a equipe jurídica",
    localizacao_cta: "hero",
    pagina: "/",
  });

  for (const piiKey of [
    "nome",
    "whatsapp",
    "telefone",
    "email",
    "cidade",
    "estado",
  ]) {
    assert.equal(piiKey in (dataLayer[0] ?? {}), false);
  }
});
