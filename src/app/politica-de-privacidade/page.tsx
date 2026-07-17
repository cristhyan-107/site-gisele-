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
  title: "Política de Privacidade | Dra. Gisele Gabriel",
  description:
    "Política de privacidade para o atendimento inicial realizado pelo site da Dra. Gisele Gabriel.",
};

const privacySections = [
  {
    title: "Dados coletados",
    icon: Database,
    text: "O formulário pode coletar nome, WhatsApp, e-mail, cidade, estado, área relacionada ao caso, protocolos, referências ou links informados, indicação sobre a continuidade do problema, existência de documentos ou comprovantes, impacto percebido, descrição da situação e consentimento para tratamento dos dados. Também podem ser coletados dados de origem, parâmetros UTM, gclid, fbclid, página de origem e URL da página acessada.",
  },
  {
    title: "Finalidade da coleta",
    icon: FileCheck2,
    text: "Os dados são utilizados para organizar informações iniciais, possibilitar contato posterior, entender a origem da solicitação e permitir triagem inicial do caso pela advogada responsável. O envio do formulário não implica aceitação do caso nem substitui análise jurídica individual.",
  },
  {
    title: "Contato posterior",
    icon: MessageCircle,
    text: "As informações de contato podem ser usadas para retorno por WhatsApp, telefone ou e-mail, exclusivamente para continuidade da triagem, solicitação de informações complementares e organização inicial do atendimento.",
  },
  {
    title: "Arquivos e documentos",
    icon: FileCheck2,
    text: "Nesta primeira versão do formulário não há coleta de arquivos. Imagens, vídeos, documentos e demais provas poderão ser solicitados posteriormente pelo canal de atendimento indicado, quando necessários à análise individual.",
  },
  {
    title: "Armazenamento e ferramentas",
    icon: LockKeyhole,
    text: "As informações podem ser armazenadas em ferramentas internas de atendimento, automação, organização de leads e gestão administrativa, com acesso limitado às pessoas e serviços necessários para triagem, segurança e cumprimento de obrigações legais.",
  },
  {
    title: "Anúncios e mensuração",
    icon: Megaphone,
    text: "Este site pode utilizar ferramentas de análise de conversões, atendimento e anúncios para registrar a origem do contato, medir campanhas e melhorar a comunicação. Essas ferramentas podem receber dados técnicos, parâmetros de URL e eventos de conversão.",
  },
  {
    title: "Solicitação de exclusão de dados",
    icon: Trash2,
    text: "O titular pode solicitar confirmação de tratamento, correção, atualização ou exclusão dos dados pelo e-mail gisgabri.adv@gmail.com ou pelo WhatsApp informado no site. Solicitações podem ser avaliadas conforme requisitos legais, regulatórios e de segurança.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-slate-900">
      <section className="relative isolate border-b border-slate-200 bg-white px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="abstract-grid absolute inset-0 -z-10 opacity-70" />
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
              relacionados às áreas de atuação apresentadas na página
              institucional.
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
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] md:p-8"
                key={section.title}
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gold/12 text-gold">
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

          <article className="rounded-lg border border-slate-200 bg-navy p-6 text-white shadow-[0_22px_65px_rgba(12,29,53,0.16)] md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-light">
                <Mail aria-hidden="true" size={23} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold leading-tight">
                  Canal de contato
                </h2>
                <p className="mt-3 text-pretty text-base leading-8 text-slate-200">
                  Para solicitações relacionadas a dados pessoais, utilize o
                  e-mail gisgabri.adv@gmail.com ou o WhatsApp (11) 91623-9443.
                  Esta política pode ser atualizada para refletir ajustes no
                  site, no fluxo de atendimento ou nas ferramentas utilizadas.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
