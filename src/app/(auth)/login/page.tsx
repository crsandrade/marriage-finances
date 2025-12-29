import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const session = cookies().get('sb-access-token');

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
