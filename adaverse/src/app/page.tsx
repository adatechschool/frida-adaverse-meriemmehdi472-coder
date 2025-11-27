import Link from "next/link"

export default function Accueil() {
    return(
    <div>
        <h1>Bienvenue sur Adaverse</h1>
        <h1>Vous pouvez proposer un ou plusieurs projets </h1>
        <button>
            <Link href="/proposez-un-projet">Proposez un projet</Link>
        </button>
    </div>
    )
}
