/* ===== Página de Produtos — Estilo IBM watsonx.ai =====
 * Conceito replicado: Hero com breadcrumb, CTAs, seção de benefícios com ícones,
 * tabs de funcionalidades, cases de clientes, recursos e CTA final
 * ========================================================= */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Zap, Shield, Network, Bot, Code, Database, TrendingUp, ArrowRight, Play, CheckCircle2, Layers, Users, BarChart3 } from "lucide-react";

export default function ProductsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header fixo estilo IBM */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
              <span className="text-white text-lg font-bold tracking-tight">NexxusHuman-AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="text-xs font-bold text-white/50 hover:text-white border border-white/20 px-3 py-1.5 transition-colors">
                {lang === "pt" ? "EN" : "PT"}
              </button>
              <Link href="/contact" className="hidden sm:inline-flex text-sm font-medium text-white/70 hover:text-white transition-colors">
                {lang === "pt" ? "Contato" : "Contact"}
              </Link>
            </div>
          </div>
          {/* Sub nav estilo IBM */}
          <div className="flex items-center gap-6 py-2 border-t border-white/5 overflow-x-auto">
            <Link href="/diagnostico" className="text-sm text-white/60 hover:text-white font-medium whitespace-nowrap">
              {lang === "pt" ? "Diagnóstico IA" : "AI Diagnostic"}
            </Link>
            <span className="text-sm text-white font-semibold whitespace-nowrap">
              {lang === "pt" ? "Plataforma Agêntica" : "Agentic Platform"}
            </span>
            <a href="#recursos" className="text-sm text-white/60 hover:text-white font-medium whitespace-nowrap">
              {lang === "pt" ? "Recursos" : "Resources"}
            </a>
            <a href="#precos" className="text-sm text-white/60 hover:text-white font-medium whitespace-nowrap">
              {lang === "pt" ? "Preços" : "Pricing"}
            </a>
            <Link href="/contact" className="text-sm text-[#A100FF] font-medium whitespace-nowrap ml-auto">
              {lang === "pt" ? "Agende uma demonstração" : "Schedule a demo"}
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-[120px]">
        {/* Hero — estilo IBM watsonx */}
        <HeroProduct lang={lang} />
        
        {/* Benefícios com ícones — "Você pediu. Entregamos." */}
        <BenefitsSection lang={lang} />

        {/* Tabs de funcionalidades */}
        <FeaturesTabsSection lang={lang} />

        {/* Cases de clientes */}
        <ClientResultsSection lang={lang} />

        {/* Recursos */}
        <ResourcesSection lang={lang} />

        {/* Tabela de Preços */}
        <PricingSection lang={lang} />

        {/* CTA Final */}
        <FinalCTASection lang={lang} />
      </main>
    </div>
  );
}

