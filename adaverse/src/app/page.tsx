"use client"
import { useState } from "react"
import  Header  from "../components/Header"

export default function Accueil() {
    const [isForm, setIsForm] = useState(false)

    return(
    <div>
      
        <Header/>
        <h1>Vous pouvez proposer un ou plusieurs projets </h1>
       
    </div>
    )
}
