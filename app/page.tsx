import Image from "next/image";
import {
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { NavHeroTheme } from "./components/NavHeroTheme";
import { DocumentAssistant } from "./components/DocumentAssistant";
import { IntroEntryAnimation } from "./components/IntroEntryAnimation";
import { NavAnchorScroll } from "./components/NavAnchorScroll";
import { HorizontalSectionFlow } from "./components/HorizontalSectionFlow";
import { PixCopyPaste } from "./components/PixCopyPaste";
import { PublicServicesLibrary } from "./components/PublicServicesLibrary";
import { QrHoverFocus } from "./components/QrHoverFocus";
import { ScrollReveal } from "./components/ScrollReveal";
import { ScrollProgress } from "./components/ScrollProgress";
import { SectionMorphIntro } from "./components/SectionMorphIntro";
import { SmoothScroll } from "./components/SmoothScroll";

function renderIntroLineStatic(text: string, className?: string) {
  return (
    <span className={`intro-thinking-line intro-thinking-line-static ${className ?? ""}`.trim()}>
      {text}
    </span>
  );
}

const stats = [
  {
    label: "Famílias em acompanhamento",
    value: "412",
  },
];

const whatsappMessage = `Olá, tudo bem?

Acessei o site da Casa Irmãs de Nazareth e tive interesse em conhecer melhor os projetos desenvolvidos pela associação. Poderiam me fornecer mais informações sobre as iniciativas e formas de participação?

Fico no aguardo do retorno. Obrigado.`;
const whatsappLink = `https://wa.me/5511943016370?text=${encodeURIComponent(whatsappMessage)}`;
const pixKey = "casairmasdenazareth@gmail.com";

function emvField(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j += 1) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function buildPixPayload() {
  const merchantAccount = emvField("00", "BR.GOV.BCB.PIX") + emvField("01", pixKey);
  const additionalData = emvField("05", "***");

  const payloadWithoutCrc =
    emvField("00", "01") +
    emvField("01", "11") +
    emvField("26", merchantAccount) +
    emvField("52", "0000") +
    emvField("53", "986") +
    emvField("58", "BR") +
    emvField("59", "CASA IRMAS NAZARETH") +
    emvField("60", "SAO PAULO") +
    emvField("62", additionalData) +
    "6304";

  return `${payloadWithoutCrc}${crc16(payloadWithoutCrc)}`;
}

const pixPayload = buildPixPayload();

export default function Home() {
  return (
    <div className="relative isolate">
      <NavHeroTheme />
      <ScrollProgress />
      <ScrollReveal />
      <SmoothScroll />
      <NavAnchorScroll />
      <QrHoverFocus />
      <HorizontalSectionFlow />
      <SectionMorphIntro />
      <div className="site-content qr-focus-root flex flex-col">
      <header
        id="site-header"
        className="nav-theme absolute inset-x-0 top-0 z-40"
      >
        <div className="nav-inner w-full py-3.5">
          <div className="mx-auto w-full max-w-[1240px] px-4 md:px-10 lg:px-14">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <div className="nav-logo-shell relative h-11 w-11 overflow-hidden rounded-full">
                <img
                  src="/logo.png?v=2"
                  alt="Logo da Associação Beneficente Casa Irmãs de Nazareth"
                  className="h-full w-full scale-125 object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
                <div className="nav-brand-text min-w-0 leading-tight">
                <p className="nav-brand-overline whitespace-nowrap text-[7px] uppercase leading-none tracking-[0.02em] md:text-[8px]">
                  Associação Beneficente
                </p>
                  <p className="truncate text-sm font-semibold md:text-base">Casa Irmãs de Nazareth</p>
                </div>
              </div>
              <nav className="nav-links hidden items-center gap-0.5 text-sm lg:flex">
              <a className="nav-link rounded-full px-3 py-2 transition-colors duration-200" href="#projeto">
                Projetos
              </a>
              <a className="nav-link rounded-full px-3 py-2 transition-colors duration-200" href="#documentos">
                Documentos
              </a>
              <a className="nav-link rounded-full px-3 py-2 transition-colors duration-200" href="#transparencia">
                Transparência
              </a>
              <a className="nav-link rounded-full px-3 py-2 transition-colors duration-200" href="#contato">
                Contato
              </a>
              <a className="nav-link rounded-full px-3 py-2 transition-colors duration-200" href="#doacao">
                Contribuição
              </a>
              </nav>
              <a
                className="nav-cta inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98] sm:px-4 sm:text-xs md:px-5 md:py-2.5 md:text-sm"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hidden sm:inline">Quero participar</span>
                <span className="sm:hidden">Participar</span>
                <ArrowRight weight="bold" />
              </a>
            </div>

            <nav className="nav-links-mobile mt-3 grid w-full grid-cols-5 gap-1 px-0 pb-1 text-[11px] sm:text-xs lg:hidden">
              <a className="nav-link whitespace-nowrap rounded-full px-1.5 py-1.5 text-center transition-colors duration-200" href="#projeto">
                Projetos
              </a>
              <a className="nav-link whitespace-nowrap rounded-full px-1.5 py-1.5 text-center transition-colors duration-200" href="#documentos">
                Doc.
              </a>
              <a className="nav-link whitespace-nowrap rounded-full px-1.5 py-1.5 text-center transition-colors duration-200" href="#transparencia">
                Transp.
              </a>
              <a className="nav-link whitespace-nowrap rounded-full px-1.5 py-1.5 text-center transition-colors duration-200" href="#contato">
                Contato
              </a>
              <a className="nav-link whitespace-nowrap rounded-full px-1.5 py-1.5 text-center transition-colors duration-200" href="#doacao">
                Contrib.
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
      <main className="pt-0">
        <section id="inicio" data-reveal-section className="relative overflow-hidden bg-[#1D283A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#25354F] via-[#1D283A] to-[#141C2A]" aria-hidden />
          <div className="hero-layered-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div data-speed="0.72" className="hero-wave hero-wave-1" />
            <div data-speed="0.78" data-lag="0.08" className="hero-wave hero-wave-2" />
            <div data-speed="0.84" data-lag="0.12" className="hero-wave hero-wave-3" />
            <div data-speed="0.9" data-lag="0.16" className="hero-wave hero-wave-4" />
            <div className="hero-layered-grain" />
          </div>
          <IntroEntryAnimation />
          <div className="intro-shell relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1400px] items-start gap-10 px-4 pb-14 pt-44 sm:px-6 sm:pt-40 md:pt-36 lg:pt-28 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="w-full max-w-[780px] space-y-7">
              <h1 className="intro-heading intro-thinking-shimmer font-stardom text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
                {renderIntroLineStatic("Associação Beneficente", "text-[0.64em] md:text-[0.6em]")}
                {renderIntroLineStatic("Casa Irmãs de Nazareth")}
              </h1>
              <div className="intro-title-line h-[2px] w-40 bg-white/55 md:w-56" />

              <div className="intro-stats mt-8 grid max-w-md gap-6 border-t border-white/25 pt-6 sm:grid-cols-1">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="intro-stats-label text-sm uppercase tracking-[0.2em] text-white/85">
                      {stat.label}
                    </p>
                    <p className="intro-stats-value text-3xl font-semibold text-white">
                      <span className="font-mono">{stat.value}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="hero-section"
              className="space-y-6 pt-2 lg:mt-28"
            >
              <h2 className="intro-hero-title font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl md:leading-none">
                Nossa Associação existe para transformar vidas, com foco no apoio a famílias de baixa renda.
              </h2>
              <p className="intro-hero-copy max-w-[60ch] text-base leading-relaxed text-white/95">
                Fundada em 24 de Maio de 1991, atuamos para garantir moradia segura e estável, assim como
                alimentação digna, para famílias em situação de vulnerabilidade.
                Desenvolvemos um projeto habitacional e realizamos a
                distribuição de cestas básicas e leite fornecido pela
                Prefeitura, além de ações contínuas e orientação para famílias
                com NIS ativo. Nosso compromisso é promover dignidade e
                melhores condições de vida.
              </p>
            </div>
          </div>
        </section>

        <div id="housing-horizontal-flow" className="relative min-h-screen overflow-hidden">
        <div id="housing-horizontal-track" className="flex w-full flex-col lg:w-[300vw] lg:flex-row">
        <section
          id="projeto"
          data-reveal-section
          data-morph-section
          className="horizontal-panel relative min-h-screen overflow-hidden bg-black lg:w-screen lg:shrink-0"
        >
          <div data-morph-media data-morph-media-full className="absolute inset-0">
            <Image
              src="/moradia.jpg"
              alt="Área prevista para o conjunto habitacional"
              fill
              className="object-cover scale-[1.2]"
              sizes="100vw"
              quality={100}
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/52 to-black/24" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 sm:px-6">
            <div className="left-copy w-full max-w-[760px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Projeto Habitacional
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Projeto de moradia que apoia famílias na conquista de um imóvel próprio.
              </h2>
              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                O projeto habitacional atua desde a identificação das necessidades
                até a seleção criteriosa das famílias, com acompanhamento social
                contínuo durante todo o processo. Nosso propósito é apoiar famílias
                na conquista de uma moradia justa.
              </p>

              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                A moradia está vinculada ao projeto Boa Esperança II, na 
                Rua Aguarico x Rua Almeida Falcão, com área total de 23.853,00 m²,
                zoneamento ZEIS-2 e estimativa de 1.465 UHS (SQL 194.230.0002-8).
              </p>
              
            </div>
          </div>
        </section>

        <section
          id="cestas"
          data-reveal-section
          data-morph-section
          className="horizontal-panel relative min-h-screen overflow-hidden bg-black lg:w-screen lg:shrink-0"
        >
          <div data-morph-media data-morph-media-full className="absolute inset-0">
            <Image
              src="/cesta.jpg"
              alt="Preparação de cestas básicas"
              fill
              className="object-cover scale-[1.2]"
              sizes="100vw"
              quality={100}
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/74 via-black/50 to-black/22" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/58 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/62 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 sm:px-6">
            <div className="left-copy max-w-[760px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Cestas básicas
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Distribuição de cestas básicas com apoio institucional e foco social.
              </h2>
              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                A distribuição de cestas básicas é realizada em parceria com o
                programa Cidade Solidária, da Prefeitura de São Paulo,
                vinculado à Secretaria de Direitos Humanos.
              </p>
              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                Por meio dessa iniciativa de combate à fome, a associação atua
                na entrega de alimentos essenciais às famílias atendidas,
                contribuindo para a segurança alimentar e promovendo mais
                dignidade.
              </p>
            </div>
          </div>
        </section>

        <section
          id="leite"
          data-reveal-section
          data-morph-section
          className="horizontal-panel relative min-h-screen overflow-hidden bg-black lg:w-screen lg:shrink-0"
        >
          <div data-morph-media data-morph-media-full className="absolute inset-0">
            <Image
              src="/leite.jpg"
              alt="Entrega de leite para famílias"
              fill
              className="object-cover scale-[1.2]"
              sizes="100vw"
              quality={100}
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/74 via-black/50 to-black/22" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/58 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/62 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 sm:px-6">
            <div className="left-copy max-w-[760px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Leite
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Nutrição essencial para crianças e idosos.
              </h2>
              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                O Vivaleite é o maior programa de distribuição gratuita de leite
                pasteurizado do Brasil, uma iniciativa do Governo do Estado de
                São Paulo. O programa atende adultos com 60 anos ou mais e crianças até
                5 anos e 11 meses, com o objetivo de
                garantir segurança alimentar e combater a desnutrição.
              </p>
              <p className="max-w-[60ch] text-base leading-relaxed text-white/95">
                Atualmente, a associação atende 89 idosos e 52 mães de família, 
                em parceria com a Secretaria de Desenvolvimento Social do Estado de São Paulo.
              </p>
            </div>
          </div>
        </section>
        </div>
        </div>

        <section
          id="documentos"
          data-reveal-section
          data-morph-section
          className="relative min-h-screen overflow-hidden bg-white"
        >
          <div className="docs-layered-bg pointer-events-none absolute inset-0" aria-hidden>
            <div data-speed="0.62" className="docs-wave docs-wave-1" />
            <div data-speed="0.68" data-lag="0.06" className="docs-wave docs-wave-2" />
            <div data-speed="0.74" data-lag="0.1" className="docs-wave docs-wave-3" />
            <div data-speed="0.8" data-lag="0.14" className="docs-wave docs-wave-4" />
            <div className="docs-layered-noise" />
          </div>
          <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1400px] items-center px-4 pt-24 pb-10 sm:px-6 sm:pt-0 sm:pb-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="left-copy w-full max-w-[720px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900">
                Participar dos projetos
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-5xl">
                Como se inscrever e participar das ações desenvolvidas pela associação.
              </h2>
              <p className="max-w-[55ch] text-base leading-relaxed text-zinc-900">
                O acesso ao projeto é destinado a famílias que atendem aos
                critérios definidos, com validação por meio do NIS e acompanhamento social.
              </p>
              <p className="max-w-[55ch] text-base leading-relaxed text-zinc-900">
                Organize seus documentos antes do atendimento.
                Marque os itens que você já possui, acompanhe o progresso e veja
                exatamente o que ainda falta para sua triagem.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[#1D283A] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-25px_rgba(29,40,58,0.68)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17202F] active:translate-y-[1px] active:scale-[0.98]"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tenho os documentos !
                  <ArrowRight weight="bold" />
                </a>
              </div>
            </div>
            <div className="relative p-6 md:p-8" data-morph-media>
              <div className="relative p-1 md:p-2">
                <DocumentAssistant />
              </div>
            </div>
          </div>
        </section>

        <section
          id="biblioteca"
          data-reveal-section
          data-morph-section
          className="relative min-h-screen overflow-hidden bg-[#1D283A]"
        >
          <div className="library-layered-bg pointer-events-none absolute inset-0" aria-hidden>
            <div data-speed="0.68" className="library-wave library-wave-1" />
            <div data-speed="0.74" data-lag="0.08" className="library-wave library-wave-2" />
            <div data-speed="0.8" data-lag="0.12" className="library-wave library-wave-3" />
            <div data-speed="0.86" data-lag="0.16" className="library-wave library-wave-4" />
            <div className="library-layered-grain" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] min-h-screen px-4 pt-24 pb-10 sm:px-6 sm:pt-0 sm:pb-0">
            <div className="grid min-h-screen items-center gap-10 lg:grid-cols-2">
            <div className="flex items-center">
              <div className="left-copy w-full max-w-[640px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Biblioteca de serviços públicos
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Acesse links oficiais de cadastro, assistência e habitação.
              </h2>
              <p className="max-w-[55ch] text-base leading-relaxed text-white/95">
                Reunimos serviços públicos essenciais para facilitar o acesso a
                direitos, benefícios sociais e programas habitacionais.
                O CadÚnico (Gov.br) permite cadastro e atualização de dados para
                programas sociais. O CRAS oferece orientação e atendimento social.
                A COHAB-SP reúne informações sobre habitação popular. O Poupatempo
                auxilia na emissão de documentos, e o SP156 centraliza serviços
                e solicitações da Prefeitura.
                Esses canais complementam o trabalho da associação, apoiando as
                famílias no acesso a serviços e políticas públicas.
              </p>
            </div>
            </div>
            <div className="flex items-center">
              <div className="w-full max-w-[760px] lg:ml-auto" data-morph-media>
                <PublicServicesLibrary />
              </div>
            </div>
            </div>
          </div>
        </section>

        <section
          id="transparencia"
          data-reveal-section
          data-morph-section
          className="qr-adjacent-blur relative min-h-screen overflow-hidden bg-black"
        >
          <div data-morph-media data-morph-media-full data-speed="0.7" data-lag="0.34" className="absolute inset-0">
            <Image
              src="/certificado.jpg"
              alt="Equipe organizando registros e documentos"
              fill
              className="object-cover scale-[1.2]"
              sizes="100vw"
              quality={100}
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/52 to-black/24" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/58 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/62 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 sm:px-6">
            <div className="left-copy max-w-[760px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Reconhecimento Institucional
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Atuação regularizada, com reconhecimento em órgãos oficiais e bases nacionais.
              </h2>
              <p className="max-w-[55ch] text-base leading-relaxed text-white/95">
                A associação está vinculada ao Programa Pode Entrar e
                encontra-se devidamente regularizada, com cadastro em órgãos
                oficiais como o CENTS e o CRCE, além de registros junto ao
                Governo Federal.
                Também integra bases reconhecidas, como o IPEA, que reúne
                entidades atuantes no Brasil e na América Latina, reforçando
                sua credibilidade e atuação social.
              </p>
            </div>
          </div>
        </section>

        <section
          id="doacao"
          data-reveal-section
          data-morph-section
          className="pix-focus relative min-h-screen overflow-hidden"
        >
          <div className="qr-focus-doacao-overlay pointer-events-none absolute inset-0 z-[95]" />
          <div className="donation-layered-bg qr-local-blur pointer-events-none absolute inset-0" aria-hidden>
            <div data-speed="0.64" className="donation-cut donation-cut-1" />
            <div data-speed="0.7" data-lag="0.06" className="donation-cut donation-cut-2" />
            <div data-speed="0.76" data-lag="0.1" className="donation-cut donation-cut-3" />
            <div data-speed="0.82" data-lag="0.14" className="donation-cut donation-cut-4" />
            <div className="donation-layered-texture" />
          </div>
          <div className="pix-stage relative z-10 mx-auto min-h-screen w-full max-w-[1400px] px-4 pt-24 pb-14 sm:px-6 sm:pt-0 sm:pb-0">
            <div className="pix-grid grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div className="left-copy pix-copy qr-local-blur qr-doacao-text space-y-6" data-pix-copy data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900">
                  Contribuição
              </p>
                <h2 className="font-stardom text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-5xl">
                  Ajude com os nossos projetos.
                </h2>
                <p className="max-w-[55ch] text-base leading-relaxed text-zinc-900">
                  Apoie os projetos da associação por meio de doação via Pix e
                  contribua diretamente para o fortalecimento das nossas ações.
                  Sua ajuda permite ampliar iniciativas de moradia, distribuição
                  de alimentos e apoio social, garantindo melhores condições de
                  vida para as famílias atendidas.
              </p>
                <p className="max-w-[55ch] text-base leading-relaxed text-zinc-900">
                  Empresas e pessoas físicas podem apoiar nossos projetos sociais 
                  destinando parte do Imposto de Renda, conforme a legislação vigente.
                   Assim, sua contribuição gera impacto social direto e ainda pode 
                   trazer benefício fiscal.
              </p>
                <div className="border-b border-zinc-200/80 pb-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-900">Chave Pix</p>
                  <p className="mt-1 text-lg font-semibold text-[#1D283A]">
                    casairmasdenazareth@gmail.com
                  </p>
                  <PixCopyPaste value={pixPayload} />
                </div>
              </div>
              <div className="pix-visual flex items-center justify-center pb-4 sm:pb-0" data-pix-visual data-morph-media>
                <div className="group qr-focus-trigger relative z-[120] w-full max-w-[260px] sm:max-w-[300px]" data-pix-card data-lag="0.08">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
                      pixPayload
                    )}`}
                    alt="QR Code Pix da associação"
                    width={280}
                    height={280}
                    className="relative z-50 mx-auto h-auto w-full rounded-lg transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.18]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contato"
          data-reveal-section
          data-morph-section
          className="qr-adjacent-blur relative min-h-screen overflow-hidden bg-black"
        >
          <div data-morph-media data-morph-media-full data-speed="0.72" data-lag="0.34" className="absolute inset-0">
            <iframe
              title="Mapa da Associacao Beneficente Casa Irmas de Nazareth"
              src="https://www.google.com/maps?q=Rua+Amongeaba,+25A+-+Parque+Central+-+S%C3%A3o+Paulo,+SP&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/74 via-black/52 to-black/26" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/56 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 sm:px-6">
            <div className="left-copy w-full max-w-[720px] space-y-6" data-morph-text>
              <p className="font-stardom text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Contato
              </p>
              <h2 className="font-stardom text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
                Estamos prontos para orientar sua família e responder dúvidas.
              </h2>
              <p className="max-w-[55ch] text-base leading-relaxed text-white/95">
                Fale diretamente com a equipe e acompanhe os projetos com
                transparência e acolhimento.
              </p>
              <div className="grid max-w-[760px] gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Endereço de atendimento</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Rua Amongeaba, 25A - Parque Central - São Paulo, SP
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Rua+Amongeaba,+25A+-+Parque+Central+-+S%C3%A3o+Paulo,+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/15"
                  >
                    Abrir no Maps
                  </a>
                </article>

                <article className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Telefone</p>
                  <a
                    href="tel:+5511943016370"
                    className="mt-2 block text-base font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    (11) 94301-6370
                  </a>
                  <a
                    href="tel:+551125543019"
                    className="mt-1 block text-base font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    (11) 2554-3019
                  </a>
                </article>

                <article className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">E-mail</p>
                  <a
                    href="mailto:casairmasdenazareth@gmail.com"
                    className="mt-2 block text-base font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    casairmasdenazareth@gmail.com
                  </a>
                </article>
              </div>
              <p className="max-w-[62ch] text-xs leading-relaxed text-white/70">
                Os dados compartilhados por telefone, e-mail ou WhatsApp são usados
                exclusivamente para retorno de contato, orientação sobre os projetos
                e encaminhamento de atendimento social.
              </p>
            </div>
          </div>
        </section>

      </main>
        </div>
      </div>
      </div>
    </div>
  );
}







