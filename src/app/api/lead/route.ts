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

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Nao foi possivel enviar agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }

  try {
    const body: unknown = await request.json();

    if (!isRecord(body)) {
      return NextResponse.json(
        {
          success: false,
          message: "Confira os campos obrigatorios e tente novamente.",
        },
        { status: 400 },
      );
    }

    const missingFields: string[] = REQUIRED_FIELDS.filter(
      (field) => !cleanString(body[field]),
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Confira os campos obrigatorios e tente novamente.",
        },
        { status: 400 },
      );
    }

    const payload: Record<LeadField | "checkbox_consentimento", string | boolean> = {
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

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Nao foi possivel enviar agora. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }

    const result: unknown = await response.json().catch(() => null);

    if (!isSuccessfulWebhookResult(result)) {
      return NextResponse.json(
        {
          success: false,
          message: "Nao foi possivel concluir o envio. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      ok: true,
      message: "Informações enviadas com sucesso.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Confira os campos obrigatorios e tente novamente.",
      },
      { status: 400 },
    );
  }
}
