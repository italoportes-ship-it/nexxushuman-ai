import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ===== Tabela de Diagnósticos =====
export const diagnosticos = mysqlTable("diagnosticos", {
  id: int("id").autoincrement().primaryKey(),
  empresaNome: varchar("empresaNome", { length: 255 }).notNull(),
  empresaSetor: varchar("empresaSetor", { length: 100 }).notNull(),
  empresaPorte: varchar("empresaPorte", { length: 100 }).notNull(),
  scoreGeral: int("scoreGeral"),
  scoreProntidao: int("scoreProntidao"),
  scorePotencial: int("scorePotencial"),
  scoreUrgencia: int("scoreUrgencia"),
  scoreROI: int("scoreROI"),
  scoreFacilidade: int("scoreFacilidade"),
  dadosCompletos: text("dadosCompletos"), // JSON stringified
  recomendacoesIA: text("recomendacoesIA"), // JSON stringified - gerado por LLM
  status: mysqlEnum("status", ["pendente", "processando", "concluido"]).default("pendente").notNull(),
  email: varchar("email", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Diagnostico = typeof diagnosticos.$inferSelect;
export type InsertDiagnostico = typeof diagnosticos.$inferInsert;

// ===== Tabela de Uploads =====
export const uploads = mysqlTable("uploads", {
  id: int("id").autoincrement().primaryKey(),
  diagnosticoId: int("diagnosticoId"),
  fileName: varchar("fileName", { length: 500 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 1000 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: int("fileSize"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Upload = typeof uploads.$inferSelect;
export type InsertUpload = typeof uploads.$inferInsert;

// ===== Tabela de Leads (contato) =====
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  empresa: varchar("empresa", { length: 255 }),
  cargo: varchar("cargo", { length: 255 }),
  mensagem: text("mensagem"),
  origem: varchar("origem", { length: 50 }).default("contato").notNull(), // contato, diagnostico
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;