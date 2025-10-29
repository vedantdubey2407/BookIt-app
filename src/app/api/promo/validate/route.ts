import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { promoCode } = await request.json();

    // In a real app, you'd check this against a database.
    if (promoCode === 'SAVE10') {
      return NextResponse.json({
        success: true,
        discount: 10, // 10% discount
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid promo code' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}