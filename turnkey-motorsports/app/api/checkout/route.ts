import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { squareClient, isSquareError } from '@/lib/square';

const CheckoutItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const CheckoutSchema = z.object({
  token: z.string().min(1, 'Payment token is required'),
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(5),
    phone: z.string().min(10),
  }),
  items: z.array(CheckoutItemSchema).min(1),
});

const SQUARE_ERROR_MAP: Record<string, string> = {
  CARD_DECLINED: 'Your card was declined. Please try a different card.',
  CVV_FAILURE: 'The CVV code is incorrect. Please check and try again.',
  ADDRESS_VERIFICATION_FAILURE: 'Address verification failed. Please check your billing address.',
  EXPIRED_CARD: 'This card has expired. Please use a different card.',
  INSUFFICIENT_FUNDS: 'Insufficient funds. Please try a different card.',
  CARD_NOT_SUPPORTED: 'This card type is not supported. Please try a different card.',
  INVALID_EXPIRATION: 'The expiration date is invalid. Please check and try again.',
  GENERIC_DECLINE: 'Payment was declined. Please try a different payment method.',
};

function calculateOrderTotals(items: z.infer<typeof CheckoutItemSchema>[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 299 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = CheckoutSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid request data';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { token, customer, items } = parsed.data;
    const { total } = calculateOrderTotals(items);
    const amountInCents = Math.round(total * 100);

    const orderNote = items
      .map((i) => `${i.name} x${i.quantity}`)
      .join(', ');

    const response = await squareClient.payments.create({
      sourceId: token,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amountInCents),
        currency: 'USD',
      },
      buyerEmailAddress: customer.email,
      note: `Turn-Key Motorsport order: ${orderNote}`,
    });

    const paymentId = response.payment?.id ?? 'unknown';
    const orderNumber = `TM-${paymentId.slice(-8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      orderId: paymentId,
      orderNumber,
    });
  } catch (err: unknown) {
    if (isSquareError(err)) {
      const firstError = err.errors?.[0];
      const code = firstError?.code ?? '';
      const friendlyMessage =
        SQUARE_ERROR_MAP[code] ?? 'Payment failed. Please try again or use a different card.';

      return NextResponse.json({ error: friendlyMessage }, { status: 422 });
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
