"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard";
import { TransactionForm } from "../../components/TransactionForm";
import { TransactionList } from "../../components/TransactionList";
import { Header } from "../../components/Header";
import type { Transaction } from "../../types/financial";
import {
  getTransactions,
  addTransaction as apiAddTransaction,
  deleteTransaction as apiDeleteTransaction,
} from "../../services/api";

import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  name: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadEverything = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("Nenhum usuário logado");
          return;
        }

        setUser(user);

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profileData || null);

        // 3️⃣ BUSCAR TRANSAÇÕES (sua lógica original)
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error(error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadEverything();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    const created = await apiAddTransaction(transaction);
    setTransactions([created, ...transactions]);
    setShowForm(false);
  };

  const deleteTransaction = async (id: string) => {
    await apiDeleteTransaction(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <Header
        onAddClick={() => setShowForm(true)}
        userName={profile?.name}
        userEmail={user?.email}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {profile && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow border">
            <h2 className="text-lg font-semibold">
              Bem-vindo, {profile.name ?? user?.email}!
            </h2>
            <p className="text-sm text-slate-600">
              ID do usuário: {user?.id}
            </p>
          </div>
        )}

        <Dashboard transactions={transactions} />

        <div className="mt-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center text-slate-500">
              Carregando...
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          )}
        </div>
      </main>

      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSubmit={addTransaction}
        />
      )}
    </div>
  );
}
