'use client'

import { useEffect, useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { DashboardMetrics, Order, Customer } from '@/types/crm'
import { TrendingUp, Users, Package, MessageSquare } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  trend?: number
}

function MetricCard({ label, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-3xl font-display tracking-luxury mt-2">{value}</p>
          {trend && (
            <p className="text-accent-olive text-xs mt-2">↑ {trend}% from last month</p>
          )}
        </div>
        <div className="bg-secondary/10 p-3 rounded">
          <Icon className="text-accent-olive" size={24} />
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
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl tracking-luxury mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your CRM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total Revenue"
            value={metrics?.totalRevenue ? `$${metrics.totalRevenue.toLocaleString()}` : '$0'}
            icon={TrendingUp}
            trend={12}
          />
          <MetricCard
            label="New Customers"
            value={metrics?.newCustomers ?? 0}
            icon={Users}
            trend={8}
          />
          <MetricCard
            label="Pending Orders"
            value={metrics?.pendingOrders ?? 0}
            icon={Package}
          />
          <MetricCard
            label="Active Conversations"
            value={metrics?.activeConversations ?? 0}
            icon={MessageSquare}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {metrics?.recentOrders && <RecentOrdersTable orders={metrics.recentOrders} />}
          </div>
          <div>
            {metrics?.topCustomers && <TopCustomersCard customers={metrics.topCustomers} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