/* ===== Hero do Produto ===== */
function HeroProduct({ lang }: { lang: string }) {
  return (
    <section className="px-6 lg:px-10 pt-8 pb-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">{lang === "pt" ? "Início" : "Home"}</Link>
          <span>/</span>
          <span className="text-white/70">{lang === "pt" ? "Produtos" : "Products"}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black leading-[1.05] tracking-tight max-w-[20ch] mb-6">
            {lang === "pt"
              ? "Conheça a plataforma de organização agêntica"
              : "Meet the agentic organization platform"}
          </h1>
          <p className="text-lg text-white/55 max-w-[700px] mb-10 leading-relaxed">
            {lang === "pt"
              ? "Uma plataforma integrada e de ponta a ponta para criar, implantar e escalar fábricas de agentes de IA na sua empresa. Inclui frameworks, modelos, APIs e governança prontos para uso em qualquer ambiente."
              : "An integrated end-to-end platform for creating, deploying and scaling AI agent factories in your company. Includes frameworks, models, APIs and governance ready for use in any environment."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#A100FF] text-white font-semibold text-[15px] hover:bg-[#8800DD] transition-colors">
              {lang === "pt" ? "Comece sua avalia\u00e7\u00e3o gratuita" : "Start your free assessment"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/diagnostico" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold text-[15px] hover:border-white/40 transition-colors">
              {lang === "pt" ? "Fa\u00e7a o diagn\u00f3stico" : "Take the diagnostic"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* V\u00eddeo Demo */}
          <div className="mt-12 relative max-w-[900px]">
            <div className="relative border border-white/10 bg-[#111] overflow-hidden">
              <video
                className="w-full aspect-video object-cover"
                controls
                poster="/manus-storage/presenter-reference_c104f2db.png"
                preload="metadata"
              >
                <source src="/manus-storage/nexxus-demo-video_6e08c704.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 text-[10px] text-white/60 font-medium">
                {lang === "pt" ? "Legendas dispon\u00edveis em ingl\u00eas" : "Subtitles available in English"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Benefícios — "Você pediu. Entregamos." ===== */
function BenefitsSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const benefits = lang === "pt" ? [
    { icon: Zap, title: "Implante com velocidade", desc: "Produza fábricas de agentes com interfaces intuitivas, fluxos de trabalho pré-configurados e acesso a APIs padrão do setor." },
    { icon: Layers, title: "Tudo em uma plataforma", desc: "Tenha acesso em um só lugar aos recursos que abrangem o ciclo de vida completo da organização agêntica." },
    { icon: Users, title: "Colabore em escala", desc: "Libere inovações por meio de uma experiência de desenvolvimento colaborativo entre equipes humanas e agentes." },
    { icon: Network, title: "Opere onde quiser", desc: "Crie, execute e gerencie agentes de IA com rapidez em qualquer ambiente — nuvem, híbrido ou on-premise." },
  ] : [
    { icon: Zap, title: "Deploy with speed", desc: "Build agent factories with intuitive interfaces, pre-configured workflows and access to industry-standard APIs." },
    { icon: Layers, title: "Everything in one platform", desc: "Access in one place the resources that cover the complete lifecycle of the agentic organization." },
    { icon: Users, title: "Collaborate at scale", desc: "Unlock innovations through a collaborative development experience between human teams and agents." },
    { icon: Network, title: "Operate anywhere", desc: "Create, run and manage AI agents quickly in any environment — cloud, hybrid or on-premise." },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-black mb-12"
        >
          {lang === "pt" ? "Você pediu. Nós entregamos." : "You asked. We delivered."}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <b.icon className="w-8 h-8 text-[#A100FF] mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Tabs de Funcionalidades — estilo IBM ===== */
function FeaturesTabsSection({ lang }: { lang: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const tabs = lang === "pt" ? [
    {
      label: "Fábricas de Agentes",
      title: "Crie e orquestre fábricas de agentes inteligentes",
      desc: "Pacote completo de recursos para criar fábricas de 20 a 100 agentes especializados que executam processos completos de ponta a ponta. Inclui frameworks de orquestração, templates pré-configurados e monitoramento em tempo real.",
      features: ["Orquestração multi-agente", "Templates por setor", "Monitoramento em tempo real", "Governança embutida"],
      link: "/produtos/fabricas-de-agentes",
    },
    {
      label: "Governança Contínua",
      title: "Governança integrada ao ciclo de vida dos agentes",
      desc: "Sistema de governança contínua que monitora, audita e controla agentes em operação. Políticas de intervenção humana configuráveis, alertas de exceção e dashboards executivos em tempo real.",
      features: ["Políticas de supervisão", "Auditoria automática", "Alertas inteligentes", "Compliance integrado"],
      link: "/produtos/governanca",
    },
    {
      label: "Escala Empresarial",
      title: "Escale de um domínio para toda a organização",
      desc: "Arquitetura projetada para escalar de projetos-piloto para operação enterprise. Protocolos agente-para-agente, integração com sistemas legados e deploy incremental sem downtime.",
      features: ["Protocolos A2A", "Integração legados", "Deploy zero-downtime", "Multi-ambiente"],
      link: "/produtos/escala-empresarial",
    },
  ] : [
    {
      label: "Agent Factories",
      title: "Create and orchestrate intelligent agent factories",
      desc: "Complete resource package for creating factories of 20 to 100 specialized agents that execute complete end-to-end processes. Includes orchestration frameworks, pre-configured templates and real-time monitoring.",
      features: ["Multi-agent orchestration", "Sector templates", "Real-time monitoring", "Embedded governance"],
      link: "/produtos/fabricas-de-agentes",
    },
    {
      label: "Continuous Governance",
      title: "Governance integrated into the agent lifecycle",
      desc: "Continuous governance system that monitors, audits and controls agents in operation. Configurable human intervention policies, exception alerts and real-time executive dashboards.",
      features: ["Supervision policies", "Automatic auditing", "Smart alerts", "Integrated compliance"],
      link: "/produtos/governanca",
    },
    {
      label: "Enterprise Scale",
      title: "Scale from one domain to the entire organization",
      desc: "Architecture designed to scale from pilot projects to enterprise operation. Agent-to-agent protocols, legacy system integration and incremental deploy without downtime.",
      features: ["A2A protocols", "Legacy integration", "Zero-downtime deploy", "Multi-environment"],
      link: "/produtos/escala-empresarial",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {lang === "pt" ? "A única plataforma agêntica que você precisa" : "The only agentic platform you need"}
          </h2>
          <p className="text-base text-white/50 max-w-[700px] mb-10">
            {lang === "pt"
              ? "Uma plataforma integrada que torna simples e escalável a criação e operação de organizações agênticas. Inclui frameworks, modelos e governança prontos para uso."
              : "An integrated platform that makes it simple and scalable to create and operate agentic organizations. Includes frameworks, models and governance ready for use."}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === i
                    ? "border-[#A100FF] text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">{tabs[activeTab].title}</h3>
            <p className="text-[15px] text-white/55 leading-relaxed mb-8">{tabs[activeTab].desc}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {tabs[activeTab].features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Link href={tabs[activeTab].link} className="inline-flex items-center gap-2 text-sm font-semibold text-[#A100FF] hover:text-white transition-colors">
              {lang === "pt" ? "Saiba mais" : "Learn more"} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 flex items-center justify-center min-h-[250px]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#A100FF]/10 flex items-center justify-center">
                {activeTab === 0 && <Bot className="w-8 h-8 text-[#A100FF]" />}
                {activeTab === 1 && <Shield className="w-8 h-8 text-[#A100FF]" />}
                {activeTab === 2 && <Network className="w-8 h-8 text-[#A100FF]" />}
              </div>
              <p className="text-sm text-white/40">{lang === "pt" ? "Interface da plataforma" : "Platform interface"}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Cases de Clientes — "Clientes reais. Resultados reais." ===== */
function ClientResultsSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const results = lang === "pt" ? [
    { metric: "80%", desc: "redução no custo operacional de KYC", client: "Banco de médio porte" },
    { metric: "20x", desc: "multiplicação de produtividade em processos core", client: "Indústria manufatureira" },
    { metric: "45→5 dias", desc: "tempo de resolução de sinistros", client: "Seguradora nacional" },
    { metric: "+4pp", desc: "aumento de margem bruta com precificação dinâmica", client: "Rede de varejo" },
  ] : [
    { metric: "80%", desc: "reduction in KYC operational cost", client: "Mid-size bank" },
    { metric: "20x", desc: "productivity multiplication in core processes", client: "Manufacturing industry" },
    { metric: "45→5 days", desc: "claims resolution time", client: "National insurer" },
    { metric: "+4pp", desc: "gross margin increase with dynamic pricing", client: "Retail chain" },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {lang === "pt" ? "Clientes reais. Resultados reais." : "Real clients. Real results."}
          </h2>
          <p className="text-base text-white/50 mb-12">
            {lang === "pt" ? "Da maior produtividade à redução de custos, os números falam por si mesmos." : "From higher productivity to cost reduction, the numbers speak for themselves."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111] p-6"
            >
              <span className="text-3xl font-black text-[#A100FF] block mb-2">{r.metric}</span>
              <p className="text-sm text-white/70 mb-4">{r.desc}</p>
              <span className="text-[11px] text-white/40 uppercase tracking-wider">{r.client}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/cases" className="text-sm font-semibold text-[#A100FF] hover:text-white transition-colors flex items-center gap-1">
            {lang === "pt" ? "Ver todos os casos" : "See all cases"} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===== Recursos ===== */
function ResourcesSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const resources = lang === "pt" ? [
    { title: "Documentação", desc: "Guias técnicos completos para implementação" },
    { title: "Central do Desenvolvedor", desc: "SDKs, APIs e exemplos de código" },
    { title: "Diagnóstico Interativo", desc: "Avalie o potencial de IA da sua empresa" },
    { title: "Guia de Agentes 2026", desc: "Tudo sobre agentes de IA para empresas" },
  ] : [
    { title: "Documentation", desc: "Complete technical guides for implementation" },
    { title: "Developer Center", desc: "SDKs, APIs and code examples" },
    { title: "Interactive Diagnostic", desc: "Assess your company's AI potential" },
    { title: "Agent Guide 2026", desc: "Everything about AI agents for enterprises" },
  ];

  return (
    <section ref={ref} id="recursos" className="py-20 bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-black mb-8">
            {lang === "pt" ? "Siga sua curiosidade para o próximo nível" : "Follow your curiosity to the next level"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {resources.map((r, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#111] p-6 hover:bg-[#1a1a1a] transition-colors group"
            >
              <h3 className="text-base font-bold mb-2 group-hover:text-[#A100FF] transition-colors">{r.title}</h3>
              <p className="text-sm text-white/50">{r.desc}</p>
              <span className="text-[#A100FF] text-sm mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Tabela de Preços ===== */
function PricingSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const plans = lang === "pt" ? [
    {
      name: "Starter",
      price: "Sob consulta",
      desc: "Para empresas iniciando a jornada agêntica",
      highlight: false,
      features: [
        "1 fábrica de agentes (até 20 agentes)",
        "1 domínio de processo",
        "Dashboard de monitoramento básico",
        "Suporte por e-mail",
        "Templates padrão",
        "Relatórios mensais",
      ],
      cta: "Começar avaliação",
    },
    {
      name: "Professional",
      price: "Sob consulta",
      desc: "Para empresas escalando a transformação",
      highlight: true,
      features: [
        "Até 3 fábricas (até 50 agentes cada)",
        "Múltiplos domínios de processo",
        "Governança contínua completa",
        "Suporte prioritário 24/7",
        "Templates por setor + customizados",
        "Analytics avançado em tempo real",
        "Integrações com sistemas legados",
        "Centro de Excelência assistido",
      ],
      cta: "Falar com especialista",
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      desc: "Para organizações em transformação total",
      highlight: false,
      features: [
        "Fábricas ilimitadas (até 100+ agentes)",
        "Todos os domínios da organização",
        "Governança enterprise + compliance",
        "Gerente de sucesso dedicado",
        "Protocolos A2A cross-departamento",
        "SLA 99.99% com suporte premium",
        "Deploy multi-ambiente (cloud/on-prem)",
        "Programa de requalificação incluído",
        "Consultoria estratégica trimestral",
      ],
      cta: "Agendar demonstração",
    },
  ] : [
    {
      name: "Starter",
      price: "Contact us",
      desc: "For companies starting the agentic journey",
      highlight: false,
      features: [
        "1 agent factory (up to 20 agents)",
        "1 process domain",
        "Basic monitoring dashboard",
        "Email support",
        "Standard templates",
        "Monthly reports",
      ],
      cta: "Start assessment",
    },
    {
      name: "Professional",
      price: "Contact us",
      desc: "For companies scaling transformation",
      highlight: true,
      features: [
        "Up to 3 factories (up to 50 agents each)",
        "Multiple process domains",
        "Complete continuous governance",
        "24/7 priority support",
        "Sector + custom templates",
        "Advanced real-time analytics",
        "Legacy system integrations",
        "Assisted Center of Excellence",
      ],
      cta: "Talk to specialist",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For organizations in full transformation",
      highlight: false,
      features: [
        "Unlimited factories (100+ agents)",
        "All organization domains",
        "Enterprise governance + compliance",
        "Dedicated success manager",
        "Cross-department A2A protocols",
        "99.99% SLA with premium support",
        "Multi-environment deploy (cloud/on-prem)",
        "Reskilling program included",
        "Quarterly strategic consulting",
      ],
      cta: "Schedule demo",
    },
  ];

  return (
    <section ref={ref} id="precos" className="py-20 bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {lang === "pt" ? "Planos e Preços" : "Plans & Pricing"}
          </h2>
          <p className="text-base text-white/50 mb-12 max-w-[600px]">
            {lang === "pt"
              ? "Escolha o plano ideal para o estágio da sua transformação agêntica."
              : "Choose the ideal plan for your agentic transformation stage."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#A100FF]/10 border border-[#A100FF]/30"
                  : "bg-[#111]"
              }`}
            >
              {plan.highlight && (
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF] mb-3">
                  {lang === "pt" ? "Mais popular" : "Most popular"}
                </span>
              )}
              <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
              <p className="text-sm text-white/50 mb-4">{plan.desc}</p>
              <span className="text-lg font-bold text-[#A100FF] mb-6">{plan.price}</span>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 font-semibold text-[15px] transition-colors ${
                  plan.highlight
                    ? "bg-[#A100FF] text-white hover:bg-[#8800DD]"
                    : "border border-white/20 text-white hover:border-white/40"
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA Final — "Dê o próximo passo" ===== */
function FinalCTASection({ lang }: { lang: string }) {
  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          {lang === "pt" ? "Dê o próximo passo" : "Take the next step"}
        </h2>
        <p className="text-base text-white/50 mb-10 max-w-[600px]">
          {lang === "pt"
            ? "Faça o diagnóstico gratuito ou agende uma demonstração com nossos especialistas."
            : "Take the free diagnostic or schedule a demo with our specialists."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#A100FF] text-white font-semibold text-[15px] hover:bg-[#8800DD] transition-colors">
            {lang === "pt" ? "Comece sua avaliação gratuita" : "Start your free assessment"}
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold text-[15px] hover:border-white/40 transition-colors">
            {lang === "pt" ? "Agende uma demonstração" : "Schedule a demo"}
          </Link>
        </div>
      </div>
    </section>
  );
}
