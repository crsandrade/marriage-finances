"use client";

import { useState } from "react";
import { UpdatePasswordModal } from "@/components/UpdatePasswordModal";

export function SecuritySettingsCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-card text-card-foreground rounded-xl shadow border border-border p-6">
        <h2 className="text-lg font-semibold mb-2 text-foreground">Segurança</h2>

        <p className="text-sm text-muted-foreground mb-4">
          Atualize sua senha de acesso.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
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
