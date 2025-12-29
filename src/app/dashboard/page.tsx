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
import { MonthBar } from "../../components/MonthBar";
import { YearSelect } from "../../components/YearSelect";
import EditNamesModal from "@/components/EditNamesModal";
import { AccountSecurityCard } from "@/components/AccountSecurityCard";



interface Profile {
  id: string;

  created_at: string;

  person1_name: string | null;
  person2_name: string | null;
}

/**
 * Página principal do Dashboard.
 * 
 * Reúne os componentes principais:
 * - Header: Navegação e ações globais.
 * - Dashboard (Resumo): Cards com totais e gráficos.
 * - TransactionList: Tabela detalhada de transações.
 * - TransactionForm: Modal para criar/editar transações.
 * 
 * Gerencia o estado global da tela:
 * - Lista de transações (transactions).
 * - Perfil do usuário (profile).
 * - Filtros de data (Mês/Ano).
 * - Modais (showForm, isModalOpen).
 */
export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error) setProfile(data);
  }



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

  useEffect(() => {
    if (!user) return;
    loadProfile(user.id);
  }, [user]);


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

  const filteredTransactions = transactions.filter((t) => {
    if (!t.date) return false;

    const d = new Date(t.date);
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return month === selectedMonth && year === selectedYear;
  });

  function openSettingsModal() {
    setIsModalOpen(true);
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <main className="max-w-7xl mx-auto px-4 py-8">


        <div className="flex flex-col gap-4 mb-6">

          <Header
            onAddClick={openNewTransaction}
            userName={profile?.person1_name || user?.email || "Usuário"}
            userEmail={user?.email ?? null}
            onOpenSettings={openSettingsModal}
          />


          {profile && (
            <div className="mb-6 p-4 bg-white rounded-xl shadow border">
              <h2 className="text-lg font-semibold">
                Bem-vindo, {profile.person1_name ?? user?.email}!
              </h2>
            </div>
          )}

          <EditNamesModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            profile={profile}
            onSave={() => loadProfile(user.id)}

          />


          <YearSelect
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          <MonthBar
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

        </div>

        <Dashboard transactions={filteredTransactions}
          person1Name={profile?.person1_name ?? "Pessoa 1"}
          person2Name={profile?.person2_name ?? "Pessoa 2"}
        />

        <div className="mt-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center text-slate-500">
              Carregando...
            </div>
          ) : (
            <TransactionList
              transactions={filteredTransactions}
              onDelete={handleDelete}
              onEdit={handleEdit}
              person1Name={profile?.person1_name ?? 'Pessoa 1'}
              person2Name={profile?.person2_name ?? 'Pessoa 2'}
            />
          )}
        </div>
      </main>

      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitFromModal}  //
          transactionToEdit={transactionToEdit}
          person1Name={profile?.person1_name ?? 'Pessoa 1'}
          person2Name={profile?.person2_name ?? 'Pessoa 2'}
        />
      )}

    </div>
  );
}
