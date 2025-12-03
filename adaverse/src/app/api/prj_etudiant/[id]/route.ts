import { db, prjetudiant } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  const result = await db
    .select()
    .from(prjetudiant)
    .where(eq(prjetudiant.id, id));

  if (result.length === 0) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}
