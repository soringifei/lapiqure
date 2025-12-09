'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { CustomerScore } from '@/lib/crm-analytics'
import { AlertCircle, TrendingUp, Heart, Search, RefreshCw, Download, X, Mail, Phone, FileText, ExternalLink } from 'lucide-react'
import { InsightRecommendations } from '@/components/crm/InsightRecommendations'
import { SegmentDistributionChart, RFMDistributionChart, CLVDistributionChart } from '@/components/crm/InsightsCharts'

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
  totalCustomers: number
  totalOrders: number
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [rfmFilter, setRfmFilter] = useState<string>('all')
  const [churnRiskFilter, setChurnRiskFilter] = useState<string>('all')
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  const fetchInsights = async () => {
    if (!user) return
    try {
      setLoading(true)
      const res = await fetch('/api/crm/insights')
      if (!res.ok) {
        throw new Error('Failed to load insights')
      }
      const json: InsightsResponse = await res.json()
      setData(json)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [user])

  const filterItems = (items: InsightCustomerScore[]) => {
    return items.filter((item) => {
      const matchesSearch = searchTerm === '' || 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTier = selectedTier === 'all' || item.tier === selectedTier
      const matchesRfm = rfmFilter === 'all' || 
        (rfmFilter === 'high' && item.rfmScore >= 75) ||
        (rfmFilter === 'medium' && item.rfmScore >= 50 && item.rfmScore < 75) ||
        (rfmFilter === 'low' && item.rfmScore < 50)
      const matchesChurnRisk = churnRiskFilter === 'all' ||
        (churnRiskFilter === 'high' && item.churnRisk >= 0.5) ||
        (churnRiskFilter === 'medium' && item.churnRisk >= 0.3 && item.churnRisk < 0.5) ||
        (churnRiskFilter === 'low' && item.churnRisk < 0.3)
      
      return matchesSearch && matchesTier && matchesRfm && matchesChurnRisk
    })
  }

  const insights: InsightSection[] = useMemo(() => {
    if (!data) return []
    return [
      {
        title: 'At Risk',
        description: 'Customers showing churn signals',
        icon: AlertCircle,
        color: 'text-destructive',
        items: filterItems(data.churnRisk),
      },
      {
        title: 'High Value',
        description: 'Top spenders & loyal customers',
        icon: Heart,
        color: 'text-accent-olive',
        items: filterItems(data.highValue),
      },
      {
        title: 'Growth Opportunities',
        description: 'High potential for upsell',
        icon: TrendingUp,
        color: 'text-accent-orange',
        items: filterItems(data.growth),
      },
    ]
  }, [data, searchTerm, selectedTier, rfmFilter, churnRiskFilter])

  const allScores = useMemo(() => {
    if (!data) return []
    return [
      ...data.churnRisk,
      ...data.highValue,
      ...data.growth,
    ]
  }, [data])

  const segmentChartData = useMemo(() => {
    if (!data || !data.segments) return []
    const { segments } = data
    return [
      { name: 'Champions', value: segments.champions.length, color: '#6B7445' },
      { name: 'Loyal', value: segments.loyal.length, color: '#C97D60' },
      { name: 'At Risk', value: segments.atrisk.length, color: '#7A231D' },
      { name: 'Dormant', value: segments.dormant.length, color: '#4F4843' },
      { name: 'New', value: segments.newCustomers.length, color: '#1F1A17' },
    ].filter(item => item.value > 0)
  }, [data])

  const rfmDistribution = useMemo(() => {
    const ranges = [
      { range: '0-25', min: 0, max: 25 },
      { range: '25-50', min: 25, max: 50 },
      { range: '50-75', min: 50, max: 75 },
      { range: '75-100', min: 75, max: 100 },
    ]
    return ranges.map(range => ({
      range: range.range,
      count: allScores.filter(s => s.rfmScore >= range.min && s.rfmScore < range.max).length,
    }))
  }, [allScores])

  const clvDistribution = useMemo(() => {
    const ranges = [
      { range: '$0-5k', min: 0, max: 5000 },
      { range: '$5k-10k', min: 5000, max: 10000 },
      { range: '$10k-25k', min: 10000, max: 25000 },
      { range: '$25k+', min: 25000, max: Infinity },
    ]
    return ranges.map(range => ({
      range: range.range,
      count: allScores.filter(s => s.clv >= range.min && s.clv < range.max).length,
    }))
  }, [allScores])

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

  const { segments } = data

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <PageHeader
              title="Customer Insights"
              description="RFM analysis, churn prediction & growth opportunities"
            />
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchInsights}
              disabled={loading}
              className="px-4 py-2 border border-border rounded hover:bg-secondary/10 transition-colors flex items-center gap-2 text-sm"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => {
                const allItems = [
                  ...(data?.churnRisk || []),
                  ...(data?.highValue || []),
                  ...(data?.growth || []),
                ]
                const csv = [
                  ['Customer', 'Tier', 'CLV', 'RFM Score', 'Churn Risk %', 'Recency', 'Frequency', 'Monetary'],
                  ...allItems.map(item => [
                    item.label,
                    item.tier,
                    item.clv.toFixed(2),
                    item.rfmScore.toFixed(2),
                    (item.churnRisk * 100).toFixed(2),
                    item.recency.toFixed(0),
                    item.frequency.toString(),
                    item.monetary.toFixed(2),
                  ])
                ].map(row => row.join(',')).join('\n')
                const blob = new Blob([csv], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `customer-insights-${new Date().toISOString().split('T')[0]}.csv`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="px-4 py-2 bg-accent-olive/10 hover:bg-accent-olive/20 text-accent-olive rounded transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-accent-olive/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-accent-olive/20"
            >
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="prospect">Prospect</option>
            </select>
            <select
              value={rfmFilter}
              onChange={(e) => setRfmFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-accent-olive/20"
            >
              <option value="all">All RFM Scores</option>
              <option value="high">High (75+)</option>
              <option value="medium">Medium (50-74)</option>
              <option value="low">Low (&lt;50)</option>
            </select>
            <select
              value={churnRiskFilter}
              onChange={(e) => setChurnRiskFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-accent-olive/20"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk (50%+)</option>
              <option value="medium">Medium Risk (30-49%)</option>
              <option value="low">Low Risk (&lt;30%)</option>
            </select>
          </div>
          {(searchTerm || selectedTier !== 'all' || rfmFilter !== 'all' || churnRiskFilter !== 'all') && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTier('all')
                  setRfmFilter('all')
                  setChurnRiskFilter('all')
                }}
                className="text-xs text-muted-foreground hover:text-ink flex items-center gap-1"
              >
                <X size={12} />
                Clear filters
              </button>
            </div>
          )}
        </div>

        {segmentChartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SegmentDistributionChart data={segmentChartData} />
            <RFMDistributionChart data={rfmDistribution} />
            <CLVDistributionChart data={clvDistribution} />
          </div>
        )}

        {segments && data && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { key: 'champions', label: 'Champions', items: segments.champions, color: 'text-accent-olive' },
              { key: 'loyal', label: 'Loyal', items: segments.loyal, color: 'text-accent-orange' },
              { key: 'atrisk', label: 'At Risk', items: segments.atrisk, color: 'text-destructive' },
              { key: 'dormant', label: 'Dormant', items: segments.dormant, color: 'text-ink-700' },
              { key: 'newCustomers', label: 'New', items: segments.newCustomers, color: 'text-ink' },
            ].map((segment) => {
              const percentage = data.totalCustomers > 0 
                ? ((segment.items.length / data.totalCustomers) * 100).toFixed(1)
                : '0'
              const avgCLV = segment.items.length > 0
                ? segment.items.reduce((sum, item) => sum + item.clv, 0) / segment.items.length
                : 0
              
              return (
                <div
                  key={segment.key}
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTier('all')
                    setRfmFilter('all')
                    setChurnRiskFilter('all')
                  }}
                  className="bg-card border border-border rounded p-4 hover:border-accent-olive/30 cursor-pointer transition-colors"
                >
                  <p className="text-muted-foreground text-sm mb-1">{segment.label}</p>
                  <p className={`text-3xl font-display tracking-luxury ${segment.color} mb-1`}>
                    {segment.items.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {percentage}% of total
                  </p>
                  {avgCLV > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg CLV: ${avgCLV.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  )}
                  {segment.items.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/crm/customers?segment=${segment.key}`)
                      }}
                      className="text-xs text-accent-olive hover:underline mt-2"
                    >
                      View All →
                    </button>
                  )}
                </div>
              )
            })}
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
                  <InsightRecommendations
                    segment={insight.title === 'At Risk' ? 'atRisk' : insight.title === 'High Value' ? 'highValue' : 'growth'}
                    customerCount={insight.items.length}
                  />
                </div>
                <div className="divide-y divide-border">
                  {insight.items.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">No customers in this segment</div>
                  ) : (
                    <>
                      {selectedCustomers.size > 0 && (
                        <div className="p-4 bg-accent-olive/10 border-b border-border flex items-center justify-between">
                          <span className="text-sm text-ink-700">
                            {selectedCustomers.size} selected
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                console.log('Bulk action on', selectedCustomers.size, 'customers')
                              }}
                              className="px-3 py-1 bg-accent-olive hover:bg-accent-olive/90 text-paper text-xs rounded transition-colors"
                            >
                              Send Email
                            </button>
                            <button
                              onClick={() => setSelectedCustomers(new Set())}
                              className="px-3 py-1 border border-border hover:bg-secondary/10 text-xs rounded transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      )}
                      {insight.items.map((item) => (
                        <div
                          key={item.customerId}
                          className="p-4 hover:bg-secondary/5 text-sm transition-colors group"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedCustomers.has(item.customerId)}
                              onChange={(e) => {
                                const newSelected = new Set(selectedCustomers)
                                if (e.target.checked) {
                                  newSelected.add(item.customerId)
                                } else {
                                  newSelected.delete(item.customerId)
                                }
                                setSelectedCustomers(newSelected)
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-1 h-4 w-4 rounded border-border text-accent-olive focus:ring-accent-olive"
                            />
                            <div className="flex-1">
                              <button
                                onClick={() => router.push(`/crm/customers/${item.customerId}`)}
                                className="font-medium hover:text-accent-olive transition-colors text-left w-full"
                              >
                                {item.label}
                              </button>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  item.tier === 'platinum' ? 'bg-accent-orange/10 text-accent-orange' :
                                  item.tier === 'gold' ? 'bg-accent-olive/10 text-accent-olive' :
                                  'bg-secondary/10 text-primary'
                                }`}>
                                  {item.tier}
                                </span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.location.href = `mailto:?subject=Re-engagement`
                                    }}
                                    className="p-1 hover:bg-secondary/20 rounded"
                                    title="Send Email"
                                  >
                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      router.push(`/crm/customers/${item.customerId}?action=note`)
                                    }}
                                    className="p-1 hover:bg-secondary/20 rounded"
                                    title="Add Note"
                                  >
                                    <FileText className="h-3 w-3 text-muted-foreground" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      router.push(`/crm/orders?customerId=${item.customerId}`)
                                    }}
                                    className="p-1 hover:bg-secondary/20 rounded"
                                    title="View Orders"
                                  >
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                            <div>CLV: ${item.clv.toLocaleString()}</div>
                            <div>RFM: {item.rfmScore.toFixed(0)}</div>
                            <div>Risk: {(item.churnRisk * 100).toFixed(0)}%</div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1" title="Recency Score">
                              <span className="w-2 h-2 rounded-full bg-accent-olive/50" />
                              <span>R: {((100 - (item.recency / 365) * 100)).toFixed(0)}</span>
                            </div>
                            <div className="flex items-center gap-1" title="Frequency Score">
                              <span className="w-2 h-2 rounded-full bg-accent-orange/50" />
                              <span>F: {item.frequency}</span>
                            </div>
                            <div className="flex items-center gap-1" title="Monetary Score">
                              <span className="w-2 h-2 rounded-full bg-ink/50" />
                              <span>M: ${(item.monetary / 1000).toFixed(0)}k</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
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
