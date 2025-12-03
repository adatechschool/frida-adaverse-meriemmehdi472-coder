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

  // ---- Envoi du formulaire ----
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { titre, date_crea, projets_ada_id, promotions_ada_id } = formData;

    if (!titre || !date_crea || !projets_ada_id || !promotions_ada_id) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      const res = await fetch("/api/prj_etudiant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          promotions_ada_id: Number(formData.promotions_ada_id),
          projets_ada_id: Number(formData.projets_ada_id),
        }),
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

  // ---- Mise à jour des champs ----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header className="bg-white shadow p-4">
      <h1 className="text-xl font-bold mb-4">Ajouter un projet</h1>
      <form className="flex flex-col gap-2 max-w-md" onSubmit={handleSubmit}>
        <input
          name="titre"
          type="text"
          placeholder="Titre"
          value={formData.titre}
          onChange={handleChange}
        />
        <input
          name="date_crea"
          type="date"
          placeholder="Date de création"
          value={formData.date_crea}
          onChange={handleChange}
        />
        <select
          name="projets_ada_id"
          value={formData.projets_ada_id}
          onChange={handleChange}
        >
          <option value="">Sélectionner un projet</option>
          <option value="1">Adaverse</option>
        </select>
        <select
          name="promotions_ada_id"
          value={formData.promotions_ada_id}
          onChange={handleChange}
        >
          <option value="">Sélectionner une promotion</option>
          <option value="2">Promotion 2</option>
          <option value="3">Promotion 3</option>
        </select>
        <input
          name="lien_git"
          type="text"
          placeholder="Lien GitHub"
          value={formData.lien_git}
          onChange={handleChange}
        />
        <input
          name="lien_demo"
          type="text"
          placeholder="Lien démo"
          value={formData.lien_demo}
          onChange={handleChange}
        />
        <input
          name="adrs_web_perso"
          type="text"
          placeholder="Adresse Web Perso"
          value={formData.adrs_web_perso}
          onChange={handleChange}
        />
        <input
          name="illustration"
          type="text"
          placeholder="Illustration"
          value={formData.illustration}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mt-2"
        >
          Ajouter
        </button>

        {isForm && (
          <div className="popUp">
            <div className="formContainer">
              <h2>Proposez un projet</h2>

              <form onSubmit={updateSubmit}>
                <h3>TITRE</h3>
                <input
                  type="text"
                  name="titre"
                  placeholder="Titre du projet"
                  value={isFormData.titre}
                  onChange={updateForm}
                  required
                />

                <h3>URL Github</h3>
                <input
                  type="text"
                  name="lien_git"
                  placeholder="Lien github"
                  value={isFormData.lien_git}
                  onChange={updateForm}
                  required
                />

                <h3>URL Démo</h3>
                <input
                  type="text"
                  name="lien_demo"
                  placeholder="Lien demo"
                  value={isFormData.lien_demo}
                  onChange={updateForm}
                  required
                />

                <h3>Promotions ADA</h3>
                <label>
                  Choisir une promotion
                  <select
                    name="promotions_ada_id"
                    value={isFormData.promotions_ada_id}
                    onChange={updateForm}
                    required
                  >
                    <option value="">Sélectionner une promo</option>
                    <option value="1">Fatoumata Kébé</option>
                    <option value="2">Frances Spence</option>
                    <option value="3">Frida Kahlo</option>
                    <option value="4">Grace Hopper</option>
                  </select>
                </label>

                <h3>Projets ADA</h3>
                <label>
                  Choisir un projet
                  <select
                    name="projets_ada_id"
                    value={isFormData.projets_ada_id}
                    onChange={updateForm}
                    required
                  >
                    <option value="">Sélectionner un projet</option>

                    {/* Projet de base */}
                    <option value="4">Ada Quiz</option>

                    {/* Projets fetchés */}
                    {isProjets.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
                      </option>
                    ))}
                  </select>
                </label>

                <button type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
