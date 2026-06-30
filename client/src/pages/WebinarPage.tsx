/* ===== Página de Webinar/Evento — NexxusHuman-AI ===== */

import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Clock, Users, CheckCircle2, ArrowRight, Play } from "lucide-react";

export default function WebinarPage() {
  const [formData, setFormData] = useState({ nome: "", email: "", empresa: "", cargo: "" });
  const [registered, setRegistered] = useState(false);
  const [sending, setSending] = useState(false);
  const submitLead = trpc.leads.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) { toast.error("Preencha nome e e-mail."); return; }
    setSending(true);
    try {
      await submitLead.mutateAsync({
        nome: formData.nome,
        email: formData.email,
        empresa: formData.empresa || undefined,
        cargo: formData.cargo || undefined,
        mensagem: "[WEBINAR] Inscrição para evento online",
        origem: "webinar",
      });
      setRegistered(true);
    } catch { toast.error("Erro ao inscrever. Tente novamente."); }
    finally { setSending(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 bg-black/90 backdrop-blur-md">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 py-12">
        {!registered ? (
          <>
            {/* Hero do Webinar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
                  Evento Online Gratuito
                </span>
                <h1 className="text-3xl sm:text-4xl font-black leading-[1.1] mb-4">
                  Como construir sua Organização Agêntica em 90 dias
                </h1>
                <p className="text-white/50 text-[15px] leading-relaxed mb-6">
                  Descubra o framework prático que empresas líderes estão usando para escalar agentes de IA em produção — sem desperdiçar meses em pilotos que não escalam.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Calendar className="w-4 h-4 text-[#A100FF]" />
                    <span>Quinta-feira, 10 de Julho de 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Clock className="w-4 h-4 text-[#A100FF]" />
                    <span>19h00 (Brasília) — 60 minutos + Q&A</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Users className="w-4 h-4 text-[#A100FF]" />
                    <span>Vagas limitadas a 100 participantes</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-3">O que você vai aprender:</h3>
                <div className="space-y-2">
                  {[
                    "Por que 40% dos projetos de IA serão cancelados até 2027",
                    "O framework de 2 passos para evitar o Agent Washing",
                    "Como identificar o primeiro workflow de alto impacto",
                    "Case real: de 15 dias para 4 horas com agentes",
                    "Sessão ao vivo de Q&A com nossos especialistas",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-[#A100FF] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulário de inscrição */}
              <div className="bg-[#111] p-8">
                <h2 className="text-xl font-bold mb-2">Inscreva-se gratuitamente</h2>
                <p className="text-sm text-white/40 mb-6">Garanta sua vaga e receba o link de acesso por e-mail.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Nome completo *</label>
                    <input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50" placeholder="Seu nome" required />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">E-mail corporativo *</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50" placeholder="seu@empresa.com" required />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Empresa</label>
                    <input type="text" value={formData.empresa} onChange={e => setFormData({...formData, empresa: e.target.value})} className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50" placeholder="Nome da empresa" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Cargo</label>
                    <input type="text" value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50" placeholder="Seu cargo" />
                  </div>
                  <button type="submit" disabled={sending} className="w-full py-3.5 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {sending ? "Inscrevendo..." : "Garantir minha vaga"} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-white/30 mt-4 text-center">
                  Ao se inscrever, você concorda em receber comunicações da NexxusHuman-AI.
                </p>
              </div>
            </div>

            {/* Apresentadores */}
            <div className="border-t border-white/5 pt-12">
              <h2 className="text-xl font-bold mb-6">Apresentado por</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
                <div className="bg-[#111] p-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#A100FF]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#A100FF] text-xl font-black">&gt;</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Equipe NexxusHuman-AI</h3>
                    <p className="text-xs text-white/40">Especialistas em Organização Agêntica</p>
                  </div>
                </div>
                <div className="bg-[#111] p-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center shrink-0">
                    <Play className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Formato</h3>
                    <p className="text-xs text-white/40">Apresentação + Demo ao vivo + Q&A</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Tela de sucesso */
          <div className="text-center py-16">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-black mb-3">Inscrição confirmada!</h1>
            <p className="text-white/50 mb-2">Quinta-feira, 10 de Julho de 2026 às 19h00 (Brasília)</p>
            <p className="text-sm text-white/40 mb-8">
              Enviamos o link de acesso para <strong className="text-white/60">{formData.email}</strong>.<br/>
              Adicione ao seu calendário para não esquecer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/70 font-medium text-sm hover:border-white/30 transition-colors">
                Voltar ao site
              </Link>
              <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
                Fazer Diagnóstico enquanto espera
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
