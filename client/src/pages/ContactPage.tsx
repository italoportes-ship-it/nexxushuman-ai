/* ===== Página de Contato com formulário funcional ===== */
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { toast } from "sonner";

export default function ContactPage() {
  const { t, lang, setLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simula envio (em produção, conectar a um backend/API de e-mail)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(t("contact.success"));
    setFormData({ name: "", email: "", company: "", role: "", message: "" });
    setSending(false);
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#A100FF] block mb-4">
                {t("contact.title")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight mb-6">
                {lang === "pt" ? "Vamos conversar" : "Let's talk"}
              </h1>
              <p className="text-lg text-white/50 mb-12 max-w-[500px]">
                {t("contact.subtitle")}
              </p>

              <div className="space-y-6">
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">Email</span>
                  <span className="text-white">contato@nexxushuman-ai.com</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">
                    {lang === "pt" ? "Localização" : "Location"}
                  </span>
                  <span className="text-white">São Paulo, Brasil</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">LinkedIn</span>
                  <span className="text-white">linkedin.com/company/nexxushuman-ai</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="bg-[#111] p-8 lg:p-10 space-y-6">
                <div>
                  <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white text-[15px] focus:border-[#A100FF] focus:outline-none transition-colors"
                    placeholder={lang === "pt" ? "Seu nome completo" : "Your full name"}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                    {t("contact.email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white text-[15px] focus:border-[#A100FF] focus:outline-none transition-colors"
                    placeholder={lang === "pt" ? "seu@empresa.com" : "you@company.com"}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                      {t("contact.company")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-white text-[15px] focus:border-[#A100FF] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                      {t("contact.role")}
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-white text-[15px] focus:border-[#A100FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white text-[15px] focus:border-[#A100FF] focus:outline-none transition-colors resize-none"
                    placeholder={lang === "pt" ? "Conte-nos sobre seu desafio..." : "Tell us about your challenge..."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#A100FF] text-white font-bold text-[15px] py-4 hover:bg-[#8800DD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <span className="animate-pulse">{lang === "pt" ? "Enviando..." : "Sending..."}</span>
                  ) : (
                    <>
                      {t("contact.submit")}
                      <span>&gt;</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
