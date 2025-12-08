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
        <div className="flex items-center justify-between">

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
          <div className="flex items-center gap-4">

            {/* Botão Nova Transação (original) */}
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Nova Transação
            </button>

            {/* 🔴 Botão Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
