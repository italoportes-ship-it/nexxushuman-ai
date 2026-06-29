/* ===== Step Saúde — Formulário específico para setor Saúde =====
 * Baseado no formulário Tally: https://tally.so/r/rjpyOv
 * Adaptado para o contexto de diagnóstico de IA empresarial
 * ============================================================= */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface SaudeData {
  nomeCompleto: string;
  profissao: string;
  especialidade: string;
  registro: string;
  cidade: string;
  modalidades: string[];
  publicoAtende: string[];
  idadeMinima: string;
  whatsapp: string;
  email: string;
  instagram: string;
  site: string;
  tiposAtendimento: string[];
  valorSessao: string;
  duracaoSessao: string;
  aceitaConvenio: string;
  demandasPrincipais: string[];
  volumeAtendimentos: string;
  comoAgendam: string[];
  usaPlataforma: string;
  doresOperacionais: string[];
  tempoAdministrativo: string;
  oQueAutomatizar: string;
  tomVoz: string;
  usaEmojis: string;
  horariosAtendimento: string;
  politicaCancelamento: string;
  fazTriagem: string;
  perguntasTriagem: string;
  expectativasIA: string[];
  iaDeveEvitar: string;
}

const initialSaudeData: SaudeData = {
  nomeCompleto: "", profissao: "", especialidade: "", registro: "", cidade: "",
  modalidades: [], publicoAtende: [], idadeMinima: "", whatsapp: "", email: "",
  instagram: "", site: "", tiposAtendimento: [], valorSessao: "", duracaoSessao: "",
  aceitaConvenio: "", demandasPrincipais: [], volumeAtendimentos: "", comoAgendam: [],
  usaPlataforma: "", doresOperacionais: [], tempoAdministrativo: "", oQueAutomatizar: "",
  tomVoz: "", usaEmojis: "", horariosAtendimento: "", politicaCancelamento: "",
  fazTriagem: "", perguntasTriagem: "", expectativasIA: [], iaDeveEvitar: "",
};

// Opções do formulário
const profissoes = ["Psicólogo(a)", "Psiquiatra", "Terapeuta", "Hipnoterapeuta", "Médico(a) de outra especialidade", "Coach / Mentor", "Outro"];
const modalidadesOpts = ["Online", "Presencial"];
const publicoOpts = ["Adultos", "Adolescentes", "Crianças", "Casais", "Família", "Idosos"];
const tiposAtendimentoOpts = ["Sessão individual", "Terapia de casal", "Terapia familiar", "Grupo terapêutico", "Supervisão clínica", "Avaliação psicológica"];
const demandasOpts = ["Ansiedade", "Depressão", "Burnout", "Relacionamentos", "Luto", "Transtornos alimentares", "TDAH", "Autoestima", "Traumas", "Fobias", "Dependência química"];
const comoAgendamOpts = ["WhatsApp", "Telefone", "Site", "Plataforma de agendamento", "Redes sociais"];
const doresOpts = ["Responder mensagens repetitivas", "Agendamento/remarcação", "Cobranças e inadimplência", "Triagem de novos pacientes", "Falta de tempo para marketing", "Gestão financeira"];
const expectativasOpts = ["Responder dúvidas frequentes", "Agendar/remarcar sessões", "Fazer triagem inicial", "Enviar lembretes", "Cobrar inadimplentes", "Qualificar novos leads", "Enviar materiais"];

interface StepSaudeProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  saudeData: SaudeData;
  onDataChange: (data: Partial<SaudeData>) => void;
}

