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
  const [showNames, setShowNames] = useState(false);
  const [personNames, setPersonNames] = useState({ person1: 'Rafael', person2: 'Lavínia' });

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
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('mf.settings') : null;
      const parsed = raw ? JSON.parse(raw) : {};
      setPersonNames({
        person1: typeof parsed.person1 === 'string' ? parsed.person1 : 'Rafael',
        person2: typeof parsed.person2 === 'string' ? parsed.person2 : 'Lavínia',
      });
    } catch {}
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

  const saveNames = () => {
    if (typeof window !== 'undefined') {
      const sanitized = {
        person1: personNames.person1.trim() || 'Rafael',
        person2: personNames.person2.trim() || 'Lavínia',
      };
      const raw = window.localStorage.getItem('mf.settings');
      let current: any = {};
      try { current = raw ? JSON.parse(raw) : {}; } catch { current = {}; }
      window.localStorage.setItem('mf.settings', JSON.stringify({ ...current, ...sanitized }));
      setPersonNames(sanitized);
      setShowNames(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddClick={() => setShowForm(true)} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard transactions={transactions} personNames={personNames} />
        <div className="mt-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center text-slate-500">Carregando...</div>
          ) : (
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction}
              personNames={personNames}
            />
          )}
        </div>
      </main>
      {showForm && (
        <TransactionForm 
          onClose={() => setShowForm(false)}
          onSubmit={addTransaction}
          personNames={personNames}
        />
      )}
      {showNames && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-slate-900">Editar nomes</h2>
              <button onClick={() => setShowNames(false)} className="p-2 hover:bg-slate-100 rounded-lg">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Pessoa 1</label>
                <input
                  value={personNames.person1}
                  onChange={(e) => setPersonNames({ ...personNames, person1: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Pessoa 2</label>
                <input
                  value={personNames.person2}
                  onChange={(e) => setPersonNames({ ...personNames, person2: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowNames(false)} className="px-4 py-2 rounded-lg border">Cancelar</button>
                <button onClick={saveNames} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
