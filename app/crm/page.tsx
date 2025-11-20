'use client'

import { useEffect, useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { DashboardMetrics, Order, Customer } from '@/types/crm'
import { TrendingUp, Users, Package, MessageSquare } from 'lucide-react'
import { RevenueTrendChart, OrdersByStatusChart } from '@/components/crm/CRMCharts'

interface MetricCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  trendLabel?: string
}

function MetricCard({ label, value, icon: Icon, trendLabel }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card/95 backdrop-blur-sm p-6 group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent-olive/10" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 mb-1">
            {label}
          </p>
          <p className="text-3xl font-display tracking-luxury mt-1">{value}</p>
          {trendLabel && (
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent-olive/10 px-3 py-1 text-[11px] text-accent-olive">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-olive" />
              {trendLabel}
            </p>
          )}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/20 text-accent-olive">
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

const RecentOrdersTable = memo(function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display tracking-luxury">Recent Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-muted-foreground font-medium">Order ID</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium">Customer</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium">Amount</th>
              <th className="px-6 py-3 text-left text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order.id} className="border-b border-border hover:bg-secondary/5">
                <td className="px-6 py-3">{order.id.slice(0, 8)}</td>
                <td className="px-6 py-3">{order.customerId.slice(0, 8)}</td>
                <td className="px-6 py-3">${order.totalAmount.toLocaleString()}</td>
                <td className="px-6 py-3">
                  <span className="px-3 py-1 bg-secondary/10 text-primary rounded text-xs">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

const TopCustomersCard = memo(function TopCustomersCard({ customers }: { customers: Customer[] }) {
  return (
    <div className="bg-card border border-border rounded">
      <div className="p-6 border-b border-border">
        <h3 className="font-display tracking-luxury">Top Customers</h3>
      </div>
      <div className="divide-y divide-border">
        {customers.map((customer: Customer) => (
          <div key={customer.id} className="p-4 hover:bg-secondary/5 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                <p className="text-xs text-muted-foreground">{customer.tier.toUpperCase()}</p>
              </div>
              <p className="font-display tracking-luxury">${customer.totalSpent.toLocaleString()}</p>
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!service) return
      try {
        const data = await service.getDashboardMetrics()
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [service])

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

  const revenueTrend =
    metrics?.recentOrders.map((order, index) => ({
      label: `#${index + 1}`,
      value: order.totalAmount,
    })) ?? []

  const ordersByStatus = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(
    (status) => ({
      status,
      count: metrics?.recentOrders.filter((o) => o.status === status).length ?? 0,
    })
  )

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
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-muted-foreground">
              <span className="text-[10px] uppercase tracking-[0.16em]">Range</span>
              <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px]">Last 30 days</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total Revenue"
            value={metrics?.totalRevenue ? `$${metrics.totalRevenue.toLocaleString()}` : '$0'}
            icon={TrendingUp}
            trendLabel="Up 12% vs. last month"
          />
          <MetricCard
            label="New Customers"
            value={metrics?.newCustomers ?? 0}
            icon={Users}
            trendLabel="8 new VIPs this month"
          />
          <MetricCard
            label="Open Orders"
            value={metrics?.pendingOrders ?? 0}
            icon={Package}
            trendLabel={metrics?.pendingOrders ? `${metrics.pendingOrders} awaiting fulfillment` : undefined}
          />
          <MetricCard
            label="Active Conversations"
            value={metrics?.activeConversations ?? 0}
            icon={MessageSquare}
            trendLabel={metrics?.activeConversations ? `${metrics.activeConversations} open threads` : undefined}
          />
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
                {metrics?.recentOrders && <RecentOrdersTable orders={metrics.recentOrders} />}
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
