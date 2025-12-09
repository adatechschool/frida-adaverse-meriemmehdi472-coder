"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

interface ProjetEtudiant {
  id: number;
  titre: string;
  lien_git: string;
  lien_demo: string;
  promotions_ada_id: string;
  projets_ada_id: string;
  date_pub: string | null;
}

interface Props {
  projet: ProjetEtudiant;
}

export default function ProjectCard({ projet }: Props) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (projet.date_pub) {
      const d = new Date(projet.date_pub);
      setFormattedDate(d.toLocaleDateString("fr-FR"));
    }
  }, [projet.date_pub]);

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
    <Link href={`/prj_etudiant/${projet.id}`} className="block">
      <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all duration-500 w-[330px] relative">
        {/* Overlay linear pour un effet sympa */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        
        <div className="relative h-44 bg-linear-to-br from-gray-100 to-gray-200">
          <img
            src={getThumbnailUrl(projet.lien_git)}
            onError={(e) => (e.currentTarget.src = "/default-thumbnail.png")}
            alt={`Image du projet ${projet.titre}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badge promo avec effet glow */}
          {/* <span className="absolute top-3 right-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium group-hover:shadow-purple-500/50 transition-shadow">
            Promo {projet.promotions_ada_id}
          </span> */}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
            {projet.titre}
          </h3>

          {formattedDate && (
            <p className="text-sm text-gray-500 mt-2">
              Publié le <span className="font-medium text-purple-600">{formattedDate}</span>
            </p>
          )}

          {/* Boutons pour Git et Démo, maintenant en <button> pour éviter le nesting */}
          <div className="flex gap-2 mt-4">
            {projet.lien_git && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Empêche le déclenchement du Link parent
                  window.open(projet.lien_git, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                aria-label="Voir sur GitHub"
              >
                <Github size={16} />
                GitHub
              </button>
            )}
            {projet.lien_demo && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Empêche le déclenchement du Link parent
                  window.open(projet.lien_demo, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                aria-label="Voir la démo"
              >
                <ExternalLink size={16} />
                Démo
              </button>
            )}
          </div>

          {/* Bouton principal avec effet stylé */}
          <button className="w-full mt-4 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group-hover:scale-105">
            En savoir plus
          </button>
        </div>
      </div>
    </Link>
  );
}