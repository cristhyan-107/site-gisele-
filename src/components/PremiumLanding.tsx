"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Bot,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  Fingerprint,
  Gavel,
  ImageOff,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareWarning,
  Phone,
  ScrollText,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const lawyer = {
  initials: "DG",
  name: "Dra. Nome Completo",
  oab: "OAB/UF 000.000",
  location: "Cidade/Estado",
  email: "contato@seudominio.com.br",
  whatsappLabel: "(00) 00000-0000",
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";
const whatsappMessage =
  "Olá, vim pelo site e gostaria de organizar as informações sobre uma situação de exposição ou ataque na internet.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

type IconItem = {
  title: string;
  description?: string;
  icon: LucideIcon;
};

const situations: IconItem[] = [
  {
    title: "Exposição no TikTok, Instagram ou outras redes sociais",
    icon: ShieldAlert,
  },
  {
    title: "Influenciador ou perfil publicou mentiras sobre você",
    icon: MessageSquareWarning,
  },
  {
    title: "Vídeo viralizou e prejudicou sua reputação",
    icon: TrendingUp,
  },
  {
    title: "Ataques, ofensas ou ameaças na internet",
    icon: AlertTriangle,
  },
  {
    title: "Perfil falso usando nome, imagem ou dados",
    icon: UserX,
  },
  {
    title: "Divulgação sem autorização de foto, vídeo ou informação",
    icon: ImageOff,
  },
  {
    title: "Deepfake, montagem ou conteúdo criado por IA",
    icon: Bot,
  },
  {
    title: "Conta bloqueada, derrubada ou usada indevidamente",
    icon: LockKeyhole,
  },
];

const legalMeasures: IconItem[] = [
  { title: "Notificação extrajudicial", icon: FileText },
  {
    title: "Pedido de remoção de conteúdo ofensivo, quando cabível",
    icon: Shield,
  },
  { title: "Medidas contra perfis falsos", icon: Fingerprint },
  {
    title: "Tutela de urgência, quando houver risco ou dano atual",
    icon: Clock3,
  },
  { title: "Obrigação de fazer", icon: ClipboardList },
  { title: "Ação indenizatória, quando cabível", icon: Scale },
  { title: "Queixa-crime, quando cabível", icon: Gavel },
  {
    title:
      "Medidas legais para identificação de responsáveis, quando juridicamente possível",
    icon: Search,
  },
];

const steps = [
  "Você informa o que aconteceu",
  "As informações iniciais são organizadas",
  "A advogada analisa a situação",
  "Havendo viabilidade, são avaliadas as medidas jurídicas cabíveis",
];

const heroTopics = [
  "Exposição",
  "Difamação",
  "Perfil falso",
  "Deepfake",
  "Conteúdo ofensivo",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay,
            duration: 0.62,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p
        className={`text-[0.72rem] font-bold uppercase tracking-[0.26em] ${
          inverted ? "text-gold-light" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl ${
          inverted ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 md:text-lg ${
            inverted ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function PremiumButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  icon?: "arrow" | "message";
  className?: string;
}) {
  const Icon = icon === "message" ? MessageCircle : ArrowRight;

  return (
    <motion.a
      href={href}
      className={`premium-button premium-button--${variant} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      <span>{children}</span>
      <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
    </motion.a>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/88 shadow-[0_1px_34px_rgba(15,23,42,0.07)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a className="flex min-w-0 items-center gap-3" href="#inicio">
          <span className="grid size-12 shrink-0 place-items-center rounded-[1.15rem] border border-gold/35 bg-[linear-gradient(145deg,#08182d,#132b49)] text-sm font-bold text-white shadow-[0_16px_34px_rgba(12,29,53,0.2)]">
            {lawyer.initials}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold text-navy">
              {lawyer.name}
            </span>
            <span className="block text-xs font-medium text-slate-500">
              {lawyer.oab}
            </span>
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex"
        >
          <a className="nav-link" href="#situacoes">
            Situações
          </a>
          <a className="nav-link" href="#rapidez">
            Agir rápido
          </a>
          <a className="nav-link" href="#medidas">
            Medidas
          </a>
          <a className="nav-link" href="#triagem">
            Triagem
          </a>
        </nav>

        <div className="hidden sm:block">
          <PremiumButton href={whatsappHref} icon="message" variant="secondary">
            WhatsApp
          </PremiumButton>
        </div>
      </div>
    </header>
  );
}

function HeroPanel() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[520px]"
      initial={{ opacity: 0, x: 28, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-5 rounded-[2.3rem] border border-gold/20 bg-white/40 shadow-[0_35px_95px_rgba(12,29,53,0.14)] backdrop-blur-sm" />
      <div className="absolute -right-8 -top-8 size-28 rounded-full border border-gold/25 bg-gold/10 blur-[1px]" />
      <div className="relative overflow-hidden rounded-[2.1rem] border border-white/14 bg-[linear-gradient(145deg,#07172b,#142b49)] p-5 text-white shadow-[0_38px_98px_rgba(12,29,53,0.36)] sm:p-7">
        <div className="abstract-lines opacity-45" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-4 border-b border-white/12 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">
              Triagem digital
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
              Organização inicial do caso
            </h2>
          </div>
          <span className="grid size-[3.25rem] place-items-center rounded-2xl bg-white/10 text-gold-light ring-1 ring-white/10">
            <ShieldAlert aria-hidden="true" size={24} />
          </span>
        </div>

        <div className="relative mt-6 grid gap-3">
          {heroTopics.map((topic, index) => (
            <motion.div
              className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.105] px-4 py-3.5 text-sm font-semibold text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur"
              key={topic}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.45 + index * 0.08,
                duration: 0.45,
                ease: "easeOut",
              }}
            >
              <span className="flex items-center gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="text-gold-light"
                  size={17}
                />
                {topic}
              </span>
              <ChevronRight aria-hidden="true" size={17} />
            </motion.div>
          ))}
        </div>

        <div className="relative mt-7 rounded-3xl border border-gold/25 bg-[linear-gradient(135deg,rgba(212,181,116,0.16),rgba(255,255,255,0.07))] p-5">
          <p className="text-sm leading-6 text-slate-100">
            Prints, links, datas, perfis envolvidos e contexto ajudam a formar
            uma visão inicial mais clara para análise individual.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function IconCard({ item, index }: { item: IconItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.article
      className="premium-card group"
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="icon-box">
          <Icon aria-hidden="true" size={22} />
        </span>
        <span className="text-xs font-bold tracking-[0.18em] text-gold/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-pretty font-serif text-xl font-semibold leading-snug text-navy">
        {item.title}
      </h3>
    </motion.article>
  );
}

function MeasureCard({ item }: { item: IconItem }) {
  const Icon = item.icon;

  return (
    <motion.article className="measure-item" variants={fadeUp}>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold-light shadow-[0_16px_32px_rgba(12,29,53,0.18)]">
        <Icon aria-hidden="true" size={21} />
      </div>
      <h3 className="text-pretty text-base font-bold leading-6 text-navy">
        {item.title}
      </h3>
    </motion.article>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/90 p-3 shadow-[0_-18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:hidden">
      <PremiumButton
        className="w-full justify-center"
        href="#triagem"
        variant="primary"
      >
        Falar sobre meu caso
      </PremiumButton>
    </div>
  );
}

export function PremiumLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-slate-900">
      <Header />

      <section
        id="inicio"
        className="hero-surface relative isolate min-h-screen overflow-hidden pt-[5.5rem]"
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.98),rgba(247,246,242,0.93)_43%,rgba(226,233,242,0.72))]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_top_left,rgba(176,139,69,0.18),transparent_39%),radial-gradient(ellipse_at_top_right,rgba(12,29,53,0.16),transparent_43%)]" />
        <div className="abstract-grid absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/82 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-navy shadow-[0_12px_34px_rgba(15,23,42,0.06)] backdrop-blur"
              variants={fadeUp}
            >
              <Sparkles aria-hidden="true" size={14} className="text-gold" />
              Atendimento jurídico para demandas digitais
            </motion.p>
            <motion.h1
              className="mt-7 max-w-[12ch] text-balance font-serif text-[3.35rem] font-semibold leading-[0.95] text-navy sm:text-6xl lg:text-[5.35rem]"
              variants={fadeUp}
            >
              Foi exposto, atacado ou difamado na internet?
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-650 sm:text-xl sm:leading-9"
              variants={fadeUp}
            >
              Atuação jurídica para vítimas de conteúdos ofensivos, perfis
              falsos, uso indevido de imagem, fake news, deepfakes, ataques em
              redes sociais e divulgação não autorizada de vídeos, fotos ou
              informações pessoais.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp}
            >
              <PremiumButton href="#triagem">Falar sobre meu caso</PremiumButton>
              <PremiumButton href="#como-funciona" variant="secondary">
                Entender como funciona
              </PremiumButton>
            </motion.div>
            <motion.p
              className="mt-5 flex max-w-xl items-start gap-2 text-sm font-medium leading-6 text-slate-600"
              variants={fadeUp}
            >
              <BadgeAlert
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold"
                size={17}
              />
              Atendimento inicial para triagem. A análise jurídica é feita pela
              advogada responsável.
            </motion.p>
          </motion.div>

          <HeroPanel />
        </div>
      </section>

      <section id="situacoes" className="section-padding bg-white">
        <SectionHeader
          eyebrow="Quando procurar análise"
          title="Situações que podem exigir análise jurídica"
          description="Casos digitais costumam envolver contexto, provas, urgência e limites legais. A triagem ajuda a organizar esses pontos com cautela."
        />
        <motion.div
          className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          {situations.map((item, index) => (
            <IconCard item={item} index={index} key={item.title} />
          ))}
        </motion.div>
      </section>

      <section id="rapidez" className="section-padding relative bg-navy text-white">
        <div className="abstract-lines opacity-35" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <Reveal>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold-light">
              Preservação de contexto
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Por que agir rápido pode ser importante
            </h2>
          </Reveal>
          <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.18)] backdrop-blur md:p-8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-light ring-1 ring-gold/20">
              <CalendarClock aria-hidden="true" size={24} />
            </div>
            <p className="text-pretty text-lg leading-9 text-slate-100 md:text-xl">
              Em situações de exposição digital, o tempo pode aumentar o alcance
              do conteúdo, os danos à reputação e a dificuldade de preservação
              das provas. Por isso, é importante organizar prints, links, datas
              e demais informações para análise jurídica individual.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="medidas" className="section-padding bg-paper">
        <SectionHeader
          eyebrow="Caminhos possíveis"
          title="Medidas jurídicas que podem ser avaliadas"
          description="As providências dependem das provas, da urgência, da plataforma envolvida e da viabilidade jurídica do caso concreto."
        />
        <motion.div
          className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          {legalMeasures.map((item) => (
            <MeasureCard item={item} key={item.title} />
          ))}
        </motion.div>
      </section>

      <section id="como-funciona" className="section-padding bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <Reveal>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold">
              Fluxo de atendimento
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
              Como funciona o atendimento
            </h2>
            <p className="mt-5 text-pretty text-lg leading-8 text-slate-600">
              Um processo inicial claro, com foco em organizar fatos e permitir
              uma análise individual responsável.
            </p>
          </Reveal>

          <motion.ol
            className="relative grid gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
          >
            {steps.map((step, index) => (
              <motion.li className="timeline-step" variants={fadeUp} key={step}>
                <span className="timeline-step__number">{index + 1}</span>
                <p>{step}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_36%),radial-gradient(ellipse_at_bottom_right,rgba(176,139,69,0.18),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal className="relative min-h-[460px] overflow-hidden rounded-[2.2rem] border border-gold/25 bg-white/[0.06] shadow-[0_34px_88px_rgba(0,0,0,0.24)]">
            <div className="absolute inset-6 rounded-[1.5rem] border border-white/10" />
            <div className="abstract-grid absolute inset-0 opacity-30" />
            <div className="absolute left-8 top-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light backdrop-blur">
              <ScrollText aria-hidden="true" size={15} />
              Direito digital
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-3xl border border-white/10 bg-navy/72 p-5 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-light">
                  Foto profissional
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Espaço preparado para inserir uma imagem profissional da
                  advogada.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="self-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold-light">
              Sobre a advogada
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
              {lawyer.name}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-100">
              <span className="pill-dark">
                <Landmark aria-hidden="true" size={16} />
                {lawyer.oab}
              </span>
              <span className="pill-dark">
                <MapPin aria-hidden="true" size={16} />
                {lawyer.location}
              </span>
            </div>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-9 text-slate-200">
              Breve apresentação institucional sobre a atuação em demandas
              digitais, condução cuidadosa de casos sensíveis, organização de
              provas e atendimento individualizado. Este espaço pode receber
              formação, trajetória profissional e abordagem de trabalho.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="triagem" className="section-padding bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <Reveal>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold">
              Formulário de triagem
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
              Organize as informações do seu caso
            </h2>
            <p className="mt-5 text-pretty text-lg leading-8 text-slate-600">
              Envie um relato inicial com os principais dados. As informações
              ajudam a estruturar a triagem antes da análise jurídica individual.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-600">
              {[
                "Campos objetivos para reduzir idas e vindas",
                "Captura de origem e UTMs para controle do atendimento",
                "Canal alternativo pelo WhatsApp",
              ].map((item) => (
                <p className="flex items-center gap-3" key={item}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="shrink-0 text-gold"
                    size={18}
                  />
                  {item}
                </p>
              ))}
            </div>
            <PremiumButton
              className="mt-8"
              href={whatsappHref}
              icon="message"
              variant="secondary"
            >
              Falar pelo WhatsApp
            </PremiumButton>
          </Reveal>

          <Reveal delay={0.08}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy p-7 text-white shadow-[0_28px_80px_rgba(12,29,53,0.18)] md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold-light">
                Próximo passo
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold md:text-5xl">
                Precisa organizar uma situação de exposição ou ataque na internet?
              </h2>
              <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-slate-200">
                Envie as informações iniciais para triagem. A análise individual
                será realizada pela advogada responsável.
              </p>
            </div>
            <PremiumButton href="#triagem" variant="light">
              Falar sobre meu caso
            </PremiumButton>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-slate-200/80 bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-gold/12 text-gold sm:flex">
              <BadgeAlert aria-hidden="true" size={22} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-navy">
                Aviso jurídico
              </h2>
              <p className="mt-3 text-pretty text-base leading-8 text-slate-600">
                As informações deste site possuem caráter informativo. O contato
                inicial não configura promessa de resultado, consulta jurídica
                automática ou aceitação do caso. A análise individual será
                realizada pela advogada responsável, conforme as informações e
                documentos apresentados.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#07172b,#0b1b32_55%,#102844)] px-4 pb-24 pt-14 text-slate-200 sm:px-6 sm:pb-14 lg:px-8">
        <div className="abstract-lines opacity-20" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[1.15rem] border border-gold/35 bg-white/8 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
                {lawyer.initials}
              </span>
              <div>
                <p className="font-bold text-white">{lawyer.name}</p>
                <p className="text-sm text-slate-300">{lawyer.oab}</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
              Atuação jurídica para organização inicial e análise individual de
              demandas digitais sensíveis.
            </p>
            <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" size={16} className="text-gold-light" />
                {lawyer.whatsappLabel}
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" size={16} className="text-gold-light" />
                {lawyer.email}
              </p>
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" size={16} className="text-gold-light" />
                {lawyer.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold lg:items-end">
            <a className="footer-link" href={whatsappHref}>
              WhatsApp
            </a>
            <Link className="footer-link" href="/politica-de-privacidade">
              Política de privacidade
            </Link>
          </div>
        </div>
      </footer>

      <MobileStickyCta />
    </main>
  );
}
