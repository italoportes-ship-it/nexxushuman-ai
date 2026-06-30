/* ===== Chat Widget Flutuante — NexxusHuman-AI ===== */

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AIChatBox, type Message } from "./AIChatBox";
import { trpc } from "@/lib/trpc";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatMutation = trpc.chat.send.useMutation();

  const handleSend = async (content: string) => {
    const userMsg: Message = { role: "user", content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const result = await chatMutation.mutateAsync({
        messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
      });
      setMessages([...updatedMessages, { role: "assistant", content: result.reply }]);
    } catch {
      setMessages([...updatedMessages, { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-lg shadow-[#A100FF]/20 transition-all duration-300 ${
          open ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-[#A100FF] hover:bg-[#8800DD]"
        }`}
        aria-label="Chat"
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
      </button>

      {/* Painel do chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] shadow-2xl shadow-black/50 border border-white/10 bg-[#0a0a0a] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="px-4 py-3 bg-[#111] border-b border-white/5 flex items-center gap-2">
            <span className="text-[#A100FF] text-lg font-black">&gt;</span>
            <span className="text-sm font-bold text-white">Assistente NexxusHuman-AI</span>
            <span className="ml-auto text-[9px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
            </span>
          </div>
          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={isLoading}
            placeholder="Pergunte sobre organização agêntica..."
            height={400}
            emptyStateMessage="Olá! Sou o assistente da NexxusHuman-AI. Como posso ajudar?"
            suggestedPrompts={[
              "O que é organização agêntica?",
              "Como funciona o diagnóstico?",
              "Qual o ROI esperado?",
              "Quero agendar uma consultoria",
            ]}
          />
        </div>
      )}
    </>
  );
}
