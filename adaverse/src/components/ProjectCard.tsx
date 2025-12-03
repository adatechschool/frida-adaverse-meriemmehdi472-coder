"use client";
import Link from "next/link";

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
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <img
          src={getThumbnailUrl(projet.lien_git)}
          onError={(e) => (e.currentTarget.src = "/default-thumbnail.png")}
          alt={`Image du projet ${projet.titre}`}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-bold">{projet.titre}</h3>
          {projet.date_pub && (
            <p className="text-sm text-gray-500">
              Publié le : {new Date(projet.date_pub).toLocaleDateString()}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Promotion : {projet.promotions_ada_id}
          </p>
        </div>
      </div>
    </Link>
  );
}


