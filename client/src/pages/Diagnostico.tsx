/* ===== Diagnóstico com formulário específico por setor =====
 * ALTERADO: Quando setor = "Saúde", usa formulário especializado
 * ============================================================ */

import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { DiagnosticoProvider, useDiagnostico } from "@/contexts/DiagnosticoContext";
import StepEmpresa from "@/components/steps/StepEmpresa";
import StepProcessos from "@/components/steps/StepProcessos";
import StepMaturidade from "@/components/steps/StepMaturidade";
import StepObjetivos from "@/components/steps/StepObjetivos";
import StepDores from "@/components/steps/StepDores";
import StepSaude, { initialSaudeData, type SaudeData } from "@/components/steps/StepSaude";
import ProgressSidebar from "@/components/ProgressSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const stepsDefault = [
  { id: 0, title: "Empresa", subtitle: "Perfil e contexto" },
  { id: 1, title: "Processos", subtitle: "Mapeamento operacional" },
  { id: 2, title: "Maturidade", subtitle: "Nível tecnológico" },
  { id: 3, title: "Objetivos", subtitle: "Metas estratégicas" },
  { id: 4, title: "Dores", subtitle: "Oportunidades" },
];

const stepsSaude = [
  { id: 0, title: "Empresa", subtitle: "Perfil e contexto" },
  { id: 1, title: "Sobre Você", subtitle: "Dados profissionais" },
  { id: 2, title: "Serviços", subtitle: "Atendimento e demandas" },
  { id: 3, title: "Processos", subtitle: "Dores operacionais" },
  { id: 4, title: "IA", subtitle: "Expectativas e regras" },
];

function DiagnosticoContent() {
  const { currentStep, setCurrentStep, isStepComplete, data } = useDiagnostico();
  const [, navigate] = useLocation();
  const [saudeData, setSaudeData] = useState<SaudeData>(initialSaudeData);
  const [saudeSection, setSaudeSection] = useState(0);

  // Detectar se o setor é Saúde
  const isSaude = data.empresa.setor === "Saúde";
  const steps = isSaude ? stepsSaude : stepsDefault;

  const canAdvance = isSaude
    ? (currentStep === 0 ? isStepComplete(0) : true) // Step 1 obrigatório, demais opcionais
    : isStepComplete(currentStep);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      if (isSaude && currentStep >= 1) {
        setSaudeSection(currentStep); // Sincronizar seção do formulário saúde
      }
    } else {
      // Salvar dados e navegar para resultado
      if (isSaude) {
        // Para Saúde, salvar dados combinados
        const combinedData = {
          ...data,
          saudeSpecific: saudeData,
          processos: {
            ...data.processos,
            areas: ["Atendimento ao Cliente / Suporte", "RH / Gestão de Pessoas"],
            horasManual: saudeData.tempoAdministrativo === "3h+" ? "mais-100" : saudeData.tempoAdministrativo === "2-3h" ? "60-100" : "30-60",
            gargalos: saudeData.doresOperacionais.map(d => {
              if (d.includes("mensagens")) return "Atendimento a clientes repetitivo";
              if (d.includes("Agendamento")) return "Aprovações em cadeia demoradas";
              if (d.includes("Cobranças")) return "Conciliação de dados entre sistemas";
              if (d.includes("Triagem")) return "Classificação e triagem de documentos";
              return "Entrada manual de dados repetitiva";
            }),
          },
          maturidade: {
            ...data.maturidade,
            nivelDigital: "basico",
            experienciaIA: "nenhuma",
            urgencia: "urgente",
          },
          objetivos: {
            ...data.objetivos,
            prioridades: saudeData.expectativasIA.length > 0
              ? ["Redução de custos operacionais", "Personalização em escala"]
              : ["Redução de custos operacionais"],
            prazo: "3-meses",
          },
          dores: {
            ...data.dores,
            maioresDores: ["Processos manuais consumindo tempo excessivo", "Dificuldade em escalar operações"],
            processosCriticos: saudeData.expectativasIA.includes("Agendar/remarcar sessões")
              ? ["Atendimento e suporte (L1/L2)", "Onboarding de clientes"]
              : ["Atendimento e suporte (L1/L2)"],
          },
        };
        localStorage.setItem("diagnostico-data", JSON.stringify(combinedData));
      } else {
        localStorage.setItem("diagnostico-data", JSON.stringify(data));
      }
      navigate("/resultado");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaudeDataChange = (partial: Partial<SaudeData>) => {
    setSaudeData((prev) => ({ ...prev, ...partial }));
  };

  // Componentes dos steps
  const renderStep = () => {
    if (isSaude && currentStep > 0) {
      return (
        <StepSaude
          currentSection={currentStep - 1}
          onSectionChange={setSaudeSection}
          saudeData={saudeData}
          onDataChange={handleSaudeDataChange}
        />
      );
    }

    const defaultSteps = [
      <StepEmpresa key="empresa" />,
      <StepProcessos key="processos" />,
      <StepMaturidade key="maturidade" />,
      <StepObjetivos key="objetivos" />,
      <StepDores key="dores" />,
    ];
    return defaultSteps[currentStep];
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar de Progresso - Desktop */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-border/40 bg-sidebar">
        <ProgressSidebar steps={steps} currentStep={currentStep} isStepComplete={isStepComplete} />
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Mobile com barra de progresso */}
        <header className="lg:hidden px-4 py-4 border-b border-border/40 bg-background">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#A100FF] text-xl font-black">&gt;</span>
              <span className="font-bold text-sm">NexxusHuman-AI</span>
            </Link>
            <span className="text-xs font-semibold text-[#A100FF]">
              Etapa {currentStep + 1} de 5
            </span>
          </div>
          <div className="flex gap-1">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < currentStep ? "bg-[#A100FF]" : i === currentStep ? "bg-[#A100FF] animate-pulse" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-white/40">{steps[currentStep]?.title}</span>
            <span className="text-[10px] text-white/40">{steps[currentStep]?.subtitle}</span>
          </div>
          {/* Badge setor Saúde */}
          {isSaude && currentStep > 0 && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#A100FF]/10 border border-[#A100FF]/20 rounded text-[10px] text-[#A100FF] font-medium">
              ♥ Formulário especializado — Saúde
            </div>
          )}
        </header>

        {/* Área do Formulário */}
        <main className="flex-1 px-6 lg:px-12 py-8 lg:py-12 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${isSaude}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer com navegação - FIXO */}
        <footer className="sticky bottom-0 px-6 lg:px-12 py-5 border-t border-border/40 bg-background/95 backdrop-blur-sm z-20">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="font-medium gap-2 transition-all duration-200 active:scale-[0.97]"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canAdvance}
              className="font-semibold gap-2 transition-all duration-200 active:scale-[0.97] bg-[#A100FF] text-white hover:bg-[#8800DD]"
            >
              {currentStep === 4 ? (
                <>
                  Gerar Diagnóstico
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Diagnostico() {
  return (
    <DiagnosticoProvider>
      <DiagnosticoContent />
    </DiagnosticoProvider>
  );
}
