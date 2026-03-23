import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const scores = await prisma.score.findMany({
      where: userId ? { userId } : undefined,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching scores' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { points, total, userId } = data;

    if (points === undefined || !total || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const score = await prisma.score.create({
      data: { points, total, userId }
    });

    return NextResponse.json(score, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving score' }, { status: 500 });
  }
}
