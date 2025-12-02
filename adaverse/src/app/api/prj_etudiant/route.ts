import { NextRequest, NextResponse } from "next/server";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// GET /api/prj_etudiant
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM prj_etudiant");
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erreur GET prj_etudiant :", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les projets" },
      { status: 500 }
    );
  }
}

// POST /api/prj_etudiant
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Données reçues :", data); // log pour debug

    const {
      titre,
      lien_git,
      lien_demo,
      promotions_ada_id,
      projets_ada_id,
      date_publication,
    } = data;

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO prj_etudiant
       (titre, lien_git, lien_demo, promotions_ada_id, projets_ada_id, date_publication)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        titre,
        lien_git,
        lien_demo,
        promotions_ada_id,
        projets_ada_id,
        date_publication || null,
      ]
    );
    client.release();

    return NextResponse.json({ message: "Projet ajouté", projet: result.rows[0] });
  } catch (error) {
    console.error("Erreur POST prj_etudiant :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du projet" },
      { status: 400 }
    );
  }
}
