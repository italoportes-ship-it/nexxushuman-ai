/* ===== Página de Blog — NexxusHuman-AI =====
 * Artigos sobre organização agêntica para SEO e autoridade
 * ====================================================== */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, ArrowRight, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

// Dados dos artigos
const articles = [
  {
    id: "organizacao-agentica-nova-fronteira",
    date: "2026-06-20",
    readTime: 8,
    category: { pt: "Estratégia", en: "Strategy" },
    title: {
      pt: "A organização agêntica é a nova fronteira da produtividade",
      en: "The agentic organization is the new frontier of productivity",
    },
    excerpt: {
      pt: "A inteligência artificial está trazendo a maior mudança de paradigma organizacional desde as revoluções industrial e digital. Nessa nova estrutura, humanos e agentes de IA trabalham lado a lado em escala.",
      en: "Artificial intelligence is bringing the biggest organizational paradigm shift since the industrial and digital revolutions. In this new structure, humans and AI agents work side by side at scale.",
    },
    content: {
      pt: `Se você é CEO e ainda não se deu conta de que estamos numa nova era, esse é o momento de agir.

A inteligência artificial está trazendo a maior mudança de paradigma organizacional desde as revoluções industrial e digital. Nessa nova estrutura, humanos e agentes de AI — tanto físicos quanto virtuais — trabalham lado a lado em escala. Chamamos isso de organização agêntica.

Nossas experiências mostram que esse novo modelo já é capaz de multiplicar a produtividade em até 20 vezes. Não é automação incremental; é uma ruptura estrutural.

O sucesso nesse cenário exige que as empresas reformulem seus modelos de negócio, reinventem seus modelos operacionais, construam novas capacidades e conduzam a mudança com muito mais precisão e velocidade.

Na era agêntica, a vantagem competitiva virá de três movimentos: aproximar-se radicalmente do cliente por meio de canais de AI, operar processos verdadeiramente AI-first e construir um arcabouço de dados proprietários difícil de replicar.

A organização agêntica rompe o limite da escala humana. O modelo emergente é formado por pequenas equipes humanas altamente qualificadas supervisionando verdadeiras fábricas de agentes, com 50 a 100 deles executando processos completos.

A história mostra que os vencedores são aqueles que pensam grande, agem rápido e se comprometem com a execução. Não será diferente agora.`,
      en: `If you're a CEO and haven't realized we're in a new era, this is the time to act.

Artificial intelligence is bringing the biggest organizational paradigm shift since the industrial and digital revolutions. In this new structure, humans and AI agents — both physical and virtual — work side by side at scale. We call this the agentic organization.

Our experiences show that this new model is already capable of multiplying productivity by up to 20 times. It's not incremental automation; it's a structural disruption.

Success in this scenario requires companies to reformulate their business models, reinvent their operating models, build new capabilities and drive change with much more precision and speed.

In the agentic era, competitive advantage will come from three movements: radically approaching the customer through AI channels, operating truly AI-first processes and building a proprietary data framework that's hard to replicate.

The agentic organization breaks the limit of human scale. The emerging model is formed by small, highly qualified human teams supervising true agent factories, with 50 to 100 of them executing complete processes.

History shows that winners are those who think big, act fast and commit to execution. It won't be different now.`,
    },
  },
  {
    id: "paradoxo-ia-marketing",
    date: "2026-05-15",
    readTime: 6,
    category: { pt: "Marketing", en: "Marketing" },
    title: {
      pt: "O Paradoxo da IA no Marketing: A Tecnologia Está em Todo Lugar, Menos nos Resultados",
      en: "The AI Paradox in Marketing: Technology is Everywhere, Except in Results",
    },
    excerpt: {
      pt: "Empresas investem milhões em ferramentas de IA para marketing, mas os resultados não acompanham. O problema não é a tecnologia — é a falta de uma abordagem agêntica integrada.",
      en: "Companies invest millions in AI tools for marketing, but results don't follow. The problem isn't the technology — it's the lack of an integrated agentic approach.",
    },
    content: {
      pt: `O mercado de ferramentas de IA para marketing explodiu nos últimos dois anos. Empresas investem em geradores de conteúdo, plataformas de personalização, chatbots e dezenas de soluções pontuais. Mas os resultados? Frequentemente decepcionantes.

O paradoxo é claro: a tecnologia está em todo lugar, menos nos resultados de negócio. E a razão é simples — ferramentas isoladas não criam vantagem competitiva. O que cria é uma operação verdadeiramente agêntica.

Na abordagem agêntica, não se trata de ter 15 ferramentas de IA desconectadas. Trata-se de ter uma fábrica de agentes integrada que executa o processo de marketing de ponta a ponta: desde a pesquisa de mercado até a otimização de campanhas em tempo real.

Agentes de segmentação que identificam micro-audiências. Agentes de conteúdo que geram variações personalizadas. Agentes de otimização que ajustam bids e criativos continuamente. Agentes de análise que detectam oportunidades antes da concorrência.

O resultado? Empresas que adotam a abordagem agêntica no marketing reportam aumento de 3x a 5x no ROI de campanhas, com redução de 60% no custo de aquisição.

A pergunta não é "qual ferramenta de IA usar?" — é "como redesenhar minha operação de marketing para ser genuinamente AI-first?".`,
      en: `The AI tools market for marketing has exploded in the last two years. Companies invest in content generators, personalization platforms, chatbots and dozens of point solutions. But the results? Often disappointing.

The paradox is clear: technology is everywhere, except in business results. And the reason is simple — isolated tools don't create competitive advantage. What does is a truly agentic operation.

In the agentic approach, it's not about having 15 disconnected AI tools. It's about having an integrated agent factory that executes the marketing process end-to-end: from market research to real-time campaign optimization.

Segmentation agents that identify micro-audiences. Content agents that generate personalized variations. Optimization agents that continuously adjust bids and creatives. Analysis agents that detect opportunities before the competition.

The result? Companies adopting the agentic approach in marketing report 3x to 5x increase in campaign ROI, with 60% reduction in acquisition cost.

The question isn't "which AI tool to use?" — it's "how to redesign my marketing operation to be genuinely AI-first?".`,
    },
  },
  {
    id: "individuos-produtivos-empresas",
    date: "2026-05-01",
    readTime: 7,
    category: { pt: "Cultura", en: "Culture" },
    title: {
      pt: "Indivíduos Produtivos Não Fazem Empresas Produtivas",
      en: "Productive Individuals Don't Make Productive Companies",
    },
    excerpt: {
      pt: "Dar ferramentas de IA para cada funcionário não transforma a organização. A produtividade sistêmica exige redesenho de processos, governança e cultura — não apenas tecnologia individual.",
      en: "Giving AI tools to each employee doesn't transform the organization. Systemic productivity requires process redesign, governance and culture — not just individual technology.",
    },
    content: {
      pt: `Existe um equívoco fundamental na forma como muitas empresas abordam a IA: acreditam que dar ferramentas de produtividade individual para cada funcionário automaticamente tornará a empresa mais produtiva. Não torna.

Um funcionário 3x mais produtivo com ChatGPT ainda está preso em processos desenhados para a era pré-IA. Ele gera relatórios mais rápido — mas o fluxo de aprovação ainda leva 5 dias. Ele responde e-mails em segundos — mas a decisão que depende de 3 departamentos ainda trava por semanas.

A produtividade organizacional não é a soma da produtividade individual. É o resultado do design dos processos, da arquitetura de decisão e da governança operacional.

Na organização agêntica, o ganho não vem de indivíduos mais rápidos — vem de processos inteiramente redesenhados. Onde antes havia 20 pessoas executando um fluxo de onboarding em 15 dias, agora há 3 pessoas supervisionando 60 agentes que completam o mesmo processo em 4 horas.

A lição é clara: pare de distribuir ferramentas. Comece a redesenhar processos. A transformação agêntica não é sobre empoderar indivíduos — é sobre reinventar a forma como a organização opera como sistema.`,
      en: `There's a fundamental misconception in how many companies approach AI: they believe that giving individual productivity tools to each employee will automatically make the company more productive. It doesn't.

An employee 3x more productive with ChatGPT is still stuck in processes designed for the pre-AI era. They generate reports faster — but the approval flow still takes 5 days. They respond to emails in seconds — but the decision that depends on 3 departments still stalls for weeks.

Organizational productivity is not the sum of individual productivity. It's the result of process design, decision architecture and operational governance.

In the agentic organization, the gain doesn't come from faster individuals — it comes from entirely redesigned processes. Where there were once 20 people executing an onboarding flow in 15 days, there are now 3 people supervising 60 agents that complete the same process in 4 hours.

The lesson is clear: stop distributing tools. Start redesigning processes. Agentic transformation isn't about empowering individuals — it's about reinventing how the organization operates as a system.`,
    },
  },
  {
    id: "centro-excelencia-ia",
    date: "2026-04-10",
    readTime: 5,
    category: { pt: "Operações", en: "Operations" },
    title: {
      pt: "Por que toda empresa precisa de um Centro de Excelência em IA",
      en: "Why every company needs an AI Center of Excellence",
    },
    excerpt: {
      pt: "O CoE é o motor interno de evolução agêntica. Sem ele, iniciativas de IA ficam fragmentadas, sem governança e sem escala. Com ele, a transformação ganha cadência e resultados mensuráveis.",
      en: "The CoE is the internal engine of agentic evolution. Without it, AI initiatives remain fragmented, without governance and without scale. With it, transformation gains cadence and measurable results.",
    },
    content: {
      pt: `Empresas que experimentam IA sem um Centro de Excelência (CoE) dedicado invariavelmente enfrentam o mesmo padrão: dezenas de projetos-piloto desconectados, sem governança unificada, sem métricas comparáveis e sem capacidade de escalar o que funciona.

O CoE não é um departamento de TI com outro nome. É uma estrutura estratégica que combina expertise técnica, visão de negócio e capacidade de gestão da mudança. Ele define padrões, prioriza iniciativas, mede resultados e garante que a organização aprenda e evolua continuamente.

Na prática, um CoE eficaz tem três funções: primeiro, ser o guardião da arquitetura — garantindo que agentes e sistemas se integrem de forma coerente. Segundo, ser o acelerador de escala — replicando rapidamente o que funciona em um domínio para outros. Terceiro, ser o centro de capacitação — desenvolvendo fluência em IA em toda a organização.

Empresas com CoE estruturado escalam 4x mais rápido que aquelas sem. A diferença não é tecnológica — é organizacional.`,
      en: `Companies that experiment with AI without a dedicated Center of Excellence (CoE) invariably face the same pattern: dozens of disconnected pilot projects, without unified governance, without comparable metrics and without the ability to scale what works.

The CoE is not an IT department with another name. It's a strategic structure that combines technical expertise, business vision and change management capability. It defines standards, prioritizes initiatives, measures results and ensures the organization learns and evolves continuously.

In practice, an effective CoE has three functions: first, being the architecture guardian — ensuring agents and systems integrate coherently. Second, being the scale accelerator — quickly replicating what works in one domain to others. Third, being the capability center — developing AI fluency across the organization.

Companies with a structured CoE scale 4x faster than those without. The difference isn't technological — it's organizational.`,
    },
  },
  {
    id: "gatilho-governanca-shadow-ai",
    date: "2026-06-28",
    readTime: 4,
    category: { pt: "Governança", en: "Governance" },
    title: {
      pt: "Sua empresa sabe o que a IA está fazendo com seus dados?",
      en: "Does your company know what AI is doing with your data?",
    },
    excerpt: {
      pt: "O fenômeno do Shadow AI — ferramentas de IA usadas sem conhecimento da TI — expõe empresas a riscos de segurança, compliance e propriedade intelectual que poucos estão monitorando.",
      en: "The Shadow AI phenomenon — AI tools used without IT knowledge — exposes companies to security, compliance and intellectual property risks that few are monitoring.",
    },
    content: {
      pt: `Enquanto você lê este artigo, é provável que dezenas de funcionários da sua empresa estejam usando ferramentas de IA generativa sem qualquer supervisão corporativa. Esse fenômeno tem nome: Shadow AI.\n\nSegundo pesquisas recentes, mais de 60% dos profissionais já usam IA no trabalho, mas apenas uma fração dessas ferramentas passa por aprovação da TI ou compliance. Dados sensíveis de clientes, estratégias comerciais e propriedade intelectual estão sendo inseridos em plataformas externas sem governança.\n\nO risco não é teórico. Empresas já enfrentaram vazamentos de código-fonte, exposição de dados de clientes e violações de LGPD por uso descontrolado de IA.\n\nA solução não é proibir — é governar. Na abordagem da organização agêntica, cada agente de IA tem identidade, rastreabilidade e políticas de acesso definidas. Nenhuma decisão é tomada sem trilha de auditoria. Nenhum dado é processado fora do perímetro de segurança.\n\nA pergunta que todo CEO deveria fazer hoje: você sabe exatamente o que as ferramentas de IA estão fazendo com os dados da sua empresa agora?`,
      en: `While you read this article, dozens of employees at your company are likely using generative AI tools without any corporate oversight. This phenomenon has a name: Shadow AI.\n\nAccording to recent research, over 60% of professionals already use AI at work, but only a fraction of these tools go through IT or compliance approval. Sensitive customer data, commercial strategies and intellectual property are being entered into external platforms without governance.\n\nThe risk isn't theoretical. Companies have already faced source code leaks, customer data exposure and LGPD violations from uncontrolled AI use.\n\nThe solution isn't to prohibit — it's to govern. In the agentic organization approach, every AI agent has identity, traceability and defined access policies. No decision is made without an audit trail. No data is processed outside the security perimeter.\n\nThe question every CEO should ask today: do you know exactly what AI tools are doing with your company's data right now?`,
    },
  },
  {
    id: "gatilho-eficiencia-agent-native",
    date: "2026-06-27",
    readTime: 4,
    category: { pt: "Eficiência", en: "Efficiency" },
    title: {
      pt: "Automatizar processos ineficientes só gera erros mais rápido",
      en: "Automating inefficient processes only generates errors faster",
    },
    excerpt: {
      pt: "A maioria das empresas tenta colar IA em cima de processos antigos. O resultado: Agent Washing — automações que não escalam e não geram ROI. A solução é o redesenho Agent-Native.",
      en: "Most companies try to glue AI on top of old processes. The result: Agent Washing — automations that don't scale and don't generate ROI. The solution is Agent-Native redesign.",
    },
    content: {
      pt: `Existe uma armadilha sedutora na adoção de IA: pegar um processo existente e simplesmente adicionar um agente para executá-lo mais rápido. Parece lógico. Na prática, é um desastre.\n\nQuando você automatiza um processo ruim, você não ganha eficiência — você gera erros em escala. Um fluxo de aprovação com 7 etapas desnecessárias não fica melhor porque um agente preenche formulários automaticamente. Ele fica mais rápido em ser ineficiente.\n\nIsso é o que chamamos de Agent Washing: a ilusão de transformação digital sem mudança estrutural. Empresas gastam milhões em pilotos de IA que nunca escalam porque os processos subjacentes não foram redesenhados para a era agêntica.\n\nO caminho correto é o design Agent-Native: antes de implementar qualquer agente, redesenhar o fluxo de valor de ponta a ponta. Eliminar etapas desnecessárias. Redefinir pontos de decisão. Criar interfaces claras entre humanos e agentes.\n\nO resultado? Processos que levavam 15 dias passam a levar 4 horas. Não porque são mais rápidos — porque são fundamentalmente diferentes.`,
      en: `There's a seductive trap in AI adoption: taking an existing process and simply adding an agent to execute it faster. It seems logical. In practice, it's a disaster.\n\nWhen you automate a bad process, you don't gain efficiency — you generate errors at scale. An approval flow with 7 unnecessary steps doesn't get better because an agent fills forms automatically. It gets faster at being inefficient.\n\nThis is what we call Agent Washing: the illusion of digital transformation without structural change. Companies spend millions on AI pilots that never scale because the underlying processes weren't redesigned for the agentic era.\n\nThe correct path is Agent-Native design: before implementing any agent, redesign the value flow end-to-end. Eliminate unnecessary steps. Redefine decision points. Create clear interfaces between humans and agents.\n\nThe result? Processes that took 15 days now take 4 hours. Not because they're faster — because they're fundamentally different.`,
    },
  },
  {
    id: "gatilho-humano-orquestradores",
    date: "2026-06-26",
    readTime: 4,
    category: { pt: "Pessoas", en: "People" },
    title: {
      pt: "IA não substitui pessoas — substitui tarefas",
      en: "AI doesn't replace people — it replaces tasks",
    },
    excerpt: {
      pt: "O medo da substituição é o maior obstáculo à adoção de IA. A verdade: na organização agêntica, pessoas deixam de ser executoras sobrecarregadas e se tornam estrategistas empoderados.",
      en: "The fear of replacement is the biggest obstacle to AI adoption. The truth: in the agentic organization, people stop being overloaded executors and become empowered strategists.",
    },
    content: {
      pt: `O maior obstáculo à transformação agêntica não é tecnológico. É humano. O medo de ser substituído pela IA paralisa equipes, gera resistência passiva e sabota projetos de automação.\n\nMas a realidade é diferente do medo. A IA não substitui pessoas — substitui tarefas. E as tarefas que ela substitui são exatamente aquelas que ninguém quer fazer: preencher planilhas, copiar dados entre sistemas, responder perguntas repetitivas, gerar relatórios manuais.\n\nNa organização agêntica, o papel humano muda fundamentalmente. De executor sobrecarregado para orquestrador estratégico. De quem faz para quem decide, supervisiona e direciona.\n\nUm analista financeiro que gastava 80% do tempo consolidando dados agora gasta 80% do tempo analisando insights e tomando decisões. Um gerente de atendimento que apagava incêndios o dia todo agora desenha estratégias de experiência do cliente enquanto agentes resolvem 70% dos tickets automaticamente.\n\nA chave é a capacitação. Preparar a equipe para liderar agentes autônomos, não competir com eles. Transformar executores sobrecarregados em estrategistas empoderados. Esse é o nexo entre o humano e a IA.`,
      en: `The biggest obstacle to agentic transformation isn't technological. It's human. The fear of being replaced by AI paralyzes teams, generates passive resistance and sabotages automation projects.\n\nBut reality is different from fear. AI doesn't replace people — it replaces tasks. And the tasks it replaces are exactly those nobody wants to do: filling spreadsheets, copying data between systems, answering repetitive questions, generating manual reports.\n\nIn the agentic organization, the human role changes fundamentally. From overloaded executor to strategic orchestrator. From the one who does to the one who decides, supervises and directs.\n\nA financial analyst who spent 80% of time consolidating data now spends 80% of time analyzing insights and making decisions. A customer service manager who put out fires all day now designs customer experience strategies while agents resolve 70% of tickets automatically.\n\nThe key is training. Preparing the team to lead autonomous agents, not compete with them. Transforming overloaded executors into empowered strategists. That's the nexus between human and AI.`,
    },
  },
];

