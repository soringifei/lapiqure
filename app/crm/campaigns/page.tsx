'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-luxury mb-2">Campaigns</h1>
            <p className="text-muted-foreground">{activeCampaigns} active • {totalRecipients} total recipients</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <Plus size={20} />
            New Campaign
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="flex items-center justify-center h-96 bg-card border border-border rounded">
            <p className="text-muted-foreground">No campaigns yet</p>
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
                    <button className="p-2 hover:bg-secondary/10 rounded transition-colors">
                      <BarChart2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-secondary/10 rounded transition-colors">
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
