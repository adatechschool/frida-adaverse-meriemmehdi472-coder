"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import ProjectCard from "@/components/ProjectCard";

// ... (Interfaces et constantes ProjetEtudiant, projetsAdaNames restent inchangées)

interface ProjetEtudiant {
  id: number;
  titre: string;
  lien_git: string;
  lien_demo: string;
  promotions_ada_id: string;
  projets_ada_id: string;
  date_pub: string | null;
}

const projetsAdaNames: Record<string, string> = {
  "4": "Ada Quiz",
  "5": "Dataviz",
  "6": "Adaopte",
  "7": "Adaence",
  "8": "Adaction",
  "9": "Ada Check Events",
  "10": "Adaverse",
};

export default function Accueil() {
  const [projets, setProjets] = useState<ProjetEtudiant[]>([]);
  const [isForm, setIsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjets = useCallback(() => {
    setIsLoading(true);
    fetch("/api/prj_etudiant")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des projets");
        return res.json();
      })
      .then((data) => {
        setProjets(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleOpenForm = () => setIsForm(true);
  const handleCloseForm = () => {
    setIsForm(false);
    fetchProjets();
  };

  useEffect(() => {
    fetchProjets();
  }, [fetchProjets]);

  const projetsPublies = projets.filter((p) => p.date_pub && p.date_pub !== "");

  const projetsTries = [...projetsPublies].sort(
    (a, b) => new Date(b.date_pub!).getTime() - new Date(a.date_pub!).getTime()
  );

  const groupes = projetsTries.reduce<Record<string, ProjetEtudiant[]>>((acc, projet) => {
    if (!acc[projet.projets_ada_id]) acc[projet.projets_ada_id] = [];
    acc[projet.projets_ada_id].push(projet);
    return acc;
  }, {});

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header onOpenForm={handleOpenForm} />
      {isForm && <Form onClose={handleCloseForm} />}

      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-16 text-center tracking-tight">
          Le Catalogue des Projets Étudiants
        </h1>

        {isLoading ? (
          <p className="text-xl text-center text-gray-400 flex justify-center items-center gap-2 mt-20">
            <span className="h-6 w-6 border-4 border-t-purple-400 border-gray-700 rounded-full animate-spin"></span>
            Chargement des projets en cours...
          </p>
        ) : projetsPublies.length === 0 ? (
          <p className="text-gray-400 text-center text-xl p-10 border-2 border-dashed border-gray-600 rounded-xl mt-10">
            Aucun projet publié pour le moment. <strong>Soyez le premier à en ajouter un !</strong>
          </p>
        ) : (
          Object.entries(groupes).map(([projetAdaId, items]) => (
            <section
              key={projetAdaId}
              className="mb-16 pt-8 border-t border-gray-700"
            >
              <h2 className="text-3xl font-extrabold text-indigo-400 mb-8 text-left ml-4 tracking-wide">
                ✨ {projetsAdaNames[projetAdaId] || `Projet ${projetAdaId}`}
              </h2>

              {/* --- CHANGEMENT CLÉS ICI --- */}
              <div className="flex gap-6 overflow-x-auto pb-4 px-4 custom-scrollbar">

                {items.map((projet) => (
                  <div
                    key={projet.id}
                    // Force la carte à ne pas se contracter et définit sa largeur fixe
                    className="flex-shrink-0 w-72 max-w-full"
                  >
                    <ProjectCard projet={projet} />
                  </div>
                ))}
              </div>
              {/* --- FIN DES CHANGEMENTS CLÉS --- */}

            </section>
          ))
        )}
      </main>
                    <div className="bg-red-500 text-white p-4">Test Tailwind</div>
    </div>
  );
}