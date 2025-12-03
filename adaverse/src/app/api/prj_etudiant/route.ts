import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { prjetudiant } from "@/db/schema";

// ===========================
// GET /api/prj_etudiants
// ===========================
export async function GET() {
  try {
    const projets = await db.select().from(prjetudiant);
    console.log("GET /api/prj_etudiants OK");

    return NextResponse.json(projets, { status: 200 });
  } catch (err) {
    console.error("Erreur GET prj_etudiants :", err);

    return NextResponse.json(
      { error: "Impossible de récupérer les projets." },
      { status: 500 }
    );
  }
}

// ===========================
// POST /api/prj_etudiants
// ===========================
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Données reçues :", data);

    const {
      titre,
      lien_git,
      lien_demo,
      promotions_ada_id,
      projets_ada_id,
      adrs_web_perso,
      illustration,
      date_crea,
      date_pub,
    } = data;

    // Champs obligatoires
    if (!titre || !lien_git || !lien_demo || !promotions_ada_id || !projets_ada_id) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const projetInsert = await db
      .insert(prjetudiant)
      .values({
        titre,
        adrs_web_perso: adrs_web_perso || null,
        illustration: illustration || null,
        lien_git,
        lien_demo,
        date_crea: date_crea || new Date(),
        date_pub: date_pub || new Date(),
        promotions_ada_id: Number(promotions_ada_id),
        projets_ada_id: Number(projets_ada_id),
      })
      .returning();

    return NextResponse.json(
      { message: "Projet ajouté avec succès !", projet: projetInsert[0] },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("Erreur POST /api/prj_etudiant :", err);

    let message = "Erreur serveur lors de l'ajout du projet.";
    if (err.code === "23503") {
      message = "L'id promotion ou projet ADA n'existe pas.";
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
