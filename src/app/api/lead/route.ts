import { NextResponse } from "next/server";

const REQUIRED_FIELDS = ["nome", "whatsapp", "plataforma", "relato"] as const;
const LEAD_FIELDS = [
  "nome",
  "whatsapp",
  "email",
  "cidade",
  "estado",
  "cidade_estado",
  "area_atuacao",
  "rede_social",
  "plataforma",
  "link_publicacao",
  "link_perfil",
  "conteudo_no_ar",
  "possui_provas",
  "prejuizo",
  "descricao_caso",
  "relato",
  "origem",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "landing_page",
  "page_url",
] as const;

type LeadField = (typeof LEAD_FIELDS)[number];

const MAX_BODY_BYTES = 50_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const WEBHOOK_TIMEOUT_MS = 12_000;

const FIELD_LIMITS: Partial<Record<LeadField, number>> = {
  nome: 100,
  whatsapp: 20,
  email: 254,
  cidade: 100,
  estado: 2,
  cidade_estado: 110,
  area_atuacao: 100,
  rede_social: 100,
  plataforma: 100,
  link_publicacao: 500,
  link_perfil: 500,
  conteudo_no_ar: 30,
  possui_provas: 30,
  prejuizo: 300,
  descricao_caso: 5000,
  relato: 5000,
  origem: 100,
  utm_source: 200,
  utm_medium: 200,
  utm_campaign: 200,
  utm_content: 200,
  utm_term: 200,
  gclid: 300,
  fbclid: 300,
  landing_page: 500,
  page_url: 1000,
};

const rateLimitStore = new Map<
  string,
  { count: number; expiresAt: number }
>();

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSuccessfulWebhookResult(result: unknown) {
  if (!isRecord(result)) {
    return false;
  }

  return (
    result.success === true ||
    result.ok === true ||
    result.duplicate === true ||
    Boolean(cleanString(result.lead_id)) ||
    Boolean(cleanString(result.classificacao))
  );
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: Record<string, string>,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    ""
  );
}

function isRateLimited(ip: string) {
  if (!ip) {
    return false;
  }

  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (entry.expiresAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);

  if (!current) {
    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function hasInvalidFieldLength(body: Record<string, unknown>) {
  return LEAD_FIELDS.some((field) => {
    const limit = FIELD_LIMITS[field];
    return limit ? cleanString(body[field]).length > limit : false;
  });
}

function hasValidContactData(body: Record<string, unknown>) {
  const email = cleanString(body.email);
  const whatsappDigits = cleanString(body.whatsapp).replace(/\D/g, "");
  const state = cleanString(body.estado);
  const description = cleanString(body.relato || body.descricao_caso);

  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    whatsappDigits.length >= 10 &&
    whatsappDigits.length <= 15 &&
    /^[A-Za-z]{2}$/.test(state) &&
    description.length >= 20
  );
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return jsonResponse(
      {
        success: false,
        message: "Não foi possível enviar agora. Tente novamente em instantes.",
      },
      500,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (
    !contentType.toLowerCase().includes("application/json") ||
    contentLength > MAX_BODY_BYTES
  ) {
    return jsonResponse(
      {
        success: false,
        message: "Não foi possível processar os dados enviados.",
      },
      contentLength > MAX_BODY_BYTES ? 413 : 415,
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonResponse(
      {
        success: false,
        message:
          "Muitas tentativas foram realizadas. Aguarde alguns minutos e tente novamente.",
      },
      429,
      { "Retry-After": "600" },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        success: false,
        message: "Confira os campos obrigatórios e tente novamente.",
      },
      400,
    );
  }

  if (!isRecord(body)) {
    return jsonResponse(
      {
        success: false,
        message: "Confira os campos obrigatórios e tente novamente.",
      },
      400,
    );
  }

  if (cleanString(body.website)) {
    return jsonResponse(
      {
        success: true,
        ok: true,
        message: "Informações recebidas com sucesso.",
      },
      200,
    );
  }

  const missingFields: string[] = REQUIRED_FIELDS.filter(
    (field) => !cleanString(body[field]),
  );

  if (
    missingFields.length > 0 ||
    body.checkbox_consentimento !== true ||
    hasInvalidFieldLength(body) ||
    !hasValidContactData(body)
  ) {
    return jsonResponse(
      {
        success: false,
        message: "Confira os campos obrigatórios e tente novamente.",
      },
      400,
    );
  }

  const payload: Record<
    LeadField | "checkbox_consentimento",
    string | boolean
  > = {
      nome: "",
      whatsapp: "",
      email: "",
      cidade: "",
      estado: "",
      cidade_estado: "",
      area_atuacao: "",
      rede_social: "",
      plataforma: "",
      link_publicacao: "",
      link_perfil: "",
      conteudo_no_ar: "",
      possui_provas: "",
      prejuizo: "",
      descricao_caso: "",
      relato: "",
      origem: "site_google_ads",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      gclid: "",
      fbclid: "",
      landing_page: "",
      page_url: "",
      checkbox_consentimento: body.checkbox_consentimento === true,
  };

  for (const field of LEAD_FIELDS) {
    payload[field] = cleanString(body[field]);
  }

  payload.origem = "site_google_ads";
  payload.area_atuacao =
    payload.area_atuacao || payload.plataforma || payload.rede_social;
  payload.plataforma = payload.plataforma || payload.rede_social;
  payload.rede_social = payload.rede_social || payload.plataforma;
  payload.relato = payload.relato || payload.descricao_caso;
  payload.descricao_caso = payload.descricao_caso || payload.relato;
  payload.cidade_estado =
    payload.cidade_estado ||
    [payload.cidade, payload.estado].filter(Boolean).join("/");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return jsonResponse(
        {
          success: false,
          message: "Não foi possível enviar agora. Tente novamente em instantes.",
        },
        502,
      );
    }

    const result: unknown = await response.json().catch(() => null);

    if (!isSuccessfulWebhookResult(result)) {
      return jsonResponse(
        {
          success: false,
          message: "Não foi possível concluir o envio. Tente novamente em instantes.",
        },
        502,
      );
    }

    return jsonResponse(
      {
        success: true,
        ok: true,
        message: "Informações enviadas com sucesso.",
      },
      200,
    );
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        message:
          error instanceof Error && error.name === "AbortError"
            ? "O atendimento demorou para responder. Tente novamente em instantes."
            : "Não foi possível enviar agora. Tente novamente em instantes.",
      },
      error instanceof Error && error.name === "AbortError" ? 504 : 502,
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
