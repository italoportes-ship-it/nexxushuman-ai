import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface ProgressSidebarProps {
  steps: Step[];
  currentStep: number;
  isStepComplete: (step: number) => boolean;
}

export default function ProgressSidebar({ steps, currentStep, isStepComplete }: ProgressSidebarProps) {
  return (
    <div className="flex flex-col h-full w-full p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
        <span className="font-bold text-base text-foreground tracking-tight">
          NexxusHuman-AI
        </span>
      </div>

      {/* Steps */}
      <nav className="flex-1">
        <div className="relative">
          {/* Linha vertical de conexão */}
          <div className="absolute left-[17px] top-[20px] bottom-[20px] w-[2px] bg-border/50" />
          <motion.div
            className="absolute left-[17px] top-[20px] w-[2px] bg-primary"
            initial={{ height: 0 }}
            animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ maxHeight: "calc(100% - 40px)" }}
          />

          <ul className="space-y-8 relative">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isComplete = isStepComplete(i) && i < currentStep;
              const isPast = i < currentStep;

              return (
                <li key={step.id} className="flex items-center gap-4">
                  {/* Node */}
                  <div
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_12px_oklch(0.75_0.15_190_/_0.4)]"
                        : isComplete || isPast
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {isComplete || isPast ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="font-mono text-xs font-bold">{i + 1}</span>
                    )}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/40"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div>
                    <p
                      className={`font-display text-sm font-semibold transition-colors ${
                        isActive ? "text-foreground" : isPast ? "text-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Footer info */}
      <div className="pt-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Suas respostas são analisadas para gerar recomendações personalizadas de automação com IA.
        </p>
      </div>
    </div>
  );
}
