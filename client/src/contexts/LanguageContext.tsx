/* ===== Sistema de Internacionalização PT/EN ===== */
import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "pt" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    // Navbar
    "nav.whatWeDo": "O que fazemos",
    "nav.insights": "Insights",
    "nav.cases": "Cases",
    "nav.methodology": "Metodologia",
    "nav.about": "Sobre",
    "nav.contact": "Fale conosco",

    // Hero
    "hero.together": "Juntos nós",
    "hero.reinvented": "reinventamos",
    "hero.subtitle": "A Organização Agêntica",
    "hero.desc": "Em um mundo de mudança constante, o modelo agêntico é a nova fronteira da produtividade. Transformamos empresas onde humanos e agentes de IA operam como um sistema integrado — multiplicando resultados em até 20x.",
    "hero.cta": "Veja o que fazemos",

    // Insights
    "insights.methodology": "Metodologia",
    "insights.methodology.title": "A jornada agêntica: da imersão à cultura autônoma",
    "insights.perspective": "Perspectiva",
    "insights.perspective.title": "Agentes de IA estão redesenhando processos, não apenas automatizando-os",
    "insights.research": "Pesquisa",
    "insights.research.title": "Organizações agênticas multiplicam produtividade em até 20x",
    "insights.caseStudy": "Caso de Estudo",
    "insights.caseStudy.title": "De KYC em 15 dias para 4 horas: transformação bancária",
    "insights.readMore": "Leia mais",

    // Services / Methodology
    "services.label": "Nossa Metodologia",
    "services.title": "As quatro fases da transformação agêntica",
    "services.phase1.title": "Imersão Agêntica",
    "services.phase1.desc": "Mapeamos onde a IA cria valor e construímos o roadmap de implementação. Alinhamento estratégico com C-suite, análise profunda de processos, assessment cultural.",
    "services.phase1.duration": "4–6 semanas",
    "services.phase2.title": "Sprint Agêntico",
    "services.phase2.desc": "Desenvolvemos e implantamos fábricas de agentes em domínios prioritários. Squads híbridos redesenham processos do zero com lógica AI-first.",
    "services.phase2.duration": "8–12 semanas",
    "services.phase3.title": "Operação Agêntica",
    "services.phase3.desc": "Escalamos a IA por toda a empresa com arquitetura robusta, governança embutida e protocolos agente-para-agente.",
    "services.phase3.duration": "12–24 semanas",
    "services.phase4.title": "Cultura Agêntica",
    "services.phase4.desc": "Construímos fluência organizacional através de requalificação em larga escala, frameworks de orquestração ética e evolução contínua.",
    "services.phase4.duration": "Contínuo",

    // Value
    "value.label": "Proposta de Valor",
    "value.title": "Não é automação incremental.",
    "value.titleHighlight": "Reinvenção estrutural.",
    "value.desc": "Não otimizamos processos antigos — reconstruímos do zero com lógica agêntica. Pequenas equipes humanas altamente qualificadas supervisionando fábricas de 50 a 100 agentes de IA executando processos completos: onboarding de clientes, fechamento contábil, lançamento de produtos.",
    "value.metric1": "Multiplicador de produtividade",
    "value.metric2": "Redução no tempo de ciclo",
    "value.metric3": "Redução de custo por transação",
    "value.metric4": "Decisões operacionais autônomas",

    // Cases
    "cases.label": "Casos de Estudo",
    "cases.title": "Reinvenção em ação",
    "cases.seeAll": "Ver todos",
    "cases.finance": "Serviços Financeiros",
    "cases.finance.title": "De KYC em 15 dias para 4 horas",
    "cases.finance.desc": "60 agentes especializados cuidando de coleta documental, verificação cruzada, análise de risco e compliance. Equipe humana de 4 analistas seniores supervisiona exceções.",
    "cases.finance.metric": "80% redução de custo",
    "cases.manufacturing": "Manufatura",
    "cases.manufacturing.title": "Planejamento de produção em tempo real",
    "cases.manufacturing.desc": "Agentes monitorando sinais de mercado, simulando cenários, otimizando alocação de recursos e recomendando ajustes diários.",
    "cases.manufacturing.metric": "40% redução de estoque",
    "cases.insurance": "Seguros",
    "cases.insurance.title": "Processo de sinistros reconstruído do zero",
    "cases.insurance.desc": "Agentes de triagem, investigação, liquidação e comunicação. Peritos humanos intervêm apenas em casos de alta complexidade.",
    "cases.insurance.metric": "Resolução em 5 dias (era 45)",
    "cases.retail": "Varejo",
    "cases.retail.title": "Precificação dinâmica em escala",
    "cases.retail.desc": "Agentes monitorando concorrência, elasticidade de demanda e custos em tempo real. Gerentes de categoria supervisionam estratégias.",
    "cases.retail.metric": "+4pp margem bruta",

    // Quote
    "quote.text": "\"As empresas terão um panorama tecnológico maior, mas o verdadeiro diferencial será a capacidade de preservar identidade e coesão enquanto tudo ao redor muda rapidamente. É humano na liderança, não humano no loop.\"",
    "quote.author": "— Perspectiva de Liderança NexxusHuman-AI",

    // Evolution
    "evolution.label": "Plano de Evolução",
    "evolution.title": "Quatro horizontes para reinvenção total",
    "evolution.h1.period": "0–6 meses",
    "evolution.h1.title": "Fundação",
    "evolution.h1.desc": "Alinhar liderança, implantar primeiros domínios agênticos, construir o Centro de Excelência. Gerar evidências concretas para expansão.",
    "evolution.h2.period": "6–18 meses",
    "evolution.h2.title": "Expansão",
    "evolution.h2.desc": "Escalar para múltiplos domínios simultaneamente. CoE assume a liderança. Organograma formalmente redesenhado para estrutura agêntica.",
    "evolution.h3.period": "18–36 meses",
    "evolution.h3.title": "Maturidade",
    "evolution.h3.desc": "Organização opera predominantemente em modo agêntico. Humanos focam em supervisão estratégica, inovação e relacionamentos de alto valor.",
    "evolution.h4.period": "36+ meses",
    "evolution.h4.title": "Reinvenção Contínua",
    "evolution.h4.desc": "Capacidade de auto-reinvenção. Agentes de planejamento estratégico monitoram o ambiente competitivo e recomendam pivôs de modelo de negócio.",

    // CTA
    "cta.title": "Pronto para rein>entar?",
    "cta.desc": "A questão não é se sua organização será transformada — é se você liderará essa transformação ou será transformado por ela.",
    "cta.button": "Agende uma consulta",

    // Footer
    "footer.rights": "© 2026 NexxusHuman-AI. Todos os direitos reservados. Transformando empresas em Organizações Agênticas.",
    "footer.privacy": "Privacidade",
    "footer.terms": "Termos",
    "footer.accessibility": "Acessibilidade",
    "footer.careers": "Carreiras",
    "footer.contact": "Contato",

    // Contact form
    "contact.title": "Fale conosco",
    "contact.subtitle": "Preencha o formulário e nossa equipe entrará em contato em até 24 horas.",
    "contact.name": "Nome completo",
    "contact.email": "E-mail corporativo",
    "contact.company": "Empresa",
    "contact.role": "Cargo",
    "contact.message": "Como podemos ajudar?",
    "contact.submit": "Enviar mensagem",
    "contact.success": "Mensagem enviada com sucesso! Entraremos em contato em breve.",

    // Methodology page
    "methodology.pageTitle": "Metodologia",
    "methodology.pageSubtitle": "Nossa abordagem estruturada para transformar sua empresa em uma organização agêntica",
    "methodology.back": "← Voltar",

    // Cases page
    "casesPage.title": "Casos de Estudo",
    "casesPage.subtitle": "Como empresas de diferentes setores já operam com estrutura agêntica",
    "casesPage.back": "← Voltar",
  },
  en: {
    // Navbar
    "nav.whatWeDo": "What we do",
    "nav.insights": "Insights",
    "nav.cases": "Cases",
    "nav.methodology": "Methodology",
    "nav.about": "About",
    "nav.contact": "Contact us",

    // Hero
    "hero.together": "Together we",
    "hero.reinvented": "reinvented",
    "hero.subtitle": "The Agentic Organization",
    "hero.desc": "In a world of constant change, the agentic model is the new frontier of productivity. We transform enterprises where humans and AI agents operate as an integrated system — multiplying results up to 20x.",
    "hero.cta": "See what we do",

    // Insights
    "insights.methodology": "Methodology",
    "insights.methodology.title": "The agentic journey: from immersion to autonomous culture",
    "insights.perspective": "Perspective",
    "insights.perspective.title": "AI agents are redesigning processes, not just automating them",
    "insights.research": "Research",
    "insights.research.title": "Agentic organizations multiply productivity by up to 20x",
    "insights.caseStudy": "Case Study",
    "insights.caseStudy.title": "From KYC in 15 days to 4 hours: banking transformation",
    "insights.readMore": "Read more",

    // Services / Methodology
    "services.label": "Our Methodology",
    "services.title": "The four phases of agentic transformation",
    "services.phase1.title": "Agentic Immersion",
    "services.phase1.desc": "We map where AI creates value and build the implementation roadmap. Strategic alignment with C-suite, deep process analysis, cultural assessment.",
    "services.phase1.duration": "4–6 weeks",
    "services.phase2.title": "Agentic Sprint",
    "services.phase2.desc": "We develop and deploy agent factories in priority domains. Hybrid squads redesign processes from scratch with AI-first logic.",
    "services.phase2.duration": "8–12 weeks",
    "services.phase3.title": "Agentic Operation",
    "services.phase3.desc": "We scale AI across the enterprise with robust architecture, embedded governance and agent-to-agent protocols.",
    "services.phase3.duration": "12–24 weeks",
    "services.phase4.title": "Agentic Culture",
    "services.phase4.desc": "We build organization-wide fluency through large-scale reskilling, ethical orchestration frameworks and continuous evolution.",
    "services.phase4.duration": "Ongoing",

    // Value
    "value.label": "Value Proposition",
    "value.title": "Not incremental automation.",
    "value.titleHighlight": "Structural reinvention.",
    "value.desc": "We don't optimize old processes — we rebuild them from the ground up with agentic logic. Small, highly qualified human teams supervising factories of 50 to 100 AI agents executing complete processes: client onboarding, financial closing, product launches.",
    "value.metric1": "Productivity multiplier",
    "value.metric2": "Cycle time reduction",
    "value.metric3": "Cost reduction per transaction",
    "value.metric4": "Autonomous operational decisions",

    // Cases
    "cases.label": "Case Studies",
    "cases.title": "Reinvention in action",
    "cases.seeAll": "See all",
    "cases.finance": "Financial Services",
    "cases.finance.title": "From 15-day KYC to 4 hours",
    "cases.finance.desc": "60 specialized agents handling document collection, cross-verification, risk analysis and compliance. Human team of 4 senior analysts supervises exceptions.",
    "cases.finance.metric": "80% cost reduction",
    "cases.manufacturing": "Manufacturing",
    "cases.manufacturing.title": "Real-time production planning",
    "cases.manufacturing.desc": "Agents monitoring market signals, simulating scenarios, optimizing resource allocation and recommending daily adjustments.",
    "cases.manufacturing.metric": "40% inventory reduction",
    "cases.insurance": "Insurance",
    "cases.insurance.title": "Claims process rebuilt from zero",
    "cases.insurance.desc": "Triage agents, investigation agents, settlement agents and communication agents. Human experts intervene only in high-complexity cases.",
    "cases.insurance.metric": "5-day resolution (was 45)",
    "cases.retail": "Retail",
    "cases.retail.title": "Dynamic pricing at scale",
    "cases.retail.desc": "Agents monitoring competition, demand elasticity and costs in real-time. Category managers supervise strategies and validate high-impact changes.",
    "cases.retail.metric": "+4pp gross margin",

    // Quote
    "quote.text": "\"Companies will have a greater technology landscape, but the true differentiator will be the ability to preserve identity and cohesion while everything around changes rapidly. It is human in the lead, not human in the loop.\"",
    "quote.author": "— NexxusHuman-AI Leadership Perspective",

    // Evolution
    "evolution.label": "Evolution Plan",
    "evolution.title": "Four horizons to full reinvention",
    "evolution.h1.period": "0–6 months",
    "evolution.h1.title": "Foundation",
    "evolution.h1.desc": "Align leadership, deploy first agentic domains, build the Center of Excellence. Generate concrete evidence for expansion.",
    "evolution.h2.period": "6–18 months",
    "evolution.h2.title": "Expansion",
    "evolution.h2.desc": "Scale to multiple domains simultaneously. CoE takes the lead. Org chart formally redesigned for agentic structure.",
    "evolution.h3.period": "18–36 months",
    "evolution.h3.title": "Maturity",
    "evolution.h3.desc": "Organization operates predominantly in agentic mode. Humans focus on strategic supervision, innovation and high-value relationships.",
    "evolution.h4.period": "36+ months",
    "evolution.h4.title": "Continuous Reinvention",
    "evolution.h4.desc": "Self-reinvention capability. Strategic planning agents monitor the competitive environment and recommend business model pivots.",

    // CTA
    "cta.title": "Ready to rein>ent?",
    "cta.desc": "The question is not whether your organization will be transformed — it's whether you will lead that transformation or be transformed by it.",
    "cta.button": "Schedule a consultation",

    // Footer
    "footer.rights": "© 2026 NexxusHuman-AI. All rights reserved. Transforming enterprises into Agentic Organizations.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.accessibility": "Accessibility",
    "footer.careers": "Careers",
    "footer.contact": "Contact",

    // Contact form
    "contact.title": "Contact us",
    "contact.subtitle": "Fill out the form and our team will get back to you within 24 hours.",
    "contact.name": "Full name",
    "contact.email": "Corporate email",
    "contact.company": "Company",
    "contact.role": "Role",
    "contact.message": "How can we help?",
    "contact.submit": "Send message",
    "contact.success": "Message sent successfully! We'll be in touch soon.",

    // Methodology page
    "methodology.pageTitle": "Methodology",
    "methodology.pageSubtitle": "Our structured approach to transforming your company into an agentic organization",
    "methodology.back": "← Back",

    // Cases page
    "casesPage.title": "Case Studies",
    "casesPage.subtitle": "How companies across sectors already operate with agentic structure",
    "casesPage.back": "← Back",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
