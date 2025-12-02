import { db, projetsAda } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return Response.json(
      { error: "ID invalide" },
      { status: 400 }
    );
  }

  const result = await db
    .select()
    .from(projetsAda)
    .where(eq(projetsAda.id, id));

  if (result.length === 0) {
    return Response.json(
      { error: "Projet introuvable" },
      { status: 404 }
    );
  }

  return Response.json(result[0], {
    status: 200,
  });
}
