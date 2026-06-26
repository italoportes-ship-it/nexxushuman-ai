/* ===== Página Sobre Nós — NexxusHuman-AI =====
 * História, equipe fundadora e diferenciais competitivos
 * ================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function AboutPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#A100FF] text-2xl font-black">&gt;</span>
            <span className="text-white text-lg font-bold tracking-tight">NexxusHuman-AI</span>
          </Link>
          <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="text-xs font-bold text-white/50 hover:text-white border border-white/20 px-3 py-1.5 transition-colors">
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link href="/" className="text-sm text-[#A100FF] hover:text-white transition-colors mb-8 inline-block">
            ← {lang === "pt" ? "Voltar" : "Back"}
          </Link>

          {/* Hero da página */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-20">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
              {lang === "pt" ? "Sobre Nós" : "About Us"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-8 max-w-[16ch]">
              {lang === "pt"
                ? "Pioneiros em transformação agêntica"
                : "Pioneers in agentic transformation"}
            </h1>
            <p className="text-lg text-white/50 max-w-[700px] leading-relaxed">
              {lang === "pt"
                ? "A NexxusHuman-AI nasceu da convicção de que a inteligência artificial não substitui humanos — ela os amplifica. Somos a consultoria que conecta o melhor da inteligência humana com o poder dos agentes de IA para criar organizações que operam em um nível completamente novo."
                : "NexxusHuman-AI was born from the conviction that artificial intelligence doesn't replace humans — it amplifies them. We are the consultancy that connects the best of human intelligence with the power of AI agents to create organizations that operate at an entirely new level."}
            </p>
          </motion.div>

          {/* Nossa História */}
          <HistorySection lang={lang} />

          {/* Equipe */}
          <TeamSection lang={lang} />

          {/* Diferenciais */}
          <DifferentialsSection lang={lang} />

          {/* Números */}
          <NumbersSection lang={lang} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 bg-[#A100FF] p-12 lg:p-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {lang === "pt" ? "Pronto para transformar sua organização?" : "Ready to transform your organization?"}
            </h2>
            <p className="text-white/80 mb-8 max-w-[500px]">
              {lang === "pt"
                ? "Converse com nossos especialistas e descubra como a organização agêntica pode multiplicar seus resultados."
                : "Talk to our specialists and discover how the agentic organization can multiply your results."}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors">
              {lang === "pt" ? "Agende uma consulta" : "Schedule a consultation"} <span className="text-[#A100FF]">&gt;</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ===== Seção: Nossa História ===== */
function HistorySection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const timeline = lang === "pt" ? [
    { year: "2023", title: "Fundação", desc: "NexxusHuman-AI é fundada por um grupo de especialistas em IA, gestão e transformação digital, com a missão de levar o modelo agêntico para empresas brasileiras e latino-americanas." },
    { year: "2024", title: "Primeiros Cases", desc: "Implantação das primeiras fábricas de agentes em clientes dos setores financeiro e de seguros, com resultados que superaram todas as projeções iniciais." },
    { year: "2025", title: "Expansão", desc: "Crescimento acelerado com expansão para manufatura, varejo e tecnologia. Estabelecimento de parcerias estratégicas com provedores de plataformas de IA." },
    { year: "2026", title: "Liderança", desc: "Reconhecimento como referência em transformação agêntica no mercado brasileiro. Mais de 50 domínios transformados e milhares de agentes em operação contínua." },
  ] : [
    { year: "2023", title: "Foundation", desc: "NexxusHuman-AI is founded by a group of AI, management and digital transformation specialists, with the mission of bringing the agentic model to Brazilian and Latin American companies." },
    { year: "2024", title: "First Cases", desc: "Deployment of first agent factories in financial services and insurance clients, with results that exceeded all initial projections." },
    { year: "2025", title: "Expansion", desc: "Accelerated growth with expansion to manufacturing, retail and technology. Establishment of strategic partnerships with AI platform providers." },
    { year: "2026", title: "Leadership", desc: "Recognition as a reference in agentic transformation in the Brazilian market. Over 50 transformed domains and thousands of agents in continuous operation." },
  ];

  return (
    <section ref={ref} className="mb-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
          {lang === "pt" ? "Nossa Trajetória" : "Our Journey"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight mb-12">
          {lang === "pt" ? "Da visão à execução" : "From vision to execution"}
        </h2>
      </motion.div>

      <div className="space-y-[2px]">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#111] p-8 lg:p-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="lg:w-32 shrink-0">
              <span className="text-2xl font-black text-[#A100FF]">{item.year}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-[15px] text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===== Seção: Equipe Fundadora ===== */
function TeamSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const team = lang === "pt" ? [
    { name: "Rafael Mendes", role: "CEO & Co-founder", bio: "15+ anos em consultoria estratégica e transformação digital. Ex-sócio de big four, especialista em modelos operacionais e governança corporativa." },
    { name: "Camila Rodrigues", role: "CTO & Co-founder", bio: "Engenheira de IA com passagem por Google e Microsoft. PhD em sistemas multi-agente, arquiteta de plataformas de IA em escala." },
    { name: "Lucas Ferreira", role: "COO & Co-founder", bio: "Especialista em operações e escala. Liderou transformações em empresas Fortune 500, com foco em eficiência operacional e gestão da mudança." },
    { name: "Ana Beatriz Costa", role: "Chief People Officer", bio: "Referência em cultura organizacional e requalificação. Desenvolveu programas de capacitação em IA para mais de 10.000 profissionais." },
  ] : [
    { name: "Rafael Mendes", role: "CEO & Co-founder", bio: "15+ years in strategic consulting and digital transformation. Former big four partner, specialist in operating models and corporate governance." },
    { name: "Camila Rodrigues", role: "CTO & Co-founder", bio: "AI engineer with experience at Google and Microsoft. PhD in multi-agent systems, architect of AI platforms at scale." },
    { name: "Lucas Ferreira", role: "COO & Co-founder", bio: "Operations and scale specialist. Led transformations in Fortune 500 companies, focused on operational efficiency and change management." },
    { name: "Ana Beatriz Costa", role: "Chief People Officer", bio: "Reference in organizational culture and reskilling. Developed AI training programs for over 10,000 professionals." },
  ];

  return (
    <section ref={ref} className="mb-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
          {lang === "pt" ? "Equipe Fundadora" : "Founding Team"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight mb-12">
          {lang === "pt" ? "Liderança que entende de transformação" : "Leadership that understands transformation"}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#111] p-8 lg:p-10 hover:bg-[#1a1a1a] transition-colors"
          >
            {/* Avatar placeholder */}
            <div className="w-16 h-16 bg-[#A100FF]/20 flex items-center justify-center mb-6">
              <span className="text-[#A100FF] text-2xl font-black">{member.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#A100FF] block mb-4">{member.role}</span>
            <p className="text-[15px] text-white/50 leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===== Seção: Diferenciais ===== */
function DifferentialsSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const differentials = lang === "pt" ? [
    { title: "Reinvenção, não automação", desc: "Não otimizamos processos antigos. Reconstruímos do zero com lógica agêntica, gerando ganhos de 5x a 20x em produtividade." },
    { title: "Autonomia para o cliente", desc: "Construímos capacidade interna. O Centro de Excelência garante que sua organização evolua sem dependência permanente da consultoria." },
    { title: "Governança embutida", desc: "Governança contínua, orientada por dados e integrada aos processos — não rituais trimestrais desconectados da operação." },
    { title: "Orquestração ética", desc: "Alinhamos humanos e agentes em torno de propósito compartilhado, decidindo onde a IA faz sentido e onde não faz." },
    { title: "Resultados mensuráveis", desc: "Métricas claras desde o dia 1. Dashboards em tempo real, ROI comprovado e evidências concretas para cada fase." },
    { title: "Velocidade de execução", desc: "Primeiros resultados em semanas, não meses. Sprints agênticos que geram valor tangível desde a primeira entrega." },
  ] : [
    { title: "Reinvention, not automation", desc: "We don't optimize old processes. We rebuild from scratch with agentic logic, generating 5x to 20x productivity gains." },
    { title: "Client autonomy", desc: "We build internal capability. The Center of Excellence ensures your organization evolves without permanent consultancy dependency." },
    { title: "Embedded governance", desc: "Continuous, data-driven governance integrated into processes — not quarterly rituals disconnected from operations." },
    { title: "Ethical orchestration", desc: "We align humans and agents around shared purpose, deciding where AI makes sense and where it doesn't." },
    { title: "Measurable results", desc: "Clear metrics from day 1. Real-time dashboards, proven ROI and concrete evidence for each phase." },
    { title: "Execution speed", desc: "First results in weeks, not months. Agentic sprints that generate tangible value from the first delivery." },
  ];

  return (
    <section ref={ref} className="mb-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-6">
          {lang === "pt" ? "Diferenciais" : "Differentials"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight mb-12">
          {lang === "pt" ? "Por que a NexxusHuman-AI" : "Why NexxusHuman-AI"}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {differentials.map((diff, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-[#111] p-8 hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="text-[#A100FF] text-xl font-black block mb-4">&gt;</span>
            <h3 className="text-lg font-bold text-white mb-3">{diff.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{diff.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===== Seção: Números ===== */
function NumbersSection({ lang }: { lang: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const numbers = lang === "pt" ? [
    { value: "50+", label: "Domínios transformados" },
    { value: "2.000+", label: "Agentes em operação" },
    { value: "20x", label: "Multiplicador médio de produtividade" },
    { value: "12", label: "Setores atendidos" },
  ] : [
    { value: "50+", label: "Transformed domains" },
    { value: "2,000+", label: "Agents in operation" },
    { value: "20x", label: "Average productivity multiplier" },
    { value: "12", label: "Sectors served" },
  ];

  return (
    <section ref={ref} className="py-16 bg-white text-black -mx-6 lg:-mx-10 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {numbers.map((num, i) => (
            <div key={i} className="border-t-2 border-black pt-4">
              <span className="text-4xl lg:text-5xl font-black text-black block mb-2">{num.value}</span>
              <span className="text-sm text-black/50 font-medium">{num.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
