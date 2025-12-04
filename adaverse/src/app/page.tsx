"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";

interface ProjetEtudiant {
  id: number;
  titre: string;
  lien_git: string;
  lien_demo: string | null;
  promotions_ada_id: number;
  projets_ada_id: number;
  date_pub: string | null;
  adrs_web_perso: string | null;
  illustration: string | null;
}

export default function Accueil() {
  const [projets, setProjets] = useState<ProjetEtudiant[]>([]);

  const fetchProjets = async () => {
    try {
      const res = await fetch("/api/prj_etudiant");
      const text = await res.text();
      const data: ProjetEtudiant[] = text ? JSON.parse(text) : [];
      setProjets(data);
    } catch (err) {
      console.error("Erreur fetch projets :", err);
      setProjets([]);
    }
  };

  useEffect(() => {
    fetchProjets();
  }, []);

  const projetsPublies = projets.filter(p => p.date_pub);
  const projetsTries = [...projetsPublies].sort(
    (a, b) => new Date(b.date_pub!).getTime() - new Date(a.date_pub!).getTime()
  );

  const getThumbnailUrl = (proj: ProjetEtudiant) => {
    if (proj.illustration) return proj.illustration;
    const parts = proj.lien_git.split("/");
    if (parts.length >= 5) {
      return `https://github.com/${parts[3]}/${parts[4]}/blob/main/thumbnail.png?raw=true`;
    }
    return "/default-thumbnail.png";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onProjetAjoute={fetchProjets} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Projets publiés</h1>

        {projetsTries.length === 0 && <p>Aucun projet publié pour le moment.</p>}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projetsTries.map(projet => (
            <div key={projet.id} className="bg-white shadow-md rounded-xl">
              <img
                src={getThumbnailUrl(projet)}
                onError={e => (e.currentTarget.src = "/default-thumbnail.png")}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-bold">{projet.titre}</h3>
                <p>Publié le : {projet.date_pub ? new Date(projet.date_pub).toLocaleDateString() : "-"}</p>
                <a href={projet.lien_git} target="_blank" className="text-blue-600 hover:underline">GitHub →</a>
                {projet.lien_demo && (
                  <a href={projet.lien_demo} target="_blank" className="ml-2 text-green-600 hover:underline">Démo →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
