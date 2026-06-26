import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { DiagnosticoData } from "@/contexts/DiagnosticoContext";
import {
  Brain, TrendingUp, Shield, Zap, ArrowLeft, Download,
  CheckCircle2, AlertTriangle, Target, BarChart3, Bot,
  Lightbulb, Clock, DollarSign, Users, Layers
} from "lucide-react";

interface Recomendacao {
  titulo: string;
  descricao: string;
  impacto: "alto" | "medio" | "baixo";
  risco: "alto" | "medio" | "baixo";
  prazo: string;
  roi: string;
  agente: string;
  categoria: string;
}

interface ScoreCategoria {
  nome: string;
  score: number;
  maxScore: number;
  descricao: string;
}

function calcularScores(data: DiagnosticoData): ScoreCategoria[] {
  // Score de Prontidão Digital
  let prontidao = 0;
  if (data.maturidade.nivelDigital === "lider") prontidao = 95;
  else if (data.maturidade.nivelDigital === "avancado") prontidao = 75;
  else if (data.maturidade.nivelDigital === "intermediario") prontidao = 55;
  else if (data.maturidade.nivelDigital === "basico") prontidao = 30;
  else prontidao = 15;

  // Score de Potencial de Automação
  let potencial = 0;
  potencial += data.processos.areas.length * 7;
  potencial += data.processos.gargalos.length * 5;
  if (data.processos.horasManual === "mais-100") potencial += 25;
  else if (data.processos.horasManual === "60-100") potencial += 20;
  else if (data.processos.horasManual === "30-60") potencial += 15;
  else if (data.processos.horasManual === "10-30") potencial += 10;
  else potencial += 5;
  potencial = Math.min(potencial, 100);

  // Score de Urgência
  let urgencia = 0;
  urgencia += data.dores.maioresDores.length * 8;
  urgencia += data.dores.errosFrequentes.length * 6;
  if (data.maturidade.urgencia === "imediata") urgencia += 20;
  else if (data.maturidade.urgencia === "urgente") urgencia += 15;
  else if (data.maturidade.urgencia === "prioritaria") urgencia += 10;
  if (data.dores.satisfacaoCliente === "baixo") urgencia += 15;
  else if (data.dores.satisfacaoCliente === "regular") urgencia += 8;
  urgencia = Math.min(urgencia, 100);

  // Score de ROI Esperado
  let roi = 0;
  if (data.processos.volumeDados === "muito-alto") roi += 25;
  else if (data.processos.volumeDados === "alto") roi += 20;
  else if (data.processos.volumeDados === "medio") roi += 12;
  else roi += 5;
  roi += data.objetivos.prioridades.length * 8;
  roi += data.dores.processosCriticos.length * 6;
  if (data.empresa.porte?.includes("Corporação")) roi += 15;
  else if (data.empresa.porte?.includes("Grande")) roi += 12;
  else if (data.empresa.porte?.includes("Média")) roi += 8;
  roi = Math.min(roi, 100);

  // Score de Complexidade (inverso - menor é melhor)
  let complexidade = 100;
  if (data.maturidade.infraestrutura === "cloud-native") complexidade -= 20;
  else if (data.maturidade.infraestrutura === "cloud-avancada") complexidade -= 15;
  else if (data.maturidade.infraestrutura === "local") complexidade += 10;
  if (data.maturidade.equipetech === "dev-grande") complexidade -= 20;
  else if (data.maturidade.equipetech === "nenhuma") complexidade += 15;
  if (data.maturidade.experienciaIA === "escalada") complexidade -= 20;
  else if (data.maturidade.experienciaIA === "nenhuma") complexidade += 10;
  complexidade = Math.max(20, Math.min(complexidade, 100));
  // Invertemos para que maior = mais fácil
  const facilidade = 100 - complexidade + 20;

  return [
    { nome: "Prontidão Digital", score: prontidao, maxScore: 100, descricao: "Nível de maturidade tecnológica para adoção de IA" },
    { nome: "Potencial de Automação", score: potencial, maxScore: 100, descricao: "Volume de processos automatizáveis identificados" },
    { nome: "Urgência de Implementação", score: urgencia, maxScore: 100, descricao: "Pressão por resultados e dores operacionais" },
    { nome: "ROI Esperado", score: roi, maxScore: 100, descricao: "Retorno potencial sobre investimento em IA" },
    { nome: "Facilidade de Implementação", score: Math.min(facilidade, 100), maxScore: 100, descricao: "Quão simples será implementar as soluções" },
  ];
}

