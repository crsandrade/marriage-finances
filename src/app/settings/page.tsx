"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Header } from "@/components/Header";
import { ProfileSettingsCard } from "@/components/settings/ProfileSettingsCard";
import { SecuritySettingsCard } from "@/components/settings/SecuritySettingsCard";
import { LogoutCard } from "@/components/settings/LogoutCard";

interface Profile {
  id: string;
  person1_name: string | null;
  person2_name: string | null;
}

/**
 * Página de Configurações.
 * 
 * Permite ao usuário:
 * - Alterar os nomes exibidos no dashboard (Person 1 / Person 2).
 * - Alterar a senha da conta.
 * - Realizar logout.
 * 
 * Protegida por autenticação (redireciona para /login se não houver sessão).
 */
export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data ?? null);
      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Configurações</h1>

        <ProfileSettingsCard profile={profile} />
        <SecuritySettingsCard />
        <LogoutCard />
      </main>
    </div>
  );
}
