"use client";

import { useState } from "react";
import { Shield, KeyRound } from "lucide-react";
import { UpdatePasswordModal } from "@/components/UpdatePasswordModal";

export function AccountSecurityCard() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Segurança da conta
          </h3>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Atualize sua senha para manter sua conta segura.
        </p>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary text-secondary-foreground px-4 py-2 text-sm transition hover:bg-secondary/80"
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
