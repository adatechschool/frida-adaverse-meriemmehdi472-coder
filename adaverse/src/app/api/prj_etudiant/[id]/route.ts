import { NextRequest, NextResponse } from "next/server";
import { db, prjetudiant, promotionsada, projetsAda } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  const result = await db
    .select({
      id: prjetudiant.id,
      titre: prjetudiant.titre,
      lien_git: prjetudiant.lien_git,
      lien_demo: prjetudiant.lien_demo,
      date_pub: prjetudiant.date_pub,
      promotion: promotionsada.nom,
      projetAda: projetsAda.nom_prj,
    })
    .from(prjetudiant)
    .leftJoin(promotionsada, eq(prjetudiant.promotions_ada_id, promotionsada.id))
    .leftJoin(projetsAda, eq(prjetudiant.projets_ada_id, projetsAda.id))
    .where(eq(prjetudiant.id, id));

  if (!result[0]) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  const projet = {
    ...result[0],
    date_pub: result[0].date_pub ? new Date(result[0].date_pub).toISOString() : null,
  };

  return NextResponse.json(projet);
}
