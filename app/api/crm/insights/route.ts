import { NextResponse } from 'next/server'
import { initFirebaseAdmin } from '@/lib/firebase-admin'
import { CRMAnalytics, type CustomerScore } from '@/lib/crm-analytics'
import type { Customer, Order } from '@/types/crm'

export const revalidate = 300

interface InsightCustomerScore extends CustomerScore {
  label: string
}

interface Segments {
  champions: InsightCustomerScore[]
  loyal: InsightCustomerScore[]
  atrisk: InsightCustomerScore[]
  dormant: InsightCustomerScore[]
  newCustomers: InsightCustomerScore[]
}

function buildLabel(customer: Customer | undefined): string {
  if (!customer) return 'Unknown customer'

  const anyCustomer = customer as unknown as {
    name?: string
    firstName?: string
    lastName?: string
    email?: string
    id: string
  }

  if (anyCustomer.name) return String(anyCustomer.name)
  if (anyCustomer.firstName || anyCustomer.lastName) {
    return `${anyCustomer.firstName || ''} ${anyCustomer.lastName || ''}`.trim() || anyCustomer.id
  }
  if (anyCustomer.email) return String(anyCustomer.email)
  return anyCustomer.id
}

function attachLabels(scores: CustomerScore[], customers: Customer[]): InsightCustomerScore[] {
  const map = new Map(customers.map((c) => [c.id, c]))
  return scores.map((s) => ({
    ...s,
    label: buildLabel(map.get(s.customerId)),
  }))
}

export async function GET() {
  try {
    const db = initFirebaseAdmin()

    const [customersSnapshot, ordersSnapshot] = await Promise.all([
      db.collection('crm_customers').get(),
      db.collection('crm_orders').get(),
    ])

    const customers: Customer[] = customersSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        email: data.email || '',
        phone: data.phone || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        tier: data.tier || 'prospect',
        company: data.company,
        address: data.address,
        preferences: data.preferences,
        tags: data.tags || [],
        totalSpent: data.totalSpent || 0,
        totalOrders: data.totalOrders || 0,
        lastPurchaseDate: data.lastPurchaseDate?.toDate ? data.lastPurchaseDate.toDate() : data.lastPurchaseDate,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
        assignedStaffId: data.assignedStaffId,
        notes: data.notes,
      } as Customer
    })

    const orders: Order[] = ordersSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        customerId: data.customerId || '',
        staffId: data.staffId || '',
        items: data.items || [],
        totalAmount: data.totalAmount || 0,
        status: data.status || 'pending',
        paymentStatus: data.paymentStatus || 'pending',
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
        expectedDelivery: data.expectedDelivery?.toDate ? data.expectedDelivery.toDate() : data.expectedDelivery,
        notes: data.notes,
      } as Order
    })

    const limitedCustomers = customers.slice(0, 200)
    const limitedOrders = orders.slice(0, 500)

    const scores = CRMAnalytics.calculateRFM(limitedCustomers, limitedOrders)

    const churnRiskBase = CRMAnalytics.identifyChurnRisk(scores).slice(0, 5)
    const highValueBase = CRMAnalytics.identifyHighValue(scores).slice(0, 5)
    const growthBase = CRMAnalytics.identifyGrowthOpportunities(scores).slice(0, 5)
    const segmentsBase = CRMAnalytics.segmentByBehavior(scores)

    const churnRisk = attachLabels(churnRiskBase, limitedCustomers)
    const highValue = attachLabels(highValueBase, limitedCustomers)
    const growth = attachLabels(growthBase, limitedCustomers)

    const segments: Segments = {
      champions: attachLabels(segmentsBase.champions, limitedCustomers),
      loyal: attachLabels(segmentsBase.loyal, limitedCustomers),
      atrisk: attachLabels(segmentsBase.atrisk, limitedCustomers),
      dormant: attachLabels(segmentsBase.dormant, limitedCustomers),
      newCustomers: attachLabels(segmentsBase.newCustomers, limitedCustomers),
    }

    return NextResponse.json({
      churnRisk,
      highValue,
      growth,
      segments,
      totalCustomers: customers.length,
      totalOrders: orders.length,
    })
  } catch (error) {
    console.error('Error generating CRM insights:', error)
    // Return an empty-but-valid payload so the Insights UI can still render
    const emptySegments: Segments = {
      champions: [],
      loyal: [],
      atrisk: [],
      dormant: [],
      newCustomers: [],
    }

    return NextResponse.json({
      churnRisk: [],
      highValue: [],
      growth: [],
      segments: emptySegments,
      totalCustomers: 0,
      totalOrders: 0,
      error: 'Failed to generate CRM insights',
    })
  }
}
