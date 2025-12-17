# 💰 Marriage Finances - Gestão Financeira para Casais

Uma aplicação web moderna e intuitiva projetada para ajudar casais a organizarem suas finanças de forma colaborativa, transparente e eficiente. Desenvolvida com **Next.js**, **Supabase** e **Tailwind CSS**.

---

## 🚀 Funcionalidades Principais

### 📊 Dashboard Interativo
- **Visão Geral:** Cards com resumo de Receitas, Despesas e Saldo.
- **Gráficos:** Visualização clara da distribuição de gastos por categoria.
- **Filtros:** Navegue por mês e ano para acompanhar o histórico financeiro.

### 💸 Gestão de Transações
- **CRUD Completo:** Adicione, edite e exclua receitas e despesas.
- **Categorização:** Classifique gastos (Alimentação, Moradia, Lazer, etc.).
- **Atribuição:** Defina o responsável (Pessoa 1, Pessoa 2 ou Compartilhado).
- **Recorrência e Parcelamento:** Suporte para gastos fixos e compras parceladas.

### 🔐 Segurança e Autenticação
- **Login/Cadastro:** Sistema de autenticação robusto via Supabase Auth.
- **Proteção de Rotas:** Acesso restrito a usuários autenticados.
- **Dados Privados:** RLS (Row Level Security) garante que cada casal veja apenas seus dados.

### ⚙️ Configurações Personalizadas
- **Perfil:** Personalize os nomes exibidos no dashboard (ex: "Rafael" e "Lavínia").
- **Segurança:** Altere sua senha de acesso diretamente na plataforma.
- **Logout:** Encerre sua sessão com segurança.

---

## 🛠️ Stack Tecnológico

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **Componentes:** UI personalizada construída com base em Radix UI / Shadcn concepts.
- **Backend / Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime).

---

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado.
- Conta no Supabase.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/marriage-finances.git
   cd marriage-finances
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e adicione suas chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador.

---

## 🗄️ Estrutura do Banco de Dados (Supabase)

O projeto utiliza duas tabelas principais no PostgreSQL:

### `profiles`
Armazena informações adicionais dos usuários.
- `id`: uuid (PK, FK auth.users)
- `person1_name`: text
- `person2_name`: text
- `created_at`: timestamp

### `transactions`
Registra todas as movimentações financeiras.
- `id`: uuid (PK)
- `user_id`: uuid (FK auth.users)
- `type`: text ('income' | 'expense')
- `owner`: text ('person1' | 'person2' | 'shared')
- `category`: text
- `amount`: numeric
- `description`: text
- `date`: date
- `isRecurring`: boolean
- `isInstallment`: boolean
- `installmentCurrent`: integer
- `installmentTotal`: integer

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
