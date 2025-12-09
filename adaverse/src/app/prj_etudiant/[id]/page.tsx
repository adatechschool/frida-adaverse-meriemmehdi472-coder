"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Interface définissant la structure des données d'un projet
interface ProjetDetail {
  id: number;
  titre: string;
  lien_git: string;
  lien_demo: string;
  date_pub: string | null;
  promotion: string;
  projetAda: string;
}

export default function ProjetDetailPage() {
  // Récupération des hooks Next.js
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  // État local
  const [projet, setProjet] = useState<ProjetDetail | null>(null);

  // --- 1. Récupération des données ---
  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    fetch(`/api/prj_etudiant/${id}`)
      .then((res) => {
        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Erreur de l'API :", data.error);
          return;
        }
        setProjet(data);
      })
      .catch(console.error);
  }, [id]);

  // --- 2. Gestion de l'état de chargement ---
  if (!projet)
    return (
      <p className="p-6 text-center text-gray-500 dark:text-gray-400">
        Chargement...
      </p>
    );

  // --- 3. Construction de l'URL de la vignette GitHub ---
  const imageUrl = (() => {
    try {
      // Tente de former l'URL raw.githubusercontent.com
      const parts = projet.lien_git.split("/");
      // parts[3] -> utilisateur, parts[4] -> repo
      return `https://raw.githubusercontent.com/${parts[3]}/${parts[4]}/main/thumbnail.png`;
    } catch {
      // Image de secours si le lien GitHub est invalide
      return "/default-thumbnail.png";
    }
  })();

  // --- 4. Rendu de la carte stylisée ---
  return (
    // Centrage vertical et horizontal de toute la page
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
      
      {/* --- CARTE DÉTAILLÉE --- */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden 
                      transform transition-all duration-300 hover:scale-[1.01]">

        {/* Bandeau coloré avec effet de dégradé et positionnement de l'image */}
        <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-600 flex justify-center items-center relative shadow-inner">
          <img
            src={imageUrl}
            // Gère les erreurs de chargement d'image
            onError={(e) => (e.currentTarget.src = "/default-thumbnail.png")}
            // Image agrandie, centrée et chevauchant le bandeau
            className="w-24 h-24 object-cover rounded-xl shadow-xl border-4 border-white dark:border-gray-800 absolute -bottom-12"
            alt={`Vignette du projet ${projet.titre}`}
          />
        </div>

        {/* Contenu */}
        <div className="p-4 pt-16 text-center flex flex-col items-center">
          
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 line-clamp-2 animate-slide-down">
            {projet.titre}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            Promotion <strong>{projet.promotion}</strong>
          </p>

          {/* Badge centré */}
          <span className="inline-block bg-emerald-600 text-white text-xs px-4 py-1.5 rounded-full mb-4 font-semibold shadow-md mx-auto">
            {projet.projetAda}
          </span>

          {/* Date de publication */}
          {projet.date_pub && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              Publié le {new Date(projet.date_pub).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}

          {/* Boutons d'action (Plus grands et mieux espacés) */}
          <div className="flex flex-col gap-3 w-full mt-auto pt-3">
            <a
              href={projet.lien_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-base text-white bg-green-600 hover:bg-green-700 rounded-lg py-2.5 font-bold transition-colors shadow-md hover:shadow-lg"
            >
              ▶️ Voir la Démo
            </a>

            <a
              href={projet.lien_git}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-base text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg py-2.5 font-bold transition-colors shadow-md hover:shadow-lg"
            >
              💻 Code Source (GitHub)
            </a>

            <button
              onClick={() => router.push("/")}
              className="block w-full text-center text-base text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 rounded-lg py-2.5 font-semibold transition-colors mt-2"
            >
              ⬅ Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}