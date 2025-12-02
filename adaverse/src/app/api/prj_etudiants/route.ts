import { NextRequest, NextResponse } from 'next/server'

// GET /api/prj_etudiants
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GET OK - route fonctionne"
  })
}

// POST /api/prj_etudiants
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    return NextResponse.json({
      message: "POST OK - données reçues",
      data
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du traitement du POST" },
      { status: 400 }
    )
  }
}
