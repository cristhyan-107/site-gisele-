import test from "node:test";
import assert from "node:assert/strict";
import { trackGenerateLead } from "../../src/analytics/events";
import { pushToDataLayer } from "../../src/analytics/dataLayer";

test("Suite: Lead Analytics Implementation & PII Protection", async (t) => {
  await t.test(
    "1. Sucesso dispara generate_lead exatamente 1 vez com payload correto",
    () => {
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
        location: { pathname: "/contato" },
      };

      trackGenerateLead();

      assert.equal(dataLayer.length, 1, "Deve emitir exatamente 1 evento");
      const event = dataLayer[0];

      assert.equal(event.event, "generate_lead");
      assert.equal(event.origin, "site_google_ads");
      assert.equal(event.area, "formulario");
      assert.equal(event.cta, "Solicitar análise inicial");
      assert.equal(event.localizacao_cta, "formulario_principal");
      assert.equal(event.pagina, "/contato");
      assert.equal(event.form_id, "analise_inicial");
    },
  );

  await t.test(
    "2. Estrutura de chaves do payload contém APENAS os 7 campos permitidos",
    () => {
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

      trackGenerateLead();

      const event = dataLayer[0];
      const actualKeys = Object.keys(event).sort();
      const expectedKeys = [
        "area",
        "cta",
        "event",
        "form_id",
        "localizacao_cta",
        "origin",
        "pagina",
      ].sort();

      assert.deepEqual(
        actualKeys,
        expectedKeys,
        "Payload deve conter estritamente as 7 chaves especificadas",
      );
    },
  );

  await t.test(
    "3. Proteção Absoluta de PII: NENHUM dado do usuário entra no payload",
    () => {
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

      trackGenerateLead();

      const event = dataLayer[0];
      const prohibitedPII = [
        "nome",
        "whatsapp",
        "telefone",
        "email",
        "cidade",
        "estado",
        "area_atuacao",
        "link_publicacao",
        "link_perfil",
        "conteudo_no_ar",
        "possui_provas",
        "prejuizo",
        "descricao_caso",
        "website",
      ];

      for (const key of prohibitedPII) {
        assert.equal(
          key in event,
          false,
          `Chave PII/sensível '${key}' não pode estar presente no payload`,
        );
      }

      assert.equal(
        event.area,
        "formulario",
        "area deve ser literalmente 'formulario'",
      );
      assert.equal(
        "area_atuacao" in event,
        false,
        "area_atuacao nunca deve ser usada no analytics",
      );
    },
  );

  await t.test(
    "4. Deduplicação e Integridade do dataLayer",
    () => {
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

      trackGenerateLead();
      assert.equal(dataLayer.length, 1);

      trackGenerateLead();
      assert.equal(dataLayer.length, 2);

      const first = dataLayer[0];
      const second = dataLayer[1];

      assert.deepEqual(first, second);
    },
  );

  await t.test("5. pushToDataLayer cria dataLayer caso window.dataLayer não exista", () => {
    (
      globalThis as unknown as {
        window: {
          dataLayer?: Record<string, unknown>[];
        };
      }
    ).window = {};

    pushToDataLayer({ event: "test" });

    assert.equal((globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } }).window.dataLayer.length, 1);
    assert.equal((globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } }).window.dataLayer[0].event, "test");
  });
});
