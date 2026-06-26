import { useDiagnostico } from "@/contexts/DiagnosticoContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Workflow } from "lucide-react";

const areasOptions = [
  "Atendimento ao Cliente / Suporte",
  "Vendas e Prospecção",
  "Marketing e Comunicação",
  "Financeiro / Contabilidade",
  "RH / Gestão de Pessoas",
  "Operações / Produção",
  "Logística / Supply Chain",
  "TI / Desenvolvimento",
  "Jurídico / Compliance",
  "Compras / Procurement",
  "Qualidade / QA",
  "P&D / Inovação",
];

const ferramentasOptions = [
  "ERP (SAP, TOTVS, Oracle)",
  "CRM (Salesforce, HubSpot, Pipedrive)",
  "Planilhas (Excel, Google Sheets)",
  "E-mail / Outlook / Gmail",
  "WhatsApp / Mensageiros",
  "Sistemas legados / internos",
  "Ferramentas de projeto (Jira, Trello)",
  "BI (Power BI, Tableau, Looker)",
  "RPA existente (UiPath, Automation Anywhere)",
  "Plataformas no-code / low-code",
  "APIs e integrações customizadas",
  "Documentos físicos / papel",
];

const gargalosOptions = [
  "Entrada manual de dados repetitiva",
  "Aprovações em cadeia demoradas",
  "Comunicação entre departamentos",
  "Busca e consolidação de informações",
  "Geração de relatórios manuais",
  "Atendimento a clientes repetitivo",
  "Conciliação de dados entre sistemas",
  "Agendamento e coordenação",
  "Classificação e triagem de documentos",
  "Monitoramento e alertas manuais",
  "Treinamento e onboarding",
  "Controle de qualidade manual",
];

export default function StepProcessos() {
  const { data, updateProcessos } = useDiagnostico();

  const toggleArray = (field: "areas" | "ferramentas" | "gargalos", value: string) => {
    const current = data.processos[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateProcessos({ [field]: updated });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Workflow className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Mapeamento de Processos</h2>
          <p className="text-xs text-muted-foreground">Áreas, ferramentas e gargalos</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Identifique as áreas com maior volume de trabalho repetitivo e as ferramentas
        que compõem seu ecossistema operacional atual.
      </p>

      <div className="space-y-8">
        {/* Áreas com processos repetitivos */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Áreas com processos repetitivos <span className="text-primary">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">Selecione todas que se aplicam</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {areasOptions.map((area) => (
              <label
                key={area}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.processos.areas.includes(area)
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.processos.areas.includes(area)}
                  onCheckedChange={() => toggleArray("areas", area)}
                />
                <span className="text-sm text-foreground/90">{area}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ferramentas */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Ferramentas e sistemas utilizados
          </Label>
          <p className="text-xs text-muted-foreground">Selecione todas que se aplicam</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ferramentasOptions.map((tool) => (
              <label
                key={tool}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.processos.ferramentas.includes(tool)
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.processos.ferramentas.includes(tool)}
                  onCheckedChange={() => toggleArray("ferramentas", tool)}
                />
                <span className="text-sm text-foreground/90">{tool}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Horas em tarefas manuais */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Horas semanais gastas em tarefas manuais/repetitivas <span className="text-primary">*</span>
          </Label>
          <Select value={data.processos.horasManual} onValueChange={(v) => updateProcessos({ horasManual: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Estimativa de horas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menos-10">Menos de 10 horas/semana</SelectItem>
              <SelectItem value="10-30">10 a 30 horas/semana</SelectItem>
              <SelectItem value="30-60">30 a 60 horas/semana</SelectItem>
              <SelectItem value="60-100">60 a 100 horas/semana</SelectItem>
              <SelectItem value="mais-100">Mais de 100 horas/semana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Volume de dados */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Volume de dados processados</Label>
          <Select value={data.processos.volumeDados} onValueChange={(v) => updateProcessos({ volumeDados: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione o volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixo">Baixo (dezenas de registros/dia)</SelectItem>
              <SelectItem value="medio">Médio (centenas de registros/dia)</SelectItem>
              <SelectItem value="alto">Alto (milhares de registros/dia)</SelectItem>
              <SelectItem value="muito-alto">Muito alto (dezenas de milhares+/dia)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gargalos */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Principais gargalos identificados
          </Label>
          <p className="text-xs text-muted-foreground">Selecione os mais relevantes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {gargalosOptions.map((g) => (
              <label
                key={g}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.processos.gargalos.includes(g)
                    ? "border-amber/40 bg-amber/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.processos.gargalos.includes(g)}
                  onCheckedChange={() => toggleArray("gargalos", g)}
                />
                <span className="text-sm text-foreground/90">{g}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
