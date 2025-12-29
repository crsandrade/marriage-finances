import { createClient } from "@supabase/supabase-js";

/**
 * URL da API do Supabase definida nas variáveis de ambiente.
 * @type {string}
 */
const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Chave pública (anon key) do Supabase definida nas variáveis de ambiente.
 * @type {string}
 */
const supaBaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente Supabase configurado para interagir com o backend (PostgreSQL + Auth).
 * Utiliza as credenciais públicas para operações do lado do cliente.
 */
export const supabase = createClient(supaBaseUrl, supaBaseKey);

