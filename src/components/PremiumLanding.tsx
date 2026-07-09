"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Building2,
  CheckCircle2,
  FileText,
  Fingerprint,
  Gavel,
  ImageOff,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  Store,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { trackWhatsappClick } from "@/lib/analytics";

const lawyer = {
  initials: "GG",
  name: "Dra. Gisele Gabriel",
  title: "Advogada",
  oab: "OAB/GO 57.455",
  location: "Goiânia - GO",
  email: "gisgabri.adv@gmail.com",
  whatsappLabel: "(62) 99488-8233",
  whatsappNumber: "5562994888233",
};

const whatsappMessage =
  "Olá, vim pelo site da Dra. Gisele Gabriel e gostaria de solicitar uma análise inicial sobre um caso envolvendo ataques, exposição ou prejuízo à reputação na internet.";
const whatsappHref = `https://wa.me/${lawyer.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
const portraitSrc = "/images/dra-gisele-gabriel.jpg";
const portraitAlt =
  "Dra. Gisele Gabriel, advogada inscrita na OAB/GO 57.455";

type IconItem = {
  title: string;
  description?: string;
  icon: LucideIcon;
};

type LandingPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  problem: string;
  examples: string[];
  evidence: string;
  measures: string[];
};

const audience: IconItem[] = [
  { title: "Pessoas físicas", icon: UserRound },
  { title: "Empresários", icon: Building2 },
  { title: "Pequenos empresários", icon: Store },
  { title: "Lojas e comércio", icon: Store },
  { title: "Clínicas e consultórios", icon: Building2 },
  { title: "Prestadores de serviço", icon: UsersRound },
  { title: "Profissionais liberais", icon: Landmark },
  { title: "Empreendedores", icon: Shield },
  { title: "Influenciadores", icon: MessageCircle },
  { title: "Criadores de conteúdo", icon: FileText },
];

const cases: IconItem[] = [
  { title: "Calúnia, difamação e injúria", icon: Gavel },
  { title: "Perfil falso", icon: Fingerprint },
  { title: "Fake news", icon: AlertTriangle },
  { title: "Uso indevido de imagem", icon: ImageOff },
  { title: "Ataques em redes sociais", icon: ShieldAlert },
  { title: "Cyberbullying e linchamento virtual", icon: UsersRound },
  { title: "Ameaças e perseguição", icon: AlertTriangle },
  { title: "Ofensas em WhatsApp", icon: MessageCircle },
  { title: "Empresas atacadas na internet", icon: Building2 },
  { title: "Concorrência desleal", icon: Scale },
  { title: "Conta bloqueada, banida ou invadida", icon: Shield },
  { title: "Ataques entre influenciadores", icon: MessageCircle },
];

const measures = [
  "Notificação extrajudicial",
  "Remoção de conteúdo",
  "Remoção de perfil falso",
  "Pedido de liminar",
  "Obrigação de fazer",
  "Indenização, quando cabível",
  "Direito de resposta",
  "Queixa-crime",
  "Preservação de provas",
  "Identificação de responsáveis, quando cabível",
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
      viewport={{ once: true, amount: 0.18 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

function WhatsAppButton({
  children = "Falar pelo WhatsApp",
  variant = "secondary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  return (
    <motion.a
      className={`premium-button premium-button--${variant} ${className}`}
      href={whatsappHref}
      onClick={trackWhatsappClick}
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/92 shadow-[0_1px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex min-w-0 items-center gap-3" href="/#inicio">
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
          className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex"
        >
          <Link className="nav-link" href="/#sobre">
            Sobre
          </Link>
          <Link className="nav-link" href="/#publico">
            Atendimento
          </Link>
          <Link className="nav-link" href="/#situacoes">
            Situações
          </Link>
          <Link className="nav-link" href="/#medidas">
            Medidas
          </Link>
          <Link className="nav-link" href="/#triagem">
            Formulário
          </Link>
        </nav>

        <div className="hidden sm:block">
          <WhatsAppButton>WhatsApp</WhatsAppButton>
        </div>
      </div>
    </header>
  );
}

function LawyerPortrait() {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_28px_80px_rgba(12,29,53,0.14)]">
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
                Insira a imagem em public/images/dra-gisele-gabriel.jpg
              </p>
            </div>
          </div>
        ) : (
          <Image
            alt={portraitAlt}
            className="h-auto w-full object-cover"
            height={760}
            priority
            src={portraitSrc}
            width={620}
            onError={() => setHasImageError(true)}
          />
        )}
      </div>
      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/70 bg-white/92 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.12)] backdrop-blur">
        <p className="font-serif text-xl font-semibold text-navy">
          {lawyer.name}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          {lawyer.title} - {lawyer.oab}
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f6f8fb)] pt-[5.5rem]"
      id="inicio"
    >
      <div className="abstract-grid absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-navy shadow-sm"
            variants={fadeUp}
          >
            <ShieldAlert aria-hidden="true" size={15} className="text-gold" />
            Direito digital e reputação online
          </motion.p>
          <motion.h1
            className="mt-7 max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            Sua reputação foi atacada na internet?
          </motion.h1>
          <motion.p
            className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-slate-650 sm:text-xl sm:leading-9"
            variants={fadeUp}
          >
            Está sofrendo calúnia, difamação, injúria, ameaças, perseguição,
            fake news, perfil falso, ataques nas redes sociais ou sua empresa
            está sendo prejudicada na internet?
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-8 text-navy"
            variants={fadeUp}
          >
            Conheça as medidas jurídicas que podem ser avaliadas para proteger
            seus direitos.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <PrimaryAnchor href="#triagem">
              Solicitar análise inicial do caso
            </PrimaryAnchor>
            <WhatsAppButton>Falar pelo WhatsApp</WhatsAppButton>
          </motion.div>
          <motion.p
            className="mt-5 flex max-w-2xl items-start gap-2 text-sm font-medium leading-6 text-slate-600"
            variants={fadeUp}
          >
            <BadgeAlert
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-gold"
              size={17}
            />
            Atendimento inicial para triagem. A análise jurídica é realizada
            conforme as informações e documentos apresentados.
          </motion.p>
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

function AboutSection() {
  return (
    <section className="section-padding bg-white" id="sobre">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
            Sobre a advogada
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
            Atuação jurídica em defesa da honra, imagem e reputação na internet
          </h2>
        </Reveal>
        <Reveal className="grid content-center gap-5 text-pretty text-lg leading-9 text-slate-600">
          <p>
            Sou Dra. Gisele Gabriel, advogada inscrita na OAB/GO nº 57.455,
            graduada em Direito pela Universidade Federal de Goiás (UFG) e com
            atuação jurídica desde 2014.
          </p>
          <p>
            Meu trabalho é voltado para proteger pessoas e empresas que tiveram
            sua honra, imagem, reputação ou privacidade prejudicadas na
            internet.
          </p>
          <p>
            Cada caso é analisado individualmente para identificar as medidas
            judiciais e extrajudiciais mais adequadas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function IconCard({ item }: { item: IconItem }) {
  const Icon = item.icon;

  return (
    <motion.article
      className="premium-card min-h-0 rounded-lg"
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
    >
      <span className="icon-box rounded-lg">
        <Icon aria-hidden="true" size={21} />
      </span>
      <h3 className="mt-5 text-pretty text-base font-bold leading-6 text-navy">
        {item.title}
      </h3>
      {item.description ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {item.description}
        </p>
      ) : null}
    </motion.article>
  );
}

function AudienceSection() {
  return (
    <section className="section-padding bg-paper" id="publico">
      <SectionHeader
        eyebrow="Quem pode buscar atendimento"
        title="Atendimento para pessoas, empresas e profissionais expostos no ambiente digital"
      />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.12 }}
        whileInView="visible"
      >
        {audience.map((item) => (
          <IconCard item={item} key={item.title} />
        ))}
      </motion.div>
    </section>
  );
}

function CasesSection() {
  return (
    <section className="section-padding bg-white" id="situacoes">
      <SectionHeader
        eyebrow="Casos digitais"
        title="Situações que podem exigir atuação jurídica"
        description="Podem ser avaliadas medidas jurídicas conforme o caso concreto, mediante análise individual e quando cabível."
      />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.12 }}
        whileInView="visible"
      >
        {cases.map((item) => (
          <IconCard item={item} key={item.title} />
        ))}
      </motion.div>
    </section>
  );
}

function InitialAnalysisSection() {
  return (
    <section className="section-padding bg-navy text-white" id="analise">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-light">
            Análise inicial do caso
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl">
            Análise Inicial do Caso
          </h2>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-9 text-slate-200">
            No primeiro contato serão analisadas as publicações, vídeos,
            mensagens, imagens, links e demais provas encaminhadas.
          </p>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-9 text-slate-200">
            Essa análise inicial servirá para verificar quais medidas judiciais
            e extrajudiciais poderão ser avaliadas para o caso concreto. Caso
            exista viabilidade jurídica, será apresentada proposta de
            contratação.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-3">
          <PrimaryAnchor href="#triagem" variant="light">
            Solicitar análise inicial
          </PrimaryAnchor>
          <WhatsAppButton variant="light">Falar pelo WhatsApp</WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

function MeasuresSection() {
  return (
    <section className="section-padding bg-paper" id="medidas">
      <SectionHeader
        eyebrow="Caminhos possíveis"
        title="Medidas jurídicas que podem ser avaliadas"
        description="A depender das provas, da urgência e das circunstâncias do caso, podem ser avaliadas medidas judiciais e extrajudiciais adequadas à situação apresentada."
      />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, amount: 0.12 }}
        whileInView="visible"
      >
        {measures.map((measure) => (
          <motion.article
            className="measure-item rounded-lg"
            key={measure}
            variants={fadeUp}
          >
            <CheckCircle2 aria-hidden="true" className="shrink-0 text-gold" />
            <h3 className="text-sm font-bold leading-6 text-navy">
              {measure}
            </h3>
          </motion.article>
        ))}
      </motion.div>
      <Reveal className="mx-auto mt-10 max-w-4xl rounded-lg border border-gold/25 bg-white p-5 text-center text-sm font-semibold leading-7 text-slate-650 shadow-sm">
        A adoção de qualquer medida depende da análise individual do caso e da
        viabilidade jurídica.
      </Reveal>
    </section>
  );
}

function FormSection() {
  return (
    <section className="section-padding bg-white" id="triagem">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
            Formulário
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-navy md:text-5xl">
            Solicite a análise inicial do seu caso
          </h2>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-600">
            Envie as informações iniciais para triagem. A análise individual
            será realizada conforme as informações e documentos apresentados.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-600">
            {[
              "Campos objetivos para organizar fatos e provas",
              "Captura de origem e UTMs para controle do atendimento",
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
          <WhatsAppButton className="mt-8">Falar pelo WhatsApp</WhatsAppButton>
        </Reveal>

        <Reveal>
          <LeadForm />
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

function FinalCta() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl rounded-lg bg-navy p-7 text-white shadow-[0_28px_80px_rgba(12,29,53,0.16)] md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-light">
              Próximo passo
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold md:text-5xl">
              Precisa avaliar uma situação de exposição ou ataque na internet?
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-slate-200">
              Envie as informações iniciais ou fale pelo WhatsApp para organizar
              a triagem.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <PrimaryAnchor href="#triagem" variant="light">
              Abrir formulário
            </PrimaryAnchor>
            <WhatsAppButton variant="light">Falar pelo WhatsApp</WhatsAppButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#07172b,#0b1b32_55%,#102844)] px-4 pb-24 pt-14 text-slate-200 sm:px-6 sm:pb-14 lg:px-8">
      <div className="abstract-lines opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg border border-gold/35 bg-white/8 text-sm font-bold text-white">
              {lawyer.initials}
            </span>
            <div>
              <p className="font-bold text-white">{lawyer.name}</p>
              <p className="text-sm text-slate-300">
                {lawyer.title} - {lawyer.oab}
              </p>
            </div>
          </div>
          <div className="mt-5 grid max-w-4xl gap-2 text-sm leading-7 text-slate-300 md:grid-cols-2">
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" size={16} className="text-gold-light" />
              Goiânia - GO
            </p>
            <p>Atendimento online para todo o Estado de Goiás</p>
            <p>Presencial em Goiânia quando necessário</p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" size={16} className="text-gold-light" />
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

        <div className="flex flex-col gap-4 text-sm font-semibold lg:items-end">
          <Link className="footer-link" href="/politica-de-privacidade">
            Política de Privacidade
          </Link>
          <Link className="footer-link" href="/#triagem">
            Formulário
          </Link>
          <a className="footer-link" href={whatsappHref} onClick={trackWhatsappClick}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/92 p-3 shadow-[0_-18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:hidden">
      <PrimaryAnchor href="#triagem">Solicitar análise inicial</PrimaryAnchor>
    </div>
  );
}

export function PremiumLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-slate-900">
      <Header />
      <Hero />
      <AboutSection />
      <AudienceSection />
      <CasesSection />
      <InitialAnalysisSection />
      <MeasuresSection />
      <FormSection />
      <FinalCta />
      <LegalNotice />
      <Footer />
      <MobileStickyCta />
    </main>
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
            <PrimaryAnchor href="#triagem">
              Solicitar análise inicial do caso
            </PrimaryAnchor>
            <WhatsAppButton>Falar pelo WhatsApp</WhatsAppButton>
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

export function LandingPageTemplate({
  content,
}: {
  content: LandingPageContent;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-slate-900">
      <Header />
      <LandingHero content={content} />
      <LandingContent content={content} />
      <InitialAnalysisSection />
      <FormSection />
      <FinalCta />
      <LegalNotice />
      <Footer />
      <MobileStickyCta />
    </main>
  );
}
