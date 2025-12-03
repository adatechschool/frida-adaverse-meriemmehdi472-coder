"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
  const params = useParams();         
  const id = params?.id;              
  const router = useRouter();
  const [projet, setProjet] = useState<ProjetDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/prj_etudiant/${id}`) 
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        setProjet(data);
      })
      .catch(console.error);
  }, [id]);

  if (!projet) return <p className="p-6">Chargement...</p>;

  const imageUrl = (() => {
    try {
      const parts = projet.lien_git.split("/");
      return `https://raw.githubusercontent.com/${parts[3]}/${parts[4]}/main/thumbnail.png`;
    } catch {
      return "/default-thumbnail.png";
    }
  })();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => router.push("/")} className="text-blue-600 underline mb-6">
        ⬅ Retour à l'accueil
      </button>

      <h1 className="text-3xl font-bold mb-4">{projet.titre}</h1>
      <img src={imageUrl} onError={e => (e.currentTarget.src = "/default-thumbnail.png")} className="w-full rounded-xl shadow mb-6" alt={projet.titre} />

      {projet.date_pub && <p className="text-gray-500 mb-2"> Publié le : {new Date(projet.date_pub).toLocaleDateString()}</p>}
      <p className="text-lg mb-1"> Promotion : <strong>{projet.promotion}</strong></p>
      <p className="text-lg mb-4"> Projet ADA : <strong>{projet.projetAda}</strong></p>

      <a href={projet.lien_demo} target="_blank" className="text-blue-600 underline text-lg block mb-2">▶️ Voir la démo</a>
      <a href={projet.lien_git} target="_blank" className="text-blue-600 underline text-lg block">💻 Voir sur GitHub</a>
    </div>
  );
}
