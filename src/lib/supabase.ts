import { createClient } from "@supabase/supabase-js";

export const supabaseServer = () => {
  const url = process.env.SUPABASE_URL || "";
  const anon = process.env.SUPABASE_ANON_KEY || "";
  if (!url || !anon) {
    throw new Error("SUPABASE_URL/SUPABASE_ANON_KEY não configurados");
  }
  return createClient(url, anon);
};

