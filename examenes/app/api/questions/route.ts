import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    let take = limit ? parseInt(limit) : 50;
    
    // Validate take is a valid number, default to 50 if NaN
    if (isNaN(take)) take = 50;

    const questions = await prisma.question.findMany({
      take,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { category, type, difficulty, questionText, correctAnswer, incorrectAnswers } = data;

    if (!category || !questionText || !correctAnswer || !incorrectAnswers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        category,
        type: type || 'multiple',
        difficulty: difficulty || 'medium',
        questionText,
        correctAnswer,
        incorrectAnswers: JSON.stringify(incorrectAnswers)
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating question' }, { status: 500 });
  }
}
