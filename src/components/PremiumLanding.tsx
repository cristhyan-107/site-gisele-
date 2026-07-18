"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { trackWhatsappClick } from "@/lib/analytics";

const lawyer = {
  initials: "GG",
  name: "Dra. Gisele Gabriel",
  title: "Advogada",
  oab: "OAB/GO 57.455",
  location: "Goiânia - GO",
  email: "gisgabri.adv@gmail.com",
  whatsappLabel: "(62) 99292-8498",
  whatsappNumber: "5562992928498",
};

const whatsappMessages = {
  generic:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial do meu caso.",
  healthPlan:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um problema com plano de saúde.",
  insurance:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um problema com seguro.",
  blockedAccount:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre uma conta bloqueada.",
  bankingFraud:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um golpe bancário.",
  airline:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um problema com companhia aérea.",
  digital:
    "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um caso envolvendo ataques, exposição ou prejuízo à reputação na internet.",
};

function buildWhatsappHref(message: string) {
  return `https://wa.me/${lawyer.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

const portraitSrc = "/images/dra-gisele-gabriel.jpg";
const portraitAlt =
  "Retrato profissional da Dra. Gisele Gabriel em seu escritório";

type LandingPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  problem: string;
  examples: string[];
  evidence: string;
  measures: string[];
};

type PracticeArea = {
  title: string;
  description: string;
  items: string[];
  cta: string;
  message: string;
  icon: LucideIcon;
};

const navigation = [
  { label: "Início", href: "/#inicio" },
  { label: "Áreas de atuação", href: "/#areas-de-atuacao" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Perguntas frequentes", href: "/#perguntas-frequentes" },
  { label: "Fale conosco", href: "/#contato" },
];

const practiceAreas: PracticeArea[] = [
  {
    title: "Planos de saúde",
    description:
      "Atuação em casos de negativas de tratamentos, cirurgias, exames, medicamentos, internações, home care e outros procedimentos indicados ao paciente.",
    items: [
      "Negativa de cobertura",
      "Tratamentos e medicamentos",
      "Cirurgias e exames",
      "Internações e home care",
    ],
    cta: "Falar sobre plano de saúde",
    message: whatsappMessages.healthPlan,
    icon: HeartPulse,
  },
  {
    title: "Seguros",
    description:
      "Análise de problemas relacionados a seguros de vida, automóvel e outras coberturas, incluindo negativas, pagamentos parciais e demora no atendimento do sinistro.",
    items: [
      "Seguro de vida",
      "Seguro de automóvel",
      "Negativa de indenização",
      "Análise de apólice",
    ],
    cta: "Falar sobre seguro",
    message: whatsappMessages.insurance,
    icon: ShieldCheck,
  },
  {
    title: "Contas bloqueadas",
    description:
      "Atendimento para pessoas e empresas que perderam acesso a contas, perfis ou plataformas utilizadas para comunicação, trabalho, vendas ou prestação de serviços.",
    items: [
      "Instagram e Facebook",
      "WhatsApp Business",
      "Uber e aplicativos",
      "Mercado Livre e marketplaces",
    ],
    cta: "Falar sobre conta bloqueada",
    message: whatsappMessages.blockedAccount,
    icon: LockKeyhole,
  },
  {
    title: "Golpes bancários",
    description:
      "Análise de fraudes envolvendo Pix, transferências, empréstimos, cartões, contas invadidas e outras operações bancárias não reconhecidas.",
    items: [
      "Pix e transferências",
      "Empréstimos não contratados",
      "Cartão clonado",
      "Conta invadida",
    ],
    cta: "Falar sobre golpe bancário",
    message: whatsappMessages.bankingFraud,
    icon: Landmark,
  },
  {
    title: "Companhias aéreas",
    description:
      "Atendimento em situações envolvendo cancelamentos, atrasos, perda de conexão, problemas com bagagem, falta de assistência e reembolsos.",
    items: [
      "Voos cancelados ou atrasados",
      "Perda de conexão",
      "Extravio de bagagem",
      "Falta de assistência",
    ],
    cta: "Falar sobre problema com voo",
    message: whatsappMessages.airline,
    icon: Plane,
  },
];

const serviceSteps = [
  {
    title: "Conte o que aconteceu",
    description: "Explique resumidamente a situação pelo WhatsApp.",
  },
  {
    title: "Envie as informações",
    description:
      "Compartilhe documentos, protocolos, prints e comprovantes disponíveis.",
  },
  {
    title: "Análise inicial",
    description:
      "A equipe organiza as informações para avaliação jurídica.",
  },
  {
    title: "Continuidade do atendimento",
    description:
      "Após a análise inicial, a equipe informa os próximos passos aplicáveis ao caso.",
  },
];

const differentials = [
  {
    title: "Atendimento inicial pelo WhatsApp",
    icon: MessageCircle,
  },
  {
    title: "Comunicação clara e sem excesso de termos técnicos",
    icon: FileText,
  },
  {
    title: "Organização das informações e documentos",
    icon: ClipboardCheck,
  },
  {
    title: "Atendimento online",
    icon: Smartphone,
  },
  {
    title: "Análise individual de cada situação",
    icon: Search,
  },
  {
    title: "Continuidade do atendimento pela equipe jurídica",
    icon: Scale,
  },
];

const frequentlyAskedQuestions = [
  {
    question: "O atendimento pode ser feito online?",
    answer:
      "Sim. O atendimento inicial pode ser realizado pelo WhatsApp, permitindo o envio de informações e documentos para análise.",
  },
  {
    question: "Quais documentos devo enviar?",
    answer:
      "Depende do tipo de problema. Podem ser úteis contratos, protocolos, negativas, laudos, receitas, apólices, extratos, comprovantes, bilhetes, e-mails e prints.",
  },
  {
    question: "Enviar uma mensagem significa que meu caso foi aceito?",
    answer:
      "Não. O primeiro contato serve para compreender a situação. A viabilidade e os próximos passos dependem de análise jurídica.",
  },
  {
    question: "Existe garantia de resultado?",
    answer:
      "Não. Cada situação possui fatos, documentos e circunstâncias próprias. Nenhum resultado pode ser garantido antecipadamente.",
  },
  {
    question: "Posso enviar prints e documentos pelo WhatsApp?",
    answer:
      "Sim. Durante o atendimento inicial, a equipe poderá solicitar os documentos relevantes para compreender o caso.",
  },
  {
    question: "Meu caso é urgente. O que devo fazer?",
    answer:
      "Informe logo no início do atendimento qual é a urgência, as datas envolvidas e o risco atual, para que a equipe possa compreender a situação.",
  },
  {
    question: "O primeiro atendimento já é uma consulta jurídica?",
    answer:
      "O contato inicial tem a finalidade de coletar e organizar informações. Orientações jurídicas dependem da avaliação da profissional responsável.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.14 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

function WhatsAppButton({
  children = "Falar pelo WhatsApp",
  message = whatsappMessages.generic,
  variant = "secondary",
  className = "",
  ariaLabel,
  trackingArea = "geral",
  trackingLocation = "nao_informada",
}: {
  children?: React.ReactNode;
  message?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  ariaLabel?: string;
  trackingArea?: string;
  trackingLocation?: string;
}) {
  const trackingCta =
    typeof children === "string" ? children : "Falar pelo WhatsApp";

  return (
    <motion.a
      aria-label={ariaLabel}
      className={`premium-button premium-button--${variant} ${className}`}
      href={buildWhatsappHref(message)}
      onClick={() =>
        trackWhatsappClick({
          area: trackingArea,
          cta: trackingCta,
          location: trackingLocation,
        })
      }
      rel="noreferrer"
      target="_blank"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      <span>{children}</span>
      <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
    </motion.a>
  );
}

function PrimaryAnchor({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  return (
    <motion.a
      className={`premium-button premium-button--${variant}`}
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
    </motion.a>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function closeOnDesktop() {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/94 shadow-[0_1px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <a
        className="sr-only rounded-md bg-white px-4 py-3 font-bold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        href="#conteudo-principal"
      >
        Pular para o conteúdo principal
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          aria-label="Ir para o início da página da Dra. Gisele Gabriel"
          className="flex min-w-0 items-center gap-3"
          href="/#inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-gold/35 bg-navy text-sm font-bold text-white">
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
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-5 text-[0.82rem] font-semibold text-slate-600 xl:flex"
        >
          {navigation.map((item) => (
            <Link className="nav-link whitespace-nowrap" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton
            ariaLabel="Falar com a equipe da Dra. Gisele Gabriel pelo WhatsApp"
            trackingLocation="header_desktop"
          >
            Falar com a equipe
          </WhatsAppButton>
        </div>

        <button
          aria-controls="menu-mobile"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 place-items-center rounded-lg border border-slate-200 bg-white text-navy shadow-sm transition hover:border-gold/50 xl:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={21} />
          ) : (
            <Menu aria-hidden="true" size={21} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-[0_18px_35px_rgba(15,23,42,0.08)] sm:px-6 xl:hidden"
          exit={{ opacity: 0, y: -10 }}
          id="menu-mobile"
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav
            aria-label="Navegação mobile"
            className="mx-auto grid max-w-7xl gap-1"
          >
            {navigation.map((item) => (
              <Link
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-650 transition hover:bg-paper hover:text-navy"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <WhatsAppButton
              ariaLabel="Falar com a equipe da Dra. Gisele Gabriel pelo WhatsApp"
              className="mt-3"
              trackingLocation="menu_mobile"
              variant="primary"
            >
              Falar com a equipe
            </WhatsAppButton>
          </nav>
        </motion.div>
        ) : null}
      </AnimatePresence>
      </header>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Fechar menu"
            className="fixed inset-0 z-40 cursor-default bg-navy/15 backdrop-blur-[2px] xl:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function LawyerPortrait() {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <motion.div
        animate={{ rotate: [0, 1.4, -0.8, 0], scale: [1, 1.018, 1] }}
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] border border-gold/15 bg-[linear-gradient(145deg,rgba(167,125,53,0.12),transparent_55%)]"
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(12,29,53,0.16)]">
        {hasImageError ? (
          <div className="grid min-h-[520px] place-items-center bg-[linear-gradient(135deg,#f8fafc,#eef2f7)] p-8 text-center">
            <div>
              <div className="mx-auto grid size-20 place-items-center rounded-lg bg-navy text-2xl font-bold text-white">
                {lawyer.initials}
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Foto profissional
              </p>
              <p className="mt-3 text-lg font-semibold text-navy">
                Dra. Gisele Gabriel
              </p>
            </div>
          </div>
        ) : (
          <Image
            alt={portraitAlt}
            className="aspect-[3/4] h-auto w-full object-cover object-[center_38%]"
            height={1448}
            onError={() => setHasImageError(true)}
            priority
            sizes="(max-width: 1023px) 92vw, 44vw"
            src={portraitSrc}
            width={1086}
          />
        )}
      </div>
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/70 bg-white/94 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.14)] backdrop-blur">
        <p className="font-serif text-xl font-semibold text-navy">
          {lawyer.name}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          {lawyer.title} · {lawyer.oab}
        </p>
      </div>
    </div>
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
        className={`text-[0.72rem] font-bold uppercase tracking-[0.24em] ${
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

function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f6f8fb)] pt-[5.5rem]"
      id="inicio"
    >
      <div className="abstract-grid absolute inset-0 -z-10 opacity-70" />
      <motion.div
        animate={{ x: [0, -24, 8, 0], y: [0, 18, -8, 0] }}
        aria-hidden="true"
        className="absolute -right-32 top-28 -z-10 size-[32rem] rounded-full bg-gold/8 blur-3xl"
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ rotate: [0, 9, 0], y: [0, -18, 0] }}
        aria-hidden="true"
        className="absolute -left-20 bottom-20 -z-10 size-52 rounded-[3rem] border border-gold/10 bg-white/55 shadow-2xl backdrop-blur"
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-navy shadow-sm"
            variants={fadeUp}
          >
            <Scale aria-hidden="true" size={15} className="text-gold" />
            Atendimento jurídico claro e individualizado
          </motion.p>
          <motion.h1
            className="mt-7 max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.04] text-navy sm:text-6xl lg:text-[4.25rem]"
            variants={fadeUp}
          >
            Orientação jurídica para situações que exigem atenção e agilidade
          </motion.h1>
          <motion.p
            className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-slate-650 sm:text-xl sm:leading-9"
            variants={fadeUp}
          >
            Atendimento jurídico em questões envolvendo planos de saúde,
            seguros, contas bloqueadas, golpes bancários e problemas com
            companhias aéreas.
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-8 text-navy"
            variants={fadeUp}
          >
            Conte o que aconteceu e envie as informações iniciais para que a
            equipe da Dra. Gisele Gabriel possa compreender o seu caso.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <WhatsAppButton
              ariaLabel="Solicitar análise inicial pelo WhatsApp"
              trackingLocation="hero"
              variant="primary"
            >
              Solicitar análise inicial
            </WhatsAppButton>
            <PrimaryAnchor href="#areas-de-atuacao" variant="secondary">
              Conhecer áreas de atuação
            </PrimaryAnchor>
          </motion.div>
          <motion.div
            className="mt-7 grid max-w-3xl gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2"
            variants={fadeUp}
          >
            {[
              "Atendimento inicial facilitado pelo WhatsApp",
              "Atendimento online e análise individual",
            ].map((item) => (
              <p className="flex items-center gap-2" key={item}>
                <CheckCircle2
                  aria-hidden="true"
                  className="shrink-0 text-gold"
                  size={17}
                />
                {item}
              </p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.56 }}
        >
          <LawyerPortrait />
        </motion.div>
      </div>
    </section>
  );
}