function gerarRecomendacoes(data: DiagnosticoData): Recomendacao[] {
  const recs: Recomendacao[] = [];

  // Recomendações baseadas em gargalos
  if (data.processos.gargalos.includes("Entrada manual de dados repetitiva")) {
    recs.push({
      titulo: "Agente de Extração e Entrada de Dados",
      descricao: "Automatize a captura, validação e inserção de dados de documentos, e-mails e formulários usando IA com OCR e NLP avançados.",
      impacto: "alto",
      risco: "baixo",
      prazo: "2-4 semanas",
      roi: "300-500% em 6 meses",
      agente: "Document AI Agent",
      categoria: "Processamento de Dados",
    });
  }

  if (data.processos.gargalos.includes("Atendimento a clientes repetitivo") ||
      data.dores.processosCriticos.includes("Atendimento e suporte (L1/L2)")) {
    recs.push({
      titulo: "Assistente Virtual de Atendimento (L1)",
      descricao: "Implante um agente conversacional que resolve 60-80% das solicitações de suporte automaticamente, escalando apenas casos complexos para humanos.",
      impacto: "alto",
      risco: "baixo",
      prazo: "3-6 semanas",
      roi: "200-400% em 3 meses",
      agente: "Customer Support Agent",
      categoria: "Atendimento ao Cliente",
    });
  }

  if (data.processos.gargalos.includes("Geração de relatórios manuais") ||
      data.dores.maioresDores.includes("Decisões baseadas em intuição, não dados")) {
    recs.push({
      titulo: "Agente de Business Intelligence Automatizado",
      descricao: "Gere relatórios, dashboards e insights automaticamente a partir dos seus dados, com alertas proativos sobre anomalias e oportunidades.",
      impacto: "alto",
      risco: "medio",
      prazo: "4-8 semanas",
      roi: "150-300% em 6 meses",
      agente: "Analytics & Reporting Agent",
      categoria: "Inteligência de Dados",
    });
  }

  if (data.processos.gargalos.includes("Aprovações em cadeia demoradas") ||
      data.dores.processosCriticos.includes("Aprovações e workflows internos")) {
    recs.push({
      titulo: "Orquestrador de Workflows Inteligente",
      descricao: "Automatize fluxos de aprovação com roteamento inteligente, escalonamento automático e decisões baseadas em regras e contexto.",
      impacto: "medio",
      risco: "baixo",
      prazo: "2-4 semanas",
      roi: "150-250% em 4 meses",
      agente: "Workflow Orchestrator Agent",
      categoria: "Operações",
    });
  }

  if (data.dores.processosCriticos.includes("Geração e qualificação de leads") ||
      data.processos.areas.includes("Vendas e Prospecção")) {
    recs.push({
      titulo: "Agente de Prospecção e Qualificação de Leads",
      descricao: "Automatize pesquisa de prospects, enriquecimento de dados, scoring de leads e outreach personalizado com IA generativa.",
      impacto: "alto",
      risco: "medio",
      prazo: "3-5 semanas",
      roi: "250-500% em 4 meses",
      agente: "Sales Intelligence Agent",
      categoria: "Vendas",
    });
  }

  if (data.processos.gargalos.includes("Classificação e triagem de documentos") ||
      data.dores.processosCriticos.includes("Gestão de contratos")) {
    recs.push({
      titulo: "Agente de Análise e Classificação de Documentos",
      descricao: "Classifique, extraia informações-chave e organize documentos automaticamente usando NLP e visão computacional.",
      impacto: "medio",
      risco: "baixo",
      prazo: "3-5 semanas",
      roi: "200-350% em 5 meses",
      agente: "Document Intelligence Agent",
      categoria: "Gestão Documental",
    });
  }

  if (data.processos.gargalos.includes("Conciliação de dados entre sistemas") ||
      data.dores.errosFrequentes.includes("Dados incorretos em cadastros/registros")) {
    recs.push({
      titulo: "Agente de Integração e Qualidade de Dados",
      descricao: "Sincronize dados entre sistemas, detecte inconsistências e corrija automaticamente erros de cadastro com validação inteligente.",
      impacto: "medio",
      risco: "baixo",
      prazo: "2-4 semanas",
      roi: "150-300% em 4 meses",
      agente: "Data Quality Agent",
      categoria: "Dados e Integração",
    });
  }

  if (data.dores.processosCriticos.includes("Onboarding de clientes")) {
    recs.push({
      titulo: "Assistente de Onboarding Automatizado",
      descricao: "Guie novos clientes pelo processo de onboarding com comunicação personalizada, coleta de documentos e configuração automática.",
      impacto: "alto",
      risco: "baixo",
      prazo: "4-6 semanas",
      roi: "200-400% em 5 meses",
      agente: "Onboarding Assistant Agent",
      categoria: "Experiência do Cliente",
    });
  }

  if (data.processos.gargalos.includes("Monitoramento e alertas manuais") ||
      data.objetivos.prioridades.includes("Predição e prevenção de problemas")) {
    recs.push({
      titulo: "Agente de Monitoramento Preditivo",
      descricao: "Monitore KPIs, detecte anomalias e preveja problemas antes que ocorram com alertas inteligentes e recomendações de ação.",
      impacto: "alto",
      risco: "medio",
      prazo: "6-10 semanas",
      roi: "200-500% em 8 meses",
      agente: "Predictive Monitoring Agent",
      categoria: "Inteligência Operacional",
    });
  }

  if (data.processos.areas.includes("RH / Gestão de Pessoas") ||
      data.dores.processosCriticos.includes("Recrutamento e seleção")) {
    recs.push({
      titulo: "Agente de Recrutamento e Triagem",
      descricao: "Automatize triagem de currículos, agendamento de entrevistas e comunicação com candidatos usando IA conversacional.",
      impacto: "medio",
      risco: "baixo",
      prazo: "3-5 semanas",
      roi: "150-250% em 4 meses",
      agente: "HR Recruitment Agent",
      categoria: "Recursos Humanos",
    });
  }

  if (data.dores.processosCriticos.includes("Faturamento e cobrança")) {
    recs.push({
      titulo: "Agente de Faturamento e Cobrança Inteligente",
      descricao: "Automatize emissão de faturas, conciliação de pagamentos e régua de cobrança personalizada com comunicação adaptativa.",
      impacto: "medio",
      risco: "baixo",
      prazo: "3-5 semanas",
      roi: "200-350% em 4 meses",
      agente: "Billing & Collections Agent",
      categoria: "Financeiro",
    });
  }

  if (data.processos.areas.includes("Marketing e Comunicação") ||
      data.objetivos.prioridades.includes("Personalização em escala")) {
    recs.push({
      titulo: "Agente de Conteúdo e Personalização",
      descricao: "Gere conteúdo personalizado em escala para campanhas, e-mails e comunicações com segmentação inteligente de audiência.",
      impacto: "medio",
      risco: "baixo",
      prazo: "2-4 semanas",
      roi: "150-300% em 3 meses",
      agente: "Content Personalization Agent",
      categoria: "Marketing",
    });
  }

  // Se poucas recomendações, adicionar genéricas baseadas no contexto
  if (recs.length < 4) {
    recs.push({
      titulo: "Assistente de Produtividade Interna",
      descricao: "Implante um assistente de IA interno que ajuda colaboradores com busca de informações, geração de documentos e automação de tarefas rotineiras.",
      impacto: "medio",
      risco: "baixo",
      prazo: "2-3 semanas",
      roi: "100-200% em 3 meses",
      agente: "Internal Productivity Agent",
      categoria: "Produtividade",
    });
  }

  // Ordenar por impacto (alto primeiro) e risco (baixo primeiro)
  const impactoOrder = { alto: 3, medio: 2, baixo: 1 };
  const riscoOrder = { baixo: 3, medio: 2, alto: 1 };
  recs.sort((a, b) => {
    const scoreA = impactoOrder[a.impacto] * 2 + riscoOrder[a.risco];
    const scoreB = impactoOrder[b.impacto] * 2 + riscoOrder[b.risco];
    return scoreB - scoreA;
  });

  return recs.slice(0, 8);
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-emerald";
  if (score >= 40) return "text-amber";
  return "text-destructive";
}

