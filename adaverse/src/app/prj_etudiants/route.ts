import { db,prjetudiant } from "../../db";

export async function GET() {
  const data = await db.select().from(prjetudiant);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

