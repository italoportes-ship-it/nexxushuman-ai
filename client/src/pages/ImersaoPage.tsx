/* ===== Página Imersão Agêntica — NexxusHuman-AI =====
 * ALTERADO: Cor preta (identidade visual), campo editável empresa,
 * seção de pricing/investimento, botão exportar PDF
 * ============================================================================ */

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Brain, Zap, Shield, Network, Bot, Code, Database, TrendingUp,
  ArrowRight, CheckCircle2, Users, Sparkles, Download, Share2, LinkIcon,
  BarChart3, FileText, MessageCircle, Cpu, Eye, Lock, Layers
} from "lucide-react";
import jsPDF from "jspdf";

const ACCENT = "#A100FF"; // Violeta — identidade visual do site

export default function ImersaoPage() {
  const { lang } = useLanguage();
  const [companyName, setCompanyName] = useState("Sua Empresa");

  // Carregar proposta personalizada se acessado via /imersao/:slug
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const slugMatch = path.match(/\/imersao\/([a-zA-Z0-9_-]+)/);
  const slug = slugMatch?.[1] || "";
  const { data: proposta } = trpc.proposta.getBySlug.useQuery(
    { slug },
    { enabled: !!slug, refetchOnWindowFocus: false }
  );

  // Atualizar nome quando proposta carrega
  if (proposta && proposta.empresaNome && companyName === "Sua Empresa") {
    setCompanyName(proposta.empresaNome);
  }

  // Exportar proposta em PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const w = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, w, 40, "F");
    doc.setTextColor(161, 0, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("> NexxusHuman-AI", 14, 28);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("Proposta Comercial — Imersão Agêntica", w - 14, 28, { align: "right" });

    y = 55;
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Imersão Agêntica — ${companyName}`, 14, y);

    y += 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("30 dias para enxergar a empresa do futuro e por onde começar.", 14, y);

    y += 20;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Catálogo de Serviços Inclusos:", 14, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const services = ["Diagnóstico de Prontidão (Sem 1-2)", "Organograma Agêntico (Sem 2-3)", "Criação de Agentes (Sem 3-4)", "Governança & Compliance (Contínuo)", "Integração de Sistemas (Sem 2-4)", "Capacitação da Equipe (Sem 3-4)"];
    services.forEach(s => { doc.text(`• ${s}`, 18, y); y += 7; });

    y += 10;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Hub de Ferramentas:", 14, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const tools = ["Agent Builder", "Analytics Hub", "Orchestrator", "Governance", "Data Fabric", "Doc Generator", "AI Copilot", "API Gateway"];
    tools.forEach(t => { doc.text(`• ${t}`, 18, y); y += 7; });

    y += 15;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Investimento:", 14, y);
    y += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Imersão Completa (30 dias): Sob consulta", 18, y); y += 7;
    doc.text("ROI médio esperado: 171% em 12-18 meses", 18, y); y += 7;
    doc.text("Payback estimado: 4-6 meses", 18, y);

    y += 20;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Proposta gerada em ${new Date().toLocaleDateString("pt-BR")} — NexxusHuman-AI`, 14, y);

    doc.save(`proposta-imersao-${companyName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    toast.success("Proposta exportada em PDF!");
  };

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/90">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#A100FF]">&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={handleExportPDF} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-white/60 text-xs font-medium hover:border-[#A100FF]/50 hover:text-white transition-colors">
              <Download className="w-3 h-3" /> Exportar PDF
            </button>
            <Link href="/agendar" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A100FF] text-white text-sm font-semibold hover:bg-[#8800DD] transition-colors">
              Iniciar Imersão
            </Link>
          </div>
        </div>
      </header>

      <main>
        <HeroSection companyName={companyName} setCompanyName={setCompanyName} />
        <WhatIsSection />
        <OrgChartSection />
        <ServicesCatalog />
        <SocialProofSection />
        <ToolsHub />
        <PricingSection companyName={companyName} />
        <TimelineSection />
        <CTASection onExport={handleExportPDF} companyName={companyName} />
      </main>
    </div>
  );
}

/* ===== HERO com campo editável ===== */
function HeroSection({ companyName, setCompanyName }: { companyName: string; setCompanyName: (v: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(161,0,255,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(161,0,255,0.08), transparent 60%)" }} />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-[clamp(80px,14vh,160px)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#A100FF]/10 text-[#A100FF] border border-[#A100FF]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A100FF]" />
            Imersão Agêntica · NexxusHuman-AI
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-8 text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.08] tracking-tight">
          <span
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) => setCompanyName(e.currentTarget.textContent || "Sua Empresa")}
            className="text-[#A100FF] outline-none border-b-2 border-dashed border-[#A100FF]/30 focus:border-[#A100FF] px-1 transition-colors cursor-text"
          >
            {companyName}
          </span>
          , antes de implementar IA, é preciso saber{" "}
          <em className="not-italic text-[#A100FF]">onde</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="mt-6 text-lg text-white/50 max-w-[600px] leading-relaxed">
          30 dias para enxergar a sua empresa do futuro e por onde começar. Diagnóstico completo, organograma agêntico e roadmap de implementação.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-8 flex items-center gap-3 text-xs text-white/30">
          <span className="text-[#A100FF]">↑</span> Clique no nome acima para personalizar a proposta
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex gap-4 flex-wrap">
          <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-7 py-4 bg-[#A100FF] text-white text-[17px] font-semibold hover:bg-[#8800DD] transition-colors">
            Iniciar Imersão Agêntica
          </Link>
          <a href="#servicos" className="inline-flex items-center gap-2 px-7 py-4 text-[17px] font-semibold border border-white/15 text-white/80 hover:border-white/30 transition-colors">
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
    <section ref={ref} className="relative overflow-hidden border-t border-white/5" style={{ background: "radial-gradient(40% 60% at 15% 22%, rgba(161,0,255,0.06), transparent 62%)" }}>
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">O que é</span>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.1]">
            Imersão <em className="not-italic text-[#A100FF]">Agêntica</em>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 inline-flex items-center gap-6 flex-wrap justify-center">
          <span className="text-[clamp(3rem,8vw,5rem)] font-black tracking-tighter">
            30<span className="text-[#A100FF]"> dias</span>
          </span>
          <span className="text-left text-[clamp(1rem,1.5vw,1.2rem)] text-white/50 max-w-[320px]">
            para enxergar a sua <em className="not-italic text-[#A100FF]">empresa do futuro</em> e por onde começar.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== ORGANOGRAMA ===== */
function OrgChartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const departments = [
    { name: "Marketing", lead: "LP", humans: 2, agents: 3, nodes: [{ label: "Content", color: "#E5A833" }, { label: "Benchmark", color: "#EC4899" }, { label: "Social", color: "#A855F7" }] },
    { name: "People", lead: "JR", humans: 1, agents: 4, nodes: [{ label: "Recruiter", color: "#A855F7" }, { label: "Onboarding", color: "#A855F7" }, { label: "Culture", color: "#EC4899" }] },
    { name: "Customer Success", lead: "RT", humans: 2, agents: 3, nodes: [{ label: "Health Score", color: "#E5A833" }, { label: "CS Onboard", color: "#A100FF" }, { label: "NPS", color: "#4F8FF0" }] },
    { name: "Operações", lead: "MS", humans: 1, agents: 2, nodes: [{ label: "Transcriber", color: "#A100FF" }, { label: "Tracker", color: "#A3CE3A" }] },
    { name: "Financeiro", lead: "PL", humans: 1, agents: 2, nodes: [{ label: "Finance", color: "#E5A833" }, { label: "Invoice", color: "#A100FF" }] },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A100FF]" /> Organograma Agêntico
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            Sua estrutura operacional <em className="not-italic text-[#A100FF]">agêntica</em>
          </h2>
        </motion.div>
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-sm font-bold border-2 border-[#A100FF] text-[#A100FF] bg-black" style={{ boxShadow: "0 0 0 5px rgba(161,0,255,0.12), 0 0 26px -4px rgba(161,0,255,0.3)" }}>
            CEO
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {departments.map((dept, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
              <div className="text-[11px] font-semibold text-white/60 mb-3">{dept.name}</div>
              <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-2 border border-white/20 text-white/60 bg-black">{dept.lead}</div>
              <div className="text-[10px] text-white/40 mb-3">{dept.humans}H · {dept.agents}A</div>
              <div className="space-y-2">
                {dept.nodes.map((node, j) => (
                  <div key={j} className="flex items-center justify-center gap-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-black" style={{ border: `1.5px solid ${node.color}`, color: node.color, boxShadow: `${node.color} 0 0 12px -3px` }}>
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
    { icon: Eye, title: "Diagnóstico de Prontidão", desc: "Mapeamento completo: qualidade de dados, governança, maturidade de workflows e prontidão da equipe.", duration: "Semana 1-2", color: "#A100FF" },
    { icon: Network, title: "Organograma Agêntico", desc: "Redesenho da estrutura operacional com definição de agentes por departamento e fluxos de orquestração.", duration: "Semana 2-3", color: "#A855F7" },
    { icon: Bot, title: "Criação de Agentes", desc: "Desenvolvimento e implementação de agentes especializados para processos core identificados.", duration: "Semana 3-4", color: "#E5A833" },
    { icon: Shield, title: "Governança & Compliance", desc: "Framework de governança por ciclo de vida com Human-in-the-loop e audit trail completo.", duration: "Contínuo", color: "#EC4899" },
    { icon: Cpu, title: "Integração de Sistemas", desc: "Conectores nativos para SAP, Salesforce, Oracle e 50+ sistemas legados sem projetos longos de TI.", duration: "Semana 2-4", color: "#4F8FF0" },
    { icon: Users, title: "Capacitação da Equipe", desc: "Programa de requalificação: de executores de tarefas para orquestradores de agentes autônomos.", duration: "Semana 3-4", color: "#A3CE3A" },
  ];

  return (
    <section ref={ref} id="servicos" className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">Catálogo de Serviços</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">Tudo que está <em className="not-italic text-[#A100FF]">incluso</em></h2>
          <p className="mt-3 text-white/50 max-w-[500px] mx-auto text-sm">Cada módulo é entregue com documentação, treinamento e suporte dedicado.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-[#111] p-6 lg:p-8 hover:bg-[#1a1a1a] transition-colors">
              <s.icon className="w-6 h-6 mb-4" style={{ color: s.color }} />
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{s.desc}</p>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1" style={{ background: `${s.color}14`, color: s.color }}>{s.duration}</span>
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
    <section ref={ref} className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">Hub de Ferramentas</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">Plataforma <em className="not-italic text-[#A100FF]">completa</em></h2>
          <p className="mt-3 text-white/50 max-w-[500px] mx-auto text-sm">Todas as ferramentas necessárias para operar sua organização agêntica.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="mb-12">
          <div className="relative max-w-[800px] mx-auto overflow-hidden border border-white/10">
            <video className="w-full aspect-video object-cover" controls poster="/manus-storage/pitch-male-presenter_34bb8787.png" preload="metadata">
              <source src="/manus-storage/nexxus-pitch-male_1967e334.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-mono bg-black/80 text-[#A100FF]">Demo — Hub de Ferramentas</div>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }} className="bg-[#111] p-4 text-center border border-white/5">
              <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center bg-[#A100FF]/10 border border-[#A100FF]/20">
                <tool.icon className="w-5 h-5 text-[#A100FF]" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{tool.name}</h4>
              <p className="text-[11px] text-white/40 mb-2">{tool.desc}</p>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 ${tool.status === "Beta" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"}`}>{tool.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== PRICING / INVESTIMENTO ===== */
function PricingSection({ companyName }: { companyName: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="investimento" className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">Investimento</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">
            Proposta para <em className="not-italic text-[#A100FF]">{companyName}</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
          {/* Plano Discovery */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="bg-[#111] p-8 flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Fase 1</span>
            <h3 className="text-xl font-black mb-1">Discovery</h3>
            <p className="text-sm text-white/40 mb-4">Diagnóstico + Organograma</p>
            <span className="text-2xl font-black text-[#A100FF] mb-4">Sob consulta</span>
            <ul className="space-y-2 mb-6 flex-1">
              {["Diagnóstico de prontidão completo", "Organograma agêntico personalizado", "Mapeamento de 5+ workflows", "Relatório executivo com ROI", "2 semanas de duração"].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60"><CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <Link href="/agendar" className="w-full inline-flex items-center justify-center gap-2 py-3 border border-white/15 text-white font-semibold text-sm hover:border-[#A100FF]/50 transition-colors">
              Agendar Discovery
            </Link>
          </motion.div>

          {/* Plano Imersão Completa (destaque) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="p-8 flex flex-col bg-[#A100FF]/5 border border-[#A100FF]/30">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF] mb-2">Recomendado</span>
            <h3 className="text-xl font-black mb-1">Imersão Completa</h3>
            <p className="text-sm text-white/40 mb-4">Discovery + Implementação</p>
            <span className="text-2xl font-black text-[#A100FF] mb-4">Sob consulta</span>
            <ul className="space-y-2 mb-6 flex-1">
              {["Tudo do Discovery +", "Criação de 3-5 agentes piloto", "Integração com sistemas existentes", "Capacitação da equipe (20h)", "Governança implementada", "4 semanas de duração", "Suporte 30 dias pós-entrega"].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60"><CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <Link href="/agendar" className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
              Agendar Imersão <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Plano Enterprise */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#111] p-8 flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Escala</span>
            <h3 className="text-xl font-black mb-1">Enterprise</h3>
            <p className="text-sm text-white/40 mb-4">Transformação completa</p>
            <span className="text-2xl font-black text-[#A100FF] mb-4">Personalizado</span>
            <ul className="space-y-2 mb-6 flex-1">
              {["Tudo da Imersão Completa +", "Fábricas ilimitadas de agentes", "Integração enterprise (SAP, Oracle)", "Centro de Excelência dedicado", "Programa de requalificação", "12+ semanas de duração", "Gerente de sucesso dedicado"].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60"><CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2 py-3 border border-white/15 text-white font-semibold text-sm hover:border-[#A100FF]/50 transition-colors">
              Falar com Especialista
            </Link>
          </motion.div>
        </div>

        {/* ROI comparativo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-[2px] bg-[#A100FF]/5 border border-[#A100FF]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-4xl font-black text-[#A100FF]">171%</span>
            <span className="text-sm text-white/50 block mt-1">ROI médio em 12-18 meses</span>
          </div>
          <div className="text-center">
            <span className="text-4xl font-black text-green-400">4-6</span>
            <span className="text-sm text-white/50 block mt-1">Meses para payback</span>
          </div>
          <div>
            <span className="text-4xl font-black text-amber-400">40%</span>
            <span className="text-sm text-white/50 block mt-1">Dos projetos de IA falham sem estrutura</span>
          </div>
        </motion.div>
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
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">Como funciona</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">4 semanas para <em className="not-italic text-[#A100FF]">transformar</em></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {phases.map((phase, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-[#111] p-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A100FF]">{phase.week}</span>
              <h3 className="text-base font-bold text-white mt-2 mb-4">{phase.title}</h3>
              <div className="space-y-2">
                {phase.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-[12px] text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#A100FF]" />{item}
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

/* ===== SOCIAL PROOF ===== */
function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = [
    { quote: "A imers\u00e3o nos deu clareza total de onde come\u00e7ar. Em 30 dias t\u00ednhamos o roadmap completo.", author: "Diretor de Opera\u00e7\u00f5es", company: "Empresa de Tecnologia" },
    { quote: "O organograma ag\u00eantico mudou nossa vis\u00e3o. Reduzimos 60% do tempo em processos manuais.", author: "VP de Inova\u00e7\u00e3o", company: "Ind\u00fastria Farmac\u00eautica" },
    { quote: "ROI de 200% em 8 meses. A abordagem estruturada fez toda a diferen\u00e7a vs. pilotos anteriores.", author: "CFO", company: "Servi\u00e7os Financeiros" },
  ];

  const logos = ["Acme Corp", "TechVentures", "GlobalPharma", "FinanceHub", "RetailMax", "IndustriaX"];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A100FF]">Social Proof</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">Empresas que j\u00e1 <em className="not-italic text-[#A100FF]">transformaram</em></h2>
        </motion.div>

        {/* Logos */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap justify-center gap-8 mb-12">
          {logos.map((logo, i) => (
            <div key={i} className="px-5 py-3 bg-[#111] border border-white/5 text-white/30 text-sm font-semibold">
              {logo}
            </div>
          ))}
        </motion.div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }} className="bg-[#111] p-6">
              <p className="text-sm text-white/60 leading-relaxed mb-4 italic">\"{t.quote}\"</p>
              <div>
                <span className="text-xs font-semibold text-white">{t.author}</span>
                <span className="text-[10px] text-white/30 block">{t.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA FINAL ===== */
function CTASection({ onExport, companyName }: { onExport: () => void; companyName: string }) {
  const createProposta = trpc.proposta.create.useMutation();

  const handleShareLink = async () => {
    if (companyName === "Sua Empresa") {
      toast.error("Personalize o nome da empresa no topo antes de gerar o link.");
      return;
    }
    try {
      const result = await createProposta.mutateAsync({ empresaNome: companyName });
      if (result.slug) {
        const url = `${window.location.origin}/imersao/${result.slug}`;
        navigator.clipboard.writeText(url);
        toast.success(`Link copiado! Compartilhe: /imersao/${result.slug}`);
      }
    } catch {
      toast.error("Erro ao gerar link. Tente novamente.");
    }
  };

  return (
    <section className="border-t border-white/5 py-20">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          Pronto para a <em className="not-italic text-[#A100FF]">imers\u00e3o</em>?
        </h2>
        <p className="text-white/50 max-w-[500px] mx-auto mb-8">
          Não deixe sua empresa fazer parte dos 40% de projetos de IA cancelados. O futuro pertence a quem adapta a estrutura.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/agendar" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#A100FF] text-white text-[15px] font-semibold hover:bg-[#8800DD] transition-colors">
            Agendar Sess\u00e3o <ArrowRight className="w-4 h-4" />
          </Link>
          <button onClick={onExport} className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 text-[15px] font-semibold hover:border-[#A100FF]/50 transition-colors">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button onClick={handleShareLink} disabled={createProposta.isPending} className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 text-[15px] font-semibold hover:border-[#A100FF]/50 transition-colors disabled:opacity-50">
            <LinkIcon className="w-4 h-4" /> {createProposta.isPending ? "Gerando..." : "Gerar Link"}
          </button>
        </div>
      </div>
    </section>
  );
}
