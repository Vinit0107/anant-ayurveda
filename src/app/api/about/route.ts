import { NextResponse } from 'next/server';
import aboutData from '@/data/about.json';

export async function GET() {
  try {
    return NextResponse.json(aboutData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { message: 'About content updated successfully', data: body },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}
