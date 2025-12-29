import { supabase } from "../lib/supabase";
import type { Transaction } from "../types/financial";

/**
 * Busca todas as transações do usuário logado no Supabase.
 * 
 * @returns {Promise<Transaction[]>} Lista de transações ordenadas por data (decrescente).
 * Retorna um array vazio caso o usuário não esteja logado ou ocorra um erro.
 */
export const getTransactions = async (): Promise<Transaction[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id) // 🔵 só pega as transações do usuário
    .order("date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }

  return data as Transaction[];
};

/**
 * Adiciona uma nova transação ao banco de dados.
 * 
 * @param {Omit<Transaction, "id">} payload - Objeto com os dados da transação (sem ID).
 * @returns {Promise<Transaction>} A transação criada com o ID gerado.
 * @throws {Error} Se o usuário não estiver logado ou ocorrer erro na inserção.
 */
export const addTransaction = async (
  payload: Omit<Transaction, "id">
): Promise<Transaction> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não logado");

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...payload,
      user_id: user.id, // 🔵 vincula transação ao usuário
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }

  return data as Transaction;
};

/**
 * Remove uma transação do banco de dados pelo ID.
 * 
 * @param {string} id - O UUID da transação a ser removida.
 * @returns {Promise<void>}
 * @throws {Error} Se o usuário não estiver logado ou ocorrer erro na exclusão.
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não logado");

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // 🔵 garante que só apaga do dono

  if (error) {
    console.error("Erro ao deletar transação", error);
    throw error;
  }
};
