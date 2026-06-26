/* ===== Página interna: Metodologia detalhada ===== */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function MethodologyPage() {
  const { t, lang, setLang } = useLanguage();

  const phases = [
    {
      num: "01",
      title: t("services.phase1.title"),
      duration: t("services.phase1.duration"),
      desc: t("services.phase1.desc"),
      details: lang === "pt" ? [
        "Sessões de alinhamento estratégico com CEO e comitê executivo",
        "Análise profunda dos processos core da organização",
        "Mapeamento de fluxos de trabalho, pontos de decisão e gargalos",
        "Assessment de maturidade tecnológica e de dados",
        "Avaliação cultural e prontidão para o modelo agêntico",
        "Construção do business case com projeções de ROI por domínio",
      ] : [
        "Strategic alignment sessions with CEO and executive committee",
        "Deep analysis of core organizational processes",
        "Workflow mapping, decision points and bottleneck identification",
        "Technology and data maturity assessment",
        "Cultural readiness evaluation for the agentic model",
        "Business case construction with ROI projections by domain",
      ],
      deliverables: lang === "pt" ? [
        "Mapa de oportunidades agênticas priorizado",
        "Roadmap de transformação (12–24 meses)",
        "Business case detalhado",
        "Plano de gestão de riscos e governança",
      ] : [
        "Prioritized agentic opportunities map",
        "Transformation roadmap (12–24 months)",
        "Detailed business case",
        "Risk management and governance plan",
      ],
    },
    {
      num: "02",
      title: t("services.phase2.title"),
      duration: t("services.phase2.duration"),
      desc: t("services.phase2.desc"),
      details: lang === "pt" ? [
        "Seleção de 1-2 domínios estratégicos para redesenho completo",
        "Montagem de squads híbridos (consultores + equipe do cliente)",
        "Construção de fábricas de agentes (20-100 agentes por processo)",
        "Implementação de loops de feedback em tempo real",
        "Pontos de supervisão humana nos momentos de decisão estratégica",
        "Testes e validação com métricas de performance",
      ] : [
        "Selection of 1-2 strategic domains for complete redesign",
        "Assembly of hybrid squads (consultants + client team)",
        "Construction of agent factories (20-100 agents per process)",
        "Implementation of real-time feedback loops",
        "Human supervision points at strategic decision moments",
        "Testing and validation with performance metrics",
      ],
      deliverables: lang === "pt" ? [
        "Processos redesenhados com arquitetura agêntica",
        "Fábricas de agentes implantadas e operacionais",
        "Dashboards de monitoramento e governança",
        "Playbook de replicação para outros domínios",
      ] : [
        "Redesigned processes with agentic architecture",
        "Deployed and operational agent factories",
        "Monitoring and governance dashboards",
        "Replication playbook for other domains",
      ],
    },
    {
      num: "03",
      title: t("services.phase3.title"),
      duration: t("services.phase3.duration"),
      desc: t("services.phase3.desc"),
      details: lang === "pt" ? [
        "Expansão para múltiplas áreas da organização",
        "Estabelecimento do Centro de Excelência em IA Agêntica (CoE)",
        "Implementação de protocolos agente-para-agente",
        "Redesenho do organograma para estrutura agêntica",
        "Introdução do planejamento agêntico contínuo",
        "Governança contínua embutida nos processos",
      ] : [
        "Expansion to multiple organizational areas",
        "Establishment of the Agentic AI Center of Excellence (CoE)",
        "Implementation of agent-to-agent protocols",
        "Org chart redesign for agentic structure",
        "Introduction of continuous agentic planning",
        "Continuous governance embedded in processes",
      ],
      deliverables: lang === "pt" ? [
        "Centro de Excelência implantado e operacional",
        "Arquitetura de integração agente-para-agente",
        "Novo modelo organizacional implementado",
        "Framework de governança contínua",
      ] : [
        "Center of Excellence deployed and operational",
        "Agent-to-agent integration architecture",
        "New organizational model implemented",
        "Continuous governance framework",
      ],
    },
    {
      num: "04",
      title: t("services.phase4.title"),
      duration: t("services.phase4.duration"),
      desc: t("services.phase4.desc"),
      details: lang === "pt" ? [
        "Trilhas de capacitação diferenciadas por nível hierárquico",
        "Fluência tecnológica para liderança executiva",
        "Supervisão de fábricas de agentes para gestores",
        "Configuração e evolução de agentes para equipes operacionais",
        "Construção de cultura de orquestração humano-IA",
        "Comunidade interna de prática agêntica",
      ] : [
        "Differentiated training tracks by hierarchical level",
        "Technological fluency for executive leadership",
        "Agent factory supervision for managers",
        "Agent configuration and evolution for operational teams",
        "Building human-AI orchestration culture",
        "Internal agentic practice community",
      ],
      deliverables: lang === "pt" ? [
        "Programa de requalificação em larga escala",
        "Framework cultural de orquestração humano-IA",
        "Comunidade interna de prática",
        "Plano de evolução contínua",
      ] : [
        "Large-scale reskilling program",
        "Human-AI orchestration cultural framework",
        "Internal practice community",
        "Continuous evolution plan",
      ],
    },
  ];

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
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link href="/" className="text-sm text-[#A100FF] hover:text-white transition-colors mb-8 inline-block">
            {t("methodology.back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
              {t("methodology.pageTitle")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-6">
              {t("services.title")}
            </h1>
            <p className="text-lg text-white/50 max-w-[700px] mb-16">
              {t("methodology.pageSubtitle")}
            </p>
          </motion.div>

          {/* Phases */}
          <div className="space-y-[2px]">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111] p-8 lg:p-12"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[#A100FF] font-mono text-lg font-bold">{phase.num}</span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">{phase.title}</h2>
                  </div>
                  <span className="text-sm text-white/40 font-medium hidden sm:block">{phase.duration}</span>
                </div>
                <p className="text-[15px] text-white/55 leading-relaxed mb-8 max-w-[800px]">{phase.desc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">
                      {lang === "pt" ? "Atividades" : "Activities"}
                    </h4>
                    <ul className="space-y-2">
                      {phase.details.map((detail, j) => (
                        <li key={j} className="text-sm text-white/50 flex items-start gap-2">
                          <span className="text-[#A100FF] mt-1 text-xs">▸</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">
                      {lang === "pt" ? "Entregáveis" : "Deliverables"}
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((del, j) => (
                        <li key={j} className="text-sm text-white/50 flex items-start gap-2">
                          <span className="text-[#A100FF] mt-1 text-xs">●</span>
                          {del}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
