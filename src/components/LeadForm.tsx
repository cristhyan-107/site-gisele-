"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { getUrlAttribution, ORIGIN, pushDataLayer } from "@/lib/analytics";

const initialForm = {
  nome: "",
  whatsapp: "",
  cidade_estado: "",
  plataforma: "",
  conteudo_no_ar: "",
  possui_provas: "",
  prejuizo: "",
  relato: "",
  checkbox_consentimento: false,
};

const fieldClass =
  "mt-2 w-full rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3.5 text-[0.95rem] text-navy shadow-[0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(15,23,42,0.035)] outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,125,53,0.14),0_16px_34px_rgba(15,23,42,0.06)]";

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>("idle");

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.nome &&
          form.whatsapp &&
          form.cidade_estado &&
          form.plataforma &&
          form.conteudo_no_ar &&
          form.possui_provas &&
          form.relato &&
          form.checkbox_consentimento,
      ),
    [form],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setState("error");
      return;
    }

    setState("submitting");

    const attribution = getUrlAttribution();
    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
      origem: ORIGIN,
      ...attribution,
      utms: attribution,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      pushDataLayer({
        event: "lead_form_submit",
        origem: ORIGIN,
        plataforma: form.plataforma,
        conteudo_no_ar: form.conteudo_no_ar,
        possui_provas: form.possui_provas,
        ...attribution,
      });

      setForm(initialForm);
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <motion.form
      className="relative overflow-hidden rounded-[2.15rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,242,236,0.9))] p-4 shadow-[0_34px_90px_rgba(15,23,42,0.11)] ring-1 ring-white/85 backdrop-blur sm:p-6 lg:p-8"
      onSubmit={handleSubmit}
      noValidate={false}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.24 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--gold),transparent_78%)]" />
      <div className="mb-7 flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white/72 p-4 shadow-[0_16px_38px_rgba(15,23,42,0.045)]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold/12 text-gold">
          <ShieldCheck aria-hidden="true" size={23} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            Dados para contato
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-navy">
            Triagem inicial segura
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Preencha apenas as informações iniciais necessárias para organização
            do atendimento.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
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
          Cidade/Estado
          <input
            required
            className={fieldClass}
            name="cidade_estado"
            autoComplete="address-level2"
            value={form.cidade_estado}
            onChange={(event) =>
              setForm({ ...form, cidade_estado: event.target.value })
            }
          />
        </label>

        <label className="form-label">
          Plataforma
          <select
            required
            className={fieldClass}
            name="plataforma"
            value={form.plataforma}
            onChange={(event) =>
              setForm({ ...form, plataforma: event.target.value })
            }
          >
            <option value="">Selecione</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="X/Twitter">X/Twitter</option>
            <option value="YouTube">YouTube</option>
            <option value="WhatsApp/Telegram">WhatsApp/Telegram</option>
            <option value="Outra">Outra</option>
          </select>
        </label>

        <label className="form-label">
          Conteúdo ainda está no ar?
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
          Possui provas?
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
            <option value="Ainda não">Ainda não</option>
          </select>
        </label>
      </div>

      <label className="form-label mt-5 block">
        Prejuízo percebido
        <input
          className={fieldClass}
          name="prejuizo"
          value={form.prejuizo}
          onChange={(event) => setForm({ ...form, prejuizo: event.target.value })}
          placeholder="Ex.: trabalho, família, segurança, reputação, saúde emocional"
        />
      </label>

      <label className="form-label mt-5 block">
        Relato
        <textarea
          required
          className={`${fieldClass} min-h-40 resize-y leading-7`}
          name="relato"
          rows={6}
          value={form.relato}
          onChange={(event) => setForm({ ...form, relato: event.target.value })}
          placeholder="Conte o que aconteceu, quando ocorreu e se há links, prints ou perfis envolvidos."
        />
      </label>

      <label className="mt-5 grid grid-cols-[1.1rem_1fr] items-start gap-3 rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-semibold leading-6 text-slate-600">
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
          Autorizo o contato para triagem inicial e estou ciente de que este
          atendimento não substitui consulta jurídica.
        </span>
      </label>

      <motion.button
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.15rem] bg-[linear-gradient(135deg,#07172b,var(--navy))] px-5 py-4 text-sm font-bold text-white shadow-[0_20px_42px_rgba(12,29,53,0.26),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-55"
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
        {state === "submitting" ? "Enviando..." : "Enviar triagem"}
      </motion.button>

      <div aria-live="polite">
        {state === "success" ? (
          <p className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-800">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
            Informações enviadas com sucesso. O próximo contato será feito para
            triagem inicial.
          </p>
        ) : null}
        {state === "error" ? (
          <p className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
            <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
            Não foi possível enviar agora. Confira os campos obrigatórios ou
            tente novamente em instantes.
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}
