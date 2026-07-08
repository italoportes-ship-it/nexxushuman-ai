/* ===== Página Imersão Agêntica — NexxusHuman-AI =====
 * Proposta comercial personalizada + Catálogo de serviços + Hub de ferramentas
 * Estilo: dark navy, cyan/roxo, organograma, inspirado no código de referência
 * ============================================================================ */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Brain, Zap, Shield, Network, Bot, Code, Database, TrendingUp,
  ArrowRight, Play, CheckCircle2, Clock, Users, Layers, Sparkles,
  BarChart3, FileText, MessageCircle, Cpu, Eye, Lock
} from "lucide-react";

// Cores do tema (estilo referência)
const CYAN = "#33ADE5";
const PURPLE = "#A855F7";
const GOLD = "#E5A833";

export default function ImersaoPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen text-white" style={{ background: "#0a1628" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md" style={{ background: "rgba(10,22,40,0.92)" }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black" style={{ color: CYAN }}>&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
          <Link href="/agendar" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all" style={{ background: CYAN, color: "#061828", borderRadius: "8px", boxShadow: `0 0 30px -10px ${CYAN}40` }}>
            Iniciar Imersão
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <HeroSection />

        {/* O que é */}
        <WhatIsSection />

        {/* Organograma Agêntico */}
        <OrgChartSection />

        {/* Catálogo de Serviços */}
        <ServicesCatalog />

        {/* Hub de Ferramentas */}
        <ToolsHub />

        {/* Timeline / Como funciona */}
        <TimelineSection />

        {/* CTA Final */}
        <CTASection />
      </main>
    </div>
  );
}

