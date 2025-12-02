"use client"
import { useState,useEffect } from "react"
import  Header  from "../components/Header"

// interface ProjetEtudiant {
//   id: number;
//   titre: string;
//   lien_git: string;
//   lien_demo: string;
//   promotions_ada_id: string;
//   projets_ada_id: string;
//   date_publication: string | null; // ← change le nom si différent
// }

// export default function Accueil() {
//   const [projets, setProjets] = useState<ProjetEtudiant[]>([]);

//   // ---- FETCH DES PROJETS ----
//   useEffect(() => {
//     fetch("/api/prj_etudiants")
//       .then((res) => res.json())
//       .then((data) => setProjets(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ---- 1️⃣ Projets publiés seulement ----
//   const projetsPublies = projets.filter(
//     (p) => p.date_publication && p.date_publication !== ""
//   );

//   // ---- 2️⃣ Tri du plus récent au plus ancien ----
//   const projetsTries = [...projetsPublies].sort(
//     (a, b) =>
//       new Date(b.date_publication!).getTime() -
//       new Date(a.date_publication!).getTime()
//   );

//   // ---- 3️⃣ Groupement par projet Ada ----
//   const groupes = projetsTries.reduce((acc, projet) => {
//     if (!acc[projet.projets_ada_id]) acc[projet.projets_ada_id] = [];
//     acc[projet.projets_ada_id].push(projet);
//     return acc;
//   }, {} as Record<string, ProjetEtudiant[]>);

//   // ---- 4️⃣ URL du thumbnail GitHub ----
//   const getThumbnailUrl = (lienGit: string) => {
//     try {
//       const parts = lienGit.split("/");
//       const user = parts[3];
//       const repo = parts[4];
//       return `https://github.com/${user}/${repo}/blob/main/thumbnail.png?raw=true`;
//     } catch {
//       return "/default-thumbnail.png";
//     }
//   };

//   return (
//     <div>
//       <Header />

//       <main style={{ padding: "20px" }}>
//         <h1>Projets publiés</h1>

//         {Object.entries(groupes).map(([projetAda, items]) => (
//           <section key={projetAda} style={{ marginBottom: "40px" }}>
//             <h2>{projetAda}</h2>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//                 gap: "20px",
//                 marginTop: "10px"
//               }}
//             >
//               {items.map((projet) => (
//                 <div
//                   key={projet.id}
//                   style={{
//                     border: "1px solid #ddd",
//                     borderRadius: "10px",
//                     padding: "15px",
//                     background: "#fff"
//                   }}
//                 >
//                   <img
//                     src={getThumbnailUrl(projet.lien_git)}
//                     onError={(e) =>
//                       (e.currentTarget.src = "/default-thumbnail.png")
//                     }
//                     alt={`thumbnail-${projet.titre}`}
//                     style={{
//                       width: "100%",
//                       height: "150px",
//                       objectFit: "cover",
//                       borderRadius: "8px"
//                     }}
//                   />

//                   <h3>{projet.titre}</h3>

//                   <p>
//                     Publié le :{" "}
//                     {new Date(projet.date_publication!).toLocaleDateString()}
//                   </p>

//                   <p>Promotion : {projet.promotions_ada_id}</p>

//                   <a href={projet.lien_git} target="_blank">
//                     GitHub →
//                   </a>
//                   <br />
//                   <a href={projet.lien_demo} target="_blank">
//                     Démo →
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}
//       </main>
//     </div>
//   );
// }




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
    fetch("/api/prj_etudiants")
      .then((res) => res.json())
      .then((data) => setProjets(data))
      .catch((err) => console.error(err));
  }, []);

  const projetsPublies = projets.filter(
    (p) => p.date_publication && p.date_publication !== ""
  );

  const projetsTries = [...projetsPublies].sort(
    (a, b) =>
      new Date(b.date_publication!).getTime() -
      new Date(a.date_publication!).getTime()
  );

  const groupes = projetsTries.reduce((acc, projet) => {
    if (!acc[projet.projets_ada_id]) acc[projet.projets_ada_id] = [];
    acc[projet.projets_ada_id].push(projet);
    return acc;
  }, {} as Record<string, ProjetEtudiant[]>);

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
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Projets publiés
        </h1>

        {/* --- GROUPEMENT PAR PROJET ADA --- */}
        {Object.entries(groupes).map(([projetAda, items]) => (
          <section key={projetAda} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {projetAda}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((projet) => (
                <div
                  key={projet.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={getThumbnailUrl(projet.lien_git)}
                    onError={(e) =>
                      (e.currentTarget.src = "/default-thumbnail.png")
                    }
                    alt={`Image du projet ${projet.titre}`}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {projet.titre}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Publié le :{" "}
                      {new Date(projet.date_publication!).toLocaleDateString()}
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
