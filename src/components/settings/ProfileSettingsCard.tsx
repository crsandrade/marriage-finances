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
      <div className="bg-card text-card-foreground rounded-xl shadow border border-border p-6">
        <h2 className="text-lg font-semibold mb-2 text-foreground">Perfil</h2>

        <p className="text-sm text-muted-foreground mb-4">
          Edite os nomes utilizados no sistema.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
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
