import { useDiagnostico } from "@/contexts/DiagnosticoContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Cpu } from "lucide-react";

export default function StepMaturidade() {
  const { data, updateMaturidade } = useDiagnostico();

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Maturidade Tecnológica</h2>
          <p className="text-xs text-muted-foreground">Infraestrutura e capacidade técnica</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Avaliamos sua prontidão tecnológica para calibrar recomendações que sejam
        realistas e implementáveis no seu contexto atual.
      </p>

      <div className="space-y-8">
        {/* Nível de digitalização */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Nível de digitalização atual <span className="text-primary">*</span>
          </Label>
          <RadioGroup
            value={data.maturidade.nivelDigital}
            onValueChange={(v) => updateMaturidade({ nivelDigital: v })}
            className="space-y-2.5"
          >
            {[
              { value: "inicial", label: "Inicial", desc: "Processos majoritariamente manuais, poucos sistemas digitais" },
              { value: "basico", label: "Básico", desc: "Sistemas básicos (e-mail, planilhas), pouca integração" },
              { value: "intermediario", label: "Intermediário", desc: "ERP/CRM implementados, alguns processos automatizados" },
              { value: "avancado", label: "Avançado", desc: "Sistemas integrados, dados centralizados, automações pontuais" },
              { value: "lider", label: "Líder Digital", desc: "Ecossistema digital maduro, cultura data-driven, APIs abertas" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.maturidade.nivelDigital === opt.value
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <RadioGroupItem value={opt.value} className="mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Experiência com IA */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Experiência prévia com IA <span className="text-primary">*</span>
          </Label>
          <RadioGroup
            value={data.maturidade.experienciaIA}
            onValueChange={(v) => updateMaturidade({ experienciaIA: v })}
            className="space-y-2.5"
          >
            {[
              { value: "nenhuma", label: "Nenhuma", desc: "Nunca utilizamos IA em nenhum processo" },
              { value: "exploratoria", label: "Exploratória", desc: "Testes pontuais com ChatGPT ou ferramentas similares" },
              { value: "piloto", label: "Piloto", desc: "Um ou dois projetos de IA em andamento/concluídos" },
              { value: "implementada", label: "Implementada", desc: "IA em produção em pelo menos uma área" },
              { value: "escalada", label: "Escalada", desc: "IA integrada em múltiplos processos core do negócio" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                  data.maturidade.experienciaIA === opt.value
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-input/30 hover:border-border"
                }`}
              >
                <RadioGroupItem value={opt.value} className="mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Infraestrutura */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Infraestrutura de dados</Label>
          <Select value={data.maturidade.infraestrutura} onValueChange={(v) => updateMaturidade({ infraestrutura: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Servidores locais / on-premise</SelectItem>
              <SelectItem value="cloud-basica">Cloud básica (armazenamento e e-mail)</SelectItem>
              <SelectItem value="cloud-avancada">Cloud avançada (AWS/Azure/GCP com serviços)</SelectItem>
              <SelectItem value="hibrida">Híbrida (local + cloud)</SelectItem>
              <SelectItem value="cloud-native">Cloud-native (infraestrutura 100% cloud)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Equipe técnica */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Equipe técnica interna</Label>
          <Select value={data.maturidade.equipetech} onValueChange={(v) => updateMaturidade({ equipetech: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhuma">Sem equipe técnica dedicada</SelectItem>
              <SelectItem value="ti-basica">TI básica (suporte e manutenção)</SelectItem>
              <SelectItem value="dev-pequena">Equipe de desenvolvimento pequena (1-5)</SelectItem>
              <SelectItem value="dev-media">Equipe de desenvolvimento média (6-20)</SelectItem>
              <SelectItem value="dev-grande">Equipe robusta com especialistas em dados/IA (20+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orçamento para IA */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Orçamento disponível para IA</Label>
          <Select value={data.maturidade.orcamentoIA} onValueChange={(v) => updateMaturidade({ orcamentoIA: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione a faixa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indefinido">Ainda não definido</SelectItem>
              <SelectItem value="ate-10k">Até R$ 10.000/mês</SelectItem>
              <SelectItem value="10k-50k">R$ 10.000 – R$ 50.000/mês</SelectItem>
              <SelectItem value="50k-200k">R$ 50.000 – R$ 200.000/mês</SelectItem>
              <SelectItem value="acima-200k">Acima de R$ 200.000/mês</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Urgência */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Urgência da implementação</Label>
          <Select value={data.maturidade.urgencia} onValueChange={(v) => updateMaturidade({ urgencia: v })}>
            <SelectTrigger className="bg-input border-border/60 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exploratoria">Exploratória (sem prazo definido)</SelectItem>
              <SelectItem value="planejada">Planejada (próximos 6-12 meses)</SelectItem>
              <SelectItem value="prioritaria">Prioritária (próximos 3-6 meses)</SelectItem>
              <SelectItem value="urgente">Urgente (próximos 1-3 meses)</SelectItem>
              <SelectItem value="imediata">Imediata (já deveria ter começado)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
