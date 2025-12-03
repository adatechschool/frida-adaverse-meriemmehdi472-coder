"use client";

import { useState } from "react";

interface FormData {
  titre: string;
  adrs_web_perso: string;
  illustration: string;
  lien_git: string;
  lien_demo: string;
  date_crea: string;
  date_pub: string;
  promotions_ada_id: string;
  projets_ada_id: string;
}

export default function Header() {
  const [formData, setFormData] = useState<FormData>({
    titre: "",
    adrs_web_perso: "",
    illustration: "",
    lien_git: "",
    lien_demo: "",
    date_crea: "",
    date_pub: "",
    promotions_ada_id: "",
    projets_ada_id: "",
  });

  const updateSubmit = async () => {
    const { titre, date_crea, projets_ada_id, promotions_ada_id } = formData;

    if (!titre || !date_crea || !projets_ada_id || !promotions_ada_id) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      const res = await fetch("/api/prj_etudiant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Erreur POST:", err);
        alert("Erreur lors de l'ajout du projet.");
        return;
      }

      alert("Projet ajouté avec succès !");
      setFormData({
        titre: "",
        adrs_web_perso: "",
        illustration: "",
        lien_git: "",
        lien_demo: "",
        date_crea: "",
        date_pub: "",
        promotions_ada_id: "",
        projets_ada_id: "",
      });
    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    }
  };

  return (
    <header className="bg-white shadow p-4">
      <h1 className="text-xl font-bold mb-4">Ajouter un projet</h1>
      <div className="flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Titre"
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date de création"
          value={formData.date_crea}
          onChange={(e) => setFormData({ ...formData, date_crea: e.target.value })}
        />
        <select
          value={formData.projets_ada_id}
          onChange={(e) => setFormData({ ...formData, projets_ada_id: e.target.value })}
        >
          <option value="">Sélectionner un projet</option>
          <option value="1">Adaverse</option>
        </select>
        <select
          value={formData.promotions_ada_id}
          onChange={(e) => setFormData({ ...formData, promotions_ada_id: e.target.value })}
        >
          <option value="">Sélectionner une promotion</option>
          <option value="2">Promotion 2</option>
          <option value="3">Promotion 3</option>
        </select>
        <input
          type="text"
          placeholder="Lien GitHub"
          value={formData.lien_git}
          onChange={(e) => setFormData({ ...formData, lien_git: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lien démo"
          value={formData.lien_demo}
          onChange={(e) => setFormData({ ...formData, lien_demo: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded mt-2"
          onClick={updateSubmit}
        >
          Ajouter
        </button>
      </div>
    </header>
  );
}
