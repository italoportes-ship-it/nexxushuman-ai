/* ===== Assessment Indústria Farmacêutica — NexxusHuman-AI =====
 * Formulário robusto com particularidades regulatórias, GxP, qualidade,
 * farmacovigilância, supply chain e compliance do setor farmacêutico
 * ================================================================= */

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pill } from "lucide-react";

// ===== TIPOS =====
export interface FarmaData {
  // Seção 1: Perfil Regulatório
  tipoEmpresa: string;
  regulacoes: string[];
  certificacoes: string[];
  mercadosAtuacao: string[];
  numRegistrosAtivos: string;
  // Seção 2: Operações e Qualidade
  areasProducao: string[];
  sistemasQualidade: string[];
  volumeDesvios: string;
  tempoCAPAs: string;
  nivelAutomacaoLab: string;
  // Seção 3: Supply Chain e Rastreabilidade
  desafiosSupplyChain: string[];
  sistemaRastreabilidade: string;
  nivelSerializacao: string;
  fornecedoresAtivos: string;
  // Seção 4: Farmacovigilância e Dados
  volumeEventosAdversos: string;
  sistemaFarmacovigilancia: string;
  integracaoDados: string[];
  desafiosDados: string[];
  // Seção 5: Dores e Expectativas com IA
  doresFarma: string[];
  processosParaAutomatizar: string;
  expectativasIA: string[];
  restricoesRegulatorias: string;
}

export const initialFarmaData: FarmaData = {
  tipoEmpresa: "", regulacoes: [], certificacoes: [], mercadosAtuacao: [], numRegistrosAtivos: "",
  areasProducao: [], sistemasQualidade: [], volumeDesvios: "", tempoCAPAs: "", nivelAutomacaoLab: "",
  desafiosSupplyChain: [], sistemaRastreabilidade: "", nivelSerializacao: "", fornecedoresAtivos: "",
  volumeEventosAdversos: "", sistemaFarmacovigilancia: "", integracaoDados: [], desafiosDados: [],
  doresFarma: [], processosParaAutomatizar: "", expectativasIA: [], restricoesRegulatorias: "",
};

// ===== OPÇÕES =====
const tiposEmpresa = [
  "Laboratório farmacêutico (inovador)",
  "Laboratório farmacêutico (genéricos)",
  "Indústria biofarmacêutica",
  "CDMO (Contract Development & Manufacturing)",
  "CRO (Contract Research Organization)",
  "Distribuidora farmacêutica",
  "Farmácia de manipulação (grande porte)",
  "Empresa de dispositivos médicos",
  "Outro",
];

const regulacoesOpts = [
  "ANVISA (Brasil)", "FDA (EUA)", "EMA (Europa)", "PMDA (Japão)",
  "MHRA (UK)", "TGA (Austrália)", "Health Canada", "ICH Guidelines",
  "WHO PQ (Pré-qualificação)", "Mercosul (harmonização)",
];

const certificacoesOpts = [
  "GMP/BPF", "GLP/BPL", "GCP/BPC", "GDP/BPD",
  "ISO 13485", "ISO 9001", "ISO 14001", "ISO 45001",
  "CBPF (ANVISA)", "FDA cGMP", "EU GMP Annex",
];

const mercadosOpts = [
  "Brasil", "América Latina", "EUA", "Europa",
  "Ásia-Pacífico", "África", "Mercados emergentes",
];

const areasProducaoOpts = [
  "Sólidos orais (comprimidos, cápsulas)",
  "Líquidos e semissólidos",
  "Injetáveis (estéreis)",
  "Biológicos/Biotecnológicos",
  "Vacinas",
  "Fitoterápicos",
  "Dispositivos médicos",
  "Embalagem e rotulagem",
  "Controle de qualidade (laboratório)",
  "P&D / Desenvolvimento analítico",
];

const sistemasQualidadeOpts = [
  "SAP QM", "TrackWise", "Veeva Vault Quality",
  "MasterControl", "EtQ Reliance", "Sparta TrackWise",
  "LIMS (LabWare, STARLIMS)", "Sistema próprio/legado",
  "Documentação em papel", "SharePoint/Excel",
];

const desafiosSupplyChainOpts = [
  "Gestão de cold chain (cadeia fria)",
  "Rastreabilidade ponta a ponta",
  "Previsão de demanda de medicamentos",
  "Gestão de validade e FEFO",
  "Qualificação de fornecedores",
  "Compliance de transporte (GDP)",
  "Gestão de recall",
  "Serialização e agregação",
  "Importação de insumos (ANVISA)",
  "Ruptura de estoque em farmácias",
];

const integracaoDadosOpts = [
  "ERP (SAP, Oracle, TOTVS)",
  "LIMS (sistema de laboratório)",
  "MES (Manufacturing Execution)",
  "Sistema de farmacovigilância",
  "CRM médico/visitação",
  "Portal de registro (ANVISA/FDA)",
  "Sistema de clinical trials",
  "Data warehouse/BI",
  "Sistemas de serialização",
  "EDI com distribuidores",
];

