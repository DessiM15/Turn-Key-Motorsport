import { z } from 'zod';

const CartItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
  slug: z.string().min(1),
});

const OrderSchema = z.object({
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
  items: z.array(CartItemSchema).min(1),
  total: z.number().positive(),
});

export async function POST(req: Request) {
  // 1. Parse and validate input
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 2. No auth check — public checkout endpoint

  // 3. Business logic
  try {
    // TODO: Replace with real Shopify / Stripe order creation
    // TODO: Send confirmation email via email service
    // TODO: Add rate limiting for production

    const orderNumber = `TM-${Date.now().toString(36).toUpperCase()}`;

    console.log('[POST /api/cart] Order received:', {
      orderNumber,
      customer: parsed.data.customer.email,
      items: parsed.data.items.length,
      total: parsed.data.total,
    });

    return Response.json({
      success: true,
      orderNumber,
      message: 'Order received. This is a demo — no real order was placed.',
    });
  } catch (err) {
    console.error('[POST /api/cart]', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
