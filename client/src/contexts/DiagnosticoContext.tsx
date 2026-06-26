import { createContext, useContext, useState, type ReactNode } from "react";

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

const DiagnosticoContext = createContext<DiagnosticoContextType | undefined>(undefined);

export function DiagnosticoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DiagnosticoData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);

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

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(data.empresa.nome && data.empresa.setor && data.empresa.porte);
      case 1:
        return data.processos.areas.length > 0 && !!data.processos.horasManual;
      case 2:
        return !!(data.maturidade.nivelDigital && data.maturidade.experienciaIA);
      case 3:
        return data.objetivos.prioridades.length > 0 && !!data.objetivos.prazo;
      case 4:
        return data.dores.maioresDores.length > 0;
      default:
        return false;
    }
  };

  const resetDiagnostico = () => {
    setData(initialData);
    setCurrentStep(0);
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
