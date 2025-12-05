import { createClient } from "@supabase/supabase-js";


type TransactionType = "income" | "expense";
type Owner = "person1" | "person2" | "shared";

interface Transaction {
  id: string;
  type: TransactionType;
  owner: Owner;
  category: string;
  amount: number;
  description: string;
  date: string;
  isRecurring: boolean;
  isInstallment: boolean;
  installmentCurrent?: number;
  installmentTotal?: number;
}

const client = () => createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const listTransactions = async (): Promise<Transaction[]> => {
  const supabase = client();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Transaction[];
};

export const createTransaction = async (payload: Omit<Transaction, "id">): Promise<Transaction> => {
  const supabase = client();
  const id = Date.now().toString();
  const record = { id, ...payload } as Transaction;
  const { data, error } = await supabase.from("transactions").insert(record).select("*").single();
  if (error) throw new Error(error.message);
  return data as Transaction;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const supabase = client();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);
};
