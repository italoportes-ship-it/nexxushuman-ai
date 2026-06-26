import { useDiagnostico } from "@/contexts/DiagnosticoContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

const doresOptions = [
  "Equipe sobrecarregada com tarefas operacionais",
  "Perda de clientes por lentidão no atendimento",
  "Erros recorrentes em processos manuais",
  "Dificuldade em escalar sem contratar mais",
  "Falta de visibilidade sobre performance",
  "Decisões baseadas em intuição, não dados",
  "Retrabalho constante entre departamentos",
  "Compliance e auditoria consumindo muito tempo",
  "Informações espalhadas em múltiplos sistemas",
  "Dificuldade em treinar novos colaboradores",
  "Processos que dependem de pessoas-chave",
  "Incapacidade de atender demanda crescente",
];

const processosCriticosOptions = [
  "Onboarding de clientes",
  "Processamento de pedidos/ordens",
  "Atendimento e suporte (L1/L2)",
  "Geração e qualificação de leads",
  "Faturamento e cobrança",
  "Gestão de contratos",
  "Recrutamento e seleção",
  "Análise de crédito/risco",
  "Planejamento de demanda",
  "Gestão de estoque",
  "Relatórios gerenciais",
  "Aprovações e workflows internos",
];

const errosOptions = [
  "Dados incorretos em cadastros/registros",
  "Atrasos em prazos e entregas",
  "Comunicação perdida com clientes",
  "Duplicação de esforços entre equipes",
  "Falhas em cálculos/precificação",
  "Documentos com informações desatualizadas",
  "Perda de oportunidades por falta de follow-up",
  "Inconsistência entre canais de atendimento",
  "Falhas em processos de aprovação",
  "Erros de classificação/categorização",
];

export default function StepDores() {
  const { data, updateDores } = useDiagnostico();

  const toggleArray = (field: "maioresDores" | "processosCriticos" | "errosFrequentes", value: string) => {
    const current = data.dores[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateDores({ [field]: updated });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Dores e Oportunidades</h2>
          <p className="text-xs text-muted-foreground">Pontos críticos e processos-chave</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Identificar as dores mais agudas nos permite recomendar automações que geram
        impacto imediato e visível na operação.
      </p>

      <div className="space-y-8">
        {/* Maiores dores */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Maiores dores operacionais <span className="text-primary">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">Selecione as que mais impactam seu dia a dia</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {doresOptions.map((d) => (
              <label
                key={d}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.dores.maioresDores.includes(d)
                    ? "border-destructive/40 bg-destructive/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.dores.maioresDores.includes(d)}
                  onCheckedChange={() => toggleArray("maioresDores", d)}
                />
                <span className="text-sm text-foreground/90">{d}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Processos críticos */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Processos mais críticos para automatizar
          </Label>
          <p className="text-xs text-muted-foreground">Quais processos teriam maior impacto se automatizados?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {processosCriticosOptions.map((p) => (
              <label
                key={p}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.dores.processosCriticos.includes(p)
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.dores.processosCriticos.includes(p)}
                  onCheckedChange={() => toggleArray("processosCriticos", p)}
                />
                <span className="text-sm text-foreground/90">{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Erros frequentes */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Erros e falhas mais frequentes
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {errosOptions.map((e) => (
              <label
                key={e}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.dores.errosFrequentes.includes(e)
                    ? "border-amber/40 bg-amber/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.dores.errosFrequentes.includes(e)}
                  onCheckedChange={() => toggleArray("errosFrequentes", e)}
                />
                <span className="text-sm text-foreground/90">{e}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tempo de decisão */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Tempo médio para tomar decisões operacionais</Label>
          <Select value={data.dores.tempoDecisao} onValueChange={(v) => updateDores({ tempoDecisao: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minutos">Minutos (decisões em tempo real)</SelectItem>
              <SelectItem value="horas">Horas (mesmo dia)</SelectItem>
              <SelectItem value="dias">Dias (precisa coletar informações)</SelectItem>
              <SelectItem value="semanas">Semanas (depende de múltiplas aprovações)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Satisfação do cliente */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Nível atual de satisfação dos clientes</Label>
          <Select value={data.dores.satisfacaoCliente} onValueChange={(v) => updateDores({ satisfacaoCliente: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excelente">Excelente (NPS 70+)</SelectItem>
              <SelectItem value="bom">Bom (NPS 50-70)</SelectItem>
              <SelectItem value="regular">Regular (NPS 30-50)</SelectItem>
              <SelectItem value="baixo">Baixo (NPS abaixo de 30)</SelectItem>
              <SelectItem value="nao-mede">Não medimos formalmente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
