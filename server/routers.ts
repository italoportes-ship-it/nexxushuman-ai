/* ===== Routers — NexxusHuman-AI =====
 * Endpoints: auth, diagnostico (submit + LLM), upload, leads, admin
 * ===================================== */

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { diagnosticos, leads, uploads } from "../drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";
import { storagePut } from "./storage";
import { invokeLLM } from "./_core/llm";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ===== DIAGNÓSTICO =====
  diagnostico: router({
    // Submeter diagnóstico e gerar recomendações com LLM
    submit: publicProcedure
      .input(z.object({
        empresaNome: z.string(),
        empresaSetor: z.string(),
        empresaPorte: z.string(),
        email: z.string().email().optional(),
        dadosCompletos: z.string(), // JSON stringified
        scores: z.object({
          geral: z.number(),
          prontidao: z.number(),
          potencial: z.number(),
          urgencia: z.number(),
          roi: z.number(),
          facilidade: z.number(),
        }),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return { id: null, recomendacoes: null };

        // Salvar no banco
        const result = await db.insert(diagnosticos).values({
          empresaNome: input.empresaNome,
          empresaSetor: input.empresaSetor,
          empresaPorte: input.empresaPorte,
          scoreGeral: input.scores.geral,
          scoreProntidao: input.scores.prontidao,
          scorePotencial: input.scores.potencial,
          scoreUrgencia: input.scores.urgencia,
          scoreROI: input.scores.roi,
          scoreFacilidade: input.scores.facilidade,
          dadosCompletos: input.dadosCompletos,
          email: input.email || null,
          status: "processando",
        });

        const diagnosticoId = result[0].insertId;

        // Gerar recomendações com LLM
        let recomendacoesIA = null;
        try {
          const llmResponse = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `Você é um consultor especialista em IA agêntica da NexxusHuman-AI. Analise os dados do diagnóstico empresarial e gere recomendações específicas de agentes de IA para a empresa. Responda em JSON com o formato: { "recomendacoes": [{ "titulo": "...", "descricao": "...", "impacto": "alto|medio|baixo", "risco": "alto|medio|baixo", "prazo": "...", "roi": "...", "agente": "...", "categoria": "..." }] }. Gere entre 4 e 8 recomendações priorizadas por impacto e risco.`,
              },
              {
                role: "user",
                content: `Empresa: ${input.empresaNome}\nSetor: ${input.empresaSetor}\nPorte: ${input.empresaPorte}\nScore Geral: ${input.scores.geral}/100\nProntidão Digital: ${input.scores.prontidao}/100\nPotencial de Automação: ${input.scores.potencial}/100\nUrgência: ${input.scores.urgencia}/100\nROI Esperado: ${input.scores.roi}/100\n\nDados completos do diagnóstico:\n${input.dadosCompletos}`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "recomendacoes_ia",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    recomendacoes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          titulo: { type: "string" },
                          descricao: { type: "string" },
                          impacto: { type: "string" },
                          risco: { type: "string" },
                          prazo: { type: "string" },
                          roi: { type: "string" },
                          agente: { type: "string" },
                          categoria: { type: "string" },
                        },
                        required: ["titulo", "descricao", "impacto", "risco", "prazo", "roi", "agente", "categoria"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["recomendacoes"],
                  additionalProperties: false,
                },
              },
            },
          });

          const content = llmResponse.choices?.[0]?.message?.content;
          if (content && typeof content === "string") {
            recomendacoesIA = content;
            await db.update(diagnosticos)
              .set({ recomendacoesIA: content as string, status: "concluido" })
              .where(eq(diagnosticos.id, diagnosticoId));
          }
        } catch (e) {
          console.error("[LLM] Erro ao gerar recomendações:", e);
          await db.update(diagnosticos)
            .set({ status: "concluido" })
            .where(eq(diagnosticos.id, diagnosticoId));
        }

        return { id: diagnosticoId, recomendacoes: recomendacoesIA };
      }),

    // Listar diagnósticos (admin)
    list: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(diagnosticos).orderBy(desc(diagnosticos.createdAt)).limit(50);
    }),

    // Estatísticas (admin)
    stats: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { total: 0, concluidos: 0, scoreMedia: 0, setores: [] };

      const [totalResult] = await db.select({ count: sql<number>`count(*)` }).from(diagnosticos);
      const [concluidosResult] = await db.select({ count: sql<number>`count(*)` }).from(diagnosticos).where(eq(diagnosticos.status, "concluido"));
      const [scoreResult] = await db.select({ avg: sql<number>`AVG(scoreGeral)` }).from(diagnosticos);
      const setoresResult = await db.select({
        setor: diagnosticos.empresaSetor,
        count: sql<number>`count(*)`,
      }).from(diagnosticos).groupBy(diagnosticos.empresaSetor);

      return {
        total: totalResult?.count || 0,
        concluidos: concluidosResult?.count || 0,
        scoreMedia: Math.round(scoreResult?.avg || 0),
        setores: setoresResult,
      };
    }),
  }),

  // ===== UPLOAD =====
  upload: router({
    // Upload de arquivo para S3
    submit: publicProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // base64
        mimeType: z.string(),
        fileSize: z.number(),
        diagnosticoId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const fileBuffer = Buffer.from(input.fileData, "base64");
        const fileKey = `diagnostico-uploads/${nanoid()}-${input.fileName}`;

        const { key, url } = await storagePut(fileKey, fileBuffer, input.mimeType);

        const db = await getDb();
        if (db) {
          await db.insert(uploads).values({
            diagnosticoId: input.diagnosticoId || null,
            fileName: input.fileName,
            fileKey: key,
            fileUrl: url,
            mimeType: input.mimeType,
            fileSize: input.fileSize,
          });
        }

        return { key, url };
      }),
  }),

  // ===== LEADS =====
  leads: router({
    // Submeter lead (formulário de contato)
    submit: publicProcedure
      .input(z.object({
        nome: z.string(),
        email: z.string().email(),
        empresa: z.string().optional(),
        cargo: z.string().optional(),
        mensagem: z.string().optional(),
        origem: z.string().default("contato"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return { success: false };

        await db.insert(leads).values({
          nome: input.nome,
          email: input.email,
          empresa: input.empresa || null,
          cargo: input.cargo || null,
          mensagem: input.mensagem || null,
          origem: input.origem,
        });

        return { success: true };
      }),

    // Listar leads (admin)
    list: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100);
    }),

    // Estatísticas
    stats: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { total: 0, origens: [] };

      const [totalResult] = await db.select({ count: sql<number>`count(*)` }).from(leads);
      const origensResult = await db.select({
        origem: leads.origem,
        count: sql<number>`count(*)`,
      }).from(leads).groupBy(leads.origem);

      return {
        total: totalResult?.count || 0,
        origens: origensResult,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
