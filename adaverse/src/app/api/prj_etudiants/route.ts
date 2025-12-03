import { NextRequest, NextResponse } from "next/server"
import pkg from "pg"

const { Pool } = pkg

// --- Config Neon / PostgreSQL ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // <- tu dois mettre ton URL Neon dans .env
  ssl: {
    rejectUnauthorized: false
  }
})

// --- GET : récupérer tous les projets ---
export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    const res = await client.query("SELECT * FROM prj_etudiant ORDER BY date_publication DESC")
    client.release()

    return NextResponse.json({ data: res.rows })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 500 }
    )
  }
}

// --- POST : ajouter un projet ---
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const client = await pool.connect()

    const query = `
      INSERT INTO prj_etudiant
        (titre, lien_git, lien_demo, promotions_ada_id, projets_ada_id, date_publication)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `

    const values = [
      data.titre,
      data.lien_git,
      data.lien_demo,
      data.promotions_ada_id,
      data.projets_ada_id,
      null // date_publication à null pour l’instant
    ]

    const res = await client.query(query, values)
    client.release()

    return NextResponse.json({ message: "Projet créé", data: res.rows[0] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur lors du POST" }, { status: 400 })
  }
}
