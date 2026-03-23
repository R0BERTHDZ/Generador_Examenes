'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ points: 0, total: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('userId')) router.push('/login');
    fetchQuestions();
  }, [router]);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await fetch('/api/questions?limit=10');
    const data = await res.json();
    // Shuffle answers for each question
    const formattedDate = data.map((q: any) => {
      const allAnswers = [q.correctAnswer, ...JSON.parse(q.incorrectAnswers)];
      return { ...q, allAnswers: allAnswers.sort(() => Math.random() - 0.5) };
    });
    setQuestions(formattedDate);
    setLoading(false);
  };

  const generateNewQuestions = async () => {
    setGenerating(true);
    await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ amount: 10 }) });
    await fetchQuestions();
    setGenerating(false);
    setSubmitted(false);
    setAnswers({});
  };

  const handleSelect = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length && !confirm("No has respondido todo. ¿Enviar de todos modos?")) return;

    let points = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) points++;
    });

    setScore({ points, total: questions.length });
    setSubmitted(true);

    await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        points,
        total: questions.length
      })
    });
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>Cargando examen...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📝 Examen de Prueba</h2>
        <button onClick={generateNewQuestions} className="btn btn-outline" disabled={generating}>
          {generating ? 'Generando...' : 'Generar Nuevas Preguntas (API)'}
        </button>
      </header>

      {questions.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <p>No hay preguntas disponibles.</p>
          <button onClick={generateNewQuestions} className="btn btn-primary" style={{ marginTop: '1rem' }}>Generar Banco de Preguntas</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {questions.map((q, idx) => (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{idx + 1}. {q.questionText}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.allAnswers.map((ans: string, i: number) => {
                  let bgColor = 'var(--surface)';
                  let borderColor = 'var(--surface-border)';

                  if (submitted) {
                    if (ans === q.correctAnswer) {
                      bgColor = 'rgba(16, 185, 129, 0.2)';
                      borderColor = '#10b981';
                    } else if (answers[q.id] === ans) {
                      bgColor = 'rgba(239, 68, 68, 0.2)';
                      borderColor = '#ef4444';
                    }
                  } else if (answers[q.id] === ans) {
                    borderColor = 'var(--primary)';
                    bgColor = 'rgba(59, 130, 246, 0.1)';
                  }

                  return (
                    <div 
                      key={i} 
                      onClick={() => handleSelect(q.id, ans)}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        border: `2px solid ${borderColor}`,
                        background: bgColor,
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {ans}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button onClick={handleSubmit} className="btn btn-primary" style={{ alignSelf: 'center', padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Enviar Examen
            </button>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', borderColor: score.points > score.total/2 ? '#10b981' : '#ef4444' }}>
              <h2>Tu Puntaje: {score.points} / {score.total}</h2>
              <button onClick={() => router.push('/dashboard')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Volver al Dashboard</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
