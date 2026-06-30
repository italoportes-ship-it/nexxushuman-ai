/* ===== Step 1: Perfil da Empresa ===== */
import { useDiagnostico } from "@/contexts/DiagnosticoContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const setores = [
  "Tecnologia / SaaS", "Serviços Financeiros", "Varejo / E-commerce",
  "Indústria / Manufatura", "Indústria Farmacêutica", "Saúde", "Educação",
  "Logística / Transporte", "Seguros", "Telecomunicações", "Agronegócio",
  "Energia", "Construção Civil", "Consultoria / Serviços Profissionais", "Outro",
];

const portes = [
  "Microempresa (até 9 funcionários)",
  "Pequena (10-49 funcionários)",
  "Média (50-249 funcionários)",
  "Grande (250-999 funcionários)",
  "Corporação (1000+ funcionários)",
];

export default function StepEmpresa() {
  const { data, updateEmpresa } = useDiagnostico();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Perfil da Empresa</h2>
        <p className="text-muted-foreground text-sm">
          Informações básicas sobre sua organização para contextualizar o diagnóstico.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome da Empresa *</Label>
          <Input
            id="nome"
            value={data.empresa.nome}
            onChange={(e) => updateEmpresa({ nome: e.target.value })}
            placeholder="Ex: Acme Corp"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label>Setor de Atuação *</Label>
          <Select value={data.empresa.setor} onValueChange={(v) => updateEmpresa({ setor: v })}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              {setores.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Porte da Empresa *</Label>
          <Select value={data.empresa.porte} onValueChange={(v) => updateEmpresa({ porte: v })}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Selecione o porte" />
            </SelectTrigger>
            <SelectContent>
              {portes.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="funcionarios">Nº de Funcionários</Label>
            <Input
              id="funcionarios"
              value={data.empresa.funcionarios}
              onChange={(e) => updateEmpresa({ funcionarios: e.target.value })}
              placeholder="Ex: 150"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="faturamento">Faturamento Anual</Label>
            <Input
              id="faturamento"
              value={data.empresa.faturamento}
              onChange={(e) => updateEmpresa({ faturamento: e.target.value })}
              placeholder="Ex: R$ 50M"
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tempo">Tempo de Mercado</Label>
          <Input
            id="tempo"
            value={data.empresa.tempoMercado}
            onChange={(e) => updateEmpresa({ tempoMercado: e.target.value })}
            placeholder="Ex: 12 anos"
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}
