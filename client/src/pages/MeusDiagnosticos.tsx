/* ===== Meus Diagnósticos — Histórico do Usuário =====
 * Após login, o usuário vê todos os diagnósticos que fez
 * ===================================================== */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Brain, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function MeusDiagnosticos() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: diagnosticosList, isLoading } = trpc.diagnostico.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

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
          <Link href="/diagnostico/iniciar" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
            Novo Diagnóstico <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

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
              <div key={d.id} className="bg-[#111] p-6 hover:bg-[#1a1a1a] transition-colors">
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

                  {/* Score */}
                  <div className="text-center ml-6">
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
