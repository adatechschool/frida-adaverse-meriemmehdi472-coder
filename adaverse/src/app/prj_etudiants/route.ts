import { db,prjetudiant } from "@/db";

export async function GET() {
  const data = await db.select().from(prjetudiant);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST (req:Request) {
    const body = await req.json();
  const result = await db.insert(prjetudiant).values({
     titre: body.titre,
     desc: body.desc,
     adrs_web_perso:body.adrs_web_perso,
     illustration: body.illustration,
     lien_git: body,
     lien_demo: body,
     date_crea:body,
     date_pub:body.date_pub,
  });
  return Response.json({success:true,result});
};