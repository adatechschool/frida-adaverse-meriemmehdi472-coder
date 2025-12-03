"use client";

import { useEffect, useState } from "react";

interface Projet {
  id: number;
  nom: string;
}

export default function Form({ onClose }: { onClose: () => void }) {
  const [isProjets, setIsProjets] = useState<Projet[]>([]);
  const [isFormData, setIsFormData] = useState({
    titre: "",
    lien_git: "",
    lien_demo: "",
    promotions_ada_id: "",
    projets_ada_id: "",
  });

  
  useEffect(() => {
    {
      fetch("/api/prj_etudiant")
        .then(res => res.json())
        .then(json => {
          if (Array.isArray(json)) {
            setIsProjets(json);
          } else {
            console.error("Réponse API inattendue :", json);
            setIsProjets([]);
          }
        })
        .catch(err => console.error(err));
    }
  },[]);


  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIsFormData(prev => ({ ...prev, [name]: value }));
  };

 
  const updateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    console.log("Données envoyées :", {
      ...isFormData,
      illustration:"",
      promotions_ada_id: Number(isFormData.promotions_ada_id),
      projets_ada_id: Number(isFormData.projets_ada_id),
    });

    try {
      const res = await fetch("/api/prj_etudiant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...isFormData,
          promotions_ada_id: Number(isFormData.promotions_ada_id),
          projets_ada_id: Number(isFormData.projets_ada_id),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      
      setIsFormData({
          titre: "",
          lien_git: "",
          lien_demo: "",
          promotions_ada_id: "",
          projets_ada_id: "",
        });
        
        console.log("Projet ajouté :", data.projet);
        
    } catch (err) {
        console.error(err);
        alert("Erreur lors de l'ajout du projet. Vérifiez la console.");
    }
    onClose();
  };

  return (
          <div className="popUp">
            <div className="formContainer">
                <button onClick={onClose}>X</button>
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
                    <option value="5"> Dataviz</option>
                    <option value="6">Adaopte</option>
                    <option value="7">Adaence</option>
                    <option value="8">Adaction</option>
                    <option value="9">Ada Check Events</option>
                    {/* Projets fetchés */}
                    {/* {isProjets.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
                      </option>
                    ))} */}
                  </select>
                </label>

                <button type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        )
    }
  

