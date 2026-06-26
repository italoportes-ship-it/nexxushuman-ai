import { useDiagnostico } from "@/contexts/DiagnosticoContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Target } from "lucide-react";

const prioridadesOptions = [
  "Reduzir custos operacionais",
  "Aumentar velocidade de atendimento",
  "Melhorar qualidade e consistência",
  "Escalar operações sem aumentar headcount",
  "Gerar insights de dados para decisão",
  "Automatizar processos repetitivos",
  "Melhorar experiência do cliente",
  "Reduzir erros humanos",
  "Acelerar time-to-market",
  "Compliance e governança automatizada",
  "Personalização em escala",
  "Predição e prevenção de problemas",
];

const kpisOptions = [
  "Tempo de resposta ao cliente",
  "Custo por transação/operação",
  "Taxa de erro/retrabalho",
  "Throughput (volume processado/hora)",
  "Satisfação do cliente (NPS/CSAT)",
  "Tempo de ciclo de processos",
  "Revenue per employee",
  "SLA compliance",
  "Tempo de onboarding",
  "Custo de aquisição de cliente (CAC)",
  "Churn / retenção",
  "Margem operacional",
];

export default function StepObjetivos() {
  const { data, updateObjetivos } = useDiagnostico();

  const toggleArray = (field: "prioridades" | "kpis", value: string) => {
    const current = data.objetivos[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateObjetivos({ [field]: updated });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center">
          <Target className="w-5 h-5 text-amber" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Objetivos Estratégicos</h2>
          <p className="text-xs text-muted-foreground">Metas, KPIs e tolerância a risco</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Definir claramente seus objetivos nos permite priorizar as recomendações
        pelo impacto real nos indicadores que importam para o seu negócio.
      </p>

      <div className="space-y-8">
        {/* Prioridades */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Principais prioridades com IA <span className="text-primary">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">Selecione até 5 prioridades</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prioridadesOptions.map((p) => (
              <label
                key={p}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.objetivos.prioridades.includes(p)
                    ? "border-amber/40 bg-amber/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                } ${
                  data.objetivos.prioridades.length >= 5 && !data.objetivos.prioridades.includes(p)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Checkbox
                  checked={data.objetivos.prioridades.includes(p)}
                  onCheckedChange={() => {
                    if (data.objetivos.prioridades.length >= 5 && !data.objetivos.prioridades.includes(p)) return;
                    toggleArray("prioridades", p);
                  }}
                />
                <span className="text-sm text-foreground/90">{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            KPIs que deseja impactar
          </Label>
          <p className="text-xs text-muted-foreground">Selecione os mais relevantes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {kpisOptions.map((k) => (
              <label
                key={k}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.objetivos.kpis.includes(k)
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <Checkbox
                  checked={data.objetivos.kpis.includes(k)}
                  onCheckedChange={() => toggleArray("kpis", k)}
                />
                <span className="text-sm text-foreground/90">{k}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Prazo */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Prazo esperado para primeiros resultados <span className="text-primary">*</span>
          </Label>
          <Select value={data.objetivos.prazo} onValueChange={(v) => updateObjetivos({ prazo: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione o prazo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-mes">1 mês (quick wins)</SelectItem>
              <SelectItem value="3-meses">3 meses</SelectItem>
              <SelectItem value="6-meses">6 meses</SelectItem>
              <SelectItem value="12-meses">12 meses</SelectItem>
              <SelectItem value="sem-pressa">Sem prazo definido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tolerância a risco */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Tolerância a risco</Label>
          <Select value={data.objetivos.riscoTolerancia} onValueChange={(v) => updateObjetivos({ riscoTolerancia: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservador">Conservador — só soluções comprovadas e de baixo risco</SelectItem>
              <SelectItem value="moderado">Moderado — aceita algum risco com mitigação</SelectItem>
              <SelectItem value="agressivo">Agressivo — aceita riscos maiores por retorno maior</SelectItem>
              <SelectItem value="inovador">Inovador — disposto a ser early adopter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Complexidade aceita */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Complexidade de implementação aceita</Label>
          <Select value={data.objetivos.complexidadeAceita} onValueChange={(v) => updateObjetivos({ complexidadeAceita: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plug-play">Plug & Play — soluções prontas, sem customização</SelectItem>
              <SelectItem value="config-leve">Configuração leve — setup básico e integrações simples</SelectItem>
              <SelectItem value="customizacao">Customização — desenvolvimento sob medida aceitável</SelectItem>
              <SelectItem value="enterprise">Enterprise — projetos complexos com equipe dedicada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