export default function StepSaude({ currentSection, onSectionChange, saudeData, onDataChange }: StepSaudeProps) {
  const toggleArray = (field: keyof SaudeData, value: string) => {
    const current = saudeData[field] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onDataChange({ [field]: updated });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[#A100FF]/10 border border-[#A100FF]/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-[#A100FF]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Diagnóstico — Setor Saúde</h2>
          <p className="text-xs text-muted-foreground">Seção {currentSection + 1} de 5</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Formulário especializado para profissionais de saúde. Suas respostas geram recomendações de IA personalizadas para sua prática.
      </p>

      {/* Seção 1: Sobre você */}
      {currentSection === 0 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">Sobre você</h3>
          <div className="space-y-2">
            <Label>Nome completo *</Label>
            <Input value={saudeData.nomeCompleto} onChange={(e) => onDataChange({ nomeCompleto: e.target.value })} placeholder="Seu nome completo" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Profissão / título principal *</Label>
            <Select value={saudeData.profissao} onValueChange={(v) => onDataChange({ profissao: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>{profissoes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Especialidade ou abordagem principal *</Label>
            <Input value={saudeData.especialidade} onChange={(e) => onDataChange({ especialidade: e.target.value })} placeholder="Ex: Terapia Cognitivo-Comportamental" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Registro profissional (CRP, CRM) — opcional</Label>
            <Input value={saudeData.registro} onChange={(e) => onDataChange({ registro: e.target.value })} placeholder="Ex: CRP 08/12345" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Cidade e estado *</Label>
            <Input value={saudeData.cidade} onChange={(e) => onDataChange({ cidade: e.target.value })} placeholder="Ex: Curitiba/PR" className="bg-background" />
          </div>
          <div className="space-y-3">
            <Label>Modalidades de atendimento *</Label>
            <div className="grid grid-cols-2 gap-2">
              {modalidadesOpts.map((m) => (
                <label key={m} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.modalidades.includes(m)} onCheckedChange={() => toggleArray("modalidades", m)} />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Quem você atende? *</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {publicoOpts.map((p) => (
                <label key={p} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.publicoAtende.includes(p)} onCheckedChange={() => toggleArray("publicoAtende", p)} />
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Seção 2: Serviços e demandas */}
      {currentSection === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">Serviços e Demandas</h3>
          <div className="space-y-3">
            <Label>Tipos de atendimento oferecidos</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tiposAtendimentoOpts.map((t) => (
                <label key={t} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.tiposAtendimento.includes(t)} onCheckedChange={() => toggleArray("tiposAtendimento", t)} />
                  <span className="text-sm">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor da sessão individual</Label>
              <Input value={saudeData.valorSessao} onChange={(e) => onDataChange({ valorSessao: e.target.value })} placeholder="Ex: R$ 250" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label>Duração padrão</Label>
              <Select value={saudeData.duracaoSessao} onValueChange={(v) => onDataChange({ duracaoSessao: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="50min">50 minutos</SelectItem>
                  <SelectItem value="60min">60 minutos</SelectItem>
                  <SelectItem value="90min">90 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Principais demandas que atende</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {demandasOpts.map((d) => (
                <label key={d} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.demandasPrincipais.includes(d)} onCheckedChange={() => toggleArray("demandasPrincipais", d)} />
                  <span className="text-sm">{d}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Volume médio de atendimentos/semana</Label>
            <Select value={saudeData.volumeAtendimentos} onValueChange={(v) => onDataChange({ volumeAtendimentos: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1 a 10</SelectItem>
                <SelectItem value="11-20">11 a 20</SelectItem>
                <SelectItem value="21-30">21 a 30</SelectItem>
                <SelectItem value="31+">31 ou mais</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Seção 3: Processo e dores */}
      {currentSection === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">Processo e Dores Operacionais</h3>
          <div className="space-y-3">
            <Label>Como os pacientes agendam hoje?</Label>
            <div className="grid grid-cols-2 gap-2">
              {comoAgendamOpts.map((c) => (
                <label key={c} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.comoAgendam.includes(c)} onCheckedChange={() => toggleArray("comoAgendam", c)} />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Principais dores no dia a dia *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doresOpts.map((d) => (
                <label key={d} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.doresOperacionais.includes(d)} onCheckedChange={() => toggleArray("doresOperacionais", d)} />
                  <span className="text-sm">{d}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tempo gasto com tarefas administrativas/dia</Label>
            <Select value={saudeData.tempoAdministrativo} onValueChange={(v) => onDataChange({ tempoAdministrativo: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="menos-1h">Menos de 1 hora</SelectItem>
                <SelectItem value="1-2h">1 a 2 horas</SelectItem>
                <SelectItem value="2-3h">2 a 3 horas</SelectItem>
                <SelectItem value="3h+">Mais de 3 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>O que mais gostaria de automatizar?</Label>
            <Textarea value={saudeData.oQueAutomatizar} onChange={(e) => onDataChange({ oQueAutomatizar: e.target.value })} placeholder="Descreva o que consome mais tempo no seu dia..." className="bg-background min-h-[100px]" />
          </div>
        </div>
      )}

      {/* Seção 4: Tom de voz e regras */}
      {currentSection === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">Tom de Voz e Regras</h3>
          <div className="space-y-2">
            <Label>Estilo de comunicação da IA</Label>
            <Select value={saudeData.tomVoz} onValueChange={(v) => onDataChange({ tomVoz: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="acolhedor">Acolhedor e empático</SelectItem>
                <SelectItem value="direto">Direto e objetivo</SelectItem>
                <SelectItem value="leve">Leve e descontraído</SelectItem>
                <SelectItem value="formal">Formal e técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Horários de atendimento</Label>
            <Input value={saudeData.horariosAtendimento} onChange={(e) => onDataChange({ horariosAtendimento: e.target.value })} placeholder="Ex: Seg-Sex 8h-18h" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Política de cancelamento</Label>
            <Textarea value={saudeData.politicaCancelamento} onChange={(e) => onDataChange({ politicaCancelamento: e.target.value })} placeholder="Ex: Cancelamento com 24h de antecedência..." className="bg-background min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label>Faz triagem antes da primeira sessão?</Label>
            <Select value={saudeData.fazTriagem} onValueChange={(v) => onDataChange({ fazTriagem: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {saudeData.fazTriagem === "sim" && (
            <div className="space-y-2">
              <Label>Perguntas que faz na triagem</Label>
              <Textarea value={saudeData.perguntasTriagem} onChange={(e) => onDataChange({ perguntasTriagem: e.target.value })} placeholder="Liste as perguntas que costuma fazer..." className="bg-background min-h-[100px]" />
            </div>
          )}
        </div>
      )}

      {/* Seção 5: Expectativas com a IA */}
      {currentSection === 4 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">Expectativas com a IA</h3>
          <div className="space-y-3">
            <Label>O que espera que a IA faça? *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {expectativasOpts.map((e) => (
                <label key={e} className="flex items-center gap-2 p-3 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors">
                  <Checkbox checked={saudeData.expectativasIA.includes(e)} onCheckedChange={() => toggleArray("expectativasIA", e)} />
                  <span className="text-sm">{e}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>O que a IA NÃO deve fazer?</Label>
            <Textarea value={saudeData.iaDeveEvitar} onChange={(e) => onDataChange({ iaDeveEvitar: e.target.value })} placeholder="Ex: Nunca dar diagnósticos, nunca recomendar medicação..." className="bg-background min-h-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
}

export type { SaudeData };
export { initialSaudeData };
