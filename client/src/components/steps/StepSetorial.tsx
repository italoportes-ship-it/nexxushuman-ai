/* ===== Formulários Setoriais — Financeiro, Varejo, Indústria =====
 * Perguntas adaptadas por setor para diagnóstico mais preciso
 * ============================================================== */

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, ShoppingCart, Factory } from "lucide-react";

// ===== TIPOS =====
export interface SetorialData {
  // Financeiro
  tipoInstituicao: string;
  regulacoes: string[];
  processosCore: string[];
  volumeTransacoes: string;
  sistemasLegados: string[];
  // Varejo
  canaisVenda: string[];
  numLojas: string;
  ticketMedio: string;
  desafiosVarejo: string[];
  plataformaEcommerce: string;
  // Indústria
  tipoProducao: string;
  numFuncionariosChao: string;
  sistemasIndustriais: string[];
  desafiosIndustria: string[];
  nivelAutomacao: string;
  // Comum
  doresSetoriais: string[];
  oQueAutomatizar: string;
  expectativasIA: string[];
}

export const initialSetorialData: SetorialData = {
  tipoInstituicao: "", regulacoes: [], processosCore: [], volumeTransacoes: "", sistemasLegados: [],
  canaisVenda: [], numLojas: "", ticketMedio: "", desafiosVarejo: [], plataformaEcommerce: "",
  tipoProducao: "", numFuncionariosChao: "", sistemasIndustriais: [], desafiosIndustria: [], nivelAutomacao: "",
  doresSetoriais: [], oQueAutomatizar: "", expectativasIA: [],
};

// ===== OPÇÕES POR SETOR =====
const financeiroOpts = {
  tipos: ["Banco comercial", "Banco digital", "Fintech", "Corretora", "Seguradora", "Gestora de ativos", "Cooperativa de crédito", "Outro"],
  regulacoes: ["Bacen", "CVM", "SUSEP", "LGPD", "SOX", "Basel III", "PCI-DSS", "Open Finance"],
  processos: ["KYC / Onboarding", "Análise de crédito", "Prevenção a fraude", "Compliance/AML", "Atendimento ao cliente", "Cobrança", "Conciliação", "Backoffice operacional", "Gestão de investimentos"],
  sistemas: ["Core Banking", "CRM (Salesforce/Dynamics)", "SAP", "Sistemas legados mainframe", "APIs Open Finance", "Plataformas de pagamento"],
  dores: ["Processos de compliance manuais", "Onboarding lento de clientes", "Detecção de fraude reativa", "Atendimento repetitivo em escala", "Conciliação manual entre sistemas", "Relatórios regulatórios demorados"],
};

const varejoOpts = {
  canais: ["Loja física", "E-commerce próprio", "Marketplace (Mercado Livre, Amazon)", "WhatsApp Commerce", "Redes sociais", "Televendas"],
  desafios: ["Gestão de estoque multi-canal", "Precificação dinâmica", "Atendimento pós-venda", "Logística de última milha", "Personalização de ofertas", "Previsão de demanda", "Gestão de devoluções", "Fidelização de clientes"],
  plataformas: ["Shopify", "VTEX", "Magento", "WooCommerce", "Nuvemshop", "Tray", "Própria", "Nenhuma"],
  dores: ["Ruptura de estoque frequente", "Precificação manual/estática", "Alto custo de atendimento", "Baixa taxa de conversão", "Dificuldade em personalizar", "Logística ineficiente"],
};

const industriaOpts = {
  tipos: ["Produção em série", "Produção sob encomenda", "Processo contínuo", "Montagem", "Misto"],
  sistemas: ["ERP (SAP, TOTVS)", "MES (Manufacturing Execution)", "SCADA", "PLC/CLP", "IoT/Sensores", "WMS (Warehouse)", "CAD/CAM", "Manutenção (CMMS)"],
  desafios: ["Paradas não planejadas", "Qualidade inconsistente", "Planejamento de produção ineficiente", "Gestão de manutenção reativa", "Desperdício de matéria-prima", "Rastreabilidade limitada", "Segurança do trabalho", "Eficiência energética"],
  dores: ["Manutenção corretiva cara", "Planejamento baseado em planilhas", "Falta de visibilidade em tempo real", "Qualidade detectada tarde demais", "Estoque de peças desbalanceado", "Treinamento de operadores lento"],
};

