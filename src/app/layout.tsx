import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sucesso Planejado',
    template: '%s | Sucesso Planejado',
  },
  description: 'Plataforma de planejamento financeiro para casais. Acompanhe gastos, investimentos e metas financeiras em conjunto de forma inteligente.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.sucessoplanejado.com.br',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
