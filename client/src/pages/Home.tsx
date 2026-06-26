/* ===== NexxusHuman-AI — Home Page com i18n PT/EN =====
 * Design: Accenture-inspired (preto, violeta, bold)
 * Conteúdo: Plano de consultoria em organização agêntica
 * ===================================================== */

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

/* ===== NAVBAR ===== */
function Navbar() {
  const { t, lang, setLang } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-[#A100FF] text-2xl font-black transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
          <span className="text-white text-lg font-bold tracking-tight">NexxusHuman-AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">{t("nav.whatWeDo")}</a>
          <Link href="/diagnostico" className="text-[15px] text-[#A100FF] hover:text-white transition-colors font-semibold">{lang === "pt" ? "Diagnóstico IA" : "AI Diagnostic"}</Link>
          <Link href="/cases" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">{t("nav.cases")}</Link>
          <Link href="/blog" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">{lang === "pt" ? "Blog" : "Blog"}</Link>
          <Link href="/about" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">{t("nav.about")}</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Botão de troca de idioma */}
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="text-xs font-bold text-white/50 hover:text-white border border-white/20 px-3 py-1.5 transition-colors"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-[#A100FF] transition-colors">
            {t("nav.contact")} <span className="text-[#A100FF]">&gt;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ===== HERO ===== */
function HeroSection() {
  const { t, lang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#1a0033] opacity-80" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}>
          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black leading-[0.95] tracking-tight uppercase max-w-[14ch]">
            <span className="text-white">{t("hero.together")}</span><br />
            <span className="text-white">rein</span><span className="text-[#A100FF]">&gt;</span><span className="text-white">{lang === "pt" ? "entamos" : "ented"}</span>
          </h1>
          <div className="mt-12 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{t("hero.subtitle")}</h2>
            <p className="text-base text-white/60 leading-relaxed">{t("hero.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {/* CTA PRINCIPAL: Diagnóstico - bem visível */}
              <Link href="/diagnostico" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A100FF] text-white font-bold text-[15px] hover:bg-[#8800DD] transition-all duration-200 active:scale-[0.97] group">
                {lang === "pt" ? "Fazer Diagn\u00f3stico Gratuito" : "Free AI Diagnostic"}
                <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
              </Link>
              <a href="#services" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-[15px] hover:border-white/40 transition-colors">
                {t("hero.cta")}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


/* ===== INSIGHTS CARDS ===== */
function InsightsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const insights = [
    { type: t("insights.methodology"), title: t("insights.methodology.title"), bg: "bg-white", text: "text-black", link: "/methodology" },
    { type: t("insights.perspective"), title: t("insights.perspective.title"), bg: "bg-[#A100FF]", text: "text-white", link: "#" },
    { type: t("insights.research"), title: t("insights.research.title"), bg: "bg-black border border-white/10", text: "text-white", link: "#" },
    { type: t("insights.caseStudy"), title: t("insights.caseStudy.title"), bg: "bg-[#1a1a1a]", text: "text-white", link: "/cases/financial-services" },
  ];

  return (
    <section ref={ref} id="insights" className="py-0 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {insights.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Link href={item.link} className={`${item.bg} ${item.text} p-8 min-h-[320px] flex flex-col justify-between group hover:opacity-90 transition-opacity block`}>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-70 block mb-4">{item.type}</span>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">{item.title}</h3>
                </div>
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  {t("insights.readMore")} <span className="text-[#A100FF]">&gt;</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SERVICES / METHODOLOGY ===== */
function ServicesSection() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const phases = [
    { num: "01", title: t("services.phase1.title"), desc: t("services.phase1.desc"), duration: t("services.phase1.duration") },
    { num: "02", title: t("services.phase2.title"), desc: t("services.phase2.desc"), duration: t("services.phase2.duration") },
    { num: "03", title: t("services.phase3.title"), desc: t("services.phase3.desc"), duration: t("services.phase3.duration") },
    { num: "04", title: t("services.phase4.title"), desc: t("services.phase4.desc"), duration: t("services.phase4.duration") },
  ];

  return (
    <section ref={ref} id="services" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">{t("services.label")}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[20ch] mb-6">{t("services.title")}</h2>
          <Link href="/methodology" className="text-sm font-semibold text-[#A100FF] hover:text-white transition-colors mb-12 inline-block">
            {lang === "pt" ? "Ver metodologia completa →" : "See full methodology →"}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
          {phases.map((phase, i) => (
            <motion.div key={phase.num} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="bg-[#111] p-8 lg:p-10 group hover:bg-[#1a1a1a] transition-colors">
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#A100FF] font-mono text-sm font-bold">{phase.num}</span>
                <span className="text-[11px] text-white/40 font-medium">{phase.duration}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
              <p className="text-[15px] text-white/55 leading-relaxed">{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== VALUE PROPOSITION ===== */
function ValueSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-[900px]">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">{t("value.label")}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight mb-8">
            {t("value.title")} <span className="text-[#A100FF]">{t("value.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-black/60 leading-relaxed mb-12 max-w-[700px]">{t("value.desc")}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-8">
          {[
            { value: "20x", label: t("value.metric1") },
            { value: "95%", label: t("value.metric2") },
            { value: "85%", label: t("value.metric3") },
            { value: "90%", label: t("value.metric4") },
          ].map((metric, i) => (
            <div key={i} className="border-t-2 border-black pt-4">
              <span className="text-4xl lg:text-5xl font-black text-black block mb-2">{metric.value}</span>
              <span className="text-sm text-black/50 font-medium">{metric.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ===== CASES ===== */
function CasesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cases = [
    { id: "financial-services", sector: t("cases.finance"), title: t("cases.finance.title"), desc: t("cases.finance.desc"), metric: t("cases.finance.metric") },
    { id: "manufacturing", sector: t("cases.manufacturing"), title: t("cases.manufacturing.title"), desc: t("cases.manufacturing.desc"), metric: t("cases.manufacturing.metric") },
    { id: "insurance", sector: t("cases.insurance"), title: t("cases.insurance.title"), desc: t("cases.insurance.desc"), metric: t("cases.insurance.metric") },
    { id: "retail", sector: t("cases.retail"), title: t("cases.retail.title"), desc: t("cases.retail.desc"), metric: t("cases.retail.metric") },
  ];

  return (
    <section ref={ref} id="cases" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">{t("cases.label")}</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[18ch]">{t("cases.title")}</h2>
          </div>
          <Link href="/cases" className="hidden sm:inline-flex text-sm font-semibold text-[#A100FF] hover:text-white transition-colors">
            {t("cases.seeAll")} &gt;
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
              <Link href={`/cases/${c.id}`} className="block bg-[#111] p-8 lg:p-10 hover:bg-[#1a1a1a] transition-colors">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-3">{c.sector}</span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">{c.title}</h3>
                <p className="text-[15px] text-white/50 leading-relaxed mb-6">{c.desc}</p>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-lg font-bold text-[#A100FF]">{c.metric}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== QUOTE ===== */
function QuoteSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#A100FF]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-[900px]">
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.2] mb-8">{t("quote.text")}</blockquote>
          <p className="text-white/80 text-sm font-semibold">{t("quote.author")}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== EVOLUTION ===== */
function EvolutionSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const horizons = [
    { period: t("evolution.h1.period"), title: t("evolution.h1.title"), desc: t("evolution.h1.desc") },
    { period: t("evolution.h2.period"), title: t("evolution.h2.title"), desc: t("evolution.h2.desc") },
    { period: t("evolution.h3.period"), title: t("evolution.h3.title"), desc: t("evolution.h3.desc") },
    { period: t("evolution.h4.period"), title: t("evolution.h4.title"), desc: t("evolution.h4.desc") },
  ];

  return (
    <section ref={ref} id="about" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">{t("evolution.label")}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[18ch]">{t("evolution.title")}</h2>
        </motion.div>
        <div className="space-y-[2px]">
          {horizons.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} className="bg-[#111] p-8 lg:p-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 hover:bg-[#1a1a1a] transition-colors">
              <div className="lg:w-48 shrink-0">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#A100FF] block mb-1">{h.period}</span>
                <h3 className="text-xl font-bold text-white">{h.title}</h3>
              </div>
              <p className="text-[15px] text-white/50 leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA ===== */
function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="contact" className="py-24 lg:py-32 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight max-w-[16ch] mb-8">
            {lang === "pt" ? "Pronto para rein" : "Ready to rein"}<span className="text-[#A100FF]">&gt;</span>{lang === "pt" ? "entar?" : "ent?"}
          </h2>
          <p className="text-lg text-black/55 max-w-[600px] mb-10 leading-relaxed">{t("cta.desc")}</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold text-[15px] hover:bg-[#A100FF] transition-colors duration-300 group">
            {t("cta.button")} <span className="text-[#A100FF] group-hover:text-white transition-colors">&gt;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-[#111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-xl font-black">&gt;</span>
            <span className="text-white text-base font-bold tracking-tight">NexxusHuman-AI</span>
          </Link>
          <div className="flex flex-wrap gap-6">
            {[t("footer.privacy"), t("footer.terms"), t("footer.accessibility"), t("footer.careers"), t("footer.contact")].map((link) => (
              <a key={link} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors font-medium">{link}</a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/30">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}

/* ===== PÁGINA PRINCIPAL ===== */
/* ===== BANNER FLUTUANTE — Diagnóstico ===== */
function FloatingDiagnosticBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#A100FF] py-3 px-6 flex items-center justify-center gap-4 shadow-lg shadow-[#A100FF]/20">
      <span className="text-white text-sm font-semibold hidden sm:inline">
        {lang === "pt" ? "\u2728 Descubra o potencial de IA da sua empresa em 5 minutos" : "\u2728 Discover your company's AI potential in 5 minutes"}
      </span>
      <Link href="/diagnostico" className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors">
        {lang === "pt" ? "Fazer Diagn\u00f3stico" : "Take Diagnostic"} &gt;
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <InsightsSection />
      <ServicesSection />
      <ValueSection />
      <CasesSection />
      <QuoteSection />
      <EvolutionSection />
      <CTASection />
      <Footer />
      <FloatingDiagnosticBanner />
    </div>
  );
}


