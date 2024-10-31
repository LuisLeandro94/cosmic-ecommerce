// app/api/checkout/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import Stripe, { type Stripe as StripeType } from 'stripe';
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: NextRequest) {
  const res = await request.json();
  const stripe_product_ids = res.stripe_product_ids;
  try {
    const line_items = [];
    let mode: StripeType.Checkout.SessionCreateParams.Mode = 'payment';
    for (const stripe_product_id of stripe_product_ids) {
      const product = await stripe.products.retrieve(stripe_product_id);
      if (typeof product.default_price !== 'string') {
        throw new Error(
          `Invalid default price for product ${stripe_product_id}`
        );
      }
      const price = await stripe.prices.retrieve(product.default_price);
      line_items.push({
        price: price.id,
        quantity: 1,
      });
      // If any items are recurring
      if (price.type === 'recurring') mode = 'subscription';
    }
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url: `${res.redirect_url}/?success=true`,
      cancel_url: `${res.redirect_url}/?canceled=true`,
    });
    return Response.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
