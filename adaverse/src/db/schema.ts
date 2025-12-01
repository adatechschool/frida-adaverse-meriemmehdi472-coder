import { pgTable, serial, text, varchar, date, integer } from "drizzle-orm/pg-core";

// --- TABLE projetsAda ---
export const projetsAda = pgTable("projets_ada", {
  id: serial("id").primaryKey(),
  nom_prj: text("nom_prj").notNull(),
});

// --- TABLE promotionsada ---
export const promotionsada = pgTable("promotions_ada", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  created_at: text("created_at").notNull(),
});


export const prjetudiant = pgTable("prj_etudiant", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  adrs_web_perso: varchar("adrs_web_perso").notNull().unique(),
  illustration: text("illustration").notNull(),
  lien_git: varchar("lien_git").notNull(),
  lien_demo: varchar("lien_demo").notNull(),
  date_crea: date("date_crea").notNull(),
  date_pub: date("date_pub"),
  promotions_ada_id: integer("promotions_ada_id").notNull().references(() => promotionsada.id),
  projets_ada_id: integer("projets_ada_id").notNull().references(() => projetsAda.id),

});
