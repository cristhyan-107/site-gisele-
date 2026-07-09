"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { getUrlAttribution, ORIGIN, pushDataLayer } from "@/lib/analytics";

const initialForm = {
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  estado: "GO",
  rede_social: "",
  link_publicacao: "",
  link_perfil: "",
  conteudo_no_ar: "",
  possui_provas: "",
  prejuizo: "",
  descricao_caso: "",
  checkbox_consentimento: false,
};

const fieldClass =
  "mt-2 w-full rounded-[1.05rem] border border-slate-200 bg-white px-4 py-3 text-[0.95rem] text-navy shadow-[0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(15,23,42,0.035)] outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,125,53,0.14),0_16px_34px_rgba(15,23,42,0.06)]";

type FormState = "idle" | "submitting" | "success" | "error";
type LeadApiResponse = {
  success?: boolean;
  ok?: boolean;
  message?: string;
};

const successMessage =
  "Informações enviadas com sucesso. O próximo contato será feito para triagem inicial.";

const requiredMessage =
  "Preencha os campos obrigatórios e aceite a Política de Privacidade para continuar.";

const socialOptions = [
  "Instagram",
  "TikTok",
  "Facebook",
  "WhatsApp",
  "Google",
  "YouTube",
  "X/Twitter",
  "Site/Reclame Aqui",
  "Outra",
];

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.nome &&
          form.whatsapp &&
          form.email &&
          form.cidade &&
          form.estado &&
          form.rede_social &&
          form.conteudo_no_ar &&
          form.possui_provas &&
          form.prejuizo &&
          form.descricao_caso &&
          form.checkbox_consentimento,
      ),
    [form],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setFeedbackMessage(requiredMessage);
      setState("error");
      return;
    }

    setFeedbackMessage("");
    setState("submitting");

    const attribution = getUrlAttribution();
    const cidadeEstado = `${form.cidade}/${form.estado}`;
    const payload = {
      nome: form.nome,
      whatsapp: form.whatsapp,
      email: form.email,
      cidade: form.cidade,
      estado: form.estado,
      cidade_estado: cidadeEstado,
      rede_social: form.rede_social,
      plataforma: form.rede_social,
      link_publicacao: form.link_publicacao,
      link_perfil: form.link_perfil,
      conteudo_no_ar: form.conteudo_no_ar,
      possui_provas: form.possui_provas,
      prejuizo: form.prejuizo,
      descricao_caso: form.descricao_caso,
      relato: form.descricao_caso,
      checkbox_consentimento: form.checkbox_consentimento,
      origem: ORIGIN,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      landing_page: attribution.landing_page,
      page_url: attribution.page_url,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | LeadApiResponse
        | null;

      if (!response.ok || (result?.success !== true && result?.ok !== true)) {
        console.error("Lead form API error", {
          status: response.status,
          data: result,
        });
        throw new Error("Lead request failed");
      }

      pushDataLayer({
        event: "lead_form_submit",
        origem: ORIGIN,
      });

      setForm(initialForm);
      setFeedbackMessage(successMessage);
      setState("success");
    } catch (error) {
      if (error instanceof Error && error.message !== "Lead request failed") {
        console.error("Lead form API error", {
          status: "request_failed",
          data: error.message,
        });
      }

      setFeedbackMessage(
        "Não foi possível enviar agora. Confira os campos obrigatórios ou tente novamente em instantes.",
      );
      setState("error");
    }
  }

  return (
    <motion.form
      className="relative overflow-hidden rounded-[1.65rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,248,250,0.92))] p-4 shadow-[0_30px_80px_rgba(15,23,42,0.1)] ring-1 ring-white/85 backdrop-blur sm:p-6 lg:p-7"
      onSubmit={handleSubmit}
      noValidate={false}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--gold),transparent_78%)]" />
      <div className="mb-6 flex items-start gap-4 rounded-[1.25rem] border border-slate-200 bg-white/75 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold/12 text-gold">
          <ShieldCheck aria-hidden="true" size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Análise inicial do caso
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-navy">
            Envie as informações para triagem
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Não envie arquivos neste momento. Prints, vídeos, documentos e
            demais provas poderão ser solicitados pelo canal de atendimento.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-label">
          Nome
          <input
            required
            className={fieldClass}
            name="nome"
            autoComplete="name"
            value={form.nome}
            onChange={(event) => setForm({ ...form, nome: event.target.value })}
          />
        </label>

        <label className="form-label">
          WhatsApp
          <input
            required
            className={fieldClass}
            name="whatsapp"
            autoComplete="tel"
            inputMode="tel"
            value={form.whatsapp}
            onChange={(event) =>
              setForm({ ...form, whatsapp: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          E-mail
          <input
            required
            className={fieldClass}
            name="email"
            autoComplete="email"
            inputMode="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <div className="grid grid-cols-[1fr_5.5rem] gap-3">
          <label className="form-label">
            Cidade
            <input
              required
              className={fieldClass}
              name="cidade"
              autoComplete="address-level2"
              value={form.cidade}
              onChange={(event) =>
                setForm({ ...form, cidade: event.target.value })
              }
            />
          </label>
          <label className="form-label">
            Estado
            <input
              required
              className={fieldClass}
              name="estado"
              autoComplete="address-level1"
              maxLength={2}
              value={form.estado}
              onChange={(event) =>
                setForm({ ...form, estado: event.target.value.toUpperCase() })
              }
            />
          </label>
        </div>

        <label className="form-label md:col-span-2">
          Rede social ou plataforma
          <select
            required
            className={fieldClass}
            name="rede_social"
            value={form.rede_social}
            onChange={(event) =>
              setForm({ ...form, rede_social: event.target.value })
            }
          >
            <option value="">Selecione</option>
            {socialOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Link da publicação, se houver
          <input
            className={fieldClass}
            name="link_publicacao"
            inputMode="url"
            value={form.link_publicacao}
            onChange={(event) =>
              setForm({ ...form, link_publicacao: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          Link do perfil, se houver
          <input
            className={fieldClass}
            name="link_perfil"
            inputMode="url"
            value={form.link_perfil}
            onChange={(event) =>
              setForm({ ...form, link_perfil: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          O conteúdo ainda está no ar?
          <select
            required
            className={fieldClass}
            name="conteudo_no_ar"
            value={form.conteudo_no_ar}
            onChange={(event) =>
              setForm({ ...form, conteudo_no_ar: event.target.value })
            }
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
            <option value="Não sei">Não sei</option>
          </select>
        </label>

        <label className="form-label">
          Possui prints, links, vídeos ou outras provas?
          <select
            required
            className={fieldClass}
            name="possui_provas"
            value={form.possui_provas}
            onChange={(event) =>
              setForm({ ...form, possui_provas: event.target.value })
            }
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Parcialmente">Parcialmente</option>
            <option value="Não">Não</option>
          </select>
        </label>
      </div>

      <label className="form-label mt-4 block">
        Qual prejuízo você percebeu?
        <input
          required
          className={fieldClass}
          name="prejuizo"
          value={form.prejuizo}
          onChange={(event) => setForm({ ...form, prejuizo: event.target.value })}
          placeholder="Ex.: prejuízo à reputação, constrangimento familiar, perda de clientes, abalo profissional, ameaças, exposição da imagem."
        />
      </label>

      <label className="form-label mt-4 block">
        Descrição do caso
        <textarea
          required
          className={`${fieldClass} min-h-36 resize-y leading-7`}
          name="descricao_caso"
          rows={6}
          value={form.descricao_caso}
          onChange={(event) =>
            setForm({ ...form, descricao_caso: event.target.value })
          }
        />
      </label>

      <p className="mt-4 rounded-[1.05rem] border border-gold/20 bg-gold/8 p-4 text-sm font-semibold leading-6 text-slate-650">
        Após o envio das informações iniciais, imagens, vídeos, documentos e
        demais provas poderão ser solicitados pelo canal de atendimento indicado.
      </p>

      <label className="mt-4 grid grid-cols-[1.1rem_1fr] items-start gap-3 rounded-[1.05rem] border border-slate-200 bg-white/75 p-4 text-sm font-semibold leading-6 text-slate-600">
        <input
          required
          className="mt-1 size-4 accent-navy"
          type="checkbox"
          name="checkbox_consentimento"
          checked={form.checkbox_consentimento}
          onChange={(event) =>
            setForm({
              ...form,
              checkbox_consentimento: event.target.checked,
            })
          }
        />
        <span>
          Declaro que as informações enviadas são verdadeiras e autorizo o
          tratamento dos dados para fins de triagem inicial do caso, conforme a
          Política de Privacidade.
        </span>
      </label>

      <motion.button
        className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.05rem] bg-[linear-gradient(135deg,#07172b,var(--navy))] px-5 py-4 text-sm font-bold text-white shadow-[0_20px_42px_rgba(12,29,53,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-55"
        disabled={state === "submitting"}
        type="submit"
        whileHover={{ y: state !== "submitting" ? -2 : 0 }}
        whileTap={{ scale: state !== "submitting" ? 0.985 : 1 }}
      >
        {state === "submitting" ? (
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
        ) : (
          <Send aria-hidden="true" size={18} />
        )}
        {state === "submitting" ? "Enviando..." : "Solicitar análise inicial"}
      </motion.button>

      <div aria-live="polite">
        {state === "success" ? (
          <p className="mt-5 flex items-start gap-3 rounded-[1.05rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-800">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 shrink-0"
              size={18}
            />
            {feedbackMessage || successMessage}
          </p>
        ) : null}
        {state === "error" ? (
          <p className="mt-5 flex items-start gap-3 rounded-[1.05rem] border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 shrink-0"
              size={18}
            />
            {feedbackMessage ||
              "Não foi possível enviar agora. Tente novamente em instantes."}
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}
