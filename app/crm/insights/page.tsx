'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { CRMAnalytics, CustomerScore } from '@/lib/crm-analytics'
import { AlertCircle, TrendingUp, Heart, Zap } from 'lucide-react'

interface InsightSection {
  title: string
  description: string
  icon: React.ElementType
  color: string
  items: CustomerScore[]
}

export default function InsightsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()

  const [churnRisk, setChurnRisk] = useState<CustomerScore[]>([])
  const [highValue, setHighValue] = useState<CustomerScore[]>([])
  const [growth, setGrowth] = useState<CustomerScore[]>([])
  const [segments, setSegments] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchInsights = async () => {
      if (!service || !user) return
      try {
        const [customers, orders] = await Promise.all([
          service.getCustomers(),
          service.getOrders(),
        ])

        const scores = CRMAnalytics.calculateRFM(customers, orders)
        setChurnRisk(CRMAnalytics.identifyChurnRisk(scores))
        setHighValue(CRMAnalytics.identifyHighValue(scores))
        setGrowth(CRMAnalytics.identifyGrowthOpportunities(scores))
        setSegments(CRMAnalytics.segmentByBehavior(scores))
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [service, user])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading insights...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const insights: InsightSection[] = [
    {
      title: 'At Risk',
      description: 'Customers showing churn signals',
      icon: AlertCircle,
      color: 'text-destructive',
      items: churnRisk.slice(0, 5),
    },
    {
      title: 'High Value',
      description: 'Top spenders & loyal customers',
      icon: Heart,
      color: 'text-accent-olive',
      items: highValue.slice(0, 5),
    },
    {
      title: 'Growth Opportunities',
      description: 'High potential for upsell',
      icon: TrendingUp,
      color: 'text-accent-orange',
      items: growth.slice(0, 5),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl tracking-luxury mb-2">Customer Insights</h1>
          <p className="text-muted-foreground">RFM analysis, churn prediction & growth opportunities</p>
        </div>

        {segments && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-sm">Champions</p>
              <p className="text-3xl font-display tracking-luxury">{segments.champions.length}</p>
            </div>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-sm">Loyal</p>
              <p className="text-3xl font-display tracking-luxury">{segments.loyal.length}</p>
            </div>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-sm">At Risk</p>
              <p className="text-3xl font-display tracking-luxury text-destructive">{segments.atrisk.length}</p>
            </div>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-sm">Dormant</p>
              <p className="text-3xl font-display tracking-luxury">{segments.dormant.length}</p>
            </div>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-sm">New</p>
              <p className="text-3xl font-display tracking-luxury">{segments.newCustomers.length}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((insight) => {
            const Icon = insight.icon
            return (
              <div key={insight.title} className="bg-card border border-border rounded overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={20} className={insight.color} />
                    <h3 className="font-display tracking-luxury">{insight.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
                <div className="divide-y divide-border">
                  {insight.items.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">No customers in this segment</div>
                  ) : (
                    insight.items.map((item) => (
                      <div key={item.customerId} className="p-4 hover:bg-secondary/5 text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{item.customerId.slice(0, 8)}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.tier === 'platinum' ? 'bg-accent-orange/10 text-accent-orange' :
                            item.tier === 'gold' ? 'bg-accent-olive/10 text-accent-olive' :
                            'bg-secondary/10 text-primary'
                          }`}>
                            {item.tier}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                          <div>CLV: ${item.clv.toLocaleString()}</div>
                          <div>RFM: {item.rfmScore.toFixed(0)}</div>
                          <div>Risk: {(item.churnRisk * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
