import { useState } from "react"

export default function Header() {
    const [isForm, setIsForm] = useState(false)
    return(
    <div>
        <header>
        <h1>Bienvenue sur Adaverse</h1>
        <button id="btnSubmit" onClick={()=> setIsForm(true)}>Soumettre un projet
        </button>

        {isForm && (
            <div className ="popUp">
            <div className= "fromContainer">
                <h2>Proposez un projet</h2>
                <form>
                    <h3>Titre</h3>
                    <input type="text" placeholder="Titre du projet"/>
                    <h3> URL Github</h3>
                    <input type="text" placeholder="n"/>
                    <h3>URL Démo</h3>
                    <input type="text" placeholder="n"/>
                     <h3> Promotions ADA</h3>
                    <select>
                        <option value=""> </option>
                    </select>
                    <h3>Projets ADA </h3>
                    <select>
                        <option value=""> </option>   
                    </select>
                </form>

            </div>
            </div>
        )}
        </header>
    </div>
    )
}