/* ===== Sub-páginas individuais de Produto ===== */
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, ArrowRight, Bot, Shield, Network, Zap, Database, Code, Users, BarChart3 } from "lucide-react";

const productsData: Record<string, { pt: any; en: any }> = {
  "fabricas-de-agentes": {
    pt: {
      title: "Fábricas de Agentes",
      subtitle: "Crie e orquestre redes de agentes inteligentes que executam processos completos de ponta a ponta",
      desc: "Nossa plataforma permite criar fábricas de 20 a 100 agentes especializados que operam em conjunto para executar processos empresariais completos — desde onboarding de clientes até fechamento contábil — com supervisão humana estratégica.",
      icon: Bot,
      features: [
        { title: "Orquestração Multi-Agente", desc: "Framework proprietário que coordena dezenas de agentes trabalhando em paralelo, com comunicação inteligente e resolução de conflitos." },
        { title: "Templates por Setor", desc: "Modelos pré-configurados para Finanças, Seguros, Varejo, Manufatura e Saúde — acelere a implantação em semanas, não meses." },
        { title: "Agent Builder Visual", desc: "Interface drag-and-drop para criar e configurar agentes sem código. Defina comportamentos, regras e integrações visualmente." },
        { title: "Monitoramento em Tempo Real", desc: "Dashboard unificado com status de cada agente, métricas de performance, logs de decisão e alertas de exceção." },
        { title: "Escalonamento Inteligente", desc: "Quando um agente encontra uma situação fora de seus parâmetros, escala automaticamente para supervisão humana com contexto completo." },
        { title: "Aprendizado Contínuo", desc: "Agentes aprendem com cada interação e feedback humano, melhorando performance continuamente sem necessidade de retreinamento manual." },
      ],
      specs: [
        { label: "Agentes por fábrica", value: "20–100" },
        { label: "Tempo de deploy", value: "2–4 semanas" },
        { label: "Uptime garantido", value: "99.9%" },
        { label: "Integrações nativas", value: "50+" },
      ],
      useCases: [
        "Onboarding de clientes (KYC)",
        "Atendimento ao cliente (L1/L2)",
        "Processamento de sinistros",
        "Fechamento contábil",
        "Gestão de supply chain",
      ],
    },
    en: {
      title: "Agent Factories",
      subtitle: "Create and orchestrate networks of intelligent agents that execute complete end-to-end processes",
      desc: "Our platform enables creating factories of 20 to 100 specialized agents that operate together to execute complete business processes — from client onboarding to financial closing — with strategic human supervision.",
      icon: Bot,
      features: [
        { title: "Multi-Agent Orchestration", desc: "Proprietary framework that coordinates dozens of agents working in parallel, with intelligent communication and conflict resolution." },
        { title: "Sector Templates", desc: "Pre-configured models for Finance, Insurance, Retail, Manufacturing and Healthcare — accelerate deployment in weeks, not months." },
        { title: "Visual Agent Builder", desc: "Drag-and-drop interface to create and configure agents without code. Define behaviors, rules and integrations visually." },
        { title: "Real-Time Monitoring", desc: "Unified dashboard with each agent's status, performance metrics, decision logs and exception alerts." },
        { title: "Smart Escalation", desc: "When an agent encounters a situation outside its parameters, it automatically escalates to human supervision with complete context." },
        { title: "Continuous Learning", desc: "Agents learn from each interaction and human feedback, continuously improving performance without manual retraining." },
      ],
      specs: [
        { label: "Agents per factory", value: "20–100" },
        { label: "Deploy time", value: "2–4 weeks" },
        { label: "Guaranteed uptime", value: "99.9%" },
        { label: "Native integrations", value: "50+" },
      ],
      useCases: [
        "Client onboarding (KYC)",
        "Customer service (L1/L2)",
        "Claims processing",
        "Financial closing",
        "Supply chain management",
      ],
    },
  },
  "governanca": {
    pt: {
      title: "Governança Contínua",
      subtitle: "Governança integrada ao ciclo de vida dos agentes — contínua, orientada por dados e embutida nos processos",
      desc: "Sistema de governança que monitora, audita e controla agentes em operação 24/7. Políticas de intervenção humana configuráveis, compliance automatizado e dashboards executivos que eliminam a necessidade de auditorias manuais.",
      icon: Shield,
      features: [
        { title: "Políticas de Supervisão", desc: "Defina regras granulares de quando e como humanos devem intervir. Configure thresholds por valor, risco ou complexidade." },
        { title: "Auditoria Automática", desc: "Cada decisão de cada agente é registrada com contexto completo. Trilha de auditoria imutável para compliance regulatório." },
        { title: "Alertas Inteligentes", desc: "Sistema de alertas que aprende padrões normais e notifica apenas anomalias reais — sem fadiga de alertas." },
        { title: "Compliance Integrado", desc: "Frameworks pré-configurados para LGPD, SOX, Basel III e regulações setoriais. Atualizações automáticas quando regulações mudam." },
        { title: "Dashboard Executivo", desc: "Visão consolidada para C-level com KPIs de governança, riscos ativos, decisões pendentes e performance do sistema." },
        { title: "Governança como Código", desc: "Políticas versionadas, testáveis e deployáveis como código. Integração com CI/CD para governança ágil." },
      ],
      specs: [
        { label: "Latência de alerta", value: "<30 segundos" },
        { label: "Retenção de logs", value: "7 anos" },
        { label: "Frameworks regulatórios", value: "15+" },
        { label: "SLA de resposta", value: "99.95%" },
      ],
      useCases: [
        "Compliance regulatório automatizado",
        "Auditoria contínua de decisões",
        "Gestão de risco operacional",
        "Supervisão de agentes financeiros",
        "Governança de dados sensíveis",
      ],
    },
    en: {
      title: "Continuous Governance",
      subtitle: "Governance integrated into the agent lifecycle — continuous, data-driven and embedded in processes",
      desc: "Governance system that monitors, audits and controls agents in operation 24/7. Configurable human intervention policies, automated compliance and executive dashboards that eliminate the need for manual audits.",
      icon: Shield,
      features: [
        { title: "Supervision Policies", desc: "Define granular rules for when and how humans should intervene. Configure thresholds by value, risk or complexity." },
        { title: "Automatic Auditing", desc: "Every decision from every agent is recorded with complete context. Immutable audit trail for regulatory compliance." },
        { title: "Smart Alerts", desc: "Alert system that learns normal patterns and notifies only real anomalies — no alert fatigue." },
        { title: "Integrated Compliance", desc: "Pre-configured frameworks for LGPD, SOX, Basel III and sector regulations. Automatic updates when regulations change." },
        { title: "Executive Dashboard", desc: "Consolidated view for C-level with governance KPIs, active risks, pending decisions and system performance." },
        { title: "Governance as Code", desc: "Versioned, testable and deployable policies as code. CI/CD integration for agile governance." },
      ],
      specs: [
        { label: "Alert latency", value: "<30 seconds" },
        { label: "Log retention", value: "7 years" },
        { label: "Regulatory frameworks", value: "15+" },
        { label: "Response SLA", value: "99.95%" },
      ],
      useCases: [
        "Automated regulatory compliance",
        "Continuous decision auditing",
        "Operational risk management",
        "Financial agent supervision",
        "Sensitive data governance",
      ],
    },
  },
  "escala-empresarial": {
    pt: {
      title: "Escala Empresarial",
      subtitle: "Escale de um domínio para toda a organização com arquitetura enterprise-grade",
      desc: "Arquitetura projetada para escalar de projetos-piloto para operação enterprise. Protocolos agente-para-agente, integração com sistemas legados via conectores nativos e deploy incremental sem downtime.",
      icon: Network,
      features: [
        { title: "Protocolos A2A", desc: "Comunicação padronizada entre agentes de diferentes fábricas. Agentes conversam entre si sem intermediação humana para processos cross-functional." },
        { title: "Integração com Legados", desc: "Conectores nativos para SAP, Oracle, Salesforce, ServiceNow e 50+ sistemas. Agentes se integram sem projetos longos de TI." },
        { title: "Deploy Zero-Downtime", desc: "Atualize agentes em produção sem interrupção. Rollback automático se performance degradar. Blue-green deployment nativo." },
        { title: "Multi-Ambiente", desc: "Opere em nuvem pública, privada, híbrida ou on-premise. Mesma experiência em qualquer infraestrutura." },
        { title: "Centro de Excelência", desc: "Framework completo para estabelecer e operar um CoE interno. Playbooks, métricas, cadência de transformação e capacitação." },
        { title: "Auto-Escalonamento", desc: "Infraestrutura que escala automaticamente com a demanda. De 10 a 10.000 agentes sem reconfiguração manual." },
      ],
      specs: [
        { label: "Conectores nativos", value: "50+" },
        { label: "Agentes simultâneos", value: "10.000+" },
        { label: "Tempo de integração", value: "1–2 semanas" },
        { label: "Ambientes suportados", value: "Cloud/Hybrid/On-prem" },
      ],
      useCases: [
        "Transformação enterprise completa",
        "Integração de sistemas legados",
        "Operação multi-departamento",
        "Expansão internacional",
        "Fusões e aquisições",
      ],
    },
    en: {
      title: "Enterprise Scale",
      subtitle: "Scale from one domain to the entire organization with enterprise-grade architecture",
      desc: "Architecture designed to scale from pilot projects to enterprise operation. Agent-to-agent protocols, legacy system integration via native connectors and incremental deploy without downtime.",
      icon: Network,
      features: [
        { title: "A2A Protocols", desc: "Standardized communication between agents from different factories. Agents talk to each other without human intermediation for cross-functional processes." },
        { title: "Legacy Integration", desc: "Native connectors for SAP, Oracle, Salesforce, ServiceNow and 50+ systems. Agents integrate without long IT projects." },
        { title: "Zero-Downtime Deploy", desc: "Update agents in production without interruption. Automatic rollback if performance degrades. Native blue-green deployment." },
        { title: "Multi-Environment", desc: "Operate on public, private, hybrid or on-premise cloud. Same experience on any infrastructure." },
        { title: "Center of Excellence", desc: "Complete framework to establish and operate an internal CoE. Playbooks, metrics, transformation cadence and training." },
        { title: "Auto-Scaling", desc: "Infrastructure that scales automatically with demand. From 10 to 10,000 agents without manual reconfiguration." },
      ],
      specs: [
        { label: "Native connectors", value: "50+" },
        { label: "Simultaneous agents", value: "10,000+" },
        { label: "Integration time", value: "1–2 weeks" },
        { label: "Supported environments", value: "Cloud/Hybrid/On-prem" },
      ],
      useCases: [
        "Complete enterprise transformation",
        "Legacy system integration",
        "Multi-department operation",
        "International expansion",
        "Mergers and acquisitions",
      ],
    },
  },
};

