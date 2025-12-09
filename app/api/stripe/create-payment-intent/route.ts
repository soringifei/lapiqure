import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { initFirebaseAdmin } from '@/lib/firebase-admin'

// Helper to get Stripe key from process.env or firebase functions config
const getStripeKey = () => {
  if (process.env.STRIPE_SECRET_KEY) return process.env.STRIPE_SECRET_KEY;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const functions = require('firebase-functions');
    return functions.config().stripe?.secret;
  } catch {
    return undefined;
  }
}

const stripeSecretKey = getStripeKey();

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Payment API will not work until it is configured.')
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    })
  : null

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured on the server.' },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()

    const {
      items,
      currency = 'usd',
      shippingAmount,
      taxAmount,
      customerEmail,
    }: {
      items: { id: string; name: string; price: number; quantity: number; selectedSize: string }[]
      currency?: string
      shippingAmount: number
      taxAmount: number
      customerEmail?: string
    } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = Math.max(0, Math.round(shippingAmount || 0))
    const tax = Math.max(0, Math.round(taxAmount || 0))

    const amount = itemsTotal + shipping + tax

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than zero' }, { status: 400 })
    }

    const metadata: Record<string, string> = {
      items: JSON.stringify(items.map((i) => ({ id: i.id, q: i.quantity, s: i.selectedSize }))),
    }

    if (customerEmail) {
      metadata.customerEmail = customerEmail
    }

    // Ensure Firebase Admin is initialized (for consistency / future usage)
    initFirebaseAdmin()

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: customerEmail,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
