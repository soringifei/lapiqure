'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { EmptyState } from '@/components/crm/EmptyState'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { Campaign, CampaignStatus } from '@/types/crm'
import { Plus, BarChart2, Mail, Pause } from 'lucide-react'


function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  const styles: Record<CampaignStatus, string> = {
    draft: 'bg-muted/10 text-muted-foreground',
    scheduled: 'bg-blue-100 text-blue-700',
    running: 'bg-accent-olive/10 text-accent-olive',
    completed: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700'
  }
  return (
    <span className={`px-3 py-1 rounded text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  )
}

function CampaignMetrics({ campaign }: { campaign: Campaign }) {
  const openRate = campaign.metrics.sent > 0 ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1) : 0
  const clickRate = campaign.metrics.sent > 0 ? ((campaign.metrics.clicked / campaign.metrics.sent) * 100).toFixed(1) : 0

  return (
    <div className="grid grid-cols-4 gap-2 text-xs">
      <div>
        <p className="text-muted-foreground">Sent</p>
        <p className="font-medium">{campaign.metrics.sent}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Open Rate</p>
        <p className="font-medium">{openRate}%</p>
      </div>
      <div>
        <p className="text-muted-foreground">Click Rate</p>
        <p className="font-medium">{clickRate}%</p>
      </div>
      <div>
        <p className="text-muted-foreground">Bounced</p>
        <p className="font-medium">{campaign.metrics.bounced}</p>
      </div>
    </div>
  )
}

export default function CampaignsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { service } = useCRM()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetTiers: [] as string[],
    targetTags: [] as string[],
    emailTemplate: '',
  })

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!service) return
      try {
        const data = await service.getCampaigns()
        setCampaigns(data)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [service])

  const activeCampaigns = campaigns.filter(c => c.status === 'running').length
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients.length, 0)

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service || !user) {
      console.error('Missing service or user', { service: !!service, user: !!user })
      return
    }
    try {
      await service.addCampaign({
        name: formData.name,
        description: formData.description,
        targetTiers: formData.targetTiers as ('platinum' | 'gold' | 'silver' | 'prospect')[],
        targetTags: formData.targetTags,
        status: 'draft',
        emailTemplate: formData.emailTemplate,
        recipients: [],
        metrics: { sent: 0, opened: 0, clicked: 0, bounced: 0 },
        createdBy: user.uid,
      })
      setFormData({ name: '', description: '', targetTiers: [], targetTags: [], emailTemplate: '' })
      setShowForm(false)
      const updatedCampaigns = await service.getCampaigns()
      setCampaigns(updatedCampaigns)
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

  const handleTogglePause = async (campaignId: string, currentStatus: CampaignStatus) => {
    if (!service) return
    try {
      const newStatus: CampaignStatus = currentStatus === 'running' ? 'paused' : 'running'
      const serviceAny = service as unknown as { db: { collection: (name: string) => { doc: (id: string) => { update: (data: Record<string, unknown>) => Promise<void> } } } }
      const campaignRef = serviceAny.db.collection('crm_campaigns').doc(campaignId)
      await campaignRef.update({ status: newStatus, updatedAt: new Date() })
      const updatedCampaigns = await service.getCampaigns()
      setCampaigns(updatedCampaigns)
    } catch (error) {
      console.error('Error updating campaign status:', error)
    }
  }

  const handleViewStats = (campaign: Campaign) => {
    alert(`Campaign: ${campaign.name}\n\nSent: ${campaign.metrics.sent}\nOpened: ${campaign.metrics.opened}\nClicked: ${campaign.metrics.clicked}\nBounced: ${campaign.metrics.bounced}\n\nOpen Rate: ${campaign.metrics.sent > 0 ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1) : 0}%\nClick Rate: ${campaign.metrics.sent > 0 ? ((campaign.metrics.clicked / campaign.metrics.sent) * 100).toFixed(1) : 0}%`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Campaigns"
          subtitle={`${activeCampaigns} active • ${totalRecipients} total recipients`}
          actions={
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              <Plus size={20} />
              New Campaign
            </button>
          }
        />

        {showForm && (
          <div className="bg-card border border-border rounded p-6">
            <h2 className="font-display tracking-luxury mb-4">New Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Campaign name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 border border-border rounded bg-background col-span-2" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-4 py-2 border border-border rounded bg-background col-span-2" rows={3} required />
              <input type="text" placeholder="Target tiers (platinum, gold, silver)" value={formData.targetTiers.join(', ')} onChange={(e) => setFormData({ ...formData, targetTiers: e.target.value.split(',').map(t => t.trim()) })} className="px-4 py-2 border border-border rounded bg-background" />
              <input type="text" placeholder="Target tags (comma-separated)" value={formData.targetTags.join(', ')} onChange={(e) => setFormData({ ...formData, targetTags: e.target.value.split(',').map(t => t.trim()) })} className="px-4 py-2 border border-border rounded bg-background" />
              <textarea placeholder="Email template" value={formData.emailTemplate} onChange={(e) => setFormData({ ...formData, emailTemplate: e.target.value })} className="px-4 py-2 border border-border rounded bg-background col-span-2" rows={3} />
              <div className="flex gap-2 col-span-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">Create Campaign</button>
                <button type="button" onClick={() => { setShowForm(false); setFormData({ name: '', description: '', targetTiers: [], targetTags: [], emailTemplate: '' }) }} className="flex-1 px-4 py-2 bg-secondary/20 rounded hover:bg-secondary/30">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <SkeletonLoader variant="list" rows={5} />
        ) : campaigns.length === 0 ? (
          <div className="bg-card border border-border rounded">
            <EmptyState
              title="No campaigns yet"
              description="Create your first campaign to reach customers with targeted email marketing."
              primaryAction={{
                label: 'New Campaign',
                onClick: () => setShowForm(true),
              }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-card border border-border rounded p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={18} className="text-accent-olive" />
                      <h3 className="font-display tracking-luxury">{campaign.name}</h3>
                      <CampaignStatusBadge status={campaign.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{campaign.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewStats(campaign)}
                      className="p-2 hover:bg-secondary/10 rounded transition-colors"
                      title="View Stats"
                    >
                      <BarChart2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleTogglePause(campaign.id, campaign.status)}
                      className="p-2 hover:bg-secondary/10 rounded transition-colors"
                      title={campaign.status === 'running' ? 'Pause Campaign' : 'Resume Campaign'}
                    >
                      <Pause size={18} />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <CampaignMetrics campaign={campaign} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
