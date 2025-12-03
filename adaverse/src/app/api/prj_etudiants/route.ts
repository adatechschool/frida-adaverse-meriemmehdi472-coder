import { NextRequest, NextResponse } from 'next/server'

// GET /api/prj_etudiants
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GET OK - route fonctionne"
  })
}

// POST /api/prj_etudiants
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    return NextResponse.json({
      message: "POST OK - données reçues",
      data
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du traitement du POST" },
      { status: 400 }
    )
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     // Récupération des données JSON envoyées depuis le front
//     const data = await req.json();

//     // Validation minimale (optionnelle)
//     const requiredFields = [
//       "titre",
//       "adrs_web_perso",
//       "illustration",
//       "lien_git",
//       "lien_demo",
//       "date_crea",
//       "promotions_ada_id",
//       "projets_ada_id",
//     ];

//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return NextResponse.json(
//           { error: `${field} est requis` },
//           { status: 400 }
//         );
//       }
//     }

//      const promotionsId = Number(data.promotions_ada_id);
//     const projetsId = Number(data.projets_ada_id);

//     if (isNaN(promotionsId) || isNaN(projetsId)) {
//       return NextResponse.json(
//         { error: "IDs invalides" },
//         { status: 400 }
//       );
//     }

//     // Insertion dans la table prj_etudiant
//     const inserted = await db.insert(prjetudiant).values({
//       titre: data.titre,
//       adrs_web_perso: data.adrs_web_perso,
//       illustration: data.illustration,
//       lien_git: data.lien_git,
//       lien_demo: data.lien_demo,
//       date_crea: new Date(data.date_crea),
//       date_pub: data.date_pub ? new Date(data.date_pub) : null,
//       promotions_ada_id: Number(data.promotions_ada_id),
//       projets_ada_id: Number(data.projets_ada_id),
//     }).returning();

//     return NextResponse.json({ message: "Projet ajouté", projet: inserted[0] });
//   } catch (err) {
//     console.error("Erreur POST /api/prj_etudiants:", err);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
