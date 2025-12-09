import { NextResponse } from 'next/server'
import { initFirebaseAdmin } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

interface OrderItemPayload {
  id: string
  name: string
  price: number
  quantity: number
  selectedSize: string
  image: string
}

interface ShippingPayload {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  country: string
  state: string
  zip: string
  phone: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      paymentIntentId,
      items,
      currency = 'usd',
      shipping,
      subtotal,
      shippingAmount,
      taxAmount,
      total,
    }: {
      paymentIntentId: string
      items: OrderItemPayload[]
      currency?: string
      shipping: ShippingPayload
      subtotal: number
      shippingAmount: number
      taxAmount: number
      total: number
    } = body

    if (!paymentIntentId || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = initFirebaseAdmin()

    const createdAt = Timestamp.now()

    const orderDoc = {
      paymentIntentId,
      currency,
      items: items.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        size: item.selectedSize,
        image: item.image,
      })),
      subtotal,
      shippingAmount,
      taxAmount,
      total,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt,
      updatedAt: createdAt,
      customer: {
        email: shipping.email,
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        phone: shipping.phone,
        address: {
          street: shipping.address,
          apartment: shipping.apartment || '',
          city: shipping.city,
          country: shipping.country,
          state: shipping.state,
          zipCode: shipping.zip,
        },
      },
    }

    const ref = await db.collection('crm_orders').add(orderDoc)


    return NextResponse.json({ id: ref.id })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
