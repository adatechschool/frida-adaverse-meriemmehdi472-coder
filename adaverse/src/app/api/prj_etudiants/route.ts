// pages/api/prj_etudiants.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // ton fichier Drizzle
import { prjetudiant, promotionsada, projetsAda } from "../../../../src/schema"; // tes schémas

// --- GET : récupérer tous les projets étudiants ---
export async function GET(req: NextRequest) {
  try {
    const allProjects = await db
      .select({
        id: prjetudiant.id,
        titre: prjetudiant.titre,
        adrs_web_perso: prjetudiant.adrs_web_perso,
        illustration: prjetudiant.illustration,
        lien_git: prjetudiant.lien_git,
        lien_demo: prjetudiant.lien_demo,
        date_crea: prjetudiant.date_crea,
        date_pub: prjetudiant.date_pub,
        promotion: promotionsada.nom,
        projet: projetsAda.nom_prj,
      })
      .from(prjetudiant)
      .leftJoin(promotionsada, prjetudiant.promotions_ada_id, promotionsada.id)
      .leftJoin(projetsAda, prjetudiant.projets_ada_id, projetsAda.id);

    return NextResponse.json({ success: true, data: allProjects });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// --- POST : ajouter un projet étudiant ---
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Convertir les dates correctement
    const dateCrea = new Date(data.date_crea);
    const datePub = data.date_pub ? new Date(data.date_pub) : undefined;

    const inserted = await db
      .insert(prjetudiant)
      .values({
        titre: data.titre,
        adrs_web_perso: data.adrs_web_perso,
        illustration: data.illustration,
        lien_git: data.lien_git,
        lien_demo: data.lien_demo,
        date_crea: dateCrea,
        date_pub: datePub,
        promotions_ada_id: Number(data.promotions_ada_id),
        projets_ada_id: Number(data.projets_ada_id),
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