function PracticeAreasSection() {
  return (
    <section
      className="section-padding scroll-mt-24 bg-paper"
      id="areas-de-atuacao"
    >
      <SectionHeader
        eyebrow="Áreas de atuação"
        title="Como podemos ajudar"
        description="Conheça algumas das situações atendidas pela equipe da Dra. Gisele Gabriel."
      />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.08 }}
        whileInView="visible"
      >
        {practiceAreas.map((area, index) => {
          const Icon = area.icon;
          const spanClass =
            index < 2
              ? "lg:col-span-3"
              : index === practiceAreas.length - 1
                ? "md:col-span-2 lg:col-span-2"
                : "lg:col-span-2";

          return (
            <motion.article
              className={`practice-card ${spanClass}`}
              key={area.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <span className="font-serif text-4xl text-gold/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-navy">
                {area.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">
                {area.description}
              </p>
              <ul className="mt-5 grid gap-2.5 text-sm font-semibold leading-6 text-slate-650">
                {area.items.map((item) => (
                  <li className="flex items-start gap-2.5" key={item}>
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-gold"
                      size={16}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                ariaLabel={`${area.cta} pelo WhatsApp`}
                className="mt-7 w-full"
                message={area.message}
                trackingArea={area.title}
                trackingLocation="card_area_atuacao"
                variant="secondary"
              >
                {area.cta}
              </WhatsAppButton>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function UrgentSection() {
  return (
    <section className="bg-paper px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#07172b,#102b4b)] p-7 text-white shadow-[0_28px_80px_rgba(12,29,53,0.2)] md:p-10">
        <div className="abstract-lines opacity-35" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <span className="grid size-14 place-items-center rounded-2xl border border-gold-light/30 bg-white/8 text-gold-light">
            <AlertTriangle aria-hidden="true" size={25} />
          </span>
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              Seu caso precisa de atenção rápida?
            </h2>
            <p className="mt-4 max-w-4xl text-pretty text-base leading-8 text-slate-200">
              Negativas de tratamento, fraudes em andamento, contas
              profissionais bloqueadas e viagens sem solução podem exigir
              providências rápidas. Envie as informações iniciais para a equipe
              avaliar a situação.
            </p>
          </div>
          <WhatsAppButton
            ariaLabel="Falar com a equipe sobre um caso urgente pelo WhatsApp"
            trackingLocation="faixa_urgencia"
            variant="light"
          >
            Falar com a equipe
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      className="section-padding scroll-mt-24 bg-white"
      id="como-funciona"
    >
      <SectionHeader
        eyebrow="Primeiro contato"
        title="Como funciona o atendimento"
        description="Um fluxo simples para organizar as informações iniciais e compreender a situação apresentada."
      />
      <motion.ol
        className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.12 }}
        whileInView="visible"
      >
        {serviceSteps.map((step, index) => (
          <motion.li
            className="timeline-step relative min-h-52 content-start"
            key={step.title}
            variants={fadeUp}
          >
            <span className="timeline-step__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-bold leading-7 text-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-normal leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
      <Reveal className="mx-auto mt-8 max-w-4xl px-4 text-center text-sm font-semibold leading-7 text-slate-500 sm:px-6">
        O envio das informações não representa contratação automática nem
        garantia de resultado.
      </Reveal>
    </section>
  );
}

function DifferentialsSection() {
  return (
    <section className="section-padding bg-paper">
      <SectionHeader
        eyebrow="Organização e comunicação"
        title="Atendimento jurídico claro e organizado"
      />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.12 }}
        whileInView="visible"
      >
        {differentials.map((item) => {
          const Icon = item.icon;

          return (
            <motion.article
              className="measure-item min-h-32"
              key={item.title}
              variants={fadeUp}
            >
              <span className="icon-box shrink-0">
                <Icon aria-hidden="true" size={21} />
              </span>
              <h3 className="text-base font-bold leading-7 text-navy">
                {item.title}
              </h3>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section-padding scroll-mt-24 bg-white" id="sobre">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
            Sobre a profissional
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
            Experiência jurídica com atendimento objetivo e individualizado
          </h2>
          <div className="mt-8 grid gap-3">
            {[
              { icon: Scale, text: lawyer.oab },
              {
                icon: GraduationCap,
                text: "Graduada em Direito pela Universidade Federal de Goiás (UFG)",
              },
              { icon: BriefcaseBusiness, text: "Atuação jurídica desde 2014" },
              {
                icon: MapPin,
                text: "Atendimento online e presencial em Goiânia quando necessário",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <p
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-paper px-4 py-3 text-sm font-semibold leading-6 text-slate-650"
                  key={item.text}
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-gold"
                    size={18}
                  />
                  {item.text}
                </p>
              );
            })}
          </div>
        </Reveal>
        <Reveal className="grid content-center gap-5 text-pretty text-lg leading-9 text-slate-600">
          <p>
            A Dra. Gisele Gabriel atua na análise e condução de questões
            jurídicas que afetam a saúde, o patrimônio, a atividade profissional
            e os direitos do consumidor.
          </p>
          <p>
            O atendimento é realizado de forma organizada, objetiva e
            individualizada, considerando os fatos, os documentos e as
            circunstâncias próprias de cada situação.
          </p>
          <p>
            As medidas aplicáveis e a continuidade do atendimento dependem de
            avaliação jurídica e das informações apresentadas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DigitalLawSection() {
  const digitalPages = [
    {
      title: "Difamação na internet",
      href: "/lp/difamacao",
    },
    {
      title: "Perfil falso",
      href: "/lp/perfil-falso",
    },
    {
      title: "Uso indevido de imagem",
      href: "/lp/uso-indevido-de-imagem",
    },
  ];

  return (
    <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <Reveal className="mx-auto grid max-w-7xl gap-8 rounded-[1.65rem] border border-slate-200 bg-paper p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
            Área complementar
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-navy">
            Direito digital e reputação online
          </h2>
          <p className="mt-4 text-pretty text-base leading-8 text-slate-600">
            Situações envolvendo exposição indevida, perfis falsos e ataques à
            reputação continuam sendo analisadas como área complementar de
            atuação.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {digitalPages.map((page) => (
            <Link
              className="group flex min-h-32 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-md"
              href={page.href}
              key={page.href}
            >
              <span className="font-serif text-xl font-semibold">
                {page.title}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                Saiba mais
                <ArrowRight
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                  size={16}
                />
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FormSection() {
  return (
    <section
      className="section-padding scroll-mt-24 bg-[linear-gradient(180deg,#f5f2ec,#ffffff)]"
      id="contato"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
            Fale conosco
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
            Envie as informações iniciais do seu caso
          </h2>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-600">
            Use o formulário para organizar os dados principais ou, se preferir,
            inicie o atendimento diretamente pelo WhatsApp.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-600">
            {[
              "Campos objetivos para organizar a situação",
              "Espaço para indicar documentos e protocolos disponíveis",
              "Canal alternativo pelo WhatsApp oficial",
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
          <WhatsAppButton
            ariaLabel="Solicitar análise inicial pelo WhatsApp"
            className="mt-8"
            trackingLocation="secao_formulario"
          >
            Falar pelo WhatsApp
          </WhatsAppButton>
        </Reveal>

        <Reveal>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      className="section-padding scroll-mt-24 bg-white"
      id="perguntas-frequentes"
    >
      <SectionHeader
        eyebrow="Dúvidas comuns"
        title="Perguntas frequentes"
        description="Informações gerais sobre o primeiro contato e a organização do atendimento."
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-3 px-4 sm:px-6 lg:px-8">
        {frequentlyAskedQuestions.map((item) => (
          <details className="faq-item group" key={item.question}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left font-bold leading-7 text-navy">
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
                size={20}
              />
            </summary>
            <p className="border-t border-slate-200 px-5 py-5 text-pretty text-sm leading-7 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white shadow-[0_28px_80px_rgba(12,29,53,0.18)] md:p-10">
        <div className="abstract-lines opacity-30" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-light">
              Próximo passo
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold md:text-5xl">
              Precisa de orientação sobre o seu caso?
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-slate-200">
              Envie uma mensagem, conte brevemente o que aconteceu e receba as
              instruções para iniciar o atendimento.
            </p>
          </div>
          <WhatsAppButton
            ariaLabel="Solicitar análise inicial pelo WhatsApp"
            trackingLocation="cta_final"
            variant="light"
          >
            Solicitar análise inicial pelo WhatsApp
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#07172b,#0b1b32_55%,#102844)] px-4 pb-24 pt-14 text-slate-200 sm:px-6 sm:pb-14 lg:px-8">
      <div className="abstract-lines opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-lg border border-gold/35 bg-white/8 text-sm font-bold text-white">
                {lawyer.initials}
              </span>
              <div>
                <p className="font-bold text-white">{lawyer.name}</p>
                <p className="text-sm text-slate-300">
                  {lawyer.title} · {lawyer.oab}
                </p>
              </div>
            </div>
            <div className="mt-5 grid max-w-4xl gap-2 text-sm leading-7 text-slate-300 md:grid-cols-2">
              <p className="flex items-center gap-3">
                <MapPin
                  aria-hidden="true"
                  size={16}
                  className="text-gold-light"
                />
                {lawyer.location}
              </p>
              <p>Atendimento online para todo o Estado de Goiás</p>
              <p>Presencial em Goiânia quando necessário</p>
              <p className="flex items-center gap-3">
                <Mail
                  aria-hidden="true"
                  size={16}
                  className="text-gold-light"
                />
                E-mail: {lawyer.email}
              </p>
              <p className="flex items-center gap-3">
                <MessageCircle
                  aria-hidden="true"
                  size={16}
                  className="text-gold-light"
                />
                WhatsApp: {lawyer.whatsappLabel}
              </p>
            </div>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-col gap-4 text-sm font-semibold lg:items-end"
          >
            <Link className="footer-link" href="/politica-de-privacidade">
              Política de Privacidade
            </Link>
            <Link className="footer-link" href="/#areas-de-atuacao">
              Áreas de atuação
            </Link>
            <a
              className="footer-link"
              href={buildWhatsappHref(whatsappMessages.generic)}
              onClick={() =>
                trackWhatsappClick({
                  cta: "WhatsApp",
                  location: "rodape",
                })
              }
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-slate-400">
          <p>
            As informações deste site possuem caráter exclusivamente informativo
            e não representam promessa ou garantia de resultado.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCta({
  message = whatsappMessages.generic,
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-white/94 p-3 shadow-[0_-18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:hidden">
      <WhatsAppButton
        ariaLabel="Solicitar análise inicial pelo WhatsApp"
        className="w-full"
        message={message}
        trackingLocation="cta_fixo_mobile"
        variant="primary"
      >
        Solicitar análise inicial
      </WhatsAppButton>
    </div>
  );
}

export function PremiumLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <main
        className="min-h-screen overflow-hidden bg-paper text-slate-900"
        id="conteudo-principal"
      >
        <Header />
        <Hero />
        <PracticeAreasSection />
        <UrgentSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <AboutSection />
        <DigitalLawSection />
        <FormSection />
        <FaqSection />
        <FinalCta />
        <Footer />
        <MobileStickyCta />
      </main>
    </MotionConfig>
  );
}

function LandingHero({ content }: { content: LandingPageContent }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f6f8fb)] pt-[5.5rem]">
      <div className="abstract-grid absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-navy shadow-sm"
            variants={fadeUp}
          >
            <Search aria-hidden="true" size={15} className="text-gold" />
            {content.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-7 text-balance font-serif text-4xl font-semibold leading-tight text-navy sm:text-6xl"
            variants={fadeUp}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl text-pretty text-lg leading-9 text-slate-650"
            variants={fadeUp}
          >
            {content.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <PrimaryAnchor href="#contato">
              Solicitar análise inicial do caso
            </PrimaryAnchor>
            <WhatsAppButton
              message={whatsappMessages.digital}
              trackingArea={content.eyebrow}
              trackingLocation="hero_landing_digital"
            >
              Falar pelo WhatsApp
            </WhatsAppButton>
          </motion.div>
        </motion.div>
        <LawyerPortrait />
      </div>
    </section>
  );
}

function LandingContent({ content }: { content: LandingPageContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
            O que pode ser avaliado
          </h2>
          <p className="mt-5 text-pretty text-lg leading-9 text-slate-600">
            {content.problem}
          </p>
          <p className="mt-5 text-pretty text-base leading-8 text-slate-600">
            {content.evidence}
          </p>
        </Reveal>
        <Reveal className="grid gap-5">
          <div className="rounded-lg border border-slate-200 bg-paper p-6">
            <h3 className="font-serif text-2xl font-semibold text-navy">
              Exemplos comuns
            </h3>
            <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-slate-650">
              {content.examples.map((example) => (
                <li className="flex gap-3" key={example}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-gold"
                    size={17}
                  />
                  {example}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-2xl font-semibold text-navy">
              Medidas que podem ser analisadas
            </h3>
            <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-slate-650">
              {content.measures.map((measure) => (
                <li className="flex gap-3" key={measure}>
                  <Scale
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-gold"
                    size={17}
                  />
                  {measure}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InitialContactSection() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-light">
            Análise inicial
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl">
            Organize as informações do caso
          </h2>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-9 text-slate-200">
            No primeiro contato, informe o que aconteceu, as datas relevantes e
            quais documentos, links ou registros estão disponíveis.
          </p>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-9 text-slate-200">
            A viabilidade e os próximos passos dependem de análise individual
            pela profissional responsável.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-3">
          <PrimaryAnchor href="#contato" variant="light">
            Enviar informações
          </PrimaryAnchor>
          <WhatsAppButton
            message={whatsappMessages.digital}
            trackingArea="Direito digital e reputação online"
            trackingLocation="analise_landing_digital"
            variant="light"
          >
            Falar pelo WhatsApp
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

function LegalNotice() {
  return (
    <section className="border-y border-slate-200/80 bg-paper px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <div className="flex items-start gap-4">
          <BadgeAlert
            aria-hidden="true"
            className="mt-1 hidden shrink-0 text-gold sm:block"
            size={24}
          />
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
  );
}

export function LandingPageTemplate({
  content,
}: {
  content: LandingPageContent;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <main
        className="min-h-screen overflow-hidden bg-paper text-slate-900"
        id="conteudo-principal"
      >
        <Header />
        <LandingHero content={content} />
        <LandingContent content={content} />
        <InitialContactSection />
        <FormSection />
        <LegalNotice />
        <Footer />
        <MobileStickyCta message={whatsappMessages.digital} />
      </main>
    </MotionConfig>
  );
}
