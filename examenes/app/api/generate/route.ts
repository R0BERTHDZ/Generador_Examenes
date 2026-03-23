import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    // Simulador de una API enorme de Programación Web
    const fullBank = [
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué significan las siglas HTML?',
        correct_answer: 'HyperText Markup Language',
        incorrect_answers: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Tool Multi Language']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué lenguaje se encarga de definir los estilos y diseño visual de una página web?',
        correct_answer: 'CSS',
        incorrect_answers: ['HTML', 'JavaScript', 'Python']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Cuál es el lenguaje de programación principal que se ejecuta en el navegador web?',
        correct_answer: 'JavaScript',
        incorrect_answers: ['PHP', 'Java', 'C++']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué etiqueta HTML se usa para insertar una imagen?',
        correct_answer: '<img>',
        incorrect_answers: ['<picture>', '<image>', '<src>']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Qué devuelve la operación `typeof []` en JavaScript?',
        correct_answer: '"object"',
        incorrect_answers: ['"array"', '"undefined"', '"list"']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Para qué se utilizan los métodos GET y POST típicamente?',
        correct_answer: 'Para enviar y recibir datos mediante peticiones HTTP',
        incorrect_answers: ['Para dar formato al texto en HTML', 'Para crear variables en CSS', 'Para dar permisos en BD']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: 'Es un framework o librería escrita en JavaScript muy famosa creada por Facebook para interfaces de usuario:',
        correct_answer: 'React',
        incorrect_answers: ['Angular', 'Vue', 'Svelte']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Con qué símbolo se definen las Clases en CSS?',
        correct_answer: 'Con un punto (.)',
        incorrect_answers: ['Con un numeral (#)', 'Con un asterisco (*)', 'Con el nombre de la etiqueta']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: 'En Javascript, ¿qué palabra reservada se usa para declarar una variable que NO debe cambiar de valor una vez asignada?',
        correct_answer: 'const',
        incorrect_answers: ['let', 'var', 'static']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué es el DOM en el desarrollo web?',
        correct_answer: 'Document Object Model',
        incorrect_answers: ['Digital Ordinance Memory', 'Document Orientation Method', 'Digital Object Modifier']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: 'En CSS, ¿qué propiedad cambia el tamaño del texto?',
        correct_answer: 'font-size',
        incorrect_answers: ['text-size', 'font-style', 'text-style']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Cuál de los siguientes no es un valor válido para la propiedad "display" en CSS?',
        correct_answer: 'display: visible',
        incorrect_answers: ['display: block', 'display: inline', 'display: flex']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué protocolo de web indica que una conexión es segura y cifrada?',
        correct_answer: 'HTTPS',
        incorrect_answers: ['HTTP', 'FTP', 'SSH']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: 'En HTML, ¿cuál es la etiqueta para crear un enlace?',
        correct_answer: '<a>',
        incorrect_answers: ['<link>', '<href>', '<url>']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Qué propiedad de margin en CSS se usa para centrar un contenedor horizontalmente?',
        correct_answer: 'margin: 0 auto',
        incorrect_answers: ['margin: center', 'margin: auto 0', 'margin: absolute']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: 'El hook que se importa como `useState` pertenece a:',
        correct_answer: 'React',
        incorrect_answers: ['Vanilla JS', 'Next.js', 'Redux']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Cuál de estos NO es un navegador web?',
        correct_answer: 'Apache',
        incorrect_answers: ['Safari', 'Firefox', 'Chrome']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'básico',
        question: '¿Qué significa JSON?',
        correct_answer: 'JavaScript Object Notation',
        incorrect_answers: ['Java Specific Object Node', 'JavaScript Oriented Notifier', 'Java Source Object Naming']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Qué base de datos viene integrada típicamente en navegadores web para almacenamiento masivo?',
        correct_answer: 'IndexedDB',
        incorrect_answers: ['MySQL', 'MongoDB', 'PostgreSQL']
      },
      {
        category: 'Programación Web', type: 'multiple', difficulty: 'medio',
        question: '¿Qué etiqueta HTML se usa para dibujar gráficos vectoriales dinámicos usando JavaScript?',
        correct_answer: '<canvas>',
        incorrect_answers: ['<svg>', '<draw>', '<graphics>']
      }
    ];

    // Mezclar las preguntas de forma aleatoria (Shuffle)
    const shuffledBank = fullBank.sort(() => 0.5 - Math.random());
    // Tomar solo 10 preguntas cada vez
    const customApiQuestions = shuffledBank.slice(0, 10);

    const savedQuestions = [];
    for (const q of customApiQuestions) {
      const savedQ = await prisma.question.create({
        data: {
          category: q.category,
          type: q.type,
          difficulty: q.difficulty,
          questionText: q.question,
          correctAnswer: q.correct_answer,
          incorrectAnswers: JSON.stringify(q.incorrect_answers),
        }
      });
      savedQuestions.push(savedQ);
    }

    return NextResponse.json({
      message: `Successfully generated and saved ${savedQuestions.length} random web programming questions.`,
      count: savedQuestions.length,
      questions: savedQuestions
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate questions.' }, { status: 500 });
  }
}
