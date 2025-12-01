import { useEffect, useState } from "react"

interface Projets {
    id: number;
    nom: string;
}

export default function Header() {
    const [isProjets, setIsProjets] = useState<Projets[]>([])
    const [isForm, setIsForm] = useState(false)
    const [isFormData, setIsFormData] = useState({
        titre:"",
        lien_git:"",
        lien_demo:"",
        promotions_ada_id:"",
        projets_ada_id:"",
    })
useEffect(()=>{
    if(isForm){
        fetch("/prj_etudiants")
        .then(res=> res.json())
        .then(data => setIsProjets(data))
        .catch(err => console.error(err))

    }
},[isForm])
 const updateForm = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 const { name, value } = e.target;
  setIsFormData(prev => ({ ...prev, [name]: value }))
 }

const updateSubmit= async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
        await fetch("/prj_etudiants",{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(isFormData),
        })
//         setIsForm(false)
//         setIsFormData({
// titre: "",
// lien_git: "",
// lien_demo: "",
// promotions_ada_id: "",
// projets_ada_id: "",
// });
        

    } catch(err){
        console.error(err)
    }  
}

    return(
    <div>
        <header>
        <h1>Bienvenue sur Adaverse</h1>
        <button id="btnSubmit" onClick={()=> setIsForm(true)}>Soumettre un projet
        </button>

        {isForm && (
            <div className ="popUp">
            <div className= "formContainer">
                <h2>Proposez un projet</h2>
                <form  onSubmit={updateSubmit}>
                 <h3>TITRE</h3>
                  <input type="text" name="titre" placeholder="Titre du projet"  value={isFormData.titre} onChange={updateForm} required/>
                 <h3> URL Github</h3>
                  <input type="text" name="lien_git" placeholder="Lien github" value={isFormData.lien_git} onChange={updateForm} required/>
                  <h3>URL Démo</h3>
                    <input type="text" name="lien_demo" placeholder="Lien demo"  value={isFormData.lien_demo} onChange={updateForm} required/>
                  <h3> Promotions ADA</h3>
                   <label> Choisir une promotion
                    <select name="promotions_ada_id" value={isFormData.promotions_ada_id} onChange={updateForm} required>
                        <option value="">Selectionner une promo</option>
                        <option value="fatoumata_kebe">Fatoumata Kébé</option>
                        <option value="frances_spence">Frances Spence</option>
                        <option value="frida_khalo">Frida Kahlo</option>
                        <option value="grace_hoper">Grace Hopper</option>
                    </select>
                    </label>
                    <h3>Projets ADA </h3>
                    <label>Choisir un projet
                    <select name="projets_ada_id" value={isFormData.projets_ada_id} onChange={updateForm} required>
                        <option value="">Sélectionner un projet </option> 
                        <option value="ada_quiz">Ada Quiz</option>
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
    )
}





