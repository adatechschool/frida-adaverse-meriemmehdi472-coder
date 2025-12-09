import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { prjetudiant } from "@/db/schema";

export async function GET(req: NextRequest) {
  try {
    const projets = await db.select().from(prjetudiant);
    return NextResponse.json(projets);
  } catch (err) {
    console.error("Erreur GET prj_etudiant :", err);
    return NextResponse.json(
      { error: "Impossible de récupérer les projets" },
      { status: 500 }
    );
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.titre) throw new Error("Le titre est obligatoire.");
    if (!data.lien_git || !data.lien_demo)
      throw new Error("Les liens Git et Démo sont obligatoires.");
    if (!data.promotions_ada_id || !data.projets_ada_id)
      throw new Error("Les IDs de promotion et projet sont obligatoires.");

    const slug = slugify(data.titre);

    const projet = await db
      .insert(prjetudiant)
      .values({
        titre: data.titre,
        adrs_web_perso: slug,
        illustration: data.illustration || "",
        lien_git: data.lien_git,
        lien_demo: data.lien_demo,
        date_pub: null,
        promotions_ada_id: Number(data.promotions_ada_id),
        projets_ada_id: Number(data.projets_ada_id),
      })
      .returning();

    return NextResponse.json({ message: "Projet ajouté", projet: projet[0] });
  } catch (error: any) {
    console.error("Erreur POST prj_etudiant :", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
