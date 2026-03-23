'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center'
    }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Generador de Examenes</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#cbd5e1' }}>
          La plataforma definitiva de la UTM para generar, practicar y dominar cualquier tema mediante preguntas generadas inteligentemente.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Comenzar Ahora
          </Link>
          <Link href="/dashboard" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Ver Resultados
          </Link>
        </div>
      </div>
    </div>
  );
}
