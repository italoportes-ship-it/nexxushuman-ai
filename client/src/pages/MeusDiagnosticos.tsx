/* ===== Meus Diagnósticos — Histórico + Comparação + Export =====
 * Após login: histórico, comparação radar, exportação CSV
 * ============================================================== */

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Brain, Clock, ArrowRight, Download, GitCompare, X } from "lucide-react";
import { getLoginUrl } from "@/const";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

export default function MeusDiagnosticos() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: diagnosticosList, isLoading } = trpc.diagnostico.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#A100FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Brain className="w-12 h-12 text-[#A100FF] mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Meus Diagnósticos</h1>
          <p className="text-white/50 mb-8">Faça login para ver seu histórico de diagnósticos e acompanhar a evolução.</p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors">
            Fazer Login <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  // Exportar CSV
  const handleExportCSV = () => {
    if (!diagnosticosList?.length) return;
    const headers = ["Empresa", "Setor", "Porte", "Score Geral", "Prontidão", "Potencial", "Urgência", "ROI", "Facilidade", "Status", "Data"];
    const rows = diagnosticosList.map(d => [
      d.empresaNome,
      d.empresaSetor,
      d.empresaPorte,
      d.scoreGeral || "",
      d.scoreProntidao || "",
      d.scorePotencial || "",
      d.scoreUrgencia || "",
      d.scoreROI || "",
      d.scoreFacilidade || "",
      d.status,
      new Date(d.createdAt).toLocaleDateString("pt-BR"),
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnosticos_nexxus_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Dados para comparação radar
  const compareData = (() => {
    if (compareIds.length < 2 || !diagnosticosList) return null;
    const d1 = diagnosticosList.find(d => d.id === compareIds[0]);
    const d2 = diagnosticosList.find(d => d.id === compareIds[1]);
    if (!d1 || !d2) return null;
    return {
      d1, d2,
      radarData: [
        { metric: "Prontidão", a: d1.scoreProntidao || 0, b: d2.scoreProntidao || 0 },
        { metric: "Potencial", a: d1.scorePotencial || 0, b: d2.scorePotencial || 0 },
        { metric: "Urgência", a: d1.scoreUrgencia || 0, b: d2.scoreUrgencia || 0 },
        { metric: "ROI", a: d1.scoreROI || 0, b: d2.scoreROI || 0 },
        { metric: "Facilidade", a: d1.scoreFacilidade || 0, b: d2.scoreFacilidade || 0 },
      ],
    };
  })();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
          <span className="text-sm text-white/50">{user?.name || user?.email}</span>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Meus Diagnósticos</h1>
            <p className="text-white/50 text-sm mt-1">Acompanhe a evolução da sua empresa</p>
          </div>
          <div className="flex items-center gap-3">
            {diagnosticosList && diagnosticosList.length > 0 && (
              <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-white/70 text-sm font-medium hover:border-[#A100FF]/50 hover:text-white transition-colors">
                <Download className="w-4 h-4" /> CSV
              </button>
            )}
            <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
              Novo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Modo comparação */}
        {compareIds.length > 0 && (
          <div className="bg-[#A100FF]/5 border border-[#A100FF]/20 p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-[#A100FF]" />
              <span className="text-sm text-white/70">
                {compareIds.length === 1 ? "Selecione mais 1 diagnóstico para comparar" : "2 diagnósticos selecionados"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {compareIds.length === 2 && (
                <button onClick={() => setShowCompare(true)} className="text-xs px-3 py-1.5 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors">
                  Ver Comparação
                </button>
              )}
              <button onClick={() => { setCompareIds([]); setShowCompare(false); }} className="text-xs text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal de comparação radar */}
        {showCompare && compareData && (
          <div className="bg-[#111] border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Comparação de Diagnósticos</h3>
              <button onClick={() => setShowCompare(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={compareData.radarData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#999", fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#666", fontSize: 9 }} />
                    <Radar name={compareData.d1.empresaNome} dataKey="a" stroke="#A100FF" fill="#A100FF" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name={compareData.d2.empresaNome} dataKey="b" stroke="#00C49F" fill="#00C49F" fillOpacity={0.2} strokeWidth={2} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/50 p-3">
                    <span className="text-[10px] text-[#A100FF] uppercase tracking-wider block mb-1">{compareData.d1.empresaNome}</span>
                    <span className="text-2xl font-black">{compareData.d1.scoreGeral || "—"}</span>
                    <span className="text-[10px] text-white/30 block">{new Date(compareData.d1.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="bg-black/50 p-3">
                    <span className="text-[10px] text-[#00C49F] uppercase tracking-wider block mb-1">{compareData.d2.empresaNome}</span>
                    <span className="text-2xl font-black">{compareData.d2.scoreGeral || "—"}</span>
                    <span className="text-[10px] text-white/30 block">{new Date(compareData.d2.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {compareData.radarData.map((r, i) => {
                    const diff = r.b - r.a;
                    return (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/50">{r.metric}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#A100FF] font-bold w-8 text-right">{r.a}</span>
                          <span className={`text-xs font-bold ${diff > 0 ? "text-green-400" : diff < 0 ? "text-red-400" : "text-white/30"}`}>
                            {diff > 0 ? `+${diff}` : diff === 0 ? "=" : diff}
                          </span>
                          <span className="text-[#00C49F] font-bold w-8">{r.b}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de diagnósticos */}
        {isLoading ? (
          <div className="p-12 text-center text-white/40">Carregando...</div>
        ) : !diagnosticosList?.length ? (
          <div className="bg-[#111] p-12 text-center">
            <Brain className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white/60 mb-2">Nenhum diagnóstico ainda</h3>
            <p className="text-sm text-white/40 mb-6">Faça seu primeiro diagnóstico para descobrir o potencial de IA da sua empresa.</p>
            <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
              Iniciar Diagnóstico <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {diagnosticosList.map((d) => (
              <div key={d.id} className={`bg-[#111] p-6 hover:bg-[#1a1a1a] transition-colors ${compareIds.includes(d.id) ? "ring-1 ring-[#A100FF]" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{d.empresaNome}</h3>
                      <span className={`text-[10px] px-2 py-0.5 font-medium ${
                        d.status === "concluido" ? "bg-green-500/10 text-green-400" :
                        d.status === "processando" ? "bg-amber-500/10 text-amber-400" :
                        "bg-white/5 text-white/40"
                      }`}>
                        {d.status === "concluido" ? "Concluído" : d.status === "processando" ? "Processando" : "Pendente"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span>{d.empresaSetor}</span>
                      <span>•</span>
                      <span>{d.empresaPorte}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(d.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    {/* Botão comparar */}
                    <button
                      onClick={() => toggleCompare(d.id)}
                      className={`p-2 transition-colors ${compareIds.includes(d.id) ? "text-[#A100FF]" : "text-white/20 hover:text-white/50"}`}
                      title="Comparar"
                    >
                      <GitCompare className="w-4 h-4" />
                    </button>
                    {/* Score */}
                    <div className="text-center">
                      <div className={`text-3xl font-black ${
                        (d.scoreGeral || 0) >= 70 ? "text-green-400" :
                        (d.scoreGeral || 0) >= 40 ? "text-[#A100FF]" :
                        "text-amber-400"
                      }`}>
                        {d.scoreGeral || "—"}
                      </div>
                      <span className="text-[10px] text-white/30 uppercase">Score</span>
                    </div>
                  </div>
                </div>

                {/* Scores detalhados */}
                {d.status === "concluido" && (
                  <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-white/5">
                    {[
                      { label: "Prontidão", value: d.scoreProntidao },
                      { label: "Potencial", value: d.scorePotencial },
                      { label: "Urgência", value: d.scoreUrgencia },
                      { label: "ROI", value: d.scoreROI },
                      { label: "Facilidade", value: d.scoreFacilidade },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <span className="text-sm font-bold text-white/70">{s.value || "—"}</span>
                        <span className="text-[9px] text-white/30 block">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