export default function ProductDetail() {
  const { lang, setLang } = useLanguage();
  const params = useParams<{ id: string }>();
  const productId = params.id || "fabricas-de-agentes";
  const product = productsData[productId]?.[lang as "pt" | "en"] || productsData["fabricas-de-agentes"][lang as "pt" | "en"];
  const IconComponent = product.icon;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold tracking-tight">NexxusHuman-AI</span>
          </Link>
          <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="text-xs font-bold text-white/50 hover:text-white border border-white/20 px-3 py-1.5 transition-colors">
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">{lang === "pt" ? "Início" : "Home"}</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-white transition-colors">{lang === "pt" ? "Produtos" : "Products"}</Link>
            <span>/</span>
            <span className="text-white/70">{product.title}</span>
          </div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#A100FF]/10 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-[#A100FF]" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight">
                {product.title}
              </h1>
            </div>
            <p className="text-xl text-white/60 max-w-[800px] mb-6">{product.subtitle}</p>
            <p className="text-base text-white/45 max-w-[700px] mb-10 leading-relaxed">{product.desc}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#A100FF] text-white font-semibold text-[15px] hover:bg-[#8800DD] transition-colors">
                {lang === "pt" ? "Solicitar demonstração" : "Request demo"} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold text-[15px] hover:border-white/40 transition-colors">
                {lang === "pt" ? "Falar com especialista" : "Talk to specialist"}
              </Link>
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-16">
            {product.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#111] p-6">
                <span className="text-2xl font-black text-[#A100FF] block mb-1">{spec.value}</span>
                <span className="text-sm text-white/50">{spec.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
            <h2 className="text-2xl font-black mb-8">
              {lang === "pt" ? "Funcionalidades" : "Features"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {product.features.map((f: any, i: number) => (
                <div key={i} className="bg-[#111] p-6 hover:bg-[#1a1a1a] transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#A100FF] mb-3" />
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Use Cases */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
            <h2 className="text-2xl font-black mb-6">
              {lang === "pt" ? "Casos de uso" : "Use cases"}
            </h2>
            <div className="bg-[#111] p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.useCases.map((uc: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-[#A100FF]">&gt;</span> {uc}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="bg-[#A100FF] p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-4">
              {lang === "pt" ? "Pronto para começar?" : "Ready to start?"}
            </h2>
            <p className="text-white/80 mb-8">
              {lang === "pt"
                ? "Faça o diagnóstico gratuito e descubra como esta solução se aplica à sua empresa."
                : "Take the free diagnostic and discover how this solution applies to your company."}
            </p>
            <Link href="/diagnostico" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors">
              {lang === "pt" ? "Fazer Diagnóstico" : "Take Diagnostic"} &gt;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