const desafiosDadosOpts = [
  "Dados fragmentados entre sistemas",
  "Integridade de dados (Data Integrity)",
  "Falta de audit trail completo",
  "Documentação em papel sem digitalização",
  "Dificuldade em gerar relatórios regulatórios",
  "Dados de farmacovigilância não estruturados",
  "Validação de sistemas computadorizados (CSV)",
  "Migração de sistemas legados",
];

const doresFarmaOpts = [
  "Desvios de qualidade recorrentes e CAPAs lentas",
  "Tempo excessivo para registro/renovação de produtos",
  "Farmacovigilância manual e reativa",
  "Batch record review demorado",
  "Qualificação e auditoria de fornecedores manual",
  "Gestão de change control complexa",
  "Treinamento e qualificação de pessoal (GMP)",
  "Documentação regulatória volumosa",
  "Validação de processos e limpeza",
  "Gestão de reclamações de mercado",
  "Controle de temperatura em logística",
  "Reconciliação de produção/estoque",
];

const expectativasIAOpts = [
  "Automatizar revisão de batch records",
  "Agente de farmacovigilância (detecção de sinais)",
  "IA para desvios e root cause analysis",
  "Automação de documentação regulatória",
  "Predição de qualidade (PAT/Process Analytics)",
  "Agente de gestão de CAPAs",
  "Otimização de supply chain farmacêutico",
  "Qualificação automática de fornecedores",
  "Chatbot para informações médicas (SAC)",
  "Automação de clinical data management",
  "Agente de compliance e audit readiness",
  "Previsão de demanda de medicamentos",
];

// ===== COMPONENTE =====
interface StepFarmaProps {
  currentSection: number;
  data: FarmaData;
  onDataChange: (partial: Partial<FarmaData>) => void;
}

