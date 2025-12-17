"use client";

import { useState } from "react";
import { Shield, KeyRound } from "lucide-react";
import { UpdatePasswordModal } from "@/components/UpdatePasswordModal";

export function AccountSecurityCard() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-cyan-500" />
          <h3 className="text-lg font-semibold text-white">
            Segurança da conta
          </h3>
        </div>

        <p className="mb-6 text-sm text-zinc-400">
          Atualize sua senha para manter sua conta segura.
        </p>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-700"
        >
          <KeyRound size={16} />
          Alterar senha
        </button>
      </div>

      <UpdatePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
