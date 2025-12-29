import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowRight,
  TrendingUp,
  Wallet,
  ChartBar,
  DollarSign,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const session = cookies().get('sb-access-token');

  // 👤 Usuário logado → dashboard
  if (session) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: ChartBar,
      title: 'Análise Inteligente',
      description:
        'Visualize seus dados financeiros com gráficos interativos e insights em tempo real.',
    },
    {
      icon: TrendingUp,
      title: 'Projeções Precisas',
      description:
        'Previsões baseadas em IA para planejar seu futuro financeiro com confiança.',
    },
    {
      icon: Wallet,
      title: 'Controle Total',
      description:
        'Gerencie todas as suas contas e investimentos em um único lugar.',
    },
    {
      icon: DollarSign,
      title: 'Metas Financeiras',
      description:
        'Defina e acompanhe suas metas com métricas personalizadas.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sucesso Planejado
          </span>
        </div>

        <Link href="/login">
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
            Fazer Login
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
              Planejamento Financeiro Inteligente
            </span>

            <h1 className="text-5xl lg:text-6xl">
              Tome o controle do seu{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                futuro financeiro
              </span>
            </h1>

            <p className="text-xl text-gray-600">
              Acompanhe suas finanças com gráficos detalhados, métricas
              personalizadas e insights inteligentes. Tudo em uma plataforma
              completa e fácil de usar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white group"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="border-2" disabled>
                Ver Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200">
              <Stat value="10k+" label="Usuários Ativos" color="text-blue-600" />
              <Stat value="R$ 2B+" label="Gerenciados" color="text-purple-600" />
              <Stat value="98%" label="Satisfação" color="text-green-600" />
            </div>
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border">
              <Image
                src="https://images.unsplash.com/photo-1763038311036-6d18805537e5"
                alt="Dashboard financeiro"
                width={1080}
                height={720}
                priority
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">
              Tudo que você precisa para gerenciar suas finanças
            </h2>
            <p className="text-xl text-gray-600">
              Ferramentas poderosas para análise completa do seu patrimônio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl mb-4">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de usuários que já estão no controle
          </p>

          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 group">
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>© 2025 Sucesso Planejado</span>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-blue-600 cursor-pointer">Termos</span>
            <span className="hover:text-blue-600 cursor-pointer">
              Privacidade
            </span>
            <span className="hover:text-blue-600 cursor-pointer">Suporte</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div>
      <div className={`text-3xl ${color}`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