function getScoreBarColor(score: number): string {
  if (score >= 70) return "bg-emerald";
  if (score >= 40) return "bg-amber";
  return "bg-destructive";
}

function getImpactoColor(impacto: string): string {
  if (impacto === "alto") return "bg-emerald/10 text-emerald border-emerald/20";
  if (impacto === "medio") return "bg-amber/10 text-amber border-amber/20";
  return "bg-muted text-muted-foreground border-border";
}

function getRiscoColor(risco: string): string {
  if (risco === "baixo") return "bg-emerald/10 text-emerald border-emerald/20";
  if (risco === "medio") return "bg-amber/10 text-amber border-amber/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

export default function Resultado() {
  const [, navigate] = useLocation();
  const [data, setData] = useState<DiagnosticoData | null>(null);
  const [scores, setScores] = useState<ScoreCategoria[]>([]);
  const [recomendacoes, setRecomendacoes] = useState<Recomendacao[]>([]);
  const [animateScores, setAnimateScores] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("diagnostico-data");
    if (stored) {
      const parsed = JSON.parse(stored) as DiagnosticoData;
      setData(parsed);
      setScores(calcularScores(parsed));
      setRecomendacoes(gerarRecomendacoes(parsed));
      setTimeout(() => setAnimateScores(true), 300);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!data) return null;

  const scoreGeral = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 lg:px-10 py-5 border-b border-border/40 bg-sidebar/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="font-bold text-base">NexxusHuman-AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2 font-display"
            >
              <ArrowLeft className="w-4 h-4" />
              Início
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Título do Resultado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/30 bg-emerald/5 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
              <span className="text-xs font-medium text-emerald">Diagnóstico Concluído</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Relatório de Diagnóstico — {data.empresa.nome}
            </h1>
            <p className="text-muted-foreground">
              {data.empresa.setor} · {data.empresa.porte}
            </p>
          </motion.div>

          {/* Score Geral */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glow-border active rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.28 0.015 250)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="oklch(0.75 0.15 190)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${animateScores ? (scoreGeral / 100) * 264 : 0} 264`}
                      style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.23, 1, 0.32, 1)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-2xl font-bold text-primary">{scoreGeral}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold text-foreground mb-1">
                  Score Geral de Prontidão para IA
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {scoreGeral >= 70
                    ? "Sua empresa tem alta prontidão para implementação de IA. Recomendamos iniciar com projetos de alto impacto imediatamente."
                    : scoreGeral >= 45
                    ? "Sua empresa tem prontidão moderada. Comece com projetos de baixo risco e construa capacidade progressivamente."
                    : "Sua empresa está nos estágios iniciais. Foque em fundações digitais e projetos-piloto simples."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald" />
                    <span className="text-muted-foreground">70+ Excelente</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber" />
                    <span className="text-muted-foreground">40-69 Moderado</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-muted-foreground">&lt;40 Inicial</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scores por Categoria */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          >
            {scores.map((cat, i) => (
              <div key={i} className="glow-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm font-semibold text-foreground">{cat.nome}</h3>
                  <span className={`font-mono text-lg font-bold ${getScoreColor(cat.score)}`}>
                    {animateScores ? cat.score : 0}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getScoreBarColor(cat.score)}`}
                    style={{ width: animateScores ? `${cat.score}%` : "0%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{cat.descricao}</p>
              </div>
            ))}
          </motion.div>

          {/* Recomendações */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-amber" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Recomendações Priorizadas
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Com base na análise dos seus processos, dores e objetivos, identificamos as seguintes
              oportunidades de automação com IA, ordenadas por maior retorno e menor risco.
            </p>

            <div className="space-y-4">
              {recomendacoes.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="glow-border rounded-xl p-6 hover:scale-[1.005] transition-transform duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-primary font-bold">#{i + 1}</span>
                        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary border border-border">
                          {rec.categoria}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground mb-2">
                        {rec.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {rec.descricao}
                      </p>
                      <div className="flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">{rec.agente}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-col gap-2 lg:min-w-[160px]">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${getImpactoColor(rec.impacto)}`}>
                        <TrendingUp className="w-3 h-3" />
                        Impacto {rec.impacto}
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${getRiscoColor(rec.risco)}`}>
                        <Shield className="w-3 h-3" />
                        Risco {rec.risco}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium text-foreground/80">
                        <Clock className="w-3 h-3" />
                        {rec.prazo}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium text-foreground/80">
                        <DollarSign className="w-3 h-3" />
                        ROI {rec.roi}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Próximos Passos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 glow-border active rounded-xl p-8"
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber" />
              Próximos Passos Recomendados
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Quick Win (Semana 1-2)",
                  desc: `Implemente "${recomendacoes[0]?.titulo || "a primeira recomendação"}" como projeto-piloto para gerar resultados rápidos e buy-in organizacional.`,
                },
                {
                  step: "2",
                  title: "Fundação (Mês 1)",
                  desc: "Estabeleça a infraestrutura base de dados e integrações necessárias para escalar as automações subsequentes.",
                },
                {
                  step: "3",
                  title: "Expansão (Mês 2-3)",
                  desc: "Implemente as 3-4 recomendações seguintes em paralelo, aproveitando a infraestrutura já estabelecida.",
                },
                {
                  step: "4",
                  title: "Otimização (Mês 4+)",
                  desc: "Refine os agentes com base em dados reais de uso, expanda para novos processos e meça ROI consolidado.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-amber">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/diagnostico")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold px-8 py-6 gap-2 transition-all duration-200 active:scale-[0.97]"
            >
              <ArrowLeft className="w-4 h-4" />
              Refazer Diagnóstico
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-10 py-8 border-t border-border/40 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#A100FF] text-lg font-black">&gt;</span>
            <span className="text-sm font-medium text-muted-foreground">NexxusHuman-AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Diagnóstico estratégico para implementação de agentes e assistentes de IA
          </p>
        </div>
      </footer>
    </div>
  );
}
