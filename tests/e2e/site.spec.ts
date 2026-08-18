import { expect, test } from "@playwright/test";

test("página inicial apresenta as áreas e metadados principais", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText(
    "Advocacia para problemas com planos de saúde, seguros, bancos e contas profissionais bloqueadas",
  );
  await expect(page.getByText("OAB/GO 57.455").first()).toBeVisible();
  await expect(page.locator("#areas-de-atuacao")).toBeVisible();
  await expect(page.locator("#perguntas-frequentes details")).toHaveCount(8);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('script[type="application/ld\+json"]')).toHaveCount(
    1,
  );
});

test("respostas incluem os headers de segurança", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response?.headers() ?? {};

  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});

test("menu mobile abre, fecha com Escape e mantém estado acessível", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Abrir menu" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Fechar menu" }).first()).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(
    page.getByRole("navigation", { name: "Navegação mobile" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("links de WhatsApp preservam o número e mensagens específicas", async ({
  page,
}) => {
  await page.goto("/");

  const links = page.locator('a[href^="https://wa.me/5562992928498"]');
  expect(await links.count()).toBeGreaterThanOrEqual(6);

  await expect(
    page
      .getByRole("article")
      .filter({ has: page.getByRole("heading", { name: "Plano de saúde" }) })
      .getByRole("link", { name: /Falar com a equipe jurídica/ }),
  ).toHaveAttribute("href", /problema%20com%20plano%20de%20sa%C3%BAde/);
});

test("CTA principal emite click_whatsapp exatamente uma vez e sem PII", async ({
  page,
}) => {
  await page.goto("/");

  const cta = page
    .locator("#inicio")
    .getByRole("link", { name: "Falar com a equipe jurídica pelo WhatsApp" });
  await expect(cta).toBeVisible();

  await cta.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    (element as HTMLAnchorElement).click();
  });

  const events = await page.evaluate(() => window.dataLayer ?? []);
  const whatsappEvents = events.filter(
    (item) => item.event === "click_whatsapp",
  );

  expect(whatsappEvents).toHaveLength(1);
  expect(whatsappEvents[0]).toEqual(
    expect.objectContaining({
      event: "click_whatsapp",
      cta: "Falar com a equipe jurídica",
      localizacao_cta: "hero",
      pagina: "/",
    }),
  );
  expect(whatsappEvents[0]).not.toHaveProperty("nome");
  expect(whatsappEvents[0]).not.toHaveProperty("email");
  expect(whatsappEvents[0]).not.toHaveProperty("telefone");
});

test("formulário envia dados válidos e registra o evento de sucesso", async ({
  page,
}) => {
  await page.route("**/api/lead", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, ok: true }),
    });
  });
  await page.goto("/");

  await page.locator('input[name="nome"]').fill("Pessoa Teste");
  await page.locator('input[name="whatsapp"]').fill("(62) 99999-9999");
  await page.locator('input[name="email"]').fill("teste@example.com");
  await page.locator('input[name="cidade"]').fill("Goiânia");
  await page.locator('input[name="estado"]').fill("GO");
  await page.locator('select[name="area_atuacao"]').selectOption("Planos de saúde");
  await page.locator('select[name="conteudo_no_ar"]').selectOption("Sim");
  await page.locator('select[name="possui_provas"]').selectOption("Sim");
  await page
    .locator('input[name="prejuizo"]')
    .fill("Negativa recente de cobertura do tratamento indicado.");
  await page
    .locator('textarea[name="descricao_caso"]')
    .fill("O plano recusou o procedimento indicado e enviou uma negativa por escrito.");
  await page.locator('input[name="checkbox_consentimento"]').check();

  await page.getByRole("button", { name: "Enviar informações do caso" }).click();
  await expect(page.getByText(/Informações enviadas com sucesso/)).toBeVisible();

  const events = await page.evaluate(() => window.dataLayer ?? []);
  expect(events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        event: "generate_lead",
        origin: "site_google_ads",
        area: "formulario",
        cta: "Solicitar análise inicial",
        localizacao_cta: "formulario_principal",
        form_id: "analise_inicial",
      }),
    ]),
  );
});

for (const route of [
  "/politica-de-privacidade",
  "/lp/difamacao",
  "/lp/perfil-falso",
  "/lp/uso-indevido-de-imagem",
]) {
  test(`${route} responde sem erro e possui um único h1`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toHaveCount(1);
  });
}
