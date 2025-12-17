"use client";

import { useState } from "react";
import { UpdatePasswordModal } from "@/components/UpdatePasswordModal";

export function SecuritySettingsCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-lg font-semibold mb-2">Segurança</h2>

        <p className="text-sm text-slate-500 mb-4">
          Atualize sua senha de acesso.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
        >
          Alterar senha
        </button>
      </div>

      <UpdatePasswordModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
