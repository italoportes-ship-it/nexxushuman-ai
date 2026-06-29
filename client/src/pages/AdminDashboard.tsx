/* ===== Dashboard Admin — NexxusHuman-AI =====
 * Visualizar diagnósticos, leads e métricas do funil
 * ================================================= */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { BarChart3, Users, Brain, TrendingUp, FileText } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();

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
        <div className="text-center max-w-md">
          <span className="text-[#A100FF] text-4xl font-black block mb-4">&gt;</span>
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="text-white/50 mb-8">Faça login para acessar o painel administrativo.</p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors">
            Fazer Login &gt;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
              <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
            </Link>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF] bg-[#A100FF]/10 px-2 py-1">
              Admin
            </span>
          </div>
          <span className="text-sm text-white/50">{user?.name || user?.email}</span>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <h1 className="text-3xl font-black mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <StatsCards />

        {/* Diagnósticos Recentes */}
        <DiagnosticosRecentes />

        {/* Leads Recentes */}
        <LeadsRecentes />
      </main>
    </div>
  );
}

function StatsCards() {
  const { data: diagStats } = trpc.diagnostico.stats.useQuery();
  const { data: leadStats } = trpc.leads.stats.useQuery();

  const stats = [
    { icon: Brain, label: "Diagnósticos", value: diagStats?.total || 0, color: "text-[#A100FF]" },
    { icon: TrendingUp, label: "Concluídos", value: diagStats?.concluidos || 0, color: "text-green-400" },
    { icon: BarChart3, label: "Score Médio", value: diagStats?.scoreMedia || 0, color: "text-blue-400" },
    { icon: Users, label: "Leads", value: leadStats?.total || 0, color: "text-amber-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#111] p-6">
          <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
          <span className="text-3xl font-black block mb-1">{s.value}</span>
          <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function DiagnosticosRecentes() {
  const { data: diagnosticosList, isLoading } = trpc.diagnostico.list.useQuery();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-[#A100FF]" />
        Diagnósticos Recentes
      </h2>
      <div className="bg-[#111] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/40">Carregando...</div>
        ) : !diagnosticosList?.length ? (
          <div className="p-8 text-center text-white/40">Nenhum diagnóstico ainda</div>
        ) : (
          <div className="divide-y divide-white/5">
            {diagnosticosList.slice(0, 10).map((d) => (
              <div key={d.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
                <div>
                  <span className="text-sm font-semibold text-white">{d.empresaNome}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#A100FF] font-medium">{d.empresaSetor}</span>
                    <span className="text-[10px] text-white/30">•</span>
                    <span className="text-[10px] text-white/30">{d.empresaPorte}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-[#A100FF]">{d.scoreGeral || "—"}</span>
                  <span className={`text-[10px] px-2 py-0.5 font-medium ${
                    d.status === "concluido" ? "bg-green-500/10 text-green-400" :
                    d.status === "processando" ? "bg-amber-500/10 text-amber-400" :
                    "bg-white/5 text-white/40"
                  }`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LeadsRecentes() {
  const { data: leadsList, isLoading } = trpc.leads.list.useQuery();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-amber-400" />
        Leads Recentes
      </h2>
      <div className="bg-[#111] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/40">Carregando...</div>
        ) : !leadsList?.length ? (
          <div className="p-8 text-center text-white/40">Nenhum lead ainda</div>
        ) : (
          <div className="divide-y divide-white/5">
            {leadsList.slice(0, 10).map((l) => (
              <div key={l.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
                <div>
                  <span className="text-sm font-semibold text-white">{l.nome}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/50">{l.email}</span>
                    {l.empresa && <><span className="text-[10px] text-white/30">•</span><span className="text-[10px] text-white/30">{l.empresa}</span></>}
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 font-medium ${
                  l.origem === "diagnostico" ? "bg-[#A100FF]/10 text-[#A100FF]" : "bg-white/5 text-white/40"
                }`}>
                  {l.origem}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
