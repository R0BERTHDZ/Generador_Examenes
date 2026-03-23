'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/scores').then(r => r.json())
    ]).then(([uData, sData]) => {
      setUsers(uData);
      setScores(sData);
      setLoading(false);
    });
  }, [router]);

  const handleDeleteUser = async (id: string) => {
    if (confirm('¿Eliminar usuario?')) {
      await fetch(`/api/users/id?id=${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>Cargando datos...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2>Panel de Control (Dashboard)</h2>
      </header>
      
      <div className="glass-panel table-container">
        <h3 style={{ marginBottom: '1rem' }}>Usuarios Registrados (CRUD)</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email / Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.id.substring(0,8)}...</td>
                <td>{u.name || u.email}</td>
                <td>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem',
                    background: u.role === 'admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: u.role === 'admin' ? '#60a5fa' : '#34d399'
                  }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(u.id)}
                    className="btn btn-outline" 
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-panel table-container">
        <h3 style={{ marginBottom: '1rem' }}>Puntajes Globales</h3>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Puntos Obtenidos</th>
              <th>Total de Preguntas</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(s => (
              <tr key={s.id}>
                <td>{s.user?.name || s.user?.email || 'N/A'}</td>
                <td style={{ fontWeight: 'bold', color: '#3b82f6' }}>{s.points}</td>
                <td>{s.total}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
