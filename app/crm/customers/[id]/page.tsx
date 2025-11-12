'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { CustomerTier } from '@/types/crm'
import { ArrowLeft, Save } from 'lucide-react'

const TIERS: CustomerTier[] = ['platinum', 'gold', 'silver', 'prospect']

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const customerId = params.id as string

  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
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
        const customer = await service.getCustomer(customerId)
        if (customer) {
          setFormData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            tier: customer.tier,
            company: customer.company || '',
            tags: customer.tags,
            notes: customer.notes || '',
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
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-secondary/10 rounded transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">
              {isNew ? 'New Customer' : `${formData.firstName} ${formData.lastName}`}
            </h1>
            <p className="text-muted-foreground">{isNew ? 'Add a new customer' : 'Edit customer information'}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded p-6 max-w-2xl">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as CustomerTier })}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                  })
                }
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="VIP, Jewelry-Lover, Winter-Shopper"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Internal notes about this customer..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Customer'}
              </button>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-secondary/20 rounded hover:bg-secondary/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
