# Deploy: Vercel + Supabase

## Supabase Edge Functions

1. Instale a CLI do Supabase:
   - `npm i -g supabase`
2. Faça login:
   - `supabase login`
3. Vincule seu projeto:
   - `supabase link --project-ref <SEU_PROJECT_REF>`
4. Defina segredos da função:
   - `supabase secrets set SUPABASE_URL=https://<SEU_PROJECT_REF>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<SEU_SERVICE_ROLE_KEY>`
5. Crie a tabela de transações (SQL Editor):
   - Copie `src/supabase/sql/transactions.sql` e execute no dashboard
6. Deploy da função Edge:
   - `supabase functions deploy make-server-db4095b8 --no-verify-jwt`
7. Teste a função (substitua `<SEU_PROJECT_REF>`):
   - `curl https://<SEU_PROJECT_REF>.supabase.co/functions/v1/make-server-db4095b8/health`

## Vercel (Front-end Vite)

1. Crie um projeto Vercel e conecte ao seu repositório
2. Build e output:
   - `vercel.json` já configura `build` e `outputDirectory` (`build`)
3. Variáveis de ambiente (Project Settings → Environment Variables):
   - `VITE_SUPABASE_FUNCTION_URL = https://<SEU_PROJECT_REF>.supabase.co/functions/v1/make-server-db4095b8`
4. Deploy:
   - Via UI do Vercel ou CLI: `npx vercel --prod`
5. Verifique no domínio da Vercel

## Observações

- Em produção, considere remover `--no-verify-jwt` e proteger a função com JWT.
- Não exponha o `SUPABASE_SERVICE_ROLE_KEY` no front-end; ele fica apenas na função Edge.
- O front consome a função via `VITE_SUPABASE_FUNCTION_URL`.

