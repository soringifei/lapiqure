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
import { Search, Plus, Edit, Trash2, ArrowUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const TIERS: CustomerTier[] = ['platinum', 'gold', 'silver', 'prospect']

type SortField = 'name' | 'email' | 'totalSpent' | 'totalOrders'
type SortState = { field: SortField; desc: boolean }

export default function CustomersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTier, setSelectedTier] = useState<CustomerTier | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [compact, setCompact] = useState(false)
  const [sortState, setSortState] = useState<SortState>({ field: 'totalSpent', desc: true })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)

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

    if (selectedTags.length > 0) {
      filtered = filtered.filter(c =>
        c.tags && selectedTags.some(tag => c.tags.includes(tag))
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, selectedTier, selectedTags])

  const getTierColor = (tier: CustomerTier) => {
    const colors: Record<CustomerTier, string> = {
      platinum: 'bg-accent-orange/10 text-accent-orange',
      gold: 'bg-accent-olive/10 text-accent-olive',
      silver: 'bg-sand/40 text-ink-700',
      prospect: 'bg-muted/20 text-muted-foreground'
    }
    return colors[tier]
  }

  const allTags = Array.from(new Set(customers.flatMap(c => c.tags || []))).sort()

  const handleSort = (field: SortField) => {
    setSortState(prev => ({
      field,
      desc: prev.field === field ? !prev.desc : true
    }))
  }

  const handleDeleteClick = (id: string) => {
    setCustomerToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!customerToDelete || !service) return
    try {
      await service.deleteCustomer(customerToDelete)
      const updatedCustomers = await service.getCustomers()
      setCustomers(updatedCustomers)
      setDeleteDialogOpen(false)
      setCustomerToDelete(null)
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleEditCustomer = (id: string) => {
    try {
      if (!id || id.trim() === '') {
        console.error('Cannot edit customer: Invalid customer ID')
        return
      }

      if (!router) {
        console.error('Cannot edit customer: Router is not available')
        return
      }

      const editPath = `/crm/customers/${id}`
      console.log('Navigating to edit customer:', editPath)
      router.push(editPath)
    } catch (error) {
      console.error('Unexpected error in handleEditCustomer:', error)
    }
  }

  const handleAddCustomer = () => {
    router.push('/crm/customers/new')
  }

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0
    switch (sortState.field) {
      case 'name':
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
        comparison = nameA.localeCompare(nameB)
        break
      case 'email':
        comparison = a.email.toLowerCase().localeCompare(b.email.toLowerCase())
        break
      case 'totalSpent':
        comparison = a.totalSpent - b.totalSpent
        break
      case 'totalOrders':
        comparison = a.totalOrders - b.totalOrders
        break
    }
    return sortState.desc ? -comparison : comparison
  })

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
              className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTier('all')}
                className={`px-4 py-2 rounded text-sm transition-colors font-medium ${
                  selectedTier === 'all'
                    ? 'bg-accent-olive text-white'
                    : 'bg-secondary/10 hover:bg-secondary/20 text-ink'
                }`}
              >
                All Tiers
              </button>
              {TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-4 py-2 rounded text-sm transition-colors capitalize font-medium ${
                    selectedTier === tier
                      ? 'bg-accent-olive text-white'
                      : 'bg-secondary/10 hover:bg-secondary/20 text-ink'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCompact(!compact)}
              className="px-3 py-1.5 text-xs rounded border border-border hover:bg-secondary/10 transition-colors text-ink"
            >
              {compact ? 'Comfortable rows' : 'Compact rows'}
            </button>
          </div>

          {allTags.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-[0.1em]">Filter by Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag)
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-accent-olive text-white'
                        : 'bg-secondary/10 hover:bg-secondary/20 text-ink'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="px-3 py-1 rounded-full text-xs bg-secondary/10 hover:bg-secondary/20 text-ink transition-colors flex items-center gap-1"
                  >
                    <X size={12} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/5">
                  <th
                    className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em] cursor-pointer select-none hover:bg-secondary/10 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <ArrowUpDown size={14} className="text-muted-foreground/50" />
                      {sortState.field === 'name' && (sortState.desc ? '↓' : '↑')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em] cursor-pointer select-none hover:bg-secondary/10 transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      Email
                      <ArrowUpDown size={14} className="text-muted-foreground/50" />
                      {sortState.field === 'email' && (sortState.desc ? '↓' : '↑')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Tier</th>
                  <th
                    className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em] cursor-pointer select-none hover:bg-secondary/10 transition-colors"
                    onClick={() => handleSort('totalSpent')}
                  >
                    <div className="flex items-center gap-2">
                      Total Spent
                      <ArrowUpDown size={14} className="text-muted-foreground/50" />
                      {sortState.field === 'totalSpent' && (sortState.desc ? '↓' : '↑')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em] cursor-pointer select-none hover:bg-secondary/10 transition-colors"
                    onClick={() => handleSort('totalOrders')}
                  >
                    <div className="flex items-center gap-2">
                      Orders
                      <ArrowUpDown size={14} className="text-muted-foreground/50" />
                      {sortState.field === 'totalOrders' && (sortState.desc ? '↓' : '↑')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium text-xs uppercase tracking-[0.1em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map(customer => (
                  <tr
                    key={customer.id}
                    onClick={() => handleEditCustomer(customer.id)}
                    className={`border-b border-border hover:bg-secondary/5 transition-colors cursor-pointer ${
                      compact ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    <td className={`${compact ? 'px-4 py-2' : 'px-6 py-3'} text-ink`}>
                      <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                      {customer.tags && customer.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {customer.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-accent-olive/10 text-accent-olive">
                              {tag}
                            </span>
                          ))}
                          {customer.tags.length > 2 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary/20 text-muted-foreground">
                              +{customer.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className={`${compact ? 'px-4 py-2' : 'px-6 py-3'} text-muted-foreground truncate max-w-[200px]`}>
                      {customer.email}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTierColor(customer.tier)}`}>
                        {customer.tier}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="font-display tracking-luxury text-ink">
                        ${customer.totalSpent.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-ink">{customer.totalOrders}</td>
                    <td className="px-6 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleEditCustomer(customer.id)
                          }}
                          className="p-2 hover:bg-accent-olive/10 rounded transition-colors text-accent-olive"
                          aria-label={`Edit customer ${customer.firstName} ${customer.lastName}`}
                          title="Edit customer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDeleteClick(customer.id)
                          }}
                          className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                          aria-label={`Delete customer ${customer.firstName} ${customer.lastName}`}
                          title="Delete customer"
                        >
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

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Customer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this customer? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  setDeleteDialogOpen(false)
                  setCustomerToDelete(null)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
