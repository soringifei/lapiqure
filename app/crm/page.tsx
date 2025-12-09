'use client'

import { useEffect, useState, memo, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { DashboardMetrics, Order, Customer } from '@/types/crm'
import { TrendingUp, Users, Package, MessageSquare } from 'lucide-react'
import { RevenueTrendChart, OrdersByStatusChart } from '@/components/crm/CRMCharts'
import { StatusBadge } from '@/components/crm/StatusBadge'
import { DateRangeSelector } from '@/components/crm/DateRangeSelector'
import { DashboardAlerts } from '@/components/crm/DashboardAlerts'
import { QuickActions } from '@/components/crm/QuickActions'

type StatusType = 'active' | 'inactive' | 'draft' | 'published' | 'pending' | 'error' | 'processing' | 'completed' | 'cancelled'

interface MetricCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  trendLabel?: string
}

interface MetricCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  trendLabel?: string
  trend?: number
  onClick?: () => void
}

function MetricCard({ label, value, icon: Icon, trendLabel, trend, onClick }: MetricCardProps) {
  const hasTrend = trend !== undefined && trend !== null
  const isPositive = trend !== undefined && trend > 0
  const isNegative = trend !== undefined && trend < 0
  const trendColor = isPositive
    ? 'bg-accent-olive/10 text-accent-olive'
    : isNegative
    ? 'bg-accent-burgundy/10 text-accent-burgundy'
    : 'bg-secondary/10 text-muted-foreground'

  const trendIcon = isPositive ? '↑' : isNegative ? '↓' : ''

  return (
    <div
      className={`relative overflow-hidden border border-border bg-card p-6 group transition-all ${
        onClick ? 'cursor-pointer hover:shadow-sm' : ''
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-ink/5 via-transparent to-accent-olive/5" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70 mb-2 font-medium">
            {label}
          </p>
          <p className="text-3xl font-display tracking-luxury text-ink mb-2 truncate">{value}</p>
          {hasTrend && (
            <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full ${trendColor} px-3 py-1 text-[11px] font-medium`}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'currentColor' }} />
              {trendIcon} {Math.abs(trend).toFixed(1)}% vs previous period
            </p>
          )}
          {!hasTrend && trendLabel && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-olive/10 px-3 py-1 text-[11px] text-accent-olive font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-olive" />
              {trendLabel}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center border border-border bg-secondary/10 text-accent-olive flex-shrink-0">
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}

