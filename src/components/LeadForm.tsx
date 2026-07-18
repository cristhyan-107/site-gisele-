"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
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
  area_atuacao: "",
  link_publicacao: "",
  link_perfil: "",
  conteudo_no_ar: "",
  possui_provas: "",
  prejuizo: "",
  descricao_caso: "",
  website: "",
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

const practiceAreaOptions = [
  "Planos de saúde",
  "Seguros",
  "Contas bloqueadas",
  "Golpes bancários",
  "Companhias aéreas",
  "Direito digital e reputação online",
  "Outra situação",
];

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const hasTrackedStart = useRef(false);

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.nome &&
          form.whatsapp &&
          form.email &&
          form.cidade &&
          form.estado &&
          form.area_atuacao &&
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

    const attribution = getUrlAttribution();

    pushDataLayer({
      event: "lead_form_submit_attempt",
      origem: ORIGIN,
      area_atuacao: form.area_atuacao || "nao_informada",
      landing_page: attribution.landing_page,
    });

    if (!canSubmit) {
      setFeedbackMessage(requiredMessage);
      setState("error");
      return;
    }

    setFeedbackMessage("");
    setState("submitting");

    const cidadeEstado = `${form.cidade}/${form.estado}`;
    const payload = {
      nome: form.nome,
      whatsapp: form.whatsapp,
      email: form.email,
      cidade: form.cidade,
      estado: form.estado,
      cidade_estado: cidadeEstado,
      area_atuacao: form.area_atuacao,
      rede_social: form.area_atuacao,
      plataforma: form.area_atuacao,
      link_publicacao: form.link_publicacao,
      link_perfil: form.link_perfil,
      conteudo_no_ar: form.conteudo_no_ar,
      possui_provas: form.possui_provas,
      prejuizo: form.prejuizo,
      descricao_caso: form.descricao_caso,
      relato: form.descricao_caso,
      website: form.website,
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
        area_atuacao: form.area_atuacao,
        landing_page: attribution.landing_page,
      });
      pushDataLayer({
        event: "lead_form_submit_success",
        origem: ORIGIN,
        area_atuacao: form.area_atuacao,
        landing_page: attribution.landing_page,
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
      pushDataLayer({
        event: "lead_form_submit_error",
        origem: ORIGIN,
        area_atuacao: form.area_atuacao || "nao_informada",
        landing_page: attribution.landing_page,
      });
      setState("error");
    }
  }

  function handleFormFocus() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    const attribution = getUrlAttribution();
    pushDataLayer({
      event: "lead_form_start",
      origem: ORIGIN,
      landing_page: attribution.landing_page,
    });
  }

  return (
    <motion.form
      className="relative overflow-hidden rounded-[1.65rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,248,250,0.92))] p-4 shadow-[0_30px_80px_rgba(15,23,42,0.1)] ring-1 ring-white/85 backdrop-blur sm:p-6 lg:p-7"
      onFocus={handleFormFocus}
      onSubmit={handleSubmit}
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
            Não envie arquivos neste momento. Documentos, protocolos, prints e
            demais comprovantes poderão ser solicitados pelo canal de
            atendimento.
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
            maxLength={100}
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
            maxLength={20}
            minLength={10}
            pattern="[0-9()+\\-\\s]{10,20}"
            title="Informe um telefone com DDD."
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
            maxLength={254}
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
              maxLength={100}
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
              minLength={2}
              pattern="[A-Za-z]{2}"
              title="Informe a sigla do estado com duas letras."
              value={form.estado}
              onChange={(event) =>
                setForm({ ...form, estado: event.target.value.toUpperCase() })
              }
            />
          </label>
        </div>

        <label className="form-label md:col-span-2">
          Área relacionada ao caso
          <select
            required
            className={fieldClass}
            name="area_atuacao"
            value={form.area_atuacao}
            onChange={(event) =>
              setForm({ ...form, area_atuacao: event.target.value })
            }
          >
            <option value="">Selecione</option>
            {practiceAreaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Protocolo, referência ou link, se houver
          <input
            className={fieldClass}
            name="link_publicacao"
            maxLength={500}
            value={form.link_publicacao}
            onChange={(event) =>
              setForm({ ...form, link_publicacao: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          Outro link ou perfil relacionado, se houver
          <input
            className={fieldClass}
            name="link_perfil"
            inputMode="url"
            maxLength={500}
            value={form.link_perfil}
            onChange={(event) =>
              setForm({ ...form, link_perfil: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          O problema ainda está acontecendo?
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
          Possui documentos, protocolos, prints ou comprovantes?
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
        Qual impacto ou risco você percebeu?
        <input
          required
          className={fieldClass}
          name="prejuizo"
          maxLength={300}
          value={form.prejuizo}
          onChange={(event) => setForm({ ...form, prejuizo: event.target.value })}
          placeholder="Ex.: risco à saúde, perda financeira, bloqueio da atividade profissional, viagem prejudicada ou outro impacto relevante."
        />
      </label>

      <label className="form-label mt-4 block">
        Descrição do caso
        <textarea
          required
          className={`${fieldClass} min-h-36 resize-y leading-7`}
          name="descricao_caso"
          maxLength={5000}
          minLength={20}
          rows={6}
          value={form.descricao_caso}
          onChange={(event) =>
            setForm({ ...form, descricao_caso: event.target.value })
          }
        />
      </label>

      <p className="mt-4 rounded-[1.05rem] border border-gold/20 bg-gold/8 p-4 text-sm font-semibold leading-6 text-slate-650">
        Após o envio das informações iniciais, documentos e demais comprovantes
        poderão ser solicitados pelo canal de atendimento indicado.
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Não preencha este campo
          <input
            autoComplete="off"
            name="website"
            tabIndex={-1}
            value={form.website}
            onChange={(event) =>
              setForm({ ...form, website: event.target.value })
            }
          />
        </label>
      </div>

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
          {" "}
          <Link
            className="font-bold text-navy underline decoration-gold/60 underline-offset-4 transition hover:text-gold"
            href="/politica-de-privacidade"
            onClick={(event) => event.stopPropagation()}
            rel="noreferrer"
            target="_blank"
          >
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      <motion.button
        className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.05rem] bg-[linear-gradient(135deg,#07172b,var(--navy))] px-5 py-4 text-sm font-bold text-white shadow-[0_20px_42px_rgba(12,29,53,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-55"
        disabled={state === "submitting"}
        aria-busy={state === "submitting"}
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
