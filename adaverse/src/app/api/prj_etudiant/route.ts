import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // ton client Drizzle
import { prjetudiant } from "@/db/schema"; // ton schema Drizzle

// GET /api/prj_etudiant
export async function GET() {
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

// // POST /api/prj_etudiant
// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     console.log("Données reçues :", data);

//     const projet = await db
//       .insert(prjetudiant)
//       .values({
//         titre: data.titre,
//         lien_git: data.lien_git,
//         lien_demo: data.lien_demo,
//         promotions_ada_id: Number(data.promotions_ada_id),
//         projets_ada_id: Number(data.projets_ada_id),
//         date_pub: data.date_pub || null,
//       })
//       .returning();

//     return NextResponse.json({ message: "Projet ajouté", projet: projet[0] });
//   } catch (err: any) {
//     console.error("Erreur POST prj_etudiant :", err);
//     return NextResponse.json(
//       { error: err.message },
//       { status: 400 }
//     );
//   }
// }


// Fonction pour générer un slug
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

    // Validation
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
