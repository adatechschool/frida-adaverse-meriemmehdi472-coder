import { NextRequest, NextResponse } from "next/server";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ===========================
// GET /api/prj_etudiant
// ===========================
export async function GET() {
  try {
    const client = await pool.connect();

    const query = `
      SELECT pe.id, pe.titre, pe.adrs_web_perso, pe.illustration, pe.lien_git, pe.lien_demo,
             pe.date_crea, pe.date_pub,
             p.nom_prj AS nom_projet,
             promo.nom AS nom_promo
      FROM prj_etudiant pe
      LEFT JOIN projets_ada p ON pe.projets_ada_id = p.id
      LEFT JOIN promotions_ada promo ON pe.promotions_ada_id = promo.id
      ORDER BY pe.id DESC;
    `;

    const result = await client.query(query);
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erreur GET prj_etudiant :", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les projets." },
      { status: 500 }
    );
  }
}

// ===========================
// POST /api/prj_etudiant
// ===========================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Données reçues :", data);

    const {
      titre,
      adrs_web_perso = "",
      illustration = "",
      lien_git,
      lien_demo,
      date_crea,
      projets_ada_id,
      promotions_ada_id,
    } = data;

    const client = await pool.connect();

    const query = `
      INSERT INTO prj_etudiant
      (titre, adrs_web_perso, illustration, lien_git, lien_demo,
       date_crea, date_pub, projets_ada_id, promotions_ada_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;

    const values = [
      titre,
      adrs_web_perso,
      illustration,
      lien_git,
      lien_demo,
      date_crea,
      date_crea, // date_pub = date_crea par défaut
      projets_ada_id,
      promotions_ada_id,
    ];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json(
      { message: "Projet ajouté", projet: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur POST prj_etudiant :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du projet" },
      { status: 400 }
    );
  }
}
