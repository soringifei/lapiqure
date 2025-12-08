'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { Order, OrderStatus } from '@/types/crm'
import { Plus } from 'lucide-react'

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

function OrderCard({ order, onDragStart }: { order: Order; onDragStart: (id: string) => void }) {
  return (
    <div
      className="bg-card border border-border rounded p-4 hover:shadow-md transition-shadow cursor-move"
      draggable
      onDragStart={() => onDragStart(order.id)}
    >
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

function PipelineColumn({
  status,
  orders,
  onOrderDragStart,
  onDropOrder,
}: {
  status: OrderStatus
  orders: Order[]
  onOrderDragStart: (id: string) => void
  onDropOrder: (status: OrderStatus) => void
}) {
  const statusLabels: Record<OrderStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }

  return (
    <div
      className="flex flex-col bg-secondary/5 rounded p-4 min-h-96"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropOrder(status)}
    >
      <div className="mb-4">
        <p className="font-display tracking-luxury mb-2">{statusLabels[status]}</p>
        <p className="text-sm text-muted-foreground">{orders.length} orders</p>
      </div>
      <div className="space-y-3 flex-1">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onDragStart={onOrderDragStart} />
        ))}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

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
    acc[status] = orders.filter((o) => o.status === status)
    return acc
  }, {} as Record<OrderStatus, Order[]>)

  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  const handleOrderDragStart = (id: string) => {
    setDraggedOrderId(id)
  }

  const handleDropOnStatus = async (status: OrderStatus) => {
    if (!draggedOrderId || !service) return

    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === draggedOrderId
          ? {
              ...order,
              status,
            }
          : order,
      ),
    )

    try {
      await service.updateOrder(draggedOrderId, { status })
    } catch (error) {
      console.error('Error updating order status:', error)
    } finally {
      setDraggedOrderId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          subtitle={`Total value: $${totalValue.toLocaleString()}`}
          actions={
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              <Plus size={20} />
              New Order
            </button>
          }
        />
 
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pb-8">
            {STATUSES.map((status) => (
              <div key={status} className="flex flex-col bg-secondary/5 rounded p-4 min-h-96 animate-pulse">
                <div className="mb-4 space-y-2">
                  <div className="h-4 w-24 bg-secondary/30 rounded" />
                  <div className="h-3 w-16 bg-secondary/20 rounded" />
                </div>
                <div className="space-y-3 flex-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-20 bg-secondary/20 rounded" />
                        <div className="h-3 w-12 bg-secondary/20 rounded" />
                      </div>
                      <div className="h-3 w-24 bg-secondary/10 rounded" />
                      <div className="h-3 w-16 bg-secondary/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pb-8">
            {STATUSES.map((status) => (
              <PipelineColumn
                key={status}
                status={status}
                orders={groupedOrders[status] || []}
                onOrderDragStart={handleOrderDragStart}
                onDropOrder={handleDropOnStatus}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
