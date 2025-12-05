const BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL as string;
import type { Transaction } from "../types/financial";

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Falha ao carregar transações");
  return await res.json();
};

export const addTransaction = async (payload: Omit<Transaction, "id">): Promise<Transaction> => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar transação");
  return await res.json();
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao excluir transação");
};

