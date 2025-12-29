import '../index.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sucesso Planejado',
    template: '%s | Sucesso Planejado',
  },
  description: 'Plataforma de planejamento e acompanhamento.',
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
