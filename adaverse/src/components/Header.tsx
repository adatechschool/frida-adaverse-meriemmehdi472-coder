// "use client";

// import { useEffect, useState } from "react";

// interface Projet {
//   id: number;
//   nom: string;
// }

// export default function Header() {
//   const [isProjets, setIsProjets] = useState<Projet[]>([]);
//   const [isForm, setIsForm] = useState(false);
//   const [isFormData, setIsFormData] = useState({
//     titre: "",
//     adrs_web_perso: "",
//     illustration: "",
//     lien_git: "",
//     lien_demo: "",
//     date_crea: "",
//     promotions_ada_id: "",
//     projets_ada_id: "",
//   });

//   // ---- Fetch des projets ----
//   useEffect(() => {
//     if (isForm) {
//       fetch("/api/prj_etudiant")
//         .then(res => res.json())
//         .then(json => {
//           setIsProjets(Array.isArray(json) ? json : []);
//         })
//         .catch(err => console.error(err));
//     }
//   }, [isForm]);

//   // ---- Mise à jour du formulaire ----
//   const updateForm = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setIsFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // ---- Envoi du POST ----
//   const updateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/prj_etudiant", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...isFormData,
//           date_pub: isFormData.date_crea || null, // Adapté à ta table
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Erreur serveur");

//       setIsForm(false);
//       setIsFormData({
//         titre: "",
//         adrs_web_perso: "",
//         illustration: "",
//         lien_git: "",
//         lien_demo: "",
//         date_crea: "",
//         promotions_ada_id: "",
//         projets_ada_id: "",
//       });

//       console.log("Projet ajouté :", data.projet);
//     } catch (err) {
//       console.error(err);
//       alert("Erreur lors de l'ajout du projet. Vérifiez la console.");
//     }
//   };

//   return (
//     <div>
//       <header>
//         <h1>Bienvenue sur Adaverse</h1>

//         <button id="btnSubmit" onClick={() => setIsForm(true)}>
//           Soumettre un projet
//         </button>

//         {isForm && (
//           <div className="popUp">
//             <div className="formContainer">
//               <h2>Proposez un projet</h2>

//               <form onSubmit={updateSubmit}>
//                 <h3>TITRE</h3>
//                 <input
//                   type="text"
//                   name="titre"
//                   placeholder="Titre du projet"
//                   value={isFormData.titre}
//                   onChange={updateForm}
//                   required
//                 />

//                 <h3>URL Github</h3>
//                 <input
//                   type="text"
//                   name="lien_git"
//                   placeholder="Lien github"
//                   value={isFormData.lien_git}
//                   onChange={updateForm}
//                   required
//                 />

//                 <h3>URL Démo</h3>
//                 <input
//                   type="text"
//                   name="lien_demo"
//                   placeholder="Lien demo"
//                   value={isFormData.lien_demo}
//                   onChange={updateForm}
//                   required
//                 />

//                 <h3>Promotions ADA</h3>
//                 <label>
//                   Choisir une promotion
//                   <select
//                     name="promotions_ada_id"
//                     value={isFormData.promotions_ada_id}
//                     onChange={updateForm}
//                     required
//                   >
//                     <option value="">Sélectionner une promo</option>
//                     <option value="fatoumata_kebe">Fatoumata Kébé</option>
//                     <option value="frances_spence">Frances Spence</option>
//                     <option value="frida_khalo">Frida Kahlo</option>
//                     <option value="grace_hoper">Grace Hopper</option>
//                   </select>
//                 </label>

//                 <h3>Projets ADA</h3>
//                 <label>
//                   Choisir un projet
//                   <select
//                     name="projets_ada_id"
//                     value={isFormData.projets_ada_id}
//                     onChange={updateForm}
//                     required
//                   >
//                     <option value="">Sélectionner un projet</option>
//                     <option value="adaverse">Adaverse</option>
//                     {isProjets.map(p => (
//                       <option key={p.id} value={p.id}>
//                         {p.nom}
//                       </option>
//                     ))}
//                   </select>
//                 </label>

    

//                 <button type="submit">Envoyer</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

interface Projet {
  id: number;
  nom: string;
}

export default function Header() {
  const [isProjets, setIsProjets] = useState<Projet[]>([]);
  const [isForm, setIsForm] = useState(false);

  const [isFormData, setIsFormData] = useState({
    titre: "",
    lien_git: "",
    lien_demo: "",
    promotions_ada_id: "",
    projets_ada_id: "",
  });

  // ---- Fetch des projets ----
  useEffect(() => {
    if (isForm) {
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
  }, [isForm]);

  // ---- Mise à jour du formulaire ----
  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIsFormData(prev => ({ ...prev, [name]: value }));
  };

  // ---- Envoi du POST ----
  const updateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // debug data envoyées
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

      setIsForm(false);

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
  };

  return (
    <div>
      <header>
        <h1>Bienvenue sur Adaverse</h1>

        <button id="btnSubmit" onClick={() => setIsForm(true)}>
          Soumettre un projet
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