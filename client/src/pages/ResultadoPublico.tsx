/* ===== Resultado Público — Landing page compartilhável =====
 * URL: /resultado/:id — acessível sem login
 * ============================================================ */

import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { Brain, TrendingUp, Shield, Zap, BarChart3, Clock } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function ResultadoPublico() {
  const params = useParams<{ id: string }>();
  const diagnosticoId = parseInt(params.id || "0");

  const { data, isLoading, error } = trpc.diagnostico.getById.useQuery(
    { id: diagnosticoId },
    { enabled: diagnosticoId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A100FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Brain className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Diagnóstico não encontrado</h1>
          <p className="text-white/50 mb-8">Este link pode ter expirado ou o diagnóstico não existe.</p>
          <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors">
            Fazer novo diagnóstico
          </Link>
        </div>
      </div>
    );
  }

  const radarData = [
    { metric: "Prontidão", value: data.scoreProntidao || 0 },
    { metric: "Potencial", value: data.scorePotencial || 0 },
    { metric: "Urgência", value: data.scoreUrgencia || 0 },
    { metric: "ROI", value: data.scoreROI || 0 },
    { metric: "Facilidade", value: data.scoreFacilidade || 0 },
  ];

  const scoreColor = (data.scoreGeral || 0) >= 70 ? "text-green-400" : (data.scoreGeral || 0) >= 40 ? "text-[#A100FF]" : "text-amber-400";

  // Parse recomendações do LLM
  let recomendacoes: any[] = [];
  if (data.recomendacoesIA) {
    try {
      const parsed = JSON.parse(data.recomendacoesIA);
      recomendacoes = parsed.recomendacoes || [];
    } catch {}
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/90 backdrop-blur-md">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
          <span className="text-[10px] text-white/30 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(data.createdAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-10">
        {/* Hero do resultado */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-3">
            Diagnóstico de IA Empresarial
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">{data.empresaNome}</h1>
          <p className="text-white/50 text-sm">{data.empresaSetor} · {data.empresaPorte}</p>
        </div>

        {/* Score principal */}
        <div className="bg-[#111] p-8 text-center mb-8">
          <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-2">Score Geral de Prontidão para IA</span>
          <span className={`text-6xl font-black ${scoreColor}`}>{data.scoreGeral || "—"}</span>
          <span className="text-white/30 text-lg">/100</span>
          <p className="text-sm text-white/50 mt-3 max-w-md mx-auto">
            {(data.scoreGeral || 0) >= 70
              ? "Excelente prontidão! Sua empresa está preparada para implementações avançadas de IA."
              : (data.scoreGeral || 0) >= 40
              ? "Prontidão moderada. Comece com projetos de baixo risco e construa capacidade progressivamente."
              : "Estágio inicial. Foco em fundações digitais antes de implementações complexas."}
          </p>
        </div>

        {/* Radar + Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] mb-8">
          <div className="bg-[#111] p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-4">Análise Multidimensional</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#999", fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#666", fontSize: 9 }} />
                <Radar dataKey="value" stroke="#A100FF" fill="#A100FF" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-[#111] p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-4">Scores por Dimensão</h3>
            <div className="space-y-4">
              {radarData.map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">{r.metric}</span>
                    <span className="font-bold text-white">{r.value}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#A100FF] rounded-full transition-all duration-1000" style={{ width: `${r.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recomendações do LLM */}
        {recomendacoes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Recomendações Personalizadas</h2>
            <div className="space-y-[2px]">
              {recomendacoes.slice(0, 6).map((r: any, i: number) => (
                <div key={i} className="bg-[#111] p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#A100FF] bg-[#A100FF]/10 px-2 py-0.5">#{i + 1}</span>
                        <span className="text-[10px] text-white/40">{r.categoria}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{r.titulo}</h3>
                      <p className="text-sm text-white/50">{r.descricao}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className={`text-[10px] px-2 py-0.5 font-medium ${r.impacto === "alto" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                      Impacto {r.impacto}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 font-medium ${r.risco === "baixo" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                      Risco {r.risco}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 font-medium bg-white/5 text-white/40">{r.prazo}</span>
                    <span className="text-[10px] px-2 py-0.5 font-medium bg-[#A100FF]/10 text-[#A100FF]">ROI {r.roi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-[#A100FF] p-8 text-center">
          <h2 className="text-xl font-black text-white mb-3">Quer implementar essas recomendações?</h2>
          <p className="text-white/80 text-sm mb-6">Agende uma consultoria gratuita com nossos especialistas em organização agêntica.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors">
            Agendar Consultoria &gt;
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/30">
            Relatório gerado por NexxusHuman-AI · Diagnóstico #{data.id} · {new Date(data.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </main>
    </div>
  );
}
