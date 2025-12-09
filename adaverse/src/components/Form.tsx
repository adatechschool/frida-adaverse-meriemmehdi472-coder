"use client";

import { useEffect, useState, useCallback } from "react";
import { Github, ExternalLink, X, Send, Sparkles, BookOpen, Users, FolderOpen } from "lucide-react";

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
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  // Bloque le scroll en arrière-plan
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    fetch("/api/prj_etudiant")
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          setIsProjets(json.length > 0 ? json : [
            { id: 4, nom: "Ada Quiz" },
            { id: 5, nom: "Dataviz" },
            { id: 6, nom: "Adaopte" }
          ]);
        } else {
          setIsProjets([{ id: 4, nom: "Ada Quiz" }, { id: 5, nom: "Dataviz" }, { id: 6, nom: "Adaopte" }]);
        }
      })
      .catch(() => {
        setIsProjets([{ id: 4, nom: "Ada Quiz" }, { id: 5, nom: "Dataviz" }, { id: 6, nom: "Adaopte" }]);
      });
  }, []);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIsFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        titre: "", lien_git: "", lien_demo: "", promotions_ada_id: "", projets_ada_id: "",
      });

      setTimeout(() => handleClose(), 500);
    } catch {
      alert("Erreur lors de l'ajout du projet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- CSS POUR MODAL CENTRÉ ----
  const modalClasses = `fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`;

  const contentClasses = `bg-gradient-to-br from-gray-900 to-indigo-900 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative border border-purple-600/50 text-white ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`;

  const InputField = ({ label, name, type = "text", placeholder, value, onChange, required = true, Icon }: any) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 font-medium text-gray-300">
        <Icon size={18} className="text-indigo-400" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
      />
    </div>
  );

  return (
    <div className={modalClasses} onClick={handleClose}>
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>

        {/* Bouton Fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all"
        >
          <X size={20} />
        </button>

        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Proposer un projet Étudiant
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={updateSubmit} className="space-y-6">
          <InputField label="Titre du projet" name="titre" placeholder="Ex: Refonte du Portfolio Ada" value={isFormData.titre} onChange={updateForm} Icon={BookOpen} />
          <InputField label="URL GitHub" name="lien_git" type="url" placeholder="https://github.com/.." value={isFormData.lien_git} onChange={updateForm} Icon={Github} />
          <InputField label="URL Démo (Facultatif)" name="lien_demo" type="url" placeholder="https://demo.com" value={isFormData.lien_demo} onChange={updateForm} required={false} Icon={ExternalLink} />

          {/* Selects */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium text-gray-300">
              <Users size={18} className="text-indigo-400" /> Promotion ADA
            </label>
            <select name="promotions_ada_id" value={isFormData.promotions_ada_id} onChange={updateForm} required className="w-full px-4 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
              <option value="">Sélectionnez une promotion</option>
              <option value="1">Fatoumata Kébé (P1)</option>
              <option value="2">Frances Spence (P2)</option>
              <option value="3">Frida Kahlo (P3)</option>
              <option value="4">Grace Hopper (P4)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium text-gray-300">
              <FolderOpen size={18} className="text-indigo-400" /> Type de Projet ADA
            </label>
            <select name="projets_ada_id" value={isFormData.projets_ada_id} onChange={updateForm} required className="w-full px-4 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
              <option value="">Sélectionnez un projet</option>
              {isProjets.map(p => (
                <option key={p.id} value={p.id}>{p.nom}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Envoi..." : "Publier le projet"}
          </button>
        </form>


      </div>
    </div>
    
  );
}
