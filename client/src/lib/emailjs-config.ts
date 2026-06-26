/* ===== Configuração EmailJS — NexxusHuman-AI =====
 *
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 
 * 1. Acesse https://www.emailjs.com e crie uma conta gratuita (200 emails/mês)
 * 
 * 2. Crie um SERVICE:
 *    - Vá em "Email Services" → "Add New Service"
 *    - Escolha Gmail, Outlook ou outro provedor
 *    - Conecte sua conta de e-mail
 *    - Anote o SERVICE_ID (ex: "service_abc123")
 * 
 * 3. Crie os TEMPLATES:
 * 
 *    Template de Contato (template_contact):
 *    - Subject: "Novo contato: {{from_name}} - {{company}}"
 *    - Body: 
 *      Nome: {{from_name}}
 *      Email: {{from_email}}
 *      Empresa: {{company}}
 *      Cargo: {{role}}
 *      Mensagem: {{message}}
 * 
 *    Template de Diagnóstico (template_diagnostico):
 *    - Subject: "Diagnóstico IA: {{empresa_nome}} - Score {{score_geral}}"
 *    - Body:
 *      Empresa: {{empresa_nome}}
 *      Setor: {{empresa_setor}}
 *      Score Geral: {{score_geral}}/100
 *      
 *      Scores Detalhados:
 *      {{scores_detalhes}}
 *      
 *      Top Recomendações:
 *      {{recomendacoes_resumo}}
 * 
 * 4. Copie sua PUBLIC KEY:
 *    - Vá em "Account" → "General"
 *    - Copie o "Public Key"
 * 
 * 5. Substitua os valores abaixo:
 * ================================================= */

export const EMAILJS_CONFIG = {
  // Substitua pelos seus IDs reais do EmailJS
  SERVICE_ID: "service_nexxus",       // Seu Service ID
  TEMPLATE_CONTACT: "template_contact",     // Template para formulário de contato
  TEMPLATE_DIAGNOSTICO: "template_diagnostico", // Template para resultados do diagnóstico
  PUBLIC_KEY: "YOUR_PUBLIC_KEY",       // Sua Public Key (Account → General)
};

// Verifica se o EmailJS está configurado
export function isEmailJSConfigured(): boolean {
  return EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY";
}
