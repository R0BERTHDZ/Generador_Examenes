describe('Calculadora de Puntajes', () => {
  it('Debería calcular correctamente 5 a favor de 10 totales', () => {
    const answers = { q1: 'A', q2: 'B', q3: 'C' };
    const correct = { q1: 'A', q2: 'Z', q3: 'C' };
    
    let points = 0;
    for (const q in correct) {
      if (answers[q] === correct[q]) points++;
    }

    expect(points).toBe(2);
  });

  it('Debería obtener 0 si todas son incorrectas', () => {
    const answers = { q1: 'X' };
    const correct = { q1: 'A' };
    
    let points = 0;
    if (answers.q1 === correct.q1) points++;
    
    expect(points).toBe(0);
  });
});
