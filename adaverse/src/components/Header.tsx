
"use client";

export default function Header({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <header>
      <h1>Adaverse</h1>
      <button onClick={onOpenForm}>
        Proposer un projet
      </button>
    </header>
  )
}


