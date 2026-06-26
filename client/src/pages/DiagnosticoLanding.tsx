/* ===== Landing Page dedicada ao Diagnóstico de IA =====
 * Estatísticas, explicação das 5 etapas e CTA para iniciar
 * ======================================================= */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Scan, TrendingUp, Shield, Target, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DiagnosticoLanding() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold tracking-tight">NexxusHuman-AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="text-xs font-bold text-white/50 hover:text-white border border-white/20 px-3 py-1.5 transition-colors">
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <Link href="/diagnostico/iniciar" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
              {lang === "pt" ? "Iniciar Diagnóstico" : "Start Diagnostic"} &gt;
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#1a0033] opacity-80" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#A100FF]/30 bg-[#A100FF]/5 mb-8">
              <Brain className="w-4 h-4 text-[#A100FF]" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#A100FF]">
                {lang === "pt" ? "Diagnóstico Estratégico de IA" : "Strategic AI Diagnostic"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black leading-[0.95] tracking-tight max-w-[18ch] mb-6">
              {lang === "pt"
                ? "Descubra onde a IA pode multiplicar seus resultados"
                : "Discover where AI can multiply your results"}
            </h1>
            <p className="text-lg text-white/55 max-w-[600px] mb-10 leading-relaxed">
              {lang === "pt"
                ? "Em 5 minutos, mapeamos processos automatizáveis, calculamos o ROI potencial e recomendamos agentes de IA específicos para sua empresa."
                : "In 5 minutes, we map automatable processes, calculate potential ROI and recommend specific AI agents for your company."}
            </p>
            <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-3 px-8 py-4 bg-[#A100FF] text-white font-bold text-[15px] hover:bg-[#8800DD] transition-colors group">
              {lang === "pt" ? "Iniciar Diagnóstico Gratuito" : "Start Free Diagnostic"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Estatísticas */}
      <StatsSection lang={lang} />

      {/* Features */}
      <FeaturesSection lang={lang} />

      {/* 5 Etapas */}
      <StepsSection lang={lang} />

      {/* CTA Final */}
      <section className="py-24 bg-[#A100FF]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            {lang === "pt" ? "Pronto para descobrir o potencial da IA na sua empresa?" : "Ready to discover AI potential in your company?"}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-[500px] mx-auto">
            {lang === "pt"
              ? "Gratuito, sem compromisso. Resultados em 5 minutos."
              : "Free, no commitment. Results in 5 minutes."}
          </p>
          <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors">
            {lang === "pt" ? "Começar Agora" : "Start Now"} <span className="text-[#A100FF]">&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatsSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = lang === "pt" ? [
    { value: "47%", label: "dos processos empresariais são automatizáveis com IA" },
    { value: "3.2x", label: "aumento médio de produtividade com agentes de IA" },
    { value: "68%", label: "redução de erros operacionais após implementação" },
    { value: "5 min", label: "para completar o diagnóstico e receber recomendações" },
  ] : [
    { value: "47%", label: "of business processes are automatable with AI" },
    { value: "3.2x", label: "average productivity increase with AI agents" },
    { value: "68%", label: "reduction in operational errors after implementation" },
    { value: "5 min", label: "to complete the diagnostic and receive recommendations" },
  ];

  return (
    <section ref={ref} className="py-16 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="border-t-2 border-black pt-4">
              <span className="text-3xl lg:text-4xl font-black block mb-2">{stat.value}</span>
              <span className="text-sm text-black/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = lang === "pt" ? [
    { icon: Scan, title: "Mapeamento Profundo", desc: "Identifica processos automatizáveis em 12 dimensões do seu negócio" },
    { icon: TrendingUp, title: "Priorização Inteligente", desc: "Classifica oportunidades por ROI potencial e nível de risco" },
    { icon: Shield, title: "Análise de Risco", desc: "Avalia complexidade técnica, dependências e impacto organizacional" },
    { icon: Target, title: "Recomendações de Agentes", desc: "Sugere agentes de IA específicos para cada processo identificado" },
  ] : [
    { icon: Scan, title: "Deep Mapping", desc: "Identifies automatable processes across 12 business dimensions" },
    { icon: TrendingUp, title: "Smart Prioritization", desc: "Ranks opportunities by potential ROI and risk level" },
    { icon: Shield, title: "Risk Analysis", desc: "Evaluates technical complexity, dependencies and organizational impact" },
    { icon: Target, title: "Agent Recommendations", desc: "Suggests specific AI agents for each identified process" },
  ];

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            {lang === "pt" ? "O que você recebe" : "What you get"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-12">
            {lang === "pt" ? "Diagnóstico completo em minutos" : "Complete diagnostic in minutes"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111] p-8 hover:bg-[#1a1a1a] transition-colors"
            >
              <f.icon className="w-8 h-8 text-[#A100FF] mb-5" />
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = lang === "pt" ? [
    { num: "01", title: "Perfil da Empresa", desc: "Informações sobre setor, porte e contexto do negócio para personalizar a análise." },
    { num: "02", title: "Mapeamento de Processos", desc: "Identificação de áreas operacionais, ferramentas utilizadas e gargalos existentes." },
    { num: "03", title: "Maturidade Tecnológica", desc: "Avaliação do nível digital, experiência com IA e infraestrutura disponível." },
    { num: "04", title: "Objetivos Estratégicos", desc: "Definição de prioridades, KPIs e tolerância a risco para direcionar recomendações." },
    { num: "05", title: "Dores e Oportunidades", desc: "Mapeamento de problemas críticos e processos com maior potencial de automação." },
  ] : [
    { num: "01", title: "Company Profile", desc: "Information about sector, size and business context to personalize the analysis." },
    { num: "02", title: "Process Mapping", desc: "Identification of operational areas, tools used and existing bottlenecks." },
    { num: "03", title: "Technology Maturity", desc: "Assessment of digital level, AI experience and available infrastructure." },
    { num: "04", title: "Strategic Objectives", desc: "Definition of priorities, KPIs and risk tolerance to guide recommendations." },
    { num: "05", title: "Pain Points & Opportunities", desc: "Mapping of critical problems and processes with highest automation potential." },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
            {lang === "pt" ? "Como funciona" : "How it works"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-12">
            {lang === "pt" ? "5 dimensões de análise" : "5 analysis dimensions"}
          </h2>
        </motion.div>

        <div className="space-y-[2px]">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-[#111] p-6 lg:p-8 flex items-start gap-6 hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-[#A100FF] font-mono text-sm font-bold shrink-0 mt-1">{step.num}</span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#A100FF]/30 shrink-0 ml-auto hidden sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
