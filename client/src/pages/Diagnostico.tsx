import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { DiagnosticoProvider, useDiagnostico } from "@/contexts/DiagnosticoContext";
import StepEmpresa from "@/components/steps/StepEmpresa";
import StepProcessos from "@/components/steps/StepProcessos";
import StepMaturidade from "@/components/steps/StepMaturidade";
import StepObjetivos from "@/components/steps/StepObjetivos";
import StepDores from "@/components/steps/StepDores";
import ProgressSidebar from "@/components/ProgressSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  { id: 0, title: "Empresa", subtitle: "Perfil e contexto" },
  { id: 1, title: "Processos", subtitle: "Mapeamento operacional" },
  { id: 2, title: "Maturidade", subtitle: "Nível tecnológico" },
  { id: 3, title: "Objetivos", subtitle: "Metas estratégicas" },
  { id: 4, title: "Dores", subtitle: "Oportunidades" },
];

function DiagnosticoContent() {
  const { currentStep, setCurrentStep, isStepComplete, data } = useDiagnostico();
  const [, navigate] = useLocation();

  const canAdvance = isStepComplete(currentStep);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar dados no localStorage e navegar para resultado
      localStorage.setItem("diagnostico-data", JSON.stringify(data));
      navigate("/resultado");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepComponents = [
    <StepEmpresa key="empresa" />,
    <StepProcessos key="processos" />,
    <StepMaturidade key="maturidade" />,
    <StepObjetivos key="objetivos" />,
    <StepDores key="dores" />,
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar de Progresso - Desktop */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-border/40 bg-sidebar">
        <ProgressSidebar steps={steps} currentStep={currentStep} isStepComplete={isStepComplete} />
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Mobile */}
        <header className="lg:hidden px-4 py-4 border-b border-border/40 bg-sidebar">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#A100FF] text-xl font-black">&gt;</span>
              <span className="font-bold text-sm">NexxusHuman-AI</span>
            </Link>
            <span className="font-mono text-xs text-muted-foreground">
              {currentStep + 1}/5
            </span>
          </div>
          {/* Progress bar mobile */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </header>

        {/* Área do Formulário */}
        <main className="flex-1 px-6 lg:px-12 py-8 lg:py-12 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {stepComponents[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer com navegação - FIXO no rodapé */}
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
              className={`font-semibold gap-2 transition-all duration-200 active:scale-[0.97] ${
                currentStep === 4
                  ? "bg-[#A100FF] text-white hover:bg-[#8800DD]"
                  : "bg-[#A100FF] text-white hover:bg-[#8800DD]"
              }`}
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
