'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { StatusBadge } from '@/components/crm/StatusBadge'
import { Customer, CustomerTier, Order } from '@/types/crm'
import { ArrowLeft, Save, Package, DollarSign, ShoppingBag, Calendar, MapPin, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TIERS: CustomerTier[] = ['platinum', 'gold', 'silver', 'prospect']

type StatusType = 'active' | 'inactive' | 'draft' | 'published' | 'pending' | 'error' | 'processing' | 'completed' | 'cancelled'

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const customerId = params.id as string

  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tier: 'prospect' as CustomerTier,
    company: '',
    tags: [] as string[],
    notes: '',
  })

  const getStatusType = (status: string): StatusType => {
    const statusMap: Record<string, StatusType> = {
      pending: 'pending',
      confirmed: 'processing',
      processing: 'processing',
      shipped: 'processing',
      delivered: 'completed',
      cancelled: 'cancelled',
    }
    return statusMap[status.toLowerCase()] || 'pending'
  }

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    if (customerId === 'new') {
      setIsNew(true)
      setLoading(false)
      return
    }

    const fetchCustomer = async () => {
      if (!service) return
      try {
        const customerData = await service.getCustomer(customerId)
        if (customerData) {
          setCustomer(customerData)
          setFormData({
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
            tier: customerData.tier,
            company: customerData.company || '',
            tags: customerData.tags,
            notes: customerData.notes || '',
          })
        }
      } catch (error) {
        console.error('Error fetching customer:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [customerId, service])

  useEffect(() => {
    if (isNew || !service || !customerId) return

    const fetchOrders = async () => {
      setOrdersLoading(true)
      try {
        const ordersData = await service.getOrdersByCustomer(customerId)
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [customerId, service, isNew])

  const handleSave = async () => {
    if (!service) return
    setSaving(true)

    try {
      if (isNew) {
        await service.addCustomer({
          ...formData,
          totalSpent: 0,
          totalOrders: 0,
        })
      } else {
        await service.updateCustomer(customerId, formData)
      }
      router.push('/crm/customers')
    } catch (error) {
      console.error('Error saving customer:', error)
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <SkeletonLoader variant="table" rows={3} columns={1} />
      </DashboardLayout>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-secondary/10 rounded transition-colors text-ink"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2 text-ink">
              {isNew ? 'New Customer' : `${formData.firstName} ${formData.lastName}`}
            </h1>
            <p className="text-muted-foreground">{isNew ? 'Add a new customer' : 'Edit customer information'}</p>
          </div>
        </div>

        {!isNew && customer && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent-olive/10 rounded">
                  <DollarSign className="text-accent-olive" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-display tracking-luxury text-ink">
                    ${customer.totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent-olive/10 rounded">
                  <ShoppingBag className="text-accent-olive" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-display tracking-luxury text-ink">
                    {customer.totalOrders}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent-olive/10 rounded">
                  <Calendar className="text-accent-olive" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Last Purchase</p>
                  <p className="text-sm font-medium text-ink">
                    {customer.lastPurchaseDate
                      ? new Date(customer.lastPurchaseDate).toLocaleDateString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded p-6">
              <h2 className="font-display text-xl tracking-luxury mb-4 text-ink">Customer Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-ink">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as CustomerTier })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  {TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                  })
                }
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="VIP, Jewelry-Lover, Winter-Shopper"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Internal notes about this customer..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Customer'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
            </div>

          {!isNew && (
            <>
              <div className="bg-card border border-border rounded p-6">
                <h2 className="font-display text-xl tracking-luxury mb-4 text-ink flex items-center gap-2">
                  <Package size={20} />
                  Order History
                </h2>
                {ordersLoading ? (
                  <SkeletonLoader variant="table" rows={3} columns={4} />
                ) : orders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-secondary/5">
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Order ID</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Date</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Amount</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-mono text-xs text-ink-700 truncate block max-w-[120px]">
                                {order.id.slice(0, 12)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-display tracking-luxury text-ink">
                                ${order.totalAmount.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge status={getStatusType(order.status)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
          </div>

          {!isNew && customer && (
            <div className="space-y-6">
              {customer.address && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-xl tracking-luxury mb-4 text-ink flex items-center gap-2">
                    <MapPin size={20} />
                    Address
                  </h2>
                  <div className="space-y-2 text-sm text-ink">
                    <p>{customer.address.street}</p>
                    <p>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
                    <p>{customer.address.country}</p>
                  </div>
                </div>
              )}

              {customer.preferences && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-xl tracking-luxury mb-4 text-ink flex items-center gap-2">
                    <Heart size={20} />
                    Preferences
                  </h2>
                  <div className="space-y-4 text-sm">
                    {customer.preferences.sizes && customer.preferences.sizes.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Sizes</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.preferences.sizes.map(size => (
                            <span key={size} className="px-3 py-1 rounded-full bg-accent-olive/10 text-accent-olive text-xs">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {customer.preferences.colors && customer.preferences.colors.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Colors</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.preferences.colors.map(color => (
                            <span key={color} className="px-3 py-1 rounded-full bg-accent-olive/10 text-accent-olive text-xs">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {customer.preferences.styles && customer.preferences.styles.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Styles</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.preferences.styles.map(style => (
                            <span key={style} className="px-3 py-1 rounded-full bg-accent-olive/10 text-accent-olive text-xs">
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {customer.tags.length > 0 && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-xl tracking-luxury mb-4 text-ink">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {customer.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-accent-olive/10 text-accent-olive text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
