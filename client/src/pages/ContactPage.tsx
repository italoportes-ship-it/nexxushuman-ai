/* ===== Página de Contato com integração EmailJS =====
 * Para configurar o envio real de e-mails:
 * 1. Crie uma conta gratuita em https://www.emailjs.com
 * 2. Crie um Service (Gmail, Outlook, etc.)
 * 3. Crie um Template com variáveis: {{from_name}}, {{from_email}}, {{company}}, {{role}}, {{message}}
 * 4. Substitua as constantes EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID e EMAILJS_PUBLIC_KEY abaixo
 * ===================================================== */

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

// ===== CONFIGURAÇÃO EMAILJS =====
// Substitua pelos seus IDs reais do EmailJS
const EMAILJS_SERVICE_ID = "service_nexxus"; // Seu Service ID
const EMAILJS_TEMPLATE_ID = "template_contact"; // Seu Template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Sua Public Key
// =================================

export default function ContactPage() {
  const { t, lang, setLang } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    company: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Tenta enviar via EmailJS
      if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && formRef.current) {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        toast.success(t("contact.success"));
      } else {
        // Modo demo: simula envio quando EmailJS não está configurado
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success(t("contact.success"));
        console.log("📧 Form data (demo mode - configure EmailJS for real emails):", formData);
      }

      setFormData({ from_name: "", from_email: "", company: "", role: "", message: "" });
    } catch (error) {
      toast.error(lang === "pt" ? "Erro ao enviar. Tente novamente." : "Error sending. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setSending(false);
    }
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
            {/* Coluna esquerda: Informações */}
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
                  <a href="mailto:contato@nexxushuman-ai.com" className="text-white hover:text-[#A100FF] transition-colors">
                    contato@nexxushuman-ai.com
                  </a>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">
                    {lang === "pt" ? "Localização" : "Location"}
                  </span>
                  <span className="text-white">São Paulo, Brasil</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">LinkedIn</span>
                  <a href="https://linkedin.com/company/nexxushuman-ai" target="_blank" rel="noopener" className="text-white hover:text-[#A100FF] transition-colors">
                    linkedin.com/company/nexxushuman-ai
                  </a>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-1">
                    {lang === "pt" ? "Horário" : "Business Hours"}
                  </span>
                  <span className="text-white">
                    {lang === "pt" ? "Seg–Sex, 9h–18h (BRT)" : "Mon–Fri, 9am–6pm (BRT)"}
                  </span>
                </div>
              </div>

              {/* Nota sobre configuração */}
              <div className="mt-12 p-4 border border-[#A100FF]/20 bg-[#A100FF]/5">
                <p className="text-xs text-white/40 leading-relaxed">
                  {lang === "pt"
                    ? "💡 Para ativar o envio real de e-mails, configure suas credenciais do EmailJS no arquivo ContactPage.tsx (Service ID, Template ID e Public Key)."
                    : "💡 To enable real email sending, configure your EmailJS credentials in ContactPage.tsx (Service ID, Template ID and Public Key)."}
                </p>
              </div>
            </motion.div>

            {/* Coluna direita: Formulário */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <form ref={formRef} onSubmit={handleSubmit} className="bg-[#111] p-8 lg:p-10 space-y-6">
                <div>
                  <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 block mb-2">
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    value={formData.from_name}
                    onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
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
                    name="from_email"
                    required
                    value={formData.from_email}
                    onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
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
                      name="company"
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
                      name="role"
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
                    name="message"
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
