/* ===== Analytics de Conversão — Funil do Diagnóstico =====
 * Rastreia eventos do funil: visita landing → início → cada step → conclusão
 * Integra com Umami (já configurado no projeto) e console para debug
 * ============================================================ */

type FunnelEvent =
  | "diagnostico_landing_view"
  | "diagnostico_start"
  | "diagnostico_step_1"
  | "diagnostico_step_2"
  | "diagnostico_step_3"
  | "diagnostico_step_4"
  | "diagnostico_step_5"
  | "diagnostico_complete"
  | "diagnostico_pdf_export"
  | "diagnostico_email_send"
  | "contact_form_submit"
  | "page_view";

interface AnalyticsEvent {
  event: FunnelEvent;
  data?: Record<string, string | number>;
}

// Envia evento para Umami (se disponível) e loga no console
function trackEvent({ event, data }: AnalyticsEvent) {
  // Log para debug
  if (import.meta.env.DEV) {
    console.log(`📊 [Analytics] ${event}`, data || "");
  }

  // Umami tracking (já integrado via script no index.html)
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.track(event, data);
  }

  // Armazena no localStorage para dashboard interno
  try {
    const stored = JSON.parse(localStorage.getItem("nexxus_analytics") || "[]");
    stored.push({
      event,
      data,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    });
    // Mantém apenas os últimos 100 eventos
    if (stored.length > 100) stored.shift();
    localStorage.setItem("nexxus_analytics", JSON.stringify(stored));
  } catch (e) {
    // Silently fail
  }
}

export function useAnalytics() {
  const track = (event: FunnelEvent, data?: Record<string, string | number>) => {
    trackEvent({ event, data });
  };

  // Funções específicas do funil
  const trackLandingView = () => track("diagnostico_landing_view");
  const trackDiagnosticoStart = () => track("diagnostico_start");
  const trackStep = (step: number) => track(`diagnostico_step_${step}` as FunnelEvent);
  const trackComplete = (scoreGeral: number, empresa: string) =>
    track("diagnostico_complete", { score: scoreGeral, empresa });
  const trackPDFExport = (empresa: string) => track("diagnostico_pdf_export", { empresa });
  const trackEmailSend = (empresa: string) => track("diagnostico_email_send", { empresa });
  const trackContactSubmit = (empresa: string) => track("contact_form_submit", { empresa });
  const trackPageView = (page: string) => track("page_view", { page });

  // Retorna métricas do funil armazenadas localmente
  const getFunnelMetrics = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("nexxus_analytics") || "[]");
      const landingViews = stored.filter((e: any) => e.event === "diagnostico_landing_view").length;
      const starts = stored.filter((e: any) => e.event === "diagnostico_start").length;
      const completions = stored.filter((e: any) => e.event === "diagnostico_complete").length;
      const pdfExports = stored.filter((e: any) => e.event === "diagnostico_pdf_export").length;
      const emailSends = stored.filter((e: any) => e.event === "diagnostico_email_send").length;

      return {
        landingViews,
        starts,
        completions,
        pdfExports,
        emailSends,
        startRate: landingViews > 0 ? Math.round((starts / landingViews) * 100) : 0,
        completionRate: starts > 0 ? Math.round((completions / starts) * 100) : 0,
      };
    } catch {
      return { landingViews: 0, starts: 0, completions: 0, pdfExports: 0, emailSends: 0, startRate: 0, completionRate: 0 };
    }
  };

  return {
    track,
    trackLandingView,
    trackDiagnosticoStart,
    trackStep,
    trackComplete,
    trackPDFExport,
    trackEmailSend,
    trackContactSubmit,
    trackPageView,
    getFunnelMetrics,
  };
}
