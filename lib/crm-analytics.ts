import { Customer, Order } from '@/types/crm'

export interface CustomerScore {
  customerId: string
  recency: number
  frequency: number
  monetary: number
  rfmScore: number
  clv: number
  tier: string
  churnRisk: number
  nextPurchaseProbability: number
}

export class CRMAnalytics {
  static calculateRFM(customers: Customer[], orders: Order[]): CustomerScore[] {
    const now = new Date()
    const scores: CustomerScore[] = []

    const customerOrders: Record<string, Order[]> = {}
    orders.forEach((order) => {
      if (!customerOrders[order.customerId]) {
        customerOrders[order.customerId] = []
      }
      customerOrders[order.customerId].push(order)
    })

    const maxRecency = 365
    const maxFrequency = Math.max(...Object.values(customerOrders).map((o) => o.length), 1)
    const maxMonetary = Math.max(...customers.map((c) => c.totalSpent), 1)

    customers.forEach((customer) => {
      const custOrders = customerOrders[customer.id] || []

      const recency = customer.lastPurchaseDate
        ? Math.min((now.getTime() - new Date(customer.lastPurchaseDate).getTime()) / (1000 * 60 * 60 * 24), maxRecency)
        : maxRecency

      const frequency = custOrders.length
      const monetary = customer.totalSpent

      const rScore = ((maxRecency - recency) / maxRecency) * 100
      const fScore = (frequency / maxFrequency) * 100
      const mScore = (monetary / maxMonetary) * 100

      const rfmScore = (rScore + fScore + mScore) / 3

      const avgOrderValue = frequency > 0 ? monetary / frequency : 0
      const clv = avgOrderValue * frequency * 3

      const churnRisk = recency > 180 ? 1 : recency > 90 ? 0.5 : 0
      const nextPurchaseProbability = Math.max(0, 1 - churnRisk - recency / 1000)

      let tier = 'prospect'
      if (rfmScore >= 75) tier = 'platinum'
      else if (rfmScore >= 60) tier = 'gold'
      else if (rfmScore >= 40) tier = 'silver'

      scores.push({
        customerId: customer.id,
        recency: parseFloat(recency.toFixed(2)),
        frequency,
        monetary: parseFloat(monetary.toFixed(2)),
        rfmScore: parseFloat(rfmScore.toFixed(2)),
        clv: parseFloat(clv.toFixed(2)),
        tier,
        churnRisk: parseFloat(churnRisk.toFixed(2)),
        nextPurchaseProbability: parseFloat(nextPurchaseProbability.toFixed(2)),
      })
    })

    return scores.sort((a, b) => b.rfmScore - a.rfmScore)
  }

  static identifyChurnRisk(scores: CustomerScore[]): CustomerScore[] {
    return scores.filter((s) => s.churnRisk > 0.3 && s.rfmScore > 30).sort((a, b) => b.churnRisk - a.churnRisk)
  }

  static identifyHighValue(scores: CustomerScore[]): CustomerScore[] {
    return scores.filter((s) => s.clv > 5000).sort((a, b) => b.clv - a.clv)
  }

  static identifyGrowthOpportunities(scores: CustomerScore[]): CustomerScore[] {
    return scores
      .filter((s) => s.frequency < 5 && s.rfmScore > 50)
      .sort((a, b) => b.nextPurchaseProbability - a.nextPurchaseProbability)
  }

  static segmentByBehavior(scores: CustomerScore[]) {
    return {
      champions: scores.filter((s) => s.rfmScore >= 75),
      loyal: scores.filter((s) => s.rfmScore >= 60 && s.rfmScore < 75),
      atrisk: scores.filter((s) => s.churnRisk > 0.5),
      dormant: scores.filter((s) => s.recency > 180),
      newCustomers: scores.filter((s) => s.frequency <= 2),
    }
  }
}
