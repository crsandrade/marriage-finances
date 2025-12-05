const BASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL || "").replace(/\/+$/, "");

const ensureBaseUrl = () => {
  if (!BASE_URL) {
    throw new Error("URL da API não configurada: defina NEXT_PUBLIC_SUPABASE_FUNCTION_URL");
  }
};
import type { Transaction } from "../types/financial";

export const getTransactions = async (): Promise<Transaction[]> => {
  ensureBaseUrl();
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Falha ao carregar transações");
  return await res.json();
};

export const addTransaction = async (payload: Omit<Transaction, "id">): Promise<Transaction> => {
  ensureBaseUrl();
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar transação");
  return await res.json();
};

export const deleteTransaction = async (id: string): Promise<void> => {
  ensureBaseUrl();
  const res = await fetch(`${BASE_URL}/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao excluir transação");
};