// Página de listagem do blog
export default function BlogPage() {
  const { lang, setLang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-black text-white">
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

          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
              {lang === "pt" ? "Blog & Insights" : "Blog & Insights"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-6">
              {lang === "pt" ? "Pensamento agêntico" : "Agentic thinking"}
            </h1>
            <p className="text-lg text-white/50 max-w-[600px] mb-16">
              {lang === "pt"
                ? "Artigos, análises e perspectivas sobre a transformação agêntica e o futuro das organizações."
                : "Articles, analyses and perspectives on agentic transformation and the future of organizations."}
            </p>
          </motion.div>

          {/* Grid de artigos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${article.id}`} className="block bg-[#111] p-8 lg:p-10 hover:bg-[#1a1a1a] transition-colors h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A100FF]">
                      {article.category[lang as "pt" | "en"]}
                    </span>
                    <span className="text-[10px] text-white/30">•</span>
                    <span className="text-[10px] text-white/30">{article.date}</span>
                    <span className="text-[10px] text-white/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime} min
                    </span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#A100FF] transition-colors">
                    {article.title[lang as "pt" | "en"]}
                  </h2>
                  <p className="text-[15px] text-white/50 leading-relaxed mb-6">
                    {article.excerpt[lang as "pt" | "en"]}
                  </p>
                  <span className="text-sm font-semibold text-[#A100FF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === "pt" ? "Ler artigo" : "Read article"} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Página de artigo individual
export function BlogArticle() {
  const { lang, setLang } = useLanguage();
  // Extrair ID da URL
  const path = window.location.pathname;
  const articleId = path.split("/blog/")[1] || "";
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{lang === "pt" ? "Artigo não encontrado" : "Article not found"}</h1>
          <Link href="/blog" className="text-[#A100FF]">← {lang === "pt" ? "Voltar ao blog" : "Back to blog"}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <Link href="/blog" className="text-sm text-[#A100FF] hover:text-white transition-colors mb-8 inline-block">
            ← {lang === "pt" ? "Voltar ao blog" : "Back to blog"}
          </Link>

          <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF]">
                {article.category[lang as "pt" | "en"]}
              </span>
              <span className="text-[11px] text-white/30">•</span>
              <span className="text-[11px] text-white/30">{article.date}</span>
              <span className="text-[11px] text-white/30 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTime} min
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-10">
              {article.title[lang as "pt" | "en"]}
            </h1>

            <div className="prose prose-invert max-w-none">
              {article.content[lang as "pt" | "en"].split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-[16px] text-white/70 leading-[1.8] mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Botões de compartilhamento */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="text-xs text-white/40 uppercase tracking-wider block mb-3">
                {lang === "pt" ? "Compartilhar" : "Share"}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] text-xs font-medium hover:bg-[#0A66C2]/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title[lang as "pt" | "en"] + " - " + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success(lang === "pt" ? "Link copiado!" : "Link copied!");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/10 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {lang === "pt" ? "Copiar link" : "Copy link"}
                </button>
              </div>
            </div>

            {/* CTA no final do artigo */}
            <div className="mt-10 p-8 bg-[#111] border-l-4 border-[#A100FF]">
              <h3 className="text-xl font-bold mb-3">
                {lang === "pt" ? "Quer saber como aplicar isso na sua empresa?" : "Want to know how to apply this in your company?"}
              </h3>
              <p className="text-sm text-white/50 mb-6">
                {lang === "pt"
                  ? "Faça nosso diagnóstico gratuito e descubra o potencial de automação da sua organização."
                  : "Take our free diagnostic and discover your organization's automation potential."}
              </p>
              <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 bg-[#A100FF] text-white font-semibold text-sm hover:bg-[#8800DD] transition-colors">
                {lang === "pt" ? "Fazer Diagnóstico" : "Take Diagnostic"} &gt;
              </Link>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}
