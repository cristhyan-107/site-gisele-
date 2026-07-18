import { expect, test } from "@playwright/test";

test("página inicial apresenta as áreas e metadados principais", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText(
    "Orientação jurídica para situações que exigem atenção e agilidade",
  );
  await expect(page.locator("#areas-de-atuacao")).toBeVisible();
  await expect(page.locator("#perguntas-frequentes details")).toHaveCount(7);
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

  const links = page.locator('a[href^="https://wa.me/5511916239443"]');
  expect(await links.count()).toBeGreaterThanOrEqual(6);

  await expect(
    page.getByRole("link", { name: /Falar sobre plano de saúde/ }),
  ).toHaveAttribute("href", /problema%20com%20plano%20de%20sa%C3%BAde/);
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

  await page.getByLabel("Nome", { exact: true }).fill("Pessoa Teste");
  await page.getByLabel("WhatsApp", { exact: true }).fill("(62) 99999-9999");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Cidade", { exact: true }).fill("Goiânia");
  await page.getByLabel("Estado", { exact: true }).fill("GO");
  await page.locator('select[name="area_atuacao"]').selectOption("Planos de saúde");
  await page.locator('select[name="conteudo_no_ar"]').selectOption("Sim");
  await page.locator('select[name="possui_provas"]').selectOption("Sim");
  await page
    .getByLabel("Qual impacto ou risco você percebeu?", { exact: true })
    .fill("Negativa recente de cobertura do tratamento indicado.");
  await page
    .getByLabel("Descrição do caso", { exact: true })
    .fill("O plano recusou o procedimento indicado e enviou uma negativa por escrito.");
  await page
    .getByRole("checkbox", { name: /Declaro que as informações/ })
    .check();

  await page.getByRole("button", { name: "Solicitar análise inicial" }).click();
  await expect(page.getByText(/Informações enviadas com sucesso/)).toBeVisible();

  const events = await page.evaluate(() => window.dataLayer ?? []);
  expect(events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        event: "lead_form_submit_success",
        area_atuacao: "Planos de saúde",
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
