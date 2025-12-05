import type { Transaction } from "../types/financial";

const STORAGE_KEY = "mf.transactions";

const read = (): Transaction[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? (JSON.parse(raw) as Transaction[]) : [];
  } catch {
    return [];
  }
};

const write = (items: Transaction[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getTransactions = async (): Promise<Transaction[]> => {
  return read();
};

export const addTransaction = async (
  payload: Omit<Transaction, "id">
): Promise<Transaction> => {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const created: Transaction = { id, ...payload };
  const items = [created, ...read()];
  write(items);
  return created;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const items = read().filter((t) => t.id !== id);
  write(items);
};

