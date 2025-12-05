import { supabase } from "../lib/supabase";
import type { Transaction } from "../types/financial";

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }

  return data as Transaction[];
};

export const addTransaction = async (
  payload: Omit<Transaction, "id">
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }

  return data as Transaction;
}

export const deleteTransaction = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao deletar transação", error);
    throw error;
  }
};