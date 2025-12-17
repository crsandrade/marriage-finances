"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdatePasswordModal({
  isOpen,
  onClose,
}: UpdatePasswordModalProps) {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleUpdatePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    // 1️⃣ Buscar usuário atual
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      toast.error("Usuário não autenticado");
      setLoading(false);
      return;
    }

    // 2️⃣ Validar senha atual (re-login)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      toast.error("Senha atual incorreta");
      setLoading(false);
      return;
    }

    // 3️⃣ Atualizar senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (updateError) {
      toast.error(updateError.message);
      return;
    }

    toast.success("Senha atualizada com sucesso 🔐");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-xl font-semibold text-white">
          Alterar senha
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Senha atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Atualizando..." : "Atualizar senha"}
          </button>
        </div>
      </div>
    </div>
  );
}