const expectativasComuns = {
  financeiro: ["Automatizar KYC/onboarding", "Detectar fraudes em tempo real", "Atendimento 24/7 inteligente", "Gerar relatórios regulatórios", "Análise de crédito automatizada", "Cobrança inteligente"],
  varejo: ["Precificação dinâmica automática", "Atendimento pós-venda automatizado", "Previsão de demanda", "Personalização de ofertas", "Gestão de estoque inteligente", "Qualificação de leads"],
  industria: ["Manutenção preditiva", "Controle de qualidade automático", "Planejamento de produção otimizado", "Monitoramento em tempo real", "Gestão de energia inteligente", "Rastreabilidade completa"],
};

// ===== COMPONENTE PRINCIPAL =====
interface StepSetorialProps {
  setor: string; // "Serviços Financeiros" | "Varejo / E-commerce" | "Indústria / Manufatura"
  currentSection: number;
  data: SetorialData;
  onDataChange: (partial: Partial<SetorialData>) => void;
}

export default function StepSetorial({ setor, currentSection, data, onDataChange }: StepSetorialProps) {
  const toggleArray = (field: keyof SetorialData, value: string) => {
    const current = data[field] as string[];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onDataChange({ [field]: updated });
  };

  const isFinanceiro = setor.includes("Financ");
  const isVarejo = setor.includes("Varejo");
  const isIndustria = setor.includes("Indústria") || setor.includes("Manufatura");

  const Icon = isFinanceiro ? Building2 : isVarejo ? ShoppingCart : Factory;
  const sectorLabel = isFinanceiro ? "Serviços Financeiros" : isVarejo ? "Varejo" : "Indústria";

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[#A100FF]/10 border border-[#A100FF]/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#A100FF]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Diagnóstico — {sectorLabel}</h2>
          <p className="text-xs text-muted-foreground">Seção {currentSection + 1} de 4</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Formulário especializado para {sectorLabel.toLowerCase()}. Respostas geram recomendações de IA personalizadas.
      </p>

      {/* SEÇÃO 1: Perfil do negócio */}
      {currentSection === 0 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Perfil do Negócio</h3>

          {isFinanceiro && (
            <>
              <div className="space-y-2">
                <Label>Tipo de instituição *</Label>
                <Select value={data.tipoInstituicao} onValueChange={v => onDataChange({ tipoInstituicao: v })}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{financeiroOpts.tipos.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Regulações aplicáveis</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {financeiroOpts.regulacoes.map(r => (
                    <label key={r} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.regulacoes.includes(r)} onCheckedChange={() => toggleArray("regulacoes", r)} />{r}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Volume de transações/mês</Label>
                <Select value={data.volumeTransacoes} onValueChange={v => onDataChange({ volumeTransacoes: v })}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate-10k">Até 10 mil</SelectItem>
                    <SelectItem value="10k-100k">10 mil a 100 mil</SelectItem>
                    <SelectItem value="100k-1m">100 mil a 1 milhão</SelectItem>
                    <SelectItem value="1m+">Mais de 1 milhão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {isVarejo && (
            <>
              <div className="space-y-3">
                <Label>Canais de venda ativos *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {varejoOpts.canais.map(c => (
                    <label key={c} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.canaisVenda.includes(c)} onCheckedChange={() => toggleArray("canaisVenda", c)} />{c}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número de lojas/pontos</Label>
                  <Input value={data.numLojas} onChange={e => onDataChange({ numLojas: e.target.value })} placeholder="Ex: 25" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>Ticket médio</Label>
                  <Input value={data.ticketMedio} onChange={e => onDataChange({ ticketMedio: e.target.value })} placeholder="Ex: R$ 180" className="bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Plataforma de e-commerce</Label>
                <Select value={data.plataformaEcommerce} onValueChange={v => onDataChange({ plataformaEcommerce: v })}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{varejoOpts.plataformas.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </>
          )}

          {isIndustria && (
            <>
              <div className="space-y-2">
                <Label>Tipo de produção *</Label>
                <Select value={data.tipoProducao} onValueChange={v => onDataChange({ tipoProducao: v })}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{industriaOpts.tipos.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Funcionários no chão de fábrica</Label>
                <Input value={data.numFuncionariosChao} onChange={e => onDataChange({ numFuncionariosChao: e.target.value })} placeholder="Ex: 200" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Nível de automação atual</Label>
                <Select value={data.nivelAutomacao} onValueChange={v => onDataChange({ nivelAutomacao: v })}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Majoritariamente manual</SelectItem>
                    <SelectItem value="semi">Semi-automatizado</SelectItem>
                    <SelectItem value="automatizado">Altamente automatizado</SelectItem>
                    <SelectItem value="industria4">Indústria 4.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      )}

      {/* SEÇÃO 2: Sistemas e processos */}
      {currentSection === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Sistemas e Processos</h3>

          {isFinanceiro && (
            <>
              <div className="space-y-3">
                <Label>Processos core do negócio</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {financeiroOpts.processos.map(p => (
                    <label key={p} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.processosCore.includes(p)} onCheckedChange={() => toggleArray("processosCore", p)} />{p}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Sistemas utilizados</Label>
                <div className="grid grid-cols-2 gap-2">
                  {financeiroOpts.sistemas.map(s => (
                    <label key={s} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.sistemasLegados.includes(s)} onCheckedChange={() => toggleArray("sistemasLegados", s)} />{s}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {isVarejo && (
            <div className="space-y-3">
              <Label>Principais desafios operacionais</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {varejoOpts.desafios.map(d => (
                  <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                    <Checkbox checked={data.desafiosVarejo.includes(d)} onCheckedChange={() => toggleArray("desafiosVarejo", d)} />{d}
                  </label>
                ))}
              </div>
            </div>
          )}

          {isIndustria && (
            <>
              <div className="space-y-3">
                <Label>Sistemas industriais em uso</Label>
                <div className="grid grid-cols-2 gap-2">
                  {industriaOpts.sistemas.map(s => (
                    <label key={s} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.sistemasIndustriais.includes(s)} onCheckedChange={() => toggleArray("sistemasIndustriais", s)} />{s}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Desafios operacionais</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {industriaOpts.desafios.map(d => (
                    <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                      <Checkbox checked={data.desafiosIndustria.includes(d)} onCheckedChange={() => toggleArray("desafiosIndustria", d)} />{d}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* SEÇÃO 3: Dores */}
      {currentSection === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Dores e Oportunidades</h3>
          <div className="space-y-3">
            <Label>Principais dores operacionais *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isFinanceiro ? financeiroOpts.dores : isVarejo ? varejoOpts.dores : industriaOpts.dores).map(d => (
                <label key={d} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.doresSetoriais.includes(d)} onCheckedChange={() => toggleArray("doresSetoriais", d)} />{d}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>O que mais gostaria de automatizar?</Label>
            <Textarea value={data.oQueAutomatizar} onChange={e => onDataChange({ oQueAutomatizar: e.target.value })} placeholder="Descreva os processos que mais consomem tempo..." className="bg-background min-h-[100px]" />
          </div>
        </div>
      )}

      {/* SEÇÃO 4: Expectativas com IA */}
      {currentSection === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Expectativas com IA</h3>
          <div className="space-y-3">
            <Label>O que espera que a IA faça? *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isFinanceiro ? expectativasComuns.financeiro : isVarejo ? expectativasComuns.varejo : expectativasComuns.industria).map(e => (
                <label key={e} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 hover:border-[#A100FF]/30 cursor-pointer transition-colors text-sm">
                  <Checkbox checked={data.expectativasIA.includes(e)} onCheckedChange={() => toggleArray("expectativasIA", e)} />{e}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
