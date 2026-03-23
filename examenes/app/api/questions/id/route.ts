import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
    }

    await prisma.question.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Question deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting question' }, { status: 500 });
  }
}
