/* ===== Página interna: Detalhe de Case Study ===== */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useParams } from "wouter";

const casesContent: Record<string, { pt: any; en: any }> = {
  "financial-services": {
    pt: {
      sector: "Serviços Financeiros",
      title: "De KYC em 15 dias para 4 horas",
      challenge: "Processo de Know Your Customer (KYC) manual, lento e propenso a erros, com tempo médio de onboarding de 15 dias úteis e alto custo operacional por cliente.",
      solution: "Redesenho completo do processo de KYC com uma fábrica de 60 agentes especializados — agentes de coleta documental, agentes de verificação cruzada em bases públicas, agentes de análise de risco, agentes de compliance regulatório e agentes de comunicação com o cliente. Equipe humana de 4 analistas seniores supervisiona exceções e decisões de alto risco.",
      results: [
        { metric: "4 horas", label: "Tempo de onboarding (era 15 dias)" },
        { metric: "95%", label: "Taxa de conformidade regulatória" },
        { metric: "80%", label: "Redução no custo operacional" },
        { metric: "60", label: "Agentes especializados em operação" },
      ],
      agents: ["Coleta documental", "Verificação cruzada", "Análise de risco", "Compliance regulatório", "Comunicação com cliente", "Monitoramento contínuo"],
    },
    en: {
      sector: "Financial Services",
      title: "From 15-day KYC to 4 hours",
      challenge: "Manual Know Your Customer (KYC) process, slow and error-prone, with average onboarding time of 15 business days and high operational cost per client.",
      solution: "Complete KYC process redesign with a factory of 60 specialized agents — document collection agents, cross-verification agents in public databases, risk analysis agents, regulatory compliance agents and client communication agents. Human team of 4 senior analysts supervises exceptions and high-risk decisions.",
      results: [
        { metric: "4 hours", label: "Onboarding time (was 15 days)" },
        { metric: "95%", label: "Regulatory compliance rate" },
        { metric: "80%", label: "Operational cost reduction" },
        { metric: "60", label: "Specialized agents in operation" },
      ],
      agents: ["Document collection", "Cross-verification", "Risk analysis", "Regulatory compliance", "Client communication", "Continuous monitoring"],
    },
  },
  "manufacturing": {
    pt: {
      sector: "Manufatura",
      title: "Planejamento de produção em tempo real",
      challenge: "Planejamento de produção baseado em ciclos mensais, incapaz de responder a variações de demanda em tempo real, resultando em estoques excessivos e rupturas frequentes.",
      solution: "Implantação de planejamento agêntico com agentes que monitoram sinais de mercado (pedidos, estoques de distribuidores, tendências de consumo), simulam cenários de produção, otimizam alocação de recursos e recomendam ajustes diários. Gestores humanos definem políticas de risco e validam mudanças acima de determinados thresholds.",
      results: [
        { metric: "40%", label: "Redução em estoques parados" },
        { metric: "25%", label: "Aumento na taxa de atendimento" },
        { metric: "Real-time", label: "Ciclo de planejamento (era 30 dias)" },
        { metric: "45", label: "Agentes de planejamento ativos" },
      ],
      agents: ["Monitoramento de mercado", "Simulação de cenários", "Otimização de recursos", "Previsão de demanda", "Coordenação logística", "Alertas de exceção"],
    },
    en: {
      sector: "Manufacturing",
      title: "Real-time production planning",
      challenge: "Monthly-cycle production planning, unable to respond to real-time demand variations, resulting in excess inventory and frequent stockouts.",
      solution: "Deployment of agentic planning with agents monitoring market signals (orders, distributor inventories, consumption trends), simulating production scenarios, optimizing resource allocation and recommending daily adjustments. Human managers define risk policies and validate changes above certain thresholds.",
      results: [
        { metric: "40%", label: "Reduction in idle inventory" },
        { metric: "25%", label: "Increase in fulfillment rate" },
        { metric: "Real-time", label: "Planning cycle (was 30 days)" },
        { metric: "45", label: "Active planning agents" },
      ],
      agents: ["Market monitoring", "Scenario simulation", "Resource optimization", "Demand forecasting", "Logistics coordination", "Exception alerts"],
    },
  },
  "insurance": {
    pt: {
      sector: "Seguros",
      title: "Processo de sinistros reconstruído do zero",
      challenge: "Processo de sinistros fragmentado entre múltiplos departamentos, com tempo médio de resolução de 45 dias e alta taxa de reclamações de segurados.",
      solution: "Reconstrução do processo de sinistros do zero com lógica agêntica. Agentes de triagem classificam e priorizam automaticamente. Agentes de investigação cruzam dados de múltiplas fontes. Agentes de liquidação calculam valores e preparam propostas. Agentes de comunicação mantêm o segurado informado em cada etapa.",
      results: [
        { metric: "5 dias", label: "Tempo de resolução (era 45)" },
        { metric: "60%", label: "Aumento na satisfação do cliente" },
        { metric: "3x", label: "Melhoria na detecção de fraude" },
        { metric: "75", label: "Agentes em operação" },
      ],
      agents: ["Triagem automática", "Investigação cruzada", "Liquidação inteligente", "Comunicação proativa", "Detecção de fraude", "Compliance"],
    },
    en: {
      sector: "Insurance",
      title: "Claims process rebuilt from zero",
      challenge: "Claims process fragmented across multiple departments, with average resolution time of 45 days and high policyholder complaint rate.",
      solution: "Ground-up reconstruction of the claims process with agentic logic. Triage agents automatically classify and prioritize. Investigation agents cross-reference data from multiple sources. Settlement agents calculate values and prepare proposals. Communication agents keep policyholders informed at every stage.",
      results: [
        { metric: "5 days", label: "Resolution time (was 45)" },
        { metric: "60%", label: "Increase in customer satisfaction" },
        { metric: "3x", label: "Improvement in fraud detection" },
        { metric: "75", label: "Agents in operation" },
      ],
      agents: ["Automatic triage", "Cross-investigation", "Smart settlement", "Proactive communication", "Fraud detection", "Compliance"],
    },
  },
  "retail": {
    pt: {
      sector: "Varejo",
      title: "Precificação dinâmica em escala",
      challenge: "Gestão de sortimento e precificação baseada em regras estáticas, incapaz de capturar oportunidades de margem em tempo real em centenas de lojas.",
      solution: "Agentes de precificação dinâmica que monitoram concorrência, elasticidade de demanda e custos em tempo real. Agentes de sortimento que analisam performance por loja e recomendam ajustes semanais. Agentes de supply chain que coordenam reposição com base em previsões granulares.",
      results: [
        { metric: "+4pp", label: "Aumento de margem bruta" },
        { metric: "30%", label: "Redução em rupturas de estoque" },
        { metric: "15%", label: "Aumento em vendas por m²" },
        { metric: "90", label: "Agentes de precificação ativos" },
      ],
      agents: ["Precificação dinâmica", "Análise de sortimento", "Monitoramento competitivo", "Previsão de demanda", "Coordenação de reposição", "Otimização de margem"],
    },
    en: {
      sector: "Retail",
      title: "Dynamic pricing at scale",
      challenge: "Assortment and pricing management based on static rules, unable to capture margin opportunities in real-time across hundreds of stores.",
      solution: "Dynamic pricing agents monitoring competition, demand elasticity and costs in real-time. Assortment agents analyzing performance by store and recommending weekly adjustments. Supply chain agents coordinating replenishment based on granular forecasts.",
      results: [
        { metric: "+4pp", label: "Gross margin increase" },
        { metric: "30%", label: "Reduction in stockouts" },
        { metric: "15%", label: "Increase in sales per sqm" },
        { metric: "90", label: "Active pricing agents" },
      ],
      agents: ["Dynamic pricing", "Assortment analysis", "Competitive monitoring", "Demand forecasting", "Replenishment coordination", "Margin optimization"],
    },
  },
};

