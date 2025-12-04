"use client"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Form from "../components/Form"
import ProjectCard from "@/components/ProjectCard"

interface ProjetEtudiant {
  id: number
  titre: string
  lien_git: string
  lien_demo: string
  promotions_ada_id: string
  projets_ada_id: string
  date_pub: string | null
}

export default function Accueil() {
  const [projets, setProjets] = useState<ProjetEtudiant[]>([])
  const [isForm, setIsForm] = useState(false)

  const handleOpenForm = () => setIsForm(true)
  const handleCloseForm = () => setIsForm(false)

  useEffect(() => {
    fetch("/api/prj_etudiant")
      .then(res => res.json())
      .then(data => {
        console.log("Projets récupérés :", data)
        setProjets(data)
      })
      .catch(console.error)
  }, [])

  // Filtrer uniquement les projets publiés
  const projetsPublies = projets.filter(
    (p) => p.date_pub && p.date_pub !== ""
  )

  console.log("Projets publiés avant regroupement :", projetsPublies)

  // Trier du plus récent au plus ancien
  const projetsTries = [...projetsPublies].sort(
    (a, b) =>
      new Date(b.date_pub!).getTime() - new Date(a.date_pub!).getTime()
  )

  // Grouper par projet Ada
  const groupes = projetsTries.reduce((acc, projet) => {
    if (!acc[projet.projets_ada_id]) acc[projet.projets_ada_id] = []
    acc[projet.projets_ada_id].push(projet)
    return acc
  }, {} as Record<string, ProjetEtudiant[]>)

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <Header onOpenForm={handleOpenForm} />

      
      {isForm && <Form onClose={handleCloseForm} />}

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Projets publiés
        </h1>

        {Object.entries(groupes).map(([projetAda, items]) => (
          <section key={projetAda} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {projetAda}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((projet) => (
                <ProjectCard key={projet.id} projet={projet} />
              ))}
            </div>
          </section>
        ))}

        {projetsPublies.length === 0 && (
          <p className="text-gray-500">Aucun projet publié pour le moment.</p>
        )}
      </main>
    </div>
  )
}
