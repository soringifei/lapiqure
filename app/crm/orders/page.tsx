'use client'

import { useEffect, useState } from 'react'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { Order, OrderStatus } from '@/types/crm'
import { Plus } from 'lucide-react'

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-card border border-border rounded p-4 hover:shadow-md transition-shadow cursor-move">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium">{order.id.slice(0, 8)}</p>
        <span className="text-xs text-accent-olive font-medium">${order.totalAmount}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{order.customerId.slice(0, 8)}</p>
      <div className="space-y-1 text-xs">
        <p>Items: {order.items.length}</p>
        <p>Payment: {order.paymentStatus}</p>
      </div>
    </div>
  )
}

function PipelineColumn({ status, orders }: { status: OrderStatus, orders: Order[] }) {
  const statusLabels: Record<OrderStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  }

  return (
    <div className="flex flex-col bg-secondary/5 rounded p-4 min-h-96">
      <div className="mb-4">
        <p className="font-display tracking-luxury mb-2">{statusLabels[status]}</p>
        <p className="text-sm text-muted-foreground">{orders.length} orders</p>
      </div>
      <div className="space-y-3 flex-1">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const { service } = useCRM()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!service) return
      try {
        const data = await service.getOrders()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [service])

  const groupedOrders = STATUSES.reduce((acc, status) => {
    acc[status] = orders.filter(o => o.status === status)
    return acc
  }, {} as Record<OrderStatus, Order[]>)

  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Orders</h1>
            <p className="text-muted-foreground">Total value: ${totalValue.toLocaleString()}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <Plus size={20} />
            New Order
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pb-8">
            {STATUSES.map(status => (
              <PipelineColumn key={status} status={status} orders={groupedOrders[status]} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
