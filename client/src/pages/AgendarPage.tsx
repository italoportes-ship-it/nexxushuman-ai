/* ===== Página de Agendamento — NexxusHuman-AI =====
 * Sistema de agendamento de consultoria com slots de horário
 * ========================================================= */

import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle2, ArrowRight, User, Mail, Building2 } from "lucide-react";

const AVAILABLE_SLOTS = [
  { day: "Segunda", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Terça", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Quarta", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Quinta", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Sexta", slots: ["09:00", "10:00", "14:00", "15:00"] },
];

export default function AgendarPage() {
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({ nome: "", email: "", empresa: "", cargo: "", mensagem: "" });
  const [sending, setSending] = useState(false);

  const submitLead = trpc.leads.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) {
      toast.error("Preencha nome e e-mail.");
      return;
    }
    setSending(true);
    try {
      await submitLead.mutateAsync({
        nome: formData.nome,
        email: formData.email,
        empresa: formData.empresa || undefined,
        cargo: formData.cargo || undefined,
        mensagem: `[AGENDAMENTO] ${selectedDay} às ${selectedSlot}\n${formData.mensagem || ""}`,
        origem: "agendamento",
      });
      setStep("success");
    } catch {
      toast.error("Erro ao agendar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 bg-black/90 backdrop-blur-md">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold">NexxusHuman-AI</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Calendar className="w-10 h-10 text-[#A100FF] mx-auto mb-4" />
          <h1 className="text-3xl font-black mb-2">Agendar Consultoria</h1>
          <p className="text-white/50 text-sm">Escolha o melhor horário para conversar com nossos especialistas em organização agêntica.</p>
        </div>

        {/* Step: Selecionar horário */}
        {step === "select" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Selecione um horário disponível</h2>
            <div className="space-y-3">
              {AVAILABLE_SLOTS.map((day) => (
                <div key={day.day} className="bg-[#111] p-4">
                  <h3 className="text-sm font-semibold text-white/70 mb-3">{day.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot) => {
                      const isSelected = selectedDay === day.day && selectedSlot === slot;
                      return (
                        <button
                          key={`${day.day}-${slot}`}
                          onClick={() => { setSelectedDay(day.day); setSelectedSlot(slot); }}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-[#A100FF] text-white"
                              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedSlot && (
              <div className="mt-6 p-4 bg-[#A100FF]/5 border border-[#A100FF]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A100FF]" />
                  <span className="text-sm text-white/80">
                    <strong>{selectedDay}</strong> às <strong>{selectedSlot}</strong> (30 min)
                  </span>
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors"
                >
                  Confirmar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step: Formulário */}
        {step === "form" && (
          <div>
            <div className="mb-6 p-4 bg-[#111] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#A100FF]" />
              <div>
                <span className="text-sm font-semibold text-white">{selectedDay} às {selectedSlot}</span>
                <span className="text-xs text-white/40 block">Consultoria de 30 minutos</span>
              </div>
              <button onClick={() => setStep("select")} className="ml-auto text-xs text-white/40 hover:text-white">
                Alterar
              </button>
            </div>

            <h2 className="text-lg font-bold mb-4">Seus dados</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Nome completo *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={e => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={e => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Cargo</label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={e => setFormData({ ...formData, cargo: e.target.value })}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50"
                    placeholder="Seu cargo"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">O que gostaria de discutir?</label>
                <textarea
                  value={formData.mensagem}
                  onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#A100FF]/50 min-h-[80px]"
                  placeholder="Descreva brevemente seus objetivos..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#A100FF] text-white font-semibold hover:bg-[#8800DD] transition-colors disabled:opacity-50"
              >
                {sending ? "Agendando..." : "Confirmar Agendamento"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step: Sucesso */}
        {step === "success" && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-black mb-3">Consultoria Agendada!</h2>
            <p className="text-white/50 mb-2">
              <strong className="text-white">{selectedDay}</strong> às <strong className="text-white">{selectedSlot}</strong> (30 minutos)
            </p>
            <p className="text-sm text-white/40 mb-8">
              Enviamos uma confirmação para <strong className="text-white/60">{formData.email}</strong>.<br />
              Nossa equipe entrará em contato antes da reunião.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/70 font-medium text-sm hover:border-white/30 transition-colors">
                Voltar ao site
              </Link>
              <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
                Fazer Diagnóstico
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