const RecentOrdersTable = memo(function RecentOrdersTable({ orders, customers, showUrgency }: { orders: Order[]; customers: Customer[]; showUrgency?: boolean }) {
  const router = useRouter()
  const { getStatusType } = useMemo(() => {
    const statusMap: Record<string, StatusType> = {
      pending: 'pending',
      confirmed: 'processing',
      processing: 'processing',
      shipped: 'processing',
      delivered: 'completed',
      cancelled: 'cancelled',
    }
    return {
      getStatusType: (status: string) => statusMap[status.toLowerCase()] || 'pending'
    }
  }, [])

  const customerMap = useMemo(() => {
    const map = new Map<string, Customer>()
    customers.forEach((customer) => {
      map.set(customer.id, customer)
    })
    return map
  }, [customers])

  const getTierColor = (tier: string) => {
    const tierMap: Record<string, string> = {
      platinum: 'bg-accent-olive/10 text-accent-olive',
      gold: 'bg-accent-orange/10 text-accent-orange',
      silver: 'bg-ink/10 text-ink-700',
    }
    return tierMap[tier.toLowerCase()] || 'bg-secondary/10 text-muted-foreground'
  }

  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display tracking-luxury">Recent Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/5">
              <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Order ID</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Customer</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Amount</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              const customer = customerMap.get(order.customerId)
              const customerName = customer 
                ? `${customer.firstName} ${customer.lastName}`.trim() || customer.email
                : order.customerId.slice(0, 12)
              
              const orderDate = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt)
              const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
              const isUrgent = showUrgency && (daysSinceOrder > 3 || order.paymentStatus === 'failed')
              const isPaymentFailed = order.paymentStatus === 'failed'
              
              return (
                <tr 
                  key={order.id} 
                  className={`border-b border-border hover:bg-secondary/5 transition-colors ${
                    isUrgent ? 'bg-accent-burgundy/5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {isUrgent && (
                        <span className="h-2 w-2 rounded-full bg-accent-burgundy" title="Requires attention" />
                      )}
                      <span className="font-mono text-xs text-ink-700 truncate block max-w-[120px]">
                        {order.id.slice(0, 12)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {customer ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => router.push(`/crm/customers/${customer.id}`)}
                          className="text-ink hover:text-accent-olive transition-colors text-left"
                        >
                          <span className="font-medium truncate block max-w-[180px]">
                            {customerName}
                          </span>
                        </button>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTierColor(customer.tier)}`}>
                            {customer.tier.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-ink-700 truncate block max-w-[120px]">
                        {customerName}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-display tracking-luxury text-ink">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={getStatusType(order.status)} />
                      {isPaymentFailed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-accent-burgundy/10 text-accent-burgundy">
                          Payment Failed
                        </span>
                      )}
                      {isUrgent && !isPaymentFailed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-accent-orange/10 text-accent-orange">
                          {daysSinceOrder}d old
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
})

const TopCustomersCard = memo(function TopCustomersCard({ customers }: { customers: Customer[] }) {
  const getTierColor = (tier: string) => {
    const tierMap: Record<string, string> = {
      platinum: 'text-accent-olive',
      gold: 'text-accent-orange',
      silver: 'text-ink-700',
    }
    return tierMap[tier.toLowerCase()] || 'text-muted-foreground'
  }

  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display tracking-luxury">Top Customers</h3>
      </div>
      <div className="divide-y divide-border">
        {customers.map((customer: Customer) => (
          <div key={customer.id} className="p-4 hover:bg-secondary/5 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink truncate">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className={`text-xs font-medium mt-1 ${getTierColor(customer.tier)}`}>
                  {customer.tier.toUpperCase()}
                </p>
              </div>
              <p className="font-display tracking-luxury text-ink whitespace-nowrap">
                ${customer.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default function CRMDashboard() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState(30)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!service) return
      try {
        setLoading(true)
        const [metricsData, customersData] = await Promise.all([
          service.getDashboardMetrics(),
          service.getCustomers(),
        ])
        setMetrics(metricsData)
        setCustomers(customersData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [service, dateRange])

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Overview of revenue, orders, and top customers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded p-6 animate-pulse space-y-3"
              >
                <div className="h-3 w-20 bg-secondary/20 rounded" />
                <div className="h-6 w-24 bg-secondary/30 rounded" />
                <div className="h-3 w-16 bg-secondary/20 rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded p-6 animate-pulse h-72" />
            <div className="bg-card border border-border rounded p-6 animate-pulse h-72" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const revenueTrend = (metrics as any)?.revenueTrendData?.map((point: { date: string; revenue: number }) => ({
    label: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: point.revenue,
  })) ?? []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ordersByStatus = (metrics as any)?.ordersByStatus ?? []

  const hasRecentOrders = (metrics?.recentOrders?.length ?? 0) > 0

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-1">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Live overview of revenue, orders and your most valuable clients for the current period.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/40 px-3 py-1 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-olive animate-pulse" />
              Live data
            </span>
            <DateRangeSelector value={dateRange} onChange={setDateRange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total Revenue"
            value={metrics?.totalRevenue ? `$${metrics.totalRevenue.toLocaleString()}` : '$0'}
            icon={TrendingUp}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trend={(metrics as any)?.revenueTrend}
            onClick={() => router.push('/crm/orders')}
          />
          <MetricCard
            label="New Customers"
            value={metrics?.newCustomers ?? 0}
            icon={Users}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trend={(metrics as any)?.newCustomersTrend}
            onClick={() => router.push('/crm/customers')}
          />
          <MetricCard
            label="Open Orders"
            value={metrics?.pendingOrders ?? 0}
            icon={Package}
            trendLabel={metrics?.pendingOrders ? `${metrics.pendingOrders} awaiting fulfillment` : undefined}
            onClick={() => router.push('/crm/orders?status=pending')}
          />
          <MetricCard
            label="Active Conversations"
            value={metrics?.activeConversations ?? 0}
            icon={MessageSquare}
            trendLabel={metrics?.activeConversations ? `${metrics.activeConversations} open threads` : undefined}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardAlerts
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              lowStockProducts={(metrics as any)?.lowStockProducts}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              urgentOrders={(metrics as any)?.urgentOrders}
              paymentFailures={(metrics?.recentOrders?.filter((o) => o.paymentStatus === 'failed').length) ?? 0}
              highOrderVolume={(metrics?.pendingOrders ?? 0) >= 10}
            />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {hasRecentOrders ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Revenue trend</span>
                  <span className="rounded-full bg-secondary/40 px-2 py-0.5">Recent orders</span>
                </div>
                <RevenueTrendChart data={revenueTrend} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Orders by status</span>
                </div>
                <OrdersByStatusChart data={ordersByStatus} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {metrics?.recentOrders && <RecentOrdersTable orders={metrics.recentOrders} customers={customers} showUrgency />}
              </div>
              <div className="space-y-3">
                {metrics?.topCustomers && <TopCustomersCard customers={metrics.topCustomers} />}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded p-8 flex flex-col justify-center">
              <p className="font-display tracking-luxury mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Once orders start flowing in, you9ll see revenue trends and status breakdowns here.
              </p>
            </div>
            <div className="bg-card border border-border rounded p-8 flex flex-col justify-center">
              <p className="font-display tracking-luxury mb-2">Empty pipeline</p>
              <p className="text-sm text-muted-foreground">
                Create a few orders to populate the pipeline view.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
