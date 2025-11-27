import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const projetsAda = pgTable("projets_Ada", {
  id: serial("id").primaryKey(),
  nom_prj: text("nom_prj").notNull(),
});

export const promotionsada = pgTable("promotions_ada", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
    created_at: text("created_at").notNull(),
});
