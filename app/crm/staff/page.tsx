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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Staff</h1>
            <p className="text-muted-foreground">{activeStaff} active members</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <Plus size={20} />
            Add Staff
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : staff.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 bg-card border border-border rounded">
            <AlertCircle size={40} className="text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No staff members yet</p>
          </div>
        ) : (
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
                        <button className="p-2 hover:bg-secondary/10 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive">
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
