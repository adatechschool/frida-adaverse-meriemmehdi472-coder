import { db, prjetudiant } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  const result = await db
    .select()
    .from(prjetudiant)
    .where(eq(prjetudiant.id, id));

  if (result.length === 0) {
    return new Response(JSON.stringify({ error: "Projet introuvable" }), { status: 404 });
  }

  return new Response(JSON.stringify(result[0]), {
    headers: { "Content-Type": "application/json" }
  });
}

