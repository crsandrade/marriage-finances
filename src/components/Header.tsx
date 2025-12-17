"use client";

import { Heart, Plus, LogOut, Home } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";


interface HeaderProps {
  onAddClick?: () => void;
  onOpenSettings?: () => void;
  userName?: string | null;
  userEmail?: string | null;
}

export function Header({ onAddClick, userName, userEmail, onOpenSettings }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

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

              {userEmail && (
                <p className="text-xs text-slate-400 mt-1">
                  Logado como: <span className="font-medium text-slate-600">{userName ?? userEmail}</span>
                </p>
              )}
            </div>
          </div>

          {/* DIREITA: Botões */}
          <div className="flex items-center gap-2 w-full sm:w-auto">

            {onAddClick && (
              <button
                onClick={onAddClick}
                aria-label="Nova Transação"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm sm:px-6 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Nova Transação</span>
              </button>
            )}

            {pathname !== "/settings" && (
            <button
              onClick={() => router.push("/settings")}
              className="p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Settings size={20} />
            </button>
            )}

            {pathname !== "/dashboard" && (
              <button onClick={() => router.push("/dashboard")}
              className="p-2 rounded-lg hover:bg-slate-100 transition">
                <Home size={20} />
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