export default function StepFarma({ currentSection, data, onDataChange }: StepFarmaProps) {
  const toggleArray = (field: keyof FarmaData, value: string) => {
    const current = data[field] as string[];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onDataChange({ [field]: updated });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[#A100FF]/10 border border-[#A100FF]/20 flex items-center justify-center">
          <Pill className="w-5 h-5 text-[#A100FF]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Diagnóstico — Indústria Farmacêutica</h2>
          <p className="text-xs text-muted-foreground">Seção {currentSection + 1} de 5</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Assessment especializado para empresas farmacêuticas. Avaliamos conformidade regulatória, qualidade, farmacovigilância e oportunidades de automação com IA.
      </p>

      {/* SEÇÃO 1: Perfil Regulatório */}
      {currentSection === 0 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Perfil Regulatório e Mercado</h3>
          <div className="space-y-2">
            <Label>Tipo de empresa farmacêutica *</Label>
            <Select value={data.tipoEmpresa} onValueChange={v => onDataChange({ tipoEmpresa: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>{tiposEmpresa.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>Regulações aplicáveis *</Label>
            <div className="grid grid-cols-2 gap-2">
              {regulacoesOpts.map(r => (
                <label key={r} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.regulacoes.includes(r)} onCheckedChange={() => toggleArray("regulacoes", r)} />{r}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Certificações vigentes</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {certificacoesOpts.map(c => (
                <label key={c} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.certificacoes.includes(c)} onCheckedChange={() => toggleArray("certificacoes", c)} />{c}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Mercados de atuação</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mercadosOpts.map(m => (
                <label key={m} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.mercadosAtuacao.includes(m)} onCheckedChange={() => toggleArray("mercadosAtuacao", m)} />{m}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Número de registros ativos (ANVISA/FDA)</Label>
            <Input value={data.numRegistrosAtivos} onChange={e => onDataChange({ numRegistrosAtivos: e.target.value })} placeholder="Ex: 150 registros" className="bg-background" />
          </div>
        </div>
      )}

      {/* SEÇÃO 2: Operações e Qualidade */}
      {currentSection === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Operações e Sistema de Qualidade</h3>
          <div className="space-y-3">
            <Label>Áreas de produção/operação *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {areasProducaoOpts.map(a => (
                <label key={a} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.areasProducao.includes(a)} onCheckedChange={() => toggleArray("areasProducao", a)} />{a}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Sistemas de qualidade em uso</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sistemasQualidadeOpts.map(s => (
                <label key={s} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.sistemasQualidade.includes(s)} onCheckedChange={() => toggleArray("sistemasQualidade", s)} />{s}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Volume de desvios/mês</Label>
              <Select value={data.volumeDesvios} onValueChange={v => onDataChange({ volumeDesvios: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1 a 10</SelectItem>
                  <SelectItem value="11-30">11 a 30</SelectItem>
                  <SelectItem value="31-50">31 a 50</SelectItem>
                  <SelectItem value="50+">Mais de 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tempo médio de fechamento de CAPA</Label>
              <Select value={data.tempoCAPAs} onValueChange={v => onDataChange({ tempoCAPAs: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="menos-30">Menos de 30 dias</SelectItem>
                  <SelectItem value="30-60">30 a 60 dias</SelectItem>
                  <SelectItem value="60-90">60 a 90 dias</SelectItem>
                  <SelectItem value="90+">Mais de 90 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nível de automação laboratorial</Label>
            <Select value={data.nivelAutomacaoLab} onValueChange={v => onDataChange({ nivelAutomacaoLab: v })}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Majoritariamente manual</SelectItem>
                <SelectItem value="parcial">Parcialmente automatizado (LIMS básico)</SelectItem>
                <SelectItem value="avancado">Avançado (LIMS + instrumentos integrados)</SelectItem>
                <SelectItem value="full">Totalmente automatizado (Lab 4.0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* SEÇÃO 3: Supply Chain e Rastreabilidade */}
      {currentSection === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Supply Chain e Rastreabilidade</h3>
          <div className="space-y-3">
            <Label>Principais desafios de supply chain *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {desafiosSupplyChainOpts.map(d => (
                <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.desafiosSupplyChain.includes(d)} onCheckedChange={() => toggleArray("desafiosSupplyChain", d)} />{d}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sistema de rastreabilidade</Label>
              <Select value={data.sistemaRastreabilidade} onValueChange={v => onDataChange({ sistemaRastreabilidade: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhum">Nenhum / Manual</SelectItem>
                  <SelectItem value="basico">Básico (lote/validade)</SelectItem>
                  <SelectItem value="sncm">SNCM (serialização Brasil)</SelectItem>
                  <SelectItem value="completo">Completo (serialização + agregação)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nível de serialização</Label>
              <Select value={data.nivelSerializacao} onValueChange={v => onDataChange({ nivelSerializacao: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao-implementado">Não implementado</SelectItem>
                  <SelectItem value="em-implantacao">Em implantação</SelectItem>
                  <SelectItem value="operacional">Operacional (compliance)</SelectItem>
                  <SelectItem value="avancado">Avançado (analytics sobre dados)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Número de fornecedores ativos qualificados</Label>
            <Input value={data.fornecedoresAtivos} onChange={e => onDataChange({ fornecedoresAtivos: e.target.value })} placeholder="Ex: 80 fornecedores" className="bg-background" />
          </div>
        </div>
      )}

      {/* SEÇÃO 4: Farmacovigilância e Dados */}
      {currentSection === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Farmacovigilância e Gestão de Dados</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Volume de eventos adversos/mês</Label>
              <Select value={data.volumeEventosAdversos} onValueChange={v => onDataChange({ volumeEventosAdversos: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1 a 10</SelectItem>
                  <SelectItem value="11-50">11 a 50</SelectItem>
                  <SelectItem value="51-200">51 a 200</SelectItem>
                  <SelectItem value="200+">Mais de 200</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sistema de farmacovigilância</Label>
              <Select value={data.sistemaFarmacovigilancia} onValueChange={v => onDataChange({ sistemaFarmacovigilancia: v })}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual (planilhas/e-mail)</SelectItem>
                  <SelectItem value="basico">Sistema básico dedicado</SelectItem>
                  <SelectItem value="argus">Oracle Argus / ArisGlobal</SelectItem>
                  <SelectItem value="veeva">Veeva Vault Safety</SelectItem>
                  <SelectItem value="outro">Outro sistema validado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Sistemas integrados (ou que precisam integrar)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {integracaoDadosOpts.map(i => (
                <label key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.integracaoDados.includes(i)} onCheckedChange={() => toggleArray("integracaoDados", i)} />{i}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Desafios de dados e integridade *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {desafiosDadosOpts.map(d => (
                <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.desafiosDados.includes(d)} onCheckedChange={() => toggleArray("desafiosDados", d)} />{d}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 5: Dores e Expectativas com IA */}
      {currentSection === 4 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Dores Operacionais e Expectativas com IA</h3>
          <div className="space-y-3">
            <Label>Principais dores operacionais *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doresFarmaOpts.map(d => (
                <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.doresFarma.includes(d)} onCheckedChange={() => toggleArray("doresFarma", d)} />{d}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Processos que mais consome tempo e gostaria de automatizar</Label>
            <Textarea value={data.processosParaAutomatizar} onChange={e => onDataChange({ processosParaAutomatizar: e.target.value })} placeholder="Descreva os processos mais críticos..." className="bg-background min-h-[80px]" />
          </div>
          <div className="space-y-3">
            <Label>O que espera que a IA faça? *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {expectativasIAOpts.map(e => (
                <label key={e} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.expectativasIA.includes(e)} onCheckedChange={() => toggleArray("expectativasIA", e)} />{e}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Restrições regulatórias para uso de IA</Label>
            <Textarea value={data.restricoesRegulatorias} onChange={e => onDataChange({ restricoesRegulatorias: e.target.value })} placeholder="Ex: Validação de sistemas computadorizados (CSV/CSA), requisitos de audit trail, restrições de cloud..." className="bg-background min-h-[80px]" />
          </div>
        </div>
      )}
    </div>
  );
}
