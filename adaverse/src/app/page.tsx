"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";

interface ProjetEtudiant {
  id: number;
  titre: string;
  lien_git: string;
  lien_demo: string;
  promotions_ada_id: string;
  projets_ada_id: string;
  date_publication: string | null;
}

export default function Accueil() {
  const [projets, setProjets] = useState<ProjetEtudiant[]>([]);

  useEffect(() => {
    async function fetchProjets() {
      try {
        const res = await fetch("/api/prj_etudiants");
        if (!res.ok) {
          console.error("Erreur API:", res.status);
          return;
        }
        const data: ProjetEtudiant[] = await res.json();
        setProjets(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProjets();
  }, []);

  // Filtrer les projets publiés
  const projetsPublies = projets.filter(
    (p) => p.date_publication && p.date_publication !== ""
  );

  // Trier par date décroissante
  const projetsTries = [...projetsPublies].sort(
    (a, b) => new Date(b.date_publication!).getTime() - new Date(a.date_publication!).getTime()
  );

  // Grouper par projet ADA
  const groupes = projetsTries.reduce((acc, projet) => {
    if (!acc[projet.projets_ada_id]) acc[projet.projets_ada_id] = [];
    acc[projet.projets_ada_id].push(projet);
    return acc;
  }, {} as Record<string, ProjetEtudiant[]>);

  // Générer l'URL de la miniature depuis GitHub
  const getThumbnailUrl = (lienGit: string) => {
    try {
      const parts = lienGit.split("/");
      const user = parts[3];
      const repo = parts[4];
      return `https://github.com/${user}/${repo}/blob/main/thumbnail.png?raw=true`;
    } catch {
      return "/default-thumbnail.png";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Projets publiés</h1>

        {Object.entries(groupes).map(([projetAda, items]) => (
          <section key={projetAda} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Projet ADA : {projetAda}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((projet) => (
                <div
                  key={projet.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={getThumbnailUrl(projet.lien_git)}
                    onError={(e) => (e.currentTarget.src = "/default-thumbnail.png")}
                    alt={`Image du projet ${projet.titre}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{projet.titre}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Publié le : {new Date(projet.date_publication!).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Promotion : {projet.promotions_ada_id}
                    </p>
                    <div className="flex flex-col mt-3 gap-1">
                      <a
                        href={projet.lien_git}
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        GitHub →
                      </a>
                      <a
                        href={projet.lien_demo}
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Démo →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
