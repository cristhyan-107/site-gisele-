import { expect, test } from "@playwright/test";

test.describe("generate_lead Analytics & Deduplication Tests", () => {
  const fillValidForm = async (page: import("@playwright/test").Page) => {
    await page.waitForSelector('input[name="nome"]');
    await page.locator('input[name="nome"]').pressSequentially("Pessoa Teste");
    await page
      .locator('input[name="whatsapp"]')
      .pressSequentially("(62) 99999-9999");
    await page
      .locator('input[name="email"]')
      .pressSequentially("teste@example.com");
    await page.locator('input[name="cidade"]').pressSequentially("Goiânia");
    await page.locator('input[name="estado"]').pressSequentially("GO");
    await page
      .locator('select[name="area_atuacao"]')
      .selectOption("Planos de saúde");
    await page.locator('select[name="conteudo_no_ar"]').selectOption("Sim");
    await page.locator('select[name="possui_provas"]').selectOption("Sim");
    await page
      .locator('input[name="prejuizo"]')
      .pressSequentially(
        "Negativa recente de cobertura do tratamento indicado.",
      );
    await page
      .locator('textarea[name="descricao_caso"]')
      .pressSequentially(
        "O plano recusou o procedimento indicado e enviou uma negativa por escrito.",
      );
    await page.locator('input[name="checkbox_consentimento"]').check();
  };

  test("sucesso => dispara generate_lead exatamente 1 vez com payload limpo e sem PII", async ({
    page,
  }) => {
    await page.route(
      (url) => url.pathname.includes("/api/lead"),
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, ok: true }),
        });
      },
    );

    await page.goto("/");
    await fillValidForm(page);

    await page
      .getByRole("button", { name: "Enviar informações do caso" })
      .click();

    await expect(
      page.getByText(/Informações enviadas com sucesso/),
    ).toBeVisible({ timeout: 10000 });

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const generateLeadEvents = dataLayer.filter(
      (item) => item.event === "generate_lead",
    );

    expect(generateLeadEvents.length).toBe(1);

    const event = generateLeadEvents[0];
    const applicationEvent = Object.fromEntries(
      Object.entries(event).filter(([key]) => !key.startsWith("gtm.")),
    );
    expect(Object.keys(applicationEvent).sort()).toEqual([
      "area",
      "cta",
      "event",
      "form_id",
      "localizacao_cta",
      "origin",
      "pagina",
    ]);

    expect(applicationEvent).toEqual({
      event: "generate_lead",
      origin: "site_google_ads",
      area: "formulario",
      cta: "Solicitar análise inicial",
      localizacao_cta: "formulario_principal",
      pagina: "/",
      form_id: "analise_inicial",
    });

    // Verificação estrita de PII em todos os eventos do dataLayer
    const piiFields = [
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

    for (const item of dataLayer) {
      for (const piiKey of piiFields) {
        expect(item).not.toHaveProperty(piiKey);
      }
    }
  });

  test("validação inválida => 0 generate_lead emitidos", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Enviar informações do caso" })
      .click();

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const generateLeadEvents = dataLayer.filter(
      (item) => item.event === "generate_lead",
    );

    expect(generateLeadEvents.length).toBe(0);
  });

  test("erro backend => 0 generate_lead emitidos", async ({ page }) => {
    await page.route(
      (url) => url.pathname.includes("/api/lead"),
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Erro interno no servidor.",
          }),
        });
      },
    );

    await page.goto("/");
    await fillValidForm(page);

    await page
      .getByRole("button", { name: "Enviar informações do caso" })
      .click();

    await expect(
      page.getByText(/Não foi possível enviar agora/),
    ).toBeVisible({ timeout: 10000 });

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const generateLeadEvents = dataLayer.filter(
      (item) => item.event === "generate_lead",
    );

    expect(generateLeadEvents.length).toBe(0);
  });

  test("exception de rede => 0 generate_lead emitidos", async ({ page }) => {
    await page.route(
      (url) => url.pathname.includes("/api/lead"),
      async (route) => {
        await route.abort("failed");
      },
    );

    await page.goto("/");
    await fillValidForm(page);

    await page
      .getByRole("button", { name: "Enviar informações do caso" })
      .click();

    await expect(
      page.getByText(/Não foi possível enviar agora/),
    ).toBeVisible({ timeout: 10000 });

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const generateLeadEvents = dataLayer.filter(
      (item) => item.event === "generate_lead",
    );

    expect(generateLeadEvents.length).toBe(0);
  });
});
