/* ===== Página interna: Lista de Cases ===== */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const casesData = [
  { id: "financial-services", sectorKey: "cases.finance", titleKey: "cases.finance.title", descKey: "cases.finance.desc", metricKey: "cases.finance.metric" },
  { id: "manufacturing", sectorKey: "cases.manufacturing", titleKey: "cases.manufacturing.title", descKey: "cases.manufacturing.desc", metricKey: "cases.manufacturing.metric" },
  { id: "insurance", sectorKey: "cases.insurance", titleKey: "cases.insurance.title", descKey: "cases.insurance.desc", metricKey: "cases.insurance.metric" },
  { id: "retail", sectorKey: "cases.retail", titleKey: "cases.retail.title", descKey: "cases.retail.desc", metricKey: "cases.retail.metric" },
];

export default function CasesPage() {
  const { t, lang, setLang } = useLanguage();

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
            {t("casesPage.back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
              {t("casesPage.title")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-6">
              {t("cases.title")}
            </h1>
            <p className="text-lg text-white/50 max-w-[700px] mb-16">
              {t("casesPage.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
            {casesData.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/cases/${c.id}`} className="block bg-[#111] p-8 lg:p-10 hover:bg-[#1a1a1a] transition-colors h-full">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-3">
                    {t(c.sectorKey)}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">{t(c.titleKey)}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed mb-6">{t(c.descKey)}</p>
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#A100FF]">{t(c.metricKey)}</span>
                    <span className="text-sm text-white/40 group-hover:text-white">{t("insights.readMore")} &gt;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
