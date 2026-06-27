/* ===== Contexto do Diagnóstico =====
 * ALTERADO: 
 * - Apenas step 1 é obrigatório (nome + setor + porte)
 * - Steps 2-5 podem ser pulados (sempre retornam true)
 * - Progresso salvo automaticamente no localStorage a cada mudança
 * - Ao abrir, restaura progresso parcial salvo
 * ===================================== */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface EmpresaInfo {
  nome: string;
  setor: string;
  porte: string;
  funcionarios: string;
  faturamento: string;
  tempoMercado: string;
}

export interface ProcessoInfo {
  areas: string[];
  ferramentas: string[];
  volumeDados: string;
  frequenciaRepetitivas: string;
  horasManual: string;
  gargalos: string[];
}

export interface MaturidadeInfo {
  nivelDigital: string;
  experienciaIA: string;
  infraestrutura: string;
  equipetech: string;
  orcamentoIA: string;
  urgencia: string;
}

export interface ObjetivosInfo {
  prioridades: string[];
  kpis: string[];
  prazo: string;
  riscoTolerancia: string;
  complexidadeAceita: string;
}

export interface DoresInfo {
  maioresDores: string[];
  processosCriticos: string[];
  errosFrequentes: string[];
  tempoDecisao: string;
  satisfacaoCliente: string;
}

export interface DiagnosticoData {
  empresa: EmpresaInfo;
  processos: ProcessoInfo;
  maturidade: MaturidadeInfo;
  objetivos: ObjetivosInfo;
  dores: DoresInfo;
}

interface DiagnosticoContextType {
  data: DiagnosticoData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateEmpresa: (info: Partial<EmpresaInfo>) => void;
  updateProcessos: (info: Partial<ProcessoInfo>) => void;
  updateMaturidade: (info: Partial<MaturidadeInfo>) => void;
  updateObjetivos: (info: Partial<ObjetivosInfo>) => void;
  updateDores: (info: Partial<DoresInfo>) => void;
  isStepComplete: (step: number) => boolean;
  resetDiagnostico: () => void;
}

const initialData: DiagnosticoData = {
  empresa: { nome: "", setor: "", porte: "", funcionarios: "", faturamento: "", tempoMercado: "" },
  processos: { areas: [], ferramentas: [], volumeDados: "", frequenciaRepetitivas: "", horasManual: "", gargalos: [] },
  maturidade: { nivelDigital: "", experienciaIA: "", infraestrutura: "", equipetech: "", orcamentoIA: "", urgencia: "" },
  objetivos: { prioridades: [], kpis: [], prazo: "", riscoTolerancia: "", complexidadeAceita: "" },
  dores: { maioresDores: [], processosCriticos: [], errosFrequentes: [], tempoDecisao: "", satisfacaoCliente: "" },
};

const STORAGE_KEY = "diagnostico-progress";

// Restaurar progresso do localStorage
function loadSavedProgress(): { data: DiagnosticoData; step: number } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { data: parsed.data || initialData, step: parsed.step || 0 };
    }
  } catch (e) {
    // Silently fail
  }
  return { data: initialData, step: 0 };
}

const DiagnosticoContext = createContext<DiagnosticoContextType | undefined>(undefined);

export function DiagnosticoProvider({ children }: { children: ReactNode }) {
  const saved = loadSavedProgress();
  const [data, setData] = useState<DiagnosticoData>(saved.data);
  const [currentStep, setCurrentStep] = useState(saved.step);

  // ALTERADO: Salvar progresso no localStorage a cada mudança
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step: currentStep }));
    } catch (e) {
      // Silently fail
    }
  }, [data, currentStep]);

  const updateEmpresa = (info: Partial<EmpresaInfo>) => {
    setData((prev) => ({ ...prev, empresa: { ...prev.empresa, ...info } }));
  };

  const updateProcessos = (info: Partial<ProcessoInfo>) => {
    setData((prev) => ({ ...prev, processos: { ...prev.processos, ...info } }));
  };

  const updateMaturidade = (info: Partial<MaturidadeInfo>) => {
    setData((prev) => ({ ...prev, maturidade: { ...prev.maturidade, ...info } }));
  };

  const updateObjetivos = (info: Partial<ObjetivosInfo>) => {
    setData((prev) => ({ ...prev, objetivos: { ...prev.objetivos, ...info } }));
  };

  const updateDores = (info: Partial<DoresInfo>) => {
    setData((prev) => ({ ...prev, dores: { ...prev.dores, ...info } }));
  };

  // ALTERADO: Apenas step 1 é obrigatório, demais podem ser pulados
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        // Obrigatório: nome, setor e porte
        return !!(data.empresa.nome && data.empresa.setor && data.empresa.porte);
      case 1:
        // Opcional: pode pular (mas recomendado preencher)
        return true;
      case 2:
        // Opcional: pode pular
        return true;
      case 3:
        // Opcional: pode pular
        return true;
      case 4:
        // Opcional: pode pular
        return true;
      default:
        return false;
    }
  };

  const resetDiagnostico = () => {
    setData(initialData);
    setCurrentStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Silently fail
    }
  };

  return (
    <DiagnosticoContext.Provider
      value={{
        data,
        currentStep,
        setCurrentStep,
        updateEmpresa,
        updateProcessos,
        updateMaturidade,
        updateObjetivos,
        updateDores,
        isStepComplete,
        resetDiagnostico,
      }}
    >
      {children}
    </DiagnosticoContext.Provider>
  );
}

export function useDiagnostico() {
  const context = useContext(DiagnosticoContext);
  if (!context) {
    throw new Error("useDiagnostico must be used within DiagnosticoProvider");
  }
  return context;
}
