/**
 * FisicoAtivoLandingPage.tsx
 * ------------------------------------------------------------------
 * Landing page de conversão para a Academia Físico Ativo (Uberlândia/MG).
 *
 * REQUISITOS DO PROJETO:
 *  1. Tailwind CSS configurado (https://tailwindcss.com/docs/installation)
 *  2. lucide-react instalado:  npm install lucide-react
 *
 * Fontes "Anton" (títulos) e "Inter" (corpo de texto) são carregadas via
 * @import dentro do próprio componente para funcionar em qualquer setup
 * (CRA, Vite, Next.js). Se preferir, mova o @import para o seu index.css
 * e melhore a performance com <link rel="preconnect">.
 *
 * DADOS REAIS usados nesta página (extraídos de fontes públicas do
 * Instagram, cadastro público e postagens da própria academia):
 *  - Nome: Academia Físico Ativo
 *  - Unidade Tocantins: R. João de Oliveira Andrade, 806 · (34) 99773-0362
 *  - Unidade Monte Hebron: Av. Contador José Candeloro, 91 · (34) 99884-2476
 *  - Modalidades confirmadas: Musculação, Funcional, Muay Thai, FitDance
 *  - Mais de 15 anos de atuação (fundada em 2010)
 *
 * ⚠️ CONFIRME antes de publicar: horário de funcionamento exato, valores
 * de planos e depoimentos — os desta página são ilustrativos e devem ser
 * substituídos pelos dados reais e atualizados da academia.
 * ------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import {
  Dumbbell,
  Music2,
  Flame,
  Zap,
  Award,
  Clock,
  Users,
  Heart,
  MapPin,
  Phone,
  Menu,
  X,
  Star,
  ChevronRight,
  MessageCircle,
  Camera,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Dados da academia                                                   */