/* ===== HERO ===== */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(${CYAN}28 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 20% 50%, ${CYAN}18, transparent 60%)` }} />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-[clamp(80px,14vh,160px)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider" style={{ background: `${CYAN}14`, color: CYAN, border: `1px solid ${CYAN}28` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN }} />
            Imersão Agêntica · NexxusHuman-AI
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-8 text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] tracking-tight" style={{ textWrap: "balance" as any }}>
          Antes de implementar IA, é preciso saber{" "}
          <em className="not-italic" style={{ color: CYAN }}>onde</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="mt-6 text-lg text-white/50 max-w-[600px] leading-relaxed">
          30 dias para enxergar a sua empresa do futuro e por onde começar. Diagnóstico completo, organograma agêntico e roadmap de implementação.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-10 flex gap-4 flex-wrap">
          <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-7 py-4 text-[17px] font-semibold transition-all" style={{ background: CYAN, color: "#061828", borderRadius: "8px", boxShadow: `0 0 30px -10px ${CYAN}40` }}>
            Iniciar Imersão Agêntica
          </Link>
          <a href="#servicos" className="inline-flex items-center gap-2 px-7 py-4 text-[17px] font-semibold border border-white/15 text-white/80 hover:border-white/30 transition-all" style={{ borderRadius: "8px" }}>
            Ver Catálogo <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== O QUE É ===== */
function WhatIsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5" style={{ background: `radial-gradient(40% 60% at 15% 22%, ${CYAN}18, transparent 62%), radial-gradient(44% 66% at 88% 82%, ${PURPLE}13, transparent 62%)` }}>
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>O que é</span>
          <h2 className="mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[1.1]">
            Imersão <em className="not-italic" style={{ color: CYAN }}>Agêntica</em>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 inline-flex items-center gap-6 flex-wrap justify-center">
          <span className="text-[clamp(3rem,8vw,5.5rem)] font-black tracking-tighter">
            <span>30</span><span style={{ color: CYAN }}> dias</span>
          </span>
          <span className="text-left text-[clamp(1rem,1.6vw,1.25rem)] text-white/60 max-w-[340px]">
            para enxergar a sua <em className="not-italic" style={{ color: CYAN }}>empresa do futuro</em> e por onde começar.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== ORGANOGRAMA AGÊNTICO ===== */
function OrgChartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const departments = [
    { name: "Marketing", lead: "LP", humans: 2, agents: 3, nodes: [{ label: "Content", color: GOLD }, { label: "Benchmark", color: "#EC4899" }, { label: "Social", color: PURPLE }] },
    { name: "People", lead: "JR", humans: 1, agents: 4, nodes: [{ label: "Recruiter", color: PURPLE }, { label: "Onboarding", color: PURPLE }, { label: "Culture", color: "#EC4899" }] },
    { name: "Customer Success", lead: "RT", humans: 2, agents: 3, nodes: [{ label: "Health Score", color: GOLD }, { label: "CS Onboard", color: CYAN }, { label: "NPS", color: "#4F8FF0" }] },
    { name: "Operações", lead: "MS", humans: 1, agents: 2, nodes: [{ label: "Transcriber", color: CYAN }, { label: "Tracker", color: "#A3CE3A" }] },
    { name: "Financeiro", lead: "PL", humans: 1, agents: 2, nodes: [{ label: "Finance", color: GOLD }, { label: "Invoice", color: CYAN }] },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN }} />
            Organograma Agêntico
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            Sua estrutura operacional <em className="not-italic" style={{ color: CYAN }}>agêntica</em>
          </h2>
        </motion.div>

        {/* CEO Node */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-sm font-bold" style={{ border: `2px solid ${CYAN}`, color: CYAN, background: "rgba(8,18,34,0.92)", boxShadow: `0 0 0 5px ${CYAN}14, 0 0 26px -4px ${CYAN}40` }}>
              CEO
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {departments.map((dept, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
              <div className="text-[11px] font-semibold text-white/60 mb-3">{dept.name}</div>
              <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-2" style={{ border: "1.5px solid rgba(200,215,230,0.3)", color: "rgba(200,215,230,0.7)", background: "rgba(8,18,34,0.92)" }}>
                {dept.lead}
              </div>
              <div className="text-[10px] text-white/40 mb-3">{dept.humans}H · {dept.agents}A</div>
              <div className="space-y-2">
                {dept.nodes.map((node, j) => (
                  <div key={j} className="flex items-center justify-center gap-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ border: `1.5px solid ${node.color}`, color: node.color, background: "rgba(8,18,34,0.92)", boxShadow: `${node.color} 0 0 14px -3px` }}>
                      {node.label[0]}
                    </div>
                    <span className="text-[10px] text-white/50">{node.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CATÁLOGO DE SERVIÇOS ===== */
function ServicesCatalog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    { icon: Eye, title: "Diagnóstico de Prontidão", desc: "Mapeamento completo: qualidade de dados, governança, maturidade de workflows e prontidão da equipe.", duration: "Semana 1-2", color: CYAN },
    { icon: Network, title: "Organograma Agêntico", desc: "Redesenho da estrutura operacional com definição de agentes por departamento e fluxos de orquestração.", duration: "Semana 2-3", color: PURPLE },
    { icon: Bot, title: "Criação de Agentes", desc: "Desenvolvimento e implementação de agentes especializados para processos core identificados.", duration: "Semana 3-4", color: GOLD },
    { icon: Shield, title: "Governança & Compliance", desc: "Framework de governança por ciclo de vida com Human-in-the-loop e audit trail completo.", duration: "Contínuo", color: "#EC4899" },
    { icon: Cpu, title: "Integração de Sistemas", desc: "Conectores nativos para SAP, Salesforce, Oracle e 50+ sistemas legados sem projetos longos de TI.", duration: "Semana 2-4", color: "#4F8FF0" },
    { icon: Users, title: "Capacitação da Equipe", desc: "Programa de requalificação: de executores de tarefas para orquestradores de agentes autônomos.", duration: "Semana 3-4", color: "#A3CE3A" },
  ];

  return (
    <section ref={ref} id="servicos" className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>Catálogo de Serviços</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            Tudo que está <em className="not-italic" style={{ color: CYAN }}>incluso</em>
          </h2>
          <p className="mt-3 text-white/50 max-w-[500px] mx-auto text-sm">Cada módulo é entregue com documentação, treinamento e suporte dedicado.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 lg:p-8 group hover:scale-[1.01] transition-transform" style={{ background: "rgba(14,24,42,0.8)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <s.icon className="w-6 h-6 mb-4" style={{ color: s.color }} />
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{s.desc}</p>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded" style={{ background: `${s.color}14`, color: s.color }}>
                {s.duration}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== HUB DE FERRAMENTAS ===== */
function ToolsHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const tools = [
    { icon: Brain, name: "Agent Builder", desc: "Crie agentes sem código", status: "Ativo" },
    { icon: BarChart3, name: "Analytics Hub", desc: "Métricas em tempo real", status: "Ativo" },
    { icon: MessageCircle, name: "Orchestrator", desc: "Orquestração multi-agente", status: "Ativo" },
    { icon: Lock, name: "Governance", desc: "Compliance & audit trail", status: "Ativo" },
    { icon: Database, name: "Data Fabric", desc: "Integração de dados", status: "Ativo" },
    { icon: FileText, name: "Doc Generator", desc: "Documentação automática", status: "Beta" },
    { icon: Sparkles, name: "AI Copilot", desc: "Assistente inteligente", status: "Ativo" },
    { icon: Code, name: "API Gateway", desc: "Conectores e webhooks", status: "Ativo" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5" style={{ background: `radial-gradient(50% 50% at 50% 0%, ${CYAN}08, transparent)` }}>
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>Hub de Ferramentas</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            Plataforma <em className="not-italic" style={{ color: CYAN }}>completa</em>
          </h2>
          <p className="mt-3 text-white/50 max-w-[500px] mx-auto text-sm">Todas as ferramentas necessárias para operar sua organização agêntica em um só lugar.</p>
        </motion.div>

        {/* Vídeo do Hub */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="mb-12">
          <div className="relative max-w-[800px] mx-auto overflow-hidden" style={{ border: `1px solid ${CYAN}20`, borderRadius: "12px" }}>
            <video className="w-full aspect-video object-cover" controls poster="/manus-storage/pitch-male-presenter_34bb8787.png" preload="metadata">
              <source src="/manus-storage/nexxus-pitch-male_1967e334.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-mono" style={{ background: "rgba(10,22,40,0.85)", color: CYAN, borderRadius: "4px" }}>
              Demo — Hub de Ferramentas NexxusHuman-AI
            </div>
          </div>
        </motion.div>

        {/* Grid de ferramentas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }} className="p-4 text-center group cursor-default" style={{ background: "rgba(14,24,42,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}20` }}>
                <tool.icon className="w-5 h-5" style={{ color: CYAN }} />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{tool.name}</h4>
              <p className="text-[11px] text-white/40 mb-2">{tool.desc}</p>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${tool.status === "Beta" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"}`}>
                {tool.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== TIMELINE ===== */
function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const phases = [
    { week: "Semana 1", title: "Discovery & Diagnóstico", items: ["Entrevistas com lideranças", "Mapeamento de processos", "Análise de dados e sistemas", "Assessment de prontidão"] },
    { week: "Semana 2", title: "Design Agêntico", items: ["Organograma agêntico", "Priorização de workflows", "Arquitetura de agentes", "Definição de governança"] },
    { week: "Semana 3", title: "Prototipação", items: ["Agentes piloto em sandbox", "Integração com sistemas", "Testes de governança", "Validação com equipe"] },
    { week: "Semana 4", title: "Roadmap & Entrega", items: ["Roadmap de 12 meses", "Business case com ROI", "Plano de capacitação", "Handoff executivo"] },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>Como funciona</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            4 semanas para <em className="not-italic" style={{ color: CYAN }}>transformar</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 relative" style={{ background: "rgba(14,24,42,0.8)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "10px" }}>
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: CYAN }}>{phase.week}</span>
              <h3 className="text-base font-bold text-white mt-2 mb-4">{phase.title}</h3>
              <div className="space-y-2">
                {phase.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-[12px] text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: CYAN }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA FINAL ===== */
function CTASection() {
  return (
    <section className="border-t border-white/5 py-20" style={{ background: `radial-gradient(50% 80% at 50% 100%, ${CYAN}10, transparent)` }}>
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          Pronto para a <em className="not-italic" style={{ color: CYAN }}>imersão</em>?
        </h2>
        <p className="text-white/50 max-w-[500px] mx-auto mb-8">
          Não deixe sua empresa fazer parte dos 40% de projetos de IA cancelados. O futuro pertence a quem adapta a estrutura.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/agendar" className="inline-flex items-center gap-2 px-8 py-4 text-[17px] font-semibold transition-all" style={{ background: CYAN, color: "#061828", borderRadius: "8px", boxShadow: `0 0 30px -10px ${CYAN}40` }}>
            Agendar Sessão de Descoberta <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/diagnostico" className="inline-flex items-center gap-2 px-8 py-4 text-[17px] font-semibold border border-white/15 text-white/80 hover:border-white/30 transition-all" style={{ borderRadius: "8px" }}>
            Fazer Diagnóstico Gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}
