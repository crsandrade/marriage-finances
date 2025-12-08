"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react";

interface EditNamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onSave?: () => void; // callback para recarregar dados
}

export default function EditNamesModal({ isOpen, onClose, profile, onSave }: EditNamesModalProps) {
  const [person1Name, setPerson1Name] = useState(profile?.person1_name || "");
  const [person2Name, setPerson2Name] = useState(profile?.person2_name || "");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSave() {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        person1_name: person1Name,
        person2_name: person2Name,
      })
      .eq("id", profile.id);

    setLoading(false);

    if (error) {
      alert("Erro ao salvar: " + error.message);
      return;
    }

    if (onSave) onSave();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Configurações</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Pessoa 1 */}
        <label className="block mb-3">
          <span className="text-sm text-gray-600">Nome da Pessoa 1</span>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            value={person1Name}
            onChange={(e) => setPerson1Name(e.target.value)}
          />
        </label>

        {/* Input Pessoa 2 */}
        <label className="block mb-3">
          <span className="text-sm text-gray-600">Nome da Pessoa 2</span>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            value={person2Name}
            onChange={(e) => setPerson2Name(e.target.value)}
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>

      </div>
    </div>
  );
}
