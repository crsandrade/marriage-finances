"use client";

import { Heart, Plus, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onAddClick: () => void;
  userName?: string | null;
  userEmail?: string | null;
}

export function Header({ onAddClick, userName, userEmail }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* ESQUERDA: Logo + Título */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-2xl shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-slate-900">Finanças do Casal</h1>
              <p className="text-slate-500 text-sm">
                Gerenciamento financeiro compartilhado
              </p>

              {/* 🔵 Usuário logado */}
              {userEmail && (
                <p className="text-xs text-slate-400 mt-1">
                  Logado como: <span className="font-medium text-slate-600">{userName ?? userEmail}</span>
                </p>
              )}
            </div>
          </div>

          {/* DIREITA: Nova Transação + Logout */}
          <div className="flex items-center gap-2 w-full sm:w-auto">

            {/* Botão Nova Transação (original) */}
            <button
              onClick={onAddClick}
              aria-label="Nova Transação"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm sm:px-6 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nova Transação</span>
            </button>

            {/* 🔴 Botão Logout */}
            <button
              onClick={handleLogout}
              aria-label="Sair"
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-2 text-sm sm:px-5 sm:py-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
