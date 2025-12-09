"use client";

import { PlusCircle, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ onOpenForm }: { onOpenForm: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>


      {/* Header principal */}
      <header className="w-full sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo et titre */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30"></div>
                <div className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Adaverse
                  </span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Catalogue des projets étudiants
                </p>
              </div>
            </div>

            {/* Bouton mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Bouton desktop pour proposer un projet - CLASSES EN LIGNE UNIQUE */}
            <button
              onClick={onOpenForm}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-500/50 group relative overflow-hidden"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Proposer un projet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="space-y-4">
              <button
                onClick={() => {
                  onOpenForm();
                  setIsMenuOpen(false);
                }}
                // CLASSES EN LIGNE UNIQUE
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transform transition-all duration-300 hover:scale-[1.02]"
              >
                <PlusCircle size={20} />
                Proposer un projet
              </button>
              
              <div className="pt-4 border-t border-gray-800/50">
                <p className="text-sm text-gray-400 text-center">
                  Explorez les projets innovants de la communauté
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
    </>
  );
}