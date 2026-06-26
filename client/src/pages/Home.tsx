/* ===== NexxusHuman-AI — Redesign Accenture-Inspired =====
 * Design: Fundo preto, tipografia bold, acento violeta elétrico
 * Conteúdo: Plano de consultoria em organização agêntica
 * Referência visual: accenture.com (layout, cards, movimentação)
 * ======================================================== */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ===== NAVBAR — Estilo Accenture: minimalista, fundo transparente ===== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
        {/* ALTERADO: Logo com símbolo ">" estilo Accenture */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-[#A100FF] text-2xl font-black transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
          <span className="text-white text-lg font-bold tracking-tight">
            NexxusHuman-AI
          </span>
        </a>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">
            What we do
          </a>
          <a href="#insights" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">
            Insights
          </a>
          <a href="#cases" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">
            Cases
          </a>
          <a href="#about" className="text-[15px] text-white/80 hover:text-white transition-colors font-medium">
            About
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-[#A100FF] transition-colors"
        >
          Contact us
          <span className="text-[#A100FF]">&gt;</span>
        </a>
      </div>
    </header>
  );
}

/* ===== HERO — Estilo Accenture: tipografia massiva, fundo preto ===== */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#1a0033] opacity-80" />
      
      {/* Grid pattern sutil */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ALTERADO: Headline massiva estilo Accenture */}
          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black leading-[0.95] tracking-tight uppercase max-w-[14ch]">
            <span className="text-white">Together we</span>
            <br />
            <span className="text-white">rein</span>
            <span className="text-[#A100FF]">&gt;</span>
            <span className="text-white">ented</span>
          </h1>

          {/* Subtítulo */}
          <div className="mt-12 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              The Agentic Organization
            </h2>
            <p className="text-base text-white/60 leading-relaxed">
              In a world of constant change, the agentic model is the new frontier of productivity. 
              We transform enterprises where humans and AI agents operate as an integrated system — 
              multiplying results up to 20x.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 mt-8 text-[15px] font-bold text-white hover:text-[#A100FF] transition-colors group"
            >
              See what we do
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#A100FF] text-white text-sm group-hover:translate-x-1 transition-transform">
                &gt;
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===== INSIGHTS CARDS — Grid estilo Accenture ===== */
function InsightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const insights = [
    { type: "Methodology", title: "The agentic journey: from immersion to autonomous culture", bg: "bg-white", text: "text-black" },
    { type: "Perspective", title: "AI agents are redesigning processes, not just automating them", bg: "bg-[#A100FF]", text: "text-white" },
    { type: "Research", title: "Agentic organizations multiply productivity by up to 20x", bg: "bg-black border border-white/10", text: "text-white" },
    { type: "Case Study", title: "From KYC in 15 days to 4 hours: banking transformation", bg: "bg-[#1a1a1a]", text: "text-white" },
  ];

  return (
    <section ref={ref} id="insights" className="py-0 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {insights.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${item.bg} ${item.text} p-8 min-h-[320px] flex flex-col justify-between group hover:opacity-90 transition-opacity`}
            >
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-70 block mb-4">
                  {item.type}
                </span>
                <h3 className="text-lg sm:text-xl font-bold leading-tight">
                  {item.title}
                </h3>
              </div>
              <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Read more <span className="text-[#A100FF]">&gt;</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SERVICES / METHODOLOGY — Estilo Accenture ===== */
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const phases = [
    { num: "01", title: "Agentic Immersion", desc: "We map where AI creates value and build the implementation roadmap. Strategic alignment with C-suite, deep process analysis, cultural assessment.", duration: "4–6 weeks" },
    { num: "02", title: "Agentic Sprint", desc: "We develop and deploy agent factories in priority domains. Hybrid squads redesign processes from scratch with AI-first logic.", duration: "8–12 weeks" },
    { num: "03", title: "Agentic Operation", desc: "We scale AI across the enterprise with robust architecture, embedded governance and agent-to-agent protocols.", duration: "12–24 weeks" },
    { num: "04", title: "Agentic Culture", desc: "We build organization-wide fluency through large-scale reskilling, ethical orchestration frameworks and continuous evolution.", duration: "Ongoing" },
  ];

  return (
    <section ref={ref} id="services" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            Our Methodology
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[20ch] mb-16">
            The four phases of agentic transformation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-[#111] p-8 lg:p-10 group hover:bg-[#1a1a1a] transition-colors"
            >
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

/* ===== VALUE PROPOSITION — Seção de impacto ===== */
function ValueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-[900px]"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            Value Proposition
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight mb-8">
            Not incremental automation.{" "}
            <span className="text-[#A100FF]">Structural reinvention.</span>
          </h2>
          <p className="text-lg text-black/60 leading-relaxed mb-12 max-w-[700px]">
            We don't optimize old processes — we rebuild them from the ground up with agentic logic. 
            Small, highly qualified human teams supervising factories of 50 to 100 AI agents executing 
            complete processes: client onboarding, financial closing, product launches.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-8"
        >
          {[
            { value: "20x", label: "Productivity multiplier" },
            { value: "95%", label: "Cycle time reduction" },
            { value: "85%", label: "Cost reduction per transaction" },
            { value: "90%", label: "Autonomous operational decisions" },
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

/* ===== CASES — Grid estilo Accenture ===== */
function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cases = [
    { sector: "Financial Services", title: "From 15-day KYC to 4 hours", desc: "60 specialized agents handling document collection, cross-verification, risk analysis and compliance. Human team of 4 senior analysts supervises exceptions.", metric: "80% cost reduction" },
    { sector: "Manufacturing", title: "Real-time production planning", desc: "Agents monitoring market signals, simulating scenarios, optimizing resource allocation and recommending daily adjustments.", metric: "40% inventory reduction" },
    { sector: "Insurance", title: "Claims process rebuilt from zero", desc: "Triage agents, investigation agents, settlement agents and communication agents. Human experts intervene only in high-complexity cases.", metric: "5-day resolution (was 45)" },
    { sector: "Retail", title: "Dynamic pricing at scale", desc: "Agents monitoring competition, demand elasticity and costs in real-time. Category managers supervise strategies and validate high-impact changes.", metric: "+4pp gross margin" },
  ];

  return (
    <section ref={ref} id="cases" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            Case Studies
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[18ch]">
            Reinvention in action
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-[#111] p-8 lg:p-10 group hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-3">
                {c.sector}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">{c.title}</h3>
              <p className="text-[15px] text-white/50 leading-relaxed mb-6">{c.desc}</p>
              <div className="border-t border-white/10 pt-4">
                <span className="text-lg font-bold text-[#A100FF]">{c.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== QUOTE — Estilo Accenture com citação de liderança ===== */
function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#A100FF]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-[900px]"
        >
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.2] mb-8">
            "Companies will have a greater technology landscape, but the true differentiator 
            will be the ability to preserve identity and cohesion while everything around changes rapidly. 
            It is human in the lead, not human in the loop."
          </blockquote>
          <p className="text-white/80 text-sm font-semibold">
            — NexxusHuman-AI Leadership Perspective
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== EVOLUTION PLAN — Timeline ===== */
function EvolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const horizons = [
    { period: "0–6 months", title: "Foundation", desc: "Align leadership, deploy first agentic domains, build the Center of Excellence. Generate concrete evidence for expansion." },
    { period: "6–18 months", title: "Expansion", desc: "Scale to multiple domains simultaneously. CoE takes the lead. Org chart formally redesigned for agentic structure." },
    { period: "18–36 months", title: "Maturity", desc: "Organization operates predominantly in agentic mode. Humans focus on strategic supervision, innovation and high-value relationships." },
    { period: "36+ months", title: "Continuous Reinvention", desc: "Self-reinvention capability. Strategic planning agents monitor the competitive environment and recommend business model pivots." },
  ];

  return (
    <section ref={ref} id="about" className="py-24 lg:py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            Evolution Plan
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight text-white max-w-[18ch]">
            Four horizons to full reinvention
          </h2>
        </motion.div>

        <div className="space-y-[2px]">
          {horizons.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="bg-[#111] p-8 lg:p-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="lg:w-48 shrink-0">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#A100FF] block mb-1">
                  {h.period}
                </span>
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

/* ===== CTA SECTION ===== */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="contact" className="py-24 lg:py-32 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight max-w-[16ch] mb-8">
            Ready to rein<span className="text-[#A100FF]">&gt;</span>ent?
          </h2>
          <p className="text-lg text-black/55 max-w-[600px] mb-10 leading-relaxed">
            The question is not whether your organization will be transformed — 
            it's whether you will lead that transformation or be transformed by it.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold text-[15px] hover:bg-[#A100FF] transition-colors duration-300 group"
          >
            Schedule a consultation
            <span className="text-[#A100FF] group-hover:text-white transition-colors">&gt;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== FOOTER — Estilo Accenture ===== */
function Footer() {
  return (
    <footer className="py-12 bg-[#111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[#A100FF] text-xl font-black">&gt;</span>
            <span className="text-white text-base font-bold tracking-tight">NexxusHuman-AI</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Accessibility", "Careers", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/30">
            © 2026 NexxusHuman-AI. All rights reserved. Transforming enterprises into Agentic Organizations.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ===== PÁGINA PRINCIPAL ===== */
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
    </div>
  );
}
