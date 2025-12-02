'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { EmptyState } from '@/components/crm/EmptyState'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { Customer, CustomerTier } from '@/types/crm'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TIERS: CustomerTier[] = ['platinum', 'gold', 'silver', 'prospect']

export default function CustomersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTier, setSelectedTier] = useState<CustomerTier | 'all'>('all')
  const [compact, setCompact] = useState(false)
  const [sortDesc, setSortDesc] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/crm/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!service) return
      try {
        const data = await service.getCustomers()
        setCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [service])

  useEffect(() => {
    let filtered = customers

    if (selectedTier !== 'all') {
      filtered = filtered.filter(c => c.tier === selectedTier)
    }

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, selectedTier])

  const getTierColor = (tier: CustomerTier) => {
    const colors: Record<CustomerTier, string> = {
      platinum: 'bg-accent-orange/10 text-accent-orange',
      gold: 'bg-accent-olive/10 text-accent-olive',
      silver: 'bg-secondary/10 text-primary',
      prospect: 'bg-muted/10 text-muted-foreground'
    }
    return colors[tier]
  }

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm('Delete this customer?')) return
    if (!service) return
    try {
      await service.deleteCustomer(id)
      const updatedCustomers = await service.getCustomers()
      setCustomers(updatedCustomers)
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleEditCustomer = (id: string) => {
    router.push(`/crm/customers/${id}`)
  }

  const handleAddCustomer = () => {
    router.push('/crm/customers/new')
  }

  const sortedCustomers = [...filteredCustomers].sort((a, b) =>
    sortDesc ? b.totalSpent - a.totalSpent : a.totalSpent - b.totalSpent
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Customers"
          description="Manage tiers, tags, and assignments for your VIP clients."
          subtitle={filteredCustomers.length > 0 ? `Showing ${filteredCustomers.length} customers` : undefined}
          actions={
            <Button onClick={handleAddCustomer} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              Add Customer
            </Button>
          }
        />

        <div className="bg-card border border-border rounded p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center justify-between">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                selectedTier === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              All Tiers
            </button>
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-4 py-2 rounded text-sm transition-colors capitalize ${
                  selectedTier === tier
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/10 hover:bg-secondary/20'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCompact(!compact)}
            className="mt-3 px-3 py-1.5 text-xs rounded border border-border hover:bg-secondary/10 transition-colors"
          >
            {compact ? 'Comfortable rows' : 'Compact rows'}
          </button>
        </div>

        {loading ? (
          <SkeletonLoader variant="table" rows={5} columns={6} />
        ) : filteredCustomers.length === 0 ? (
          <div className="bg-card border border-border rounded">
            <EmptyState
              title="No customers yet"
              description="Start by adding your first client. You can import historical data later."
              primaryAction={{
                label: 'Add Customer',
                onClick: handleAddCustomer,
              }}
            />
          </div>
        ) : (
          <div className="bg-card border border-border rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/5">
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Tier</th>
                  <th
                    className="px-6 py-3 text-left text-muted-foreground font-medium cursor-pointer select-none"
                    onClick={() => setSortDesc(!sortDesc)}
                  >
                    Total Spent {sortDesc ? '↓' : '↑'}
                  </th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Orders</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map(customer => (
                  <tr
                    key={customer.id}
                    className={`border-b border-border hover:bg-secondary/5 transition-colors ${
                      compact ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    <td className={compact ? 'px-4 py-2' : 'px-6 py-3'}>{customer.firstName} {customer.lastName}</td>
                    <td className={compact ? 'px-4 py-2 text-muted-foreground' : 'px-6 py-3 text-sm text-muted-foreground'}>{customer.email}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded text-xs font-medium capitalize ${getTierColor(customer.tier)}`}>
                        {customer.tier}
                      </span>
                    </td>
                    <td className="px-6 py-3">${customer.totalSpent.toLocaleString()}</td>
                    <td className="px-6 py-3">{customer.totalOrders}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditCustomer(customer.id)} className="p-2 hover:bg-secondary/10 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteCustomer(customer.id)} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
