import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

// GET all products
export async function GET() {
  try {
    return NextResponse.json(productsData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In production, this would save to MongoDB
    return NextResponse.json(
      { message: 'Product created successfully', product: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
