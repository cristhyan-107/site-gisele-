import Link from "next/link";
import {
  ArrowLeft,
  Database,
  FileCheck2,
  LockKeyhole,
  Mail,
  Megaphone,
  MessageCircle,
  Trash2,
} from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | Defesa jurídica digital",
  description:
    "Política de privacidade para triagem inicial de casos envolvendo exposição, ataques e conteúdos ofensivos na internet.",
};

const privacySections = [
  {
    title: "Dados coletados",
    icon: Database,
    text: "O formulário pode coletar nome, WhatsApp, cidade e estado, plataforma envolvida, indicação sobre conteúdo no ar, existência de provas, prejuízo percebido, relato do ocorrido e consentimento para contato. Também podem ser coletados data e horário do envio, origem do contato e parâmetros de campanha, como UTMs e identificadores de anúncios.",
  },
  {
    title: "Finalidade da coleta",
    icon: FileCheck2,
    text: "Os dados são utilizados para organizar informações iniciais, possibilitar contato de triagem, entender a origem da solicitação e permitir análise posterior pela advogada responsável. O envio do formulário não implica aceitação do caso nem substitui análise jurídica individual.",
  },
  {
    title: "Uso para contato",
    icon: MessageCircle,
    text: "As informações de contato podem ser usadas para retorno por WhatsApp, telefone ou e-mail, conforme os dados informados pelo titular, exclusivamente para continuidade da triagem e organização inicial do atendimento.",
  },
  {
    title: "Armazenamento",
    icon: LockKeyhole,
    text: "As informações podem ser armazenadas em ferramentas internas de atendimento, organização de leads e gestão administrativa, com acesso limitado às pessoas e serviços necessários para triagem, segurança e cumprimento de obrigações legais.",
  },
  {
    title: "Ferramentas de automação, atendimento e anúncios",
    icon: Megaphone,
    text: "Este site pode utilizar ferramentas de automação, análise de conversões, atendimento e anúncios para registrar a origem do contato, medir campanhas e melhorar a comunicação. Essas ferramentas podem receber dados técnicos, parâmetros de URL e eventos de conversão.",
  },
  {
    title: "Solicitação de exclusão de dados",
    icon: Trash2,
    text: "O titular pode solicitar confirmação de tratamento, correção, atualização ou exclusão dos dados pelo e-mail indicado no site ou pelo canal de WhatsApp informado. Solicitações podem ser avaliadas conforme requisitos legais, regulatórios e de segurança.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-slate-900">
      <section className="relative isolate border-b border-slate-200 bg-white px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="abstract-grid absolute inset-0 -z-10 opacity-70" />
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top_left,rgba(176,139,69,0.14),transparent_42%),radial-gradient(ellipse_at_top_right,rgba(12,29,53,0.1),transparent_44%)]" />
        <div className="mx-auto max-w-5xl">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/80 px-4 py-2 text-sm font-bold text-navy shadow-sm transition hover:border-gold/55 hover:text-gold"
            href="/"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Voltar para a página inicial
          </Link>
          <div className="mt-14 max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-gold">
              Privacidade e proteção de dados
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-navy md:text-6xl">
              Política de Privacidade
            </h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
              Esta política explica como os dados informados neste site são
              coletados e utilizados para triagem inicial de contatos
              relacionados a exposição, ataques, difamação e conteúdos ofensivos
              na internet.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {privacySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] md:p-8"
                key={section.title}
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold/12 text-gold">
                    <Icon aria-hidden="true" size={23} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-semibold leading-tight text-navy">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-pretty text-base leading-8 text-slate-600">
                      {section.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          <article className="rounded-[1.6rem] border border-slate-200 bg-navy p-6 text-white shadow-[0_22px_65px_rgba(12,29,53,0.16)] md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-light">
                <Mail aria-hidden="true" size={23} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold leading-tight">
                  Canal de contato
                </h2>
                <p className="mt-3 text-pretty text-base leading-8 text-slate-200">
                  Para solicitações relacionadas a dados pessoais, utilize o
                  e-mail ou WhatsApp informados no rodapé do site. Esta política
                  pode ser atualizada para refletir ajustes no site, no fluxo de
                  atendimento ou nas ferramentas utilizadas.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
