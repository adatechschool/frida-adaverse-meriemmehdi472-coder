import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // ton client Drizzle
import { prjetudiant } from "@/db/schema"; // ton schema Drizzle

// ===========================
// GET /api/prj_etudiant
// ===========================
export async function GET() {
  try {
    const projets = await db.select().from(prjetudiant);
    return NextResponse.json(projets);
  } catch (err) {
    console.error("Erreur GET prj_etudiant :", err);
    return NextResponse.json(
      { error: "Impossible de récupérer les projets." },
      { status: 500 }
    );
  }
}

// ===========================
// POST /api/prj_etudiant
// ===========================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Données reçues :", data);

    const {
      titre,
      illustration = "",
      adrs_web_perso = "",
      lien_git,
      lien_demo,
      date_crea,
      date_pub = null,
      projets_ada_id,
      promotions_ada_id,
    } = data;

    // Log les valeurs des champs pour debugging
    console.log({ titre, lien_git, lien_demo, date_crea, projets_ada_id, promotions_ada_id });

    // Validation simple des champs obligatoires
    if (!titre || !lien_git || !lien_demo || !date_crea || !projets_ada_id || !promotions_ada_id) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const [newProjet] = await db
      .insert(prjetudiant)
      .values({
        titre,
        illustration,
        adrs_web_perso,
        lien_git,
        lien_demo,
        date_crea,
        date_pub,
        projets_ada_id: Number(projets_ada_id),
        promotions_ada_id: Number(promotions_ada_id),
      })
      .returning();

    return NextResponse.json(
      { message: "Projet ajouté avec succès", projet: newProjet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur POST prj_etudiant :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'ajout du projet." },
      { status: 500 }
    );
  }
}
