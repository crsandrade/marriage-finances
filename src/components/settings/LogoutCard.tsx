"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LogoutCard() {
  const router = useRouter();

  async function handleLogout() {
    const confirm = window.confirm(
      "Tem certeza que deseja sair?"
    );

    if (!confirm) return;

    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <h2 className="text-lg font-semibold mb-2 text-red-600">
        Sair
      </h2>

      <p className="text-sm text-slate-500 mb-4">
        Encerrar sua sessão atual.
      </p>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Sair da conta
      </button>
    </div>
  );
}
