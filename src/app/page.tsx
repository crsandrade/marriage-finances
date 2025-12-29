import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = cookies().get('sb-access-token');

  // 👤 Usuário logado → dashboard
  if (session) {
    redirect('/dashboard');
  }

  // 🌍 Público / Google
  return (
    <main>
      <h1>Sucesso Planejado</h1>
      <p>Plataforma de planejamento e acompanhamento.</p>

      <a href="/login">Entrar</a>
      <a href="/signup">Criar conta</a>
    </main>
  );
}
