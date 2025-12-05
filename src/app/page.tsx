"use client";
import { useEffect, useState } from 'react';
import { Dashboard } from '../components/Dashboard';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { Header } from '../components/Header';
import type { Transaction } from '../types/financial';
import { getTransactions, addTransaction as apiAddTransaction, deleteTransaction as apiDeleteTransaction } from '../services/api';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const created = await apiAddTransaction(transaction);
    setTransactions([created, ...transactions]);
    setShowForm(false);
  };

  const deleteTransaction = async (id: string) => {
    await apiDeleteTransaction(id);
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddClick={() => setShowForm(true)} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard transactions={transactions} />
        <div className="mt-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center text-slate-500">Carregando...</div>
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
