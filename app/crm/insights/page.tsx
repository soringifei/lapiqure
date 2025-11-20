'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { CustomerScore } from '@/lib/crm-analytics'
import { AlertCircle, TrendingUp, Heart } from 'lucide-react'

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

interface InsightsResponse {
  churnRisk: InsightCustomerScore[]
  highValue: InsightCustomerScore[]
  growth: InsightCustomerScore[]
  segments: Segments
}

interface InsightSection {
  title: string
  description: string
  icon: React.ElementType
  color: string
  items: InsightCustomerScore[]
}

export default function InsightsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [data, setData] = useState<InsightsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchInsights = async () => {
      if (!user) return
      try {
        const res = await fetch('/api/crm/insights')
        if (!res.ok) {
          throw new Error('Failed to load insights')
        }
        const json: InsightsResponse = await res.json()
        setData(json)
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [user])

  if (authLoading || loading || !data) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-20 bg-secondary/5 rounded animate-shimmer" />
          <SkeletonLoader variant="table" rows={3} columns={5} />
          <SkeletonLoader variant="card" rows={3} />
        </div>
      </DashboardLayout>
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
      items: data.churnRisk,
    },
    {
      title: 'High Value',
      description: 'Top spenders & loyal customers',
      icon: Heart,
      color: 'text-accent-olive',
      items: data.highValue,
    },
    {
      title: 'Growth Opportunities',
      description: 'High potential for upsell',
      icon: TrendingUp,
      color: 'text-accent-orange',
      items: data.growth,
    },
  ]

  const { segments } = data

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Customer Insights"
          description="RFM analysis, churn prediction & growth opportunities"
        />

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
                    <h2 className="font-display tracking-luxury">{insight.title}</h2>
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
                          <p className="font-medium">{item.label}</p>
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
