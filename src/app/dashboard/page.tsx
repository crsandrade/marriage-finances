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
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
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

  // 🔄 Recarregar transações após create/edit/delete
  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  // ➕ Criar transação (NOVO)
  const createTransaction = async (transaction: Partial<Transaction>) => {
    const created = await apiAddTransaction(transaction as Omit<Transaction, "id">);
    setTransactions((prev) => [created, ...prev]);
  };

  // ✏️ Editar transação (NOVO)
  const updateTransaction = async (transaction: Partial<Transaction>) => {
    if (!transaction.id) return;

    const { error } = await supabase
      .from("transactions")
      .update({
        type: transaction.type,
        owner: transaction.owner,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        isRecurring: transaction.isRecurring,
        isInstallment: transaction.isInstallment,
        installmentCurrent: transaction.installmentCurrent,
        installmentTotal: transaction.installmentTotal,
      })
      .eq("id", transaction.id);

    if (error) console.error(error);
  };

  // ❌ Corrigir nome da função
  const handleDelete = async (id: string) => {
    await apiDeleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // 🟦 Abrir modal para editar
  const handleEdit = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setShowForm(true);
  };

  // 🟩 Abrir modal para criar
  const openNewTransaction = () => {
    setTransactionToEdit(null);
    setShowForm(true);
  };

  // 🟪 Enviar (criar ou editar)
  const handleSubmitFromModal = async (transaction: Partial<Transaction>) => {
    if (transaction.id) {
      // EDITAR
      await updateTransaction(transaction);
    } else {
      // CRIAR
      await createTransaction(transaction);
    }

    await loadTransactions();
    setShowForm(false);
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <Header
        onAddClick={openNewTransaction}
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
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

          )}
        </div>
      </main>

      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitFromModal}  // vou te ensinar já já
          transactionToEdit={transactionToEdit} // ← chave da edição
        />
      )}
    </div>
  );
}
