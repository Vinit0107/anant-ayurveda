import { NextResponse } from 'next/server';
import heroData from '@/data/hero.json';

export async function GET() {
  try {
    return NextResponse.json(heroData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { message: 'Hero content updated successfully', data: body },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to update hero data' },
      { status: 500 }
    );
  }
}
