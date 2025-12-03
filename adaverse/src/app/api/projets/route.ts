import { db, projetsAda } from "@/db";

export async function GET() {
  const data = await db.select().from(projetsAda);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const github = formData.get("github") as string;
  const demo = formData.get("demo") as string | null;
  const promo = Number(formData.get("promo"));
  const theme = Number(formData.get("theme"));

  if (!title || !github || !promo || !theme) {
    return Response.json(
      { error: "Champs manquants ou invalides" },
      { status: 400 }
    );
  }

  await db.insert(projetsAda).values({
    nom_prj: title,
  
  });

  return Response.json({ success: true });
}
