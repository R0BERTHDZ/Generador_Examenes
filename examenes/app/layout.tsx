import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Generador de Exámenes',
  description: 'Evalúa tus conocimientos con miles de preguntas generadas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <nav className="navbar">
          <Link href="/" className="nav-brand">
            📚 UTM
          </Link>
          <div className="nav-links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/examen">Tomar Examen</Link>
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Login</Link>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