export default function CaseDetail() {
  const { lang, setLang } = useLanguage();
  const params = useParams<{ id: string }>();
  const caseId = params.id || "financial-services";
  const caseData = casesContent[caseId]?.[lang] || casesContent["financial-services"][lang];

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
          <Link href="/cases" className="text-sm text-[#A100FF] hover:text-white transition-colors mb-8 inline-block">
            ← {lang === "pt" ? "Voltar para Cases" : "Back to Cases"}
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
              {caseData.sector}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-12">
              {caseData.title}
            </h1>
          </motion.div>

          {/* Challenge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] p-8 lg:p-12 mb-[2px]">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
              {lang === "pt" ? "Desafio" : "Challenge"}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-[800px]">{caseData.challenge}</p>
          </motion.div>

          {/* Solution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111] p-8 lg:p-12 mb-[2px]">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
              {lang === "pt" ? "Solução NexxusHuman-AI" : "NexxusHuman-AI Solution"}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-[800px]">{caseData.solution}</p>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111] p-8 lg:p-12 mb-[2px]">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
              {lang === "pt" ? "Resultados" : "Results"}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {caseData.results.map((r: any, i: number) => (
                <div key={i} className="border-t-2 border-[#A100FF] pt-4">
                  <span className="text-3xl font-black text-white block mb-1">{r.metric}</span>
                  <span className="text-sm text-white/40">{r.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Agents */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#111] p-8 lg:p-12">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
              {lang === "pt" ? "Agentes Implantados" : "Deployed Agents"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {caseData.agents.map((agent: string, i: number) => (
                <div key={i} className="bg-black/50 border border-white/5 p-4 text-sm text-white/60">
                  <span className="text-[#A100FF] mr-2">&gt;</span>{agent}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