/* ------------------------------------------------------------------ */

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e quero agendar minha aula experimental grátis 💪";
const waLink = (number: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const INSTAGRAM_LINK = "https://www.instagram.com/academiafisicoativo/";
const INSTAGRAM_HANDLE = "@academiafisicoativo";

// Unidade usada nos CTAs genéricos do site (hero, nav, banner, botão flutuante).
// Trocar para MONTE_HEBRON_WHATSAPP se preferir usar a outra unidade como padrão.
const DEFAULT_WHATSAPP_NUMBER = "5534997730362"; // Tocantins
const WHATSAPP_LINK = waLink(DEFAULT_WHATSAPP_NUMBER);
const TEL_LINK = "tel:+5534997730362";

const UNITS = [
  {
    name: "Tocantins",
    address: "R. João de Oliveira Andrade, 806 - Tocantins, Uberlândia - MG",
    phoneDisplay: "(34) 99773-0362",
    whatsapp: "5534997730362",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=R.+Jo%C3%A3o+de+Oliveira+Andrade%2C+806+-+Tocantins%2C+Uberl%C3%A2ndia+-+MG",
    mapEmbedSrc:
      "https://www.google.com/maps?q=R.+Jo%C3%A3o+de+Oliveira+Andrade,+806+-+Tocantins,+Uberl%C3%A2ndia+-+MG&output=embed",
  },
  {
    name: "Monte Hebron",
    address: "Av. Contador José Candeloro, 91 - Monte Hebron, Uberlândia - MG",
    phoneDisplay: "(34) 99884-2476",
    whatsapp: "5534998842476",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Av.+Contador+Jos%C3%A9+Candeloro%2C+91+-+Monte+Hebron%2C+Uberl%C3%A2ndia+-+MG",
    mapEmbedSrc:
      "https://www.google.com/maps?q=Av.+Contador+Jos%C3%A9+Candeloro,+91+-+Monte+Hebron,+Uberl%C3%A2ndia+-+MG&output=embed",
  },
];

// ⚠️ Confirme o horário exato de funcionamento com a academia antes de publicar.
const HOURS = [
  { label: "Segunda a sexta", value: "06h00 às 22h00" },
  { label: "Sábado", value: "08h00 às 12h00" },
  { label: "Domingo", value: "Fechado" },
];

const NAV_LINKS = [
  { label: "Modalidades", href: "#modalidades" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Localização", href: "#localizacao" },
];

const MODALITIES = [
  {
    icon: Dumbbell,
    title: "Musculação",
    desc: "Treino individualizado, com acompanhamento técnico para ganho de força e definição.",
  },
  {
    icon: Zap,
    title: "Funcional",
    desc: "Treinos dinâmicos que trabalham o corpo todo em movimentos naturais e intensos.",
  },
  {
    icon: Flame,
    title: "Jiu-Jitsu",
    desc: "Condicionamento físico completo com técnica, disciplina e autodefesa.",
  },
  {
    icon: Music2,
    title: "FitDance",
    desc: "Aulas ritmadas que unem queima calórica, coordenação e muita diversão.",
  },
];

const DIFERENCIAIS = [
  {
    icon: Award,
    title: "Mais de 15 anos de tradição",
    desc: "Uma academia consolidada no bairro Tocantins, em Uberlândia.",
  },
  {
    icon: Clock,
    title: "Horários estendidos",
    desc: "Funcionamento de segunda a sábado para caber na sua rotina.",
  },
  {
    icon: Users,
    title: "Professores especializados",
    desc: "Equipe qualificada em cada modalidade, do primeiro treino ao avançado.",
  },
  {
    icon: Heart,
    title: "Ambiente acolhedor",
    desc: "Uma comunidade que treina junto e comemora cada conquista com você.",
  },
];

const TESTIMONIALS = [
  {
    name: "Aluna de FitDance",
    time: "há 2 anos na Físico Ativo",
    quote:
      "Treino que não parece treino! Chego cansada do trabalho e saio com energia renovada.",
  },
  {
    name: "Aluno de Muay Thai",
    time: "há 1 ano na Físico Ativo",
    quote:
      "Além da evolução física, o Muay Thai aqui me deu disciplina. A turma vira uma segunda família rapidinho.",
  },
  {
    name: "Aluno de Musculação",
    time: "há 4 anos na Físico Ativo",
    quote:
      "Já treinei em academia grande e fria. Aqui alguém sabe meu nome, meu histórico e minha meta.",
  },
];

/* ------------------------------------------------------------------ */
/* Componentes auxiliares                                              */
/* ------------------------------------------------------------------ */

function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 15 Q 50 2, 100 12 T198 8"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FF4429] mb-3">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export default function FisicoAtivoLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className="min-h-screen bg-white text-[#1B1E29] antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

        .font-display { font-family: 'Anton', 'Inter', sans-serif; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }

        @keyframes floaty {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-floaty { animation: floaty 5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-floaty { animation: none !important; }
        }
      `}</style>

      {/* -------------------------------------------------------------- */}
      {/* NAV                                                             */}
      {/* -------------------------------------------------------------- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#12141C]/95 backdrop-blur shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <a
            href="#top"
            className="font-display text-xl sm:text-2xl tracking-wide text-white"
          >
            FÍSICO<span className="text-[#FF4429]">ATIVO</span>
          </a>

          <div className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF4429] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e5391f] transition-colors"
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Agende sua aula
            </a>
          </div>

          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-white p-2 -mr-2"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* Menu mobile em tela cheia */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#12141C] flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-xl text-white">
              FÍSICO<span className="text-[#FF4429]">ATIVO</span>
            </span>
            <button
              aria-label="Fechar menu"
              onClick={closeMenu}
              className="text-white p-2 -mr-2"
            >
              <X size={26} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-3xl uppercase text-white/90 hover:text-[#FF4429] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF4429] px-7 py-3.5 text-base font-bold text-white"
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              Agendar aula grátis
            </a>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* HERO                                                            */}
      {/* -------------------------------------------------------------- */}
      <section
        id="top"
        className="relative bg-[#12141C] pt-28 pb-20 sm:pt-36 sm:pb-24 px-5 sm:px-8 overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FF4429]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFB020]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFB020] mb-5">
              Academia Físico Ativo • 2 unidades em Uberlândia
            </p>
            <h1 className="font-display uppercase text-white text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-[3.6rem] lg:leading-[0.95]">
              Corpo ativo,
              <br />
              vida em movimento.
            </h1>
            <Swoosh className="w-40 h-4 text-[#FF4429] mt-4" />

            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-lg leading-relaxed">
              Há mais de 15 anos cuidando de Uberlândia com musculação,
              funcional, muay thai e fitdance — em um só lugar, com equipe
              especializada em cada modalidade.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4429] px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-[#e5391f] transition-colors"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                Quero minha aula experimental grátis
              </a>
              <a
                href="#modalidades"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/25 px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Ver modalidades
                <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white/60 text-sm">
              <div className="flex gap-0.5 text-[#FFB020]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span>
                Comunidade fiel de alunos há mais de uma década ·{" "}
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </span>
            </div>
          </div>

          {/* Badge visual decorativo */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-floaty relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] bg-gradient-to-br from-[#FF4429] to-[#FFB020] flex flex-col items-center justify-center shadow-2xl shadow-[#FF4429]/30 rotate-[-3deg]">
              <span className="font-display text-white text-7xl sm:text-8xl leading-none">
                15+
              </span>
              <span className="font-display text-white/90 text-sm sm:text-base tracking-[0.2em] mt-2 text-center px-6">
                ANOS MOVIMENTANDO
                <br />
                UBERLÂNDIA
              </span>
            </div>

            <div className="hidden sm:flex absolute -top-4 -left-6 rotate-[6deg] items-center gap-2 rounded-2xl bg-[#1B1E29] border border-white/10 px-4 py-3 shadow-xl">
              <Dumbbell size={18} className="text-[#FF4429]" />
              <span className="text-white text-xs font-bold">
                4 modalidades
              </span>
            </div>

            <div className="hidden sm:flex absolute -bottom-5 -right-4 rotate-[-4deg] items-center gap-2 rounded-2xl bg-[#1B1E29] border border-white/10 px-4 py-3 shadow-xl">
              <Users size={18} className="text-[#FFB020]" />
              <span className="text-white text-xs font-bold">
                Comunidade fiel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* TICKER                                                          */}
      {/* -------------------------------------------------------------- */}
      <div className="bg-[#FF4429] overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center">
              {[
                "MATRÍCULAS ABERTAS",
                "AULA EXPERIMENTAL GRÁTIS",
                "+15 ANOS EM UBERLÂNDIA",
                "MUSCULAÇÃO • FUNCIONAL • MUAY THAI • FITDANCE",
                "BAIRRO TOCANTINS",
              ].map((text) => (
                <span
                  key={text}
                  className="font-display text-white text-sm sm:text-base tracking-widest px-6"
                >
                  {text} <span className="mx-6 opacity-60">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* MODALIDADES                                                     */}
      {/* -------------------------------------------------------------- */}
      <section
        id="modalidades"
        className="bg-[#F1F3F6] py-20 sm:py-28 px-5 sm:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <SectionEyebrow>Nossas modalidades</SectionEyebrow>
            <h2 className="font-display uppercase text-3xl sm:text-4xl leading-tight">
              Treine do jeito que combina com você
            </h2>
            <Swoosh className="w-32 h-3.5 text-[#FF4429] mt-3" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {MODALITIES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FF4429]/10 flex items-center justify-center text-[#FF4429] group-hover:bg-[#FF4429] group-hover:text-white transition-colors">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 className="font-display uppercase text-lg mt-4">{title}</h3>
                <p className="text-sm text-[#4B5160] mt-1.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* DIFERENCIAIS                                                    */}
      {/* -------------------------------------------------------------- */}
      <section
        id="diferenciais"
        className="bg-[#12141C] py-20 sm:py-28 px-5 sm:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <SectionEyebrow>Por que treinar na Físico Ativo</SectionEyebrow>
            <h2 className="font-display uppercase text-3xl sm:text-4xl leading-tight text-white">
              Estrutura, tradição e gente que se importa
            </h2>
            <Swoosh className="w-32 h-3.5 text-[#FF4429] mt-3" />
          </div>

          <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
            {DIFERENCIAIS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB020]">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="font-display uppercase text-white text-lg">
                    {title}
                  </h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed max-w-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* DEPOIMENTOS                                                     */}
      {/* -------------------------------------------------------------- */}
      <section
        id="depoimentos"
        className="bg-white py-20 sm:py-28 px-5 sm:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <SectionEyebrow>Quem treina, aprova</SectionEyebrow>
            <h2 className="font-display uppercase text-3xl sm:text-4xl leading-tight">
              Histórias de quem já é da família
            </h2>
            <Swoosh className="w-32 h-3.5 text-[#FF4429] mt-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-[#F1F3F6] p-7 flex flex-col"
              >
                <Quote size={24} className="text-[#FF4429]" />
                <p className="text-sm sm:text-[15px] text-[#1B1E29]/80 leading-relaxed mt-4 flex-1">
                  “{t.quote}”
                </p>
                <div className="flex gap-0.5 text-[#FFB020] mt-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-wide mt-2">
                  {t.name}
                </p>
                <p className="text-xs text-[#4B5160]">{t.time}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#4B5160] mt-6">
            * Depoimentos ilustrativos — substitua pelos relatos reais dos seus
            alunos.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* CTA BAND                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="bg-[#FF4429] py-16 sm:py-20 px-5 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-white leading-tight">
            Sua aula experimental é grátis. Seu primeiro passo também pode ser.
          </h2>
          <p className="text-white/85 mt-4 text-sm sm:text-base">
            Sem compromisso, sem enrolação — fale agora com a nossa equipe pelo
            WhatsApp.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 mt-8 text-sm sm:text-base font-bold text-[#FF4429] hover:bg-white/90 transition-colors"
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            Falar no WhatsApp agora
          </a>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* LOCALIZAÇÃO — DUAS UNIDADES                                     */}
      {/* -------------------------------------------------------------- */}
      <section
        id="localizacao"
        className="bg-[#F1F3F6] py-20 sm:py-28 px-5 sm:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <SectionEyebrow>Venha treinar com a gente</SectionEyebrow>
            <h2 className="font-display uppercase text-3xl sm:text-4xl leading-tight">
              Duas unidades para você treinar pertinho de casa
            </h2>
            <Swoosh className="w-32 h-3.5 text-[#FF4429] mt-3" />
          </div>

          {/* Horário — igual nas duas unidades */}
          <div className="flex items-start gap-3 bg-white rounded-2xl p-5 mb-8 max-w-xl">
            <Clock size={20} className="text-[#FF4429] shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {HOURS.map((h) => (
                <div key={h.label} className="flex gap-2 text-sm">
                  <span className="text-[#4B5160]">{h.label}:</span>
                  <span className="font-semibold">{h.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {UNITS.map((unit) => (
              <div
                key={unit.name}
                className="rounded-2xl overflow-hidden shadow-md bg-white flex flex-col"
              >
                <iframe
                  src={unit.mapEmbedSrc}
                  title={`Localização da unidade ${unit.name}`}
                  className="w-full h-[220px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="bg-[#12141C] p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display uppercase text-white text-xl">
                        {unit.name}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <MapPin
                          size={18}
                          className="text-[#FF4429] shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-white/80 text-sm">
                            {unit.address}
                          </p>
                          <a
                            href={unit.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#FFB020] text-xs font-bold mt-1 hover:underline"
                          >
                            Como chegar <ChevronRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Phone
                        size={18}
                        className="text-[#FF4429] shrink-0 mt-0.5"
                      />
                      <a
                        href={`tel:+${unit.whatsapp}`}
                        className="text-white font-semibold text-sm hover:underline"
                      >
                        {unit.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <a
                    href={waLink(unit.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4429] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#e5391f] transition-colors"
                  >
                    <MessageCircle size={18} strokeWidth={2.5} />
                    Agendar na unidade {unit.name}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center justify-center mt-8 text-sm text-[#4B5160]">
            <Camera size={16} className="text-[#FF4429]" />
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* -------------------------------------------------------------- */}
      <footer className="bg-[#12141C] text-white/60 pt-16 pb-28 lg:pb-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-10">
          <div>
            <span className="font-display text-2xl text-white">
              FÍSICO<span className="text-[#FF4429]">ATIVO</span>
            </span>
            <p className="text-sm mt-3 max-w-xs leading-relaxed">
              Mais de 15 anos ajudando Uberlândia a treinar com saúde, técnica e
              comunidade.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              Navegue
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              Unidades
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              {UNITS.map((unit) => (
                <div key={unit.name}>
                  <p className="text-white font-semibold text-xs uppercase tracking-wide">
                    {unit.name}
                  </p>
                  <p>{unit.address}</p>
                  <a
                    href={`tel:+${unit.whatsapp}`}
                    className="hover:text-white transition-colors"
                  >
                    {unit.phoneDisplay}
                  </a>
                </div>
              ))}
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-xs flex flex-col sm:flex-row gap-2 justify-between">
          <span>
            © {new Date().getFullYear()} Academia Físico Ativo. Todos os
            direitos reservados.
          </span>
          <span>Tocantins e Monte Hebron, Uberlândia - MG</span>
        </div>
      </footer>

      {/* -------------------------------------------------------------- */}
      {/* CTA FLUTUANTE (desktop)                                         */}
      {/* -------------------------------------------------------------- */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="hidden lg:flex fixed bottom-6 right-6 z-50 items-center justify-center w-14 h-14 rounded-full bg-[#FF4429] text-white shadow-xl shadow-[#FF4429]/30 hover:scale-105 transition-transform"
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </a>

      {/* -------------------------------------------------------------- */}
      {/* BARRA FIXA MOBILE                                               */}
      {/* -------------------------------------------------------------- */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#12141C] border-t border-white/10 px-4 py-3 flex gap-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={TEL_LINK}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm font-bold text-white"
        >
          <Phone size={16} />
          Ligar
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4429] py-3 text-sm font-bold text-white"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
