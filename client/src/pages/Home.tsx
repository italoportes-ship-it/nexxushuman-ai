/* ===== NexxusHuman-AI - Página Principal =====
 * Baseado na estrutura do Dalton Lab
 * Identidade visual inspirada na McKinsey
 * Marca: NexxusHuman-AI
 * ============================================= */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ===== COMPONENTES DE SEÇÃO =====

/* ALTERADO: Navbar com marca NexxusHuman-AI e estilo McKinsey */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#051C2C]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo NexxusHuman-AI */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0070AD] flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Nexxus<span className="text-[#0070AD]">Human-AI</span>
          </span>
        </a>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#methodology" className="text-sm text-white/70 hover:text-white transition-colors">
            Methodology
          </a>
          <a href="#cases" className="text-sm text-white/70 hover:text-white transition-colors">
            Cases
          </a>
          <a href="#content" className="text-sm text-white/70 hover:text-white transition-colors">
            Content
          </a>
          <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">
            About us
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0070AD] text-white hover:bg-[#0085CC] transition-all duration-200 active:scale-[0.97]"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

/* ALTERADO: Hero section com estilo corporativo McKinsey */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid pattern - inspirado no Dalton Lab */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,112,173,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,173,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 60% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 60% 0%, black 0%, transparent 70%)",
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-[-15%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(0,112,173,0.2) 0%, rgba(0,112,173,0.08) 35%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ALTERADO: Headline com tipografia serif inspirada na McKinsey */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight max-w-[18ch]">
            Transforming enterprises into{" "}
            <span className="font-serif italic font-medium text-[#0070AD]">
              Agentic Organizations
            </span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold bg-[#0070AD] text-white hover:bg-[#0085CC] transition-all duration-200 active:scale-[0.97]"
            >
              Schedule a consultation
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.03] transition-all duration-200"
            >
              Explore our methodology
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Carrossel de logos com estilo clean */
function LogosCarousel() {
  const logos = [
    "Jeisys", "Rumo", "Mundial Mix", "Neogrid", "Imperatriz",
    "Accesstage", "Billion Dollar Boy", "Fialdini", "SmartRisk", "Practical Center"
  ];

  return (
    <section className="py-10 border-y border-white/5 overflow-hidden">
      <div className="flex animate-[scroll_30s_linear_infinite]" style={{ width: "max-content" }}>
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center px-8 min-w-[160px]"
          >
            <span className="text-white/30 text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
              {logo}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ALTERADO: Seção de destaque com estilo McKinsey */
function HighlightSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-[900px] mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
            We transform your company into an Agentic Organization, where{" "}
            <span className="font-serif italic font-medium text-[#0070AD]">
              AI agents work side by side with your team
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Grid de clientes com estilo corporativo */
function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const clients = ["Rumo", "Mundial Mix", "Imperatriz", "Neogrid", "Accesstage", "Jeisys"];

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* ALTERADO: Label estilo McKinsey - uppercase com tracking */}
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD] block text-center mb-12">
            Some of our clients
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-[700px] mx-auto">
            {clients.map((client) => (
              <div key={client} className="flex items-center justify-center py-4">
                <span className="text-white/40 text-base font-semibold tracking-wide">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Org Chart com canvas animado */
function OrgChartSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(17391);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: { x: number; y: number; r: number; vx: number; vy: number; pulse: number; opacity: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx!.scale(2, 2);
    }

    function init() {
      if (!canvas) return;
      nodes.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < 18; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          pulse: Math.random() * Math.PI * 2,
          opacity: 0.3 + Math.random() * 0.4,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.015;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,112,173,${(1 - d / 150) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const pr = n.r + Math.sin(n.pulse) * 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,112,173,${n.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const handleResize = () => { resize(); init(); };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={ref} className="py-24">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD] block mb-4">
            Agentic Org Chart
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Your bigger{" "}
            <span className="font-serif italic font-medium text-[#0070AD]">agentic</span>{" "}
            operational structure
          </h2>
          <div className="flex items-baseline justify-center gap-2 mb-8 flex-wrap">
            <span className="text-sm text-white/50">Operação ao vivo —</span>
            <span className="font-mono text-2xl font-bold text-[#0070AD]">
              {count.toLocaleString()}
            </span>
            <span className="text-sm text-white/50">tarefas processadas hoje</span>
          </div>
          <div className="relative h-[250px] w-full">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Metodologia com cards estilo McKinsey */
function MethodologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { num: "01", title: "Agentic Immersion", desc: "We map where AI creates value and the implementation roadmap for your business." },
    { num: "02", title: "Agentic Sprint", desc: "We develop and deploy AI agents to drive competitive advantage and reduce costs." },
    { num: "03", title: "Agentic Operation", desc: "We scale AI across your entire company with architecture, governance and autonomy." },
    { num: "04", title: "Agentic Culture", desc: "We train your team to use AI autonomously and gain productivity." },
  ];

  return (
    <section ref={ref} id="methodology" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD] block mb-4">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-12">
            The{" "}
            <span className="font-serif italic font-medium text-[#0070AD]">agentic</span>{" "}
            journey
          </h2>

          {/* ALTERADO: Grid de cards com bordas sutis estilo McKinsey */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-white/8 bg-white/[0.02] hover:border-[#0070AD]/30 hover:bg-[#0070AD]/[0.03] transition-all duration-300"
              >
                <span className="font-mono text-sm font-semibold text-[#0070AD] block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Cases section com cards */
function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = [
    { name: "Jeisys", industry: "Global Industry", metric: "49 processes automated", tag: "agentic support & marketing", hasImage: true },
    { name: "SmartRisk", industry: "Logistics", metric: "24/7 monitoring", tag: "Autonomous fleet triage", hasImage: false },
    { name: "Unymus", industry: "Financial Services", metric: "100% autonomous collections", tag: "delinquent revenue recovery", hasImage: false },
    { name: "Fialdini", industry: "Legal", metric: "Autonomous classification", tag: "legal-case triage & distribution", hasImage: false },
  ];

  return (
    <section ref={ref} id="cases" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD] block mb-4">
                Cases
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
                Who already operates with an{" "}
                <span className="font-serif italic font-medium text-[#0070AD]">agentic</span>{" "}
                structure
              </h2>
            </div>
            <a href="#" className="hidden sm:inline-flex text-sm font-semibold text-[#0070AD] hover:text-[#0085CC] transition-colors">
              See all →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cases.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-[#0070AD]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card image area */}
                <div className="h-36 bg-[#051C2C] flex items-center justify-center border-b border-white/5">
                  {c.hasImage ? (
                    <img
                      src="/manus-storage/foto-jeisys_70c3e1ec.jpg"
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white/20 text-2xl font-bold">{c.name[0]}</span>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-white mb-1">{c.name}</h4>
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 block mb-3">
                    {c.industry}
                  </span>
                  <p className="text-sm font-bold text-[#0070AD] mb-1">{c.metric}</p>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">
                    {c.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: CTA section com estilo premium */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-28 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#0070AD]/5 blur-[100px]" />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD] block mb-4">
            The next level
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Become an{" "}
            <span className="font-serif italic font-medium text-[#0070AD]">
              Agentic Organization
            </span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-md mx-auto">
            Trust those who guide you the right way through transformation.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold bg-[#0070AD] text-white hover:bg-[#0085CC] transition-all duration-200 active:scale-[0.97]"
          >
            Schedule a consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Content section com cards de artigos */
function ContentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const articles = [
    { type: "Insight", date: "Jun 2026", title: "The agentic organization is the new frontier of productivity", source: "NexxusHuman-AI" },
    { type: "Insight", date: "May 2026", title: "The AI Paradox in Marketing: Technology is Everywhere, Except in Results", source: "NexxusHuman-AI" },
    { type: "Insight", date: "May 2026", title: "Productive Individuals Don't Make Productive Companies", source: "NexxusHuman-AI" },
    { type: "Media", date: "Jun 2026", title: "AI promises to cut costs and accelerate infrastructure projects", source: "Industry Report" },
  ];

  return (
    <section ref={ref} id="content" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070AD]">
              Content
            </span>
            <a href="#" className="text-sm font-semibold text-[#0070AD] hover:text-[#0085CC] transition-colors">
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {articles.map((article, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-[#0070AD]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Article image placeholder */}
                <div className="h-32 bg-gradient-to-br from-[#0070AD]/10 to-[#051C2C] border-b border-white/5" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0070AD]">
                      {article.type}
                    </span>
                    <span className="text-[10px] text-white/30">{article.date}</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-3 line-clamp-3">
                    {article.title}
                  </p>
                  <span className="text-xs text-white/35">{article.source}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ALTERADO: Footer com marca NexxusHuman-AI */
function Footer() {
  return (
    <footer className="py-16 border-t border-white/8">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#0070AD] flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-white font-semibold tracking-tight">
              Nexxus<span className="text-[#0070AD]">Human-AI</span>
            </span>
          </div>

          <p className="text-xs text-white/35">
            © 2026 NexxusHuman-AI. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {["LinkedIn", "YouTube", "Spotify", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/35 hover:text-[#0070AD] transition-colors text-xs font-medium"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/5 w-full justify-center">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== PÁGINA PRINCIPAL =====
export default function Home() {
  return (
    <div className="min-h-screen bg-[#051C2C] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LogosCarousel />
      <HighlightSection />
      <ClientsSection />
      <OrgChartSection />
      <MethodologySection />
      <CasesSection />
      <CTASection />
      <ContentSection />
      <Footer />
    </div>
  );
}
