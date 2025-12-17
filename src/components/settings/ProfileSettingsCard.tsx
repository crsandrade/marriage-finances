"use client";

import { useState } from "react";
import EditNamesModal from "@/components/EditNamesModal";

interface Profile {
  id: string;
  person1_name: string | null;
  person2_name: string | null;
}

interface ProfileSettingsCardProps {
  profile: Profile | null;
}

export function ProfileSettingsCard({ profile }: ProfileSettingsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-lg font-semibold mb-2">Perfil</h2>

        <p className="text-sm text-slate-500 mb-4">
          Edite os nomes utilizados no sistema.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
        >
          Editar nomes
        </button>
      </div>

      <EditNamesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        profile={profile}
      />
    </>
  );
}
