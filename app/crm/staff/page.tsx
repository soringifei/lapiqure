'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { StaffMember, UserRole } from '@/types/crm'
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react'

function RoleBadge({ role }: { role: UserRole }) {
  const styles: Record<UserRole, string> = {
    admin: 'bg-destructive/10 text-destructive',
    manager: 'bg-accent-olive/10 text-accent-olive',
    staff: 'bg-secondary/10 text-primary'
  }
  return (
    <span className={`px-3 py-1 rounded text-xs font-medium capitalize ${styles[role]}`}>
      {role}
    </span>
  )
}

export default function StaffPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'staff' as UserRole,
    isActive: true,
  })

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchStaff = async () => {
      if (!service) return
      try {
        const data = await service.getStaff()
        setStaff(data)
      } catch (error) {
        console.error('Error fetching staff:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [service])

  const activeStaff = staff.filter(s => s.isActive).length

  const handleEditStaff = (member: StaffMember) => {
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone || '',
      role: member.role,
      isActive: member.isActive,
    })
    setEditingId(member.id)
    setShowForm(true)
  }

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service) return
    try {
      if (editingId) {
        await service.updateStaff(editingId, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          role: formData.role,
          isActive: formData.isActive,
        })
      } else {
        await service.addStaff({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          role: formData.role,
          isActive: formData.isActive,
          assignedCustomers: [],
        })
      }
      setFormData({ firstName: '', lastName: '', email: '', phone: '', role: 'staff', isActive: true })
      setEditingId(null)
      setShowForm(false)
      const updatedStaff = await service.getStaff()
      setStaff(updatedStaff)
    } catch (error) {
      console.error('Error saving staff:', error)
    }
  }

  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Delete this staff member?')) return
    if (!service) return
    try {
      await service.deleteStaff(id)
      const updatedStaff = await service.getStaff()
      setStaff(updatedStaff)
    } catch (error) {
      console.error('Error deleting staff:', error)
    }
  }
 
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Staff</h1>
            <p className="text-muted-foreground">{activeStaff} active members</p>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ firstName: '', lastName: '', email: '', phone: '', role: 'staff', isActive: true })
              setShowForm(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            Add Staff
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded p-6 animate-pulse h-24" />
            <div className="bg-card border border-border rounded p-6 animate-pulse h-64" />
          </div>
        ) : staff.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 bg-card border border-border rounded">
            <AlertCircle size={40} className="text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No staff members yet</p>
          </div>
        ) : (
          <>
            {showForm && (
              <div className="bg-card border border-border rounded p-6">
                <h2 className="font-display tracking-luxury mb-4">{editingId ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
                <form onSubmit={handleSaveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="px-4 py-2 border border-border rounded bg-background" required />
                  <input type="text" placeholder="Last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="px-4 py-2 border border-border rounded bg-background" required />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-2 border border-border rounded bg-background" required />
                  <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-4 py-2 border border-border rounded bg-background" />
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })} className="px-4 py-2 border border-border rounded bg-background">
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label className="flex items-center gap-2 px-4 py-2 border border-border rounded bg-background cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                    Active
                  </label>
                  <div className="flex gap-2 col-span-2">
                    <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">{editingId ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="flex-1 px-4 py-2 bg-secondary/20 rounded hover:bg-secondary/30">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-card border border-border rounded overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/5">
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Role</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Customers</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(member => (
                  <tr key={member.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-3">{member.firstName} {member.lastName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{member.email}</td>
                    <td className="px-6 py-3">
                      <RoleBadge role={member.role} />
                    </td>
                    <td className="px-6 py-3">{member.assignedCustomers.length}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        member.isActive
                          ? 'bg-accent-olive/10 text-accent-olive'
                          : 'bg-muted/10 text-muted-foreground'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditStaff(member)} className="p-2 hover:bg-secondary/10 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteStaff(member.id)} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
