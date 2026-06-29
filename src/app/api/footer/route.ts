import { NextResponse } from 'next/server';
import footerData from '@/data/footer.json';

export async function GET() {
  try {
    return NextResponse.json(footerData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch footer data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { message: 'Footer content updated successfully', data: body },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to update footer data' },
      { status: 500 }
    );
  }
}
