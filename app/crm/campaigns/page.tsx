'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCRM } from '@/hooks/useCRM'
import { DashboardLayout } from '@/components/crm/DashboardLayout'
import { PageHeader } from '@/components/crm/PageHeader'
import { EmptyState } from '@/components/crm/EmptyState'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { EmailEditor } from '@/components/crm/EmailEditor'
import { Campaign, CampaignStatus, Product } from '@/types/crm'
import { EmailTemplateType, EmailTemplateData } from '@/lib/email-templates'
import { Plus, BarChart2, Mail, Pause, Send, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'


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
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    recipientType: 'all_subscribers' as 'all_subscribers' | 'custom',
    customEmails: '',
  })
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateType>('newsletter')
  const [emailData, setEmailData] = useState<EmailTemplateData>({
    headline: '',
    subheadline: '',
    bodyText: '',
    ctaText: 'Shop Now',
    ctaUrl: '',
  })

  useEffect(() => {
    if (!authLoading && !user) router.push('/crm/login')
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!service) return
      try {
        const [campaignsData, productsData] = await Promise.all([
          service.getCampaigns(),
          service.getProducts(),
        ])
        setCampaigns(campaignsData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
        setLoadingProducts(false)
      }
    }

    fetchData()
  }, [service])

  const activeCampaigns = campaigns.filter(c => c.status === 'running').length
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients.length, 0)

  const handleSendNewsletter = async () => {
    if (!formData.subject || !emailData.headline || !emailData.bodyText) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in subject, headline, and body text",
      })
      return
    }

    setSending(true)
    try {
      const recipientEmails = formData.recipientType === 'all_subscribers' 
        ? ['all_subscribers']
        : formData.customEmails.split(',').map(e => e.trim()).filter(Boolean)

      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateType: emailTemplate,
          emailData,
          recipientEmails,
          subject: formData.subject,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send newsletter')
      }

      // Create campaign record
      if (service && user) {
        await service.addCampaign({
          name: formData.name || formData.subject,
          description: formData.description || 'Newsletter campaign',
          targetTiers: [],
          targetTags: [],
          status: 'completed',
          emailTemplate: JSON.stringify({ template: emailTemplate, data: emailData }),
          recipients: recipientEmails,
          metrics: {
            sent: data.results?.sent || 0,
            opened: 0,
            clicked: 0,
            bounced: data.results?.failed || 0,
          },
          createdBy: user.uid,
        })
      }

      toast({
        title: "Newsletter sent!",
        description: `Successfully sent to ${data.results?.sent || 0} recipients`,
      })

      // Reset form
      setFormData({ 
        name: '', 
        description: '', 
        subject: '',
        recipientType: 'all_subscribers',
        customEmails: '',
      })
      setEmailData({
        headline: '',
        subheadline: '',
        bodyText: '',
        ctaText: 'Shop Now',
        ctaUrl: '',
      })
      setShowForm(false)

      // Refresh campaigns
      if (service) {
        const updatedCampaigns = await service.getCampaigns()
        setCampaigns(updatedCampaigns)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send newsletter",
        description: error instanceof Error ? error.message : 'Please try again',
      })
    } finally {
      setSending(false)
    }
  }

  const handleTogglePause = async (campaignId: string, currentStatus: CampaignStatus) => {
    if (!service) return
    try {
      const newStatus: CampaignStatus = currentStatus === 'running' ? 'paused' : 'running'
      await service.updateCampaign(campaignId, { status: newStatus })
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
          <div className="bg-card border border-border rounded p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display tracking-luxury text-xl">Create Newsletter</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setFormData({ 
                    name: '', 
                    description: '', 
                    subject: '',
                    recipientType: 'all_subscribers',
                    customEmails: '',
                  })
                  setEmailData({
                    headline: '',
                    subheadline: '',
                    bodyText: '',
                    ctaText: 'Shop Now',
                    ctaUrl: '',
                  })
                }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            {/* Campaign Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-border">
              <div>
                <label className="block text-sm font-medium mb-2">Campaign Name (optional)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Spring 2025 Collection Launch"
                  className="w-full px-4 py-2 border border-border rounded bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Newsletter subject line"
                  className="w-full px-4 py-2 border border-border rounded bg-background"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Internal notes about this campaign"
                  rows={2}
                  className="w-full px-4 py-2 border border-border rounded bg-background resize-none"
                />
              </div>
            </div>

            {/* Recipients */}
            <div className="pb-6 border-b border-border">
              <label className="block text-sm font-medium mb-3">Recipients</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="recipientType"
                    value="all_subscribers"
                    checked={formData.recipientType === 'all_subscribers'}
                    onChange={(e) => setFormData({ ...formData, recipientType: e.target.value as 'all_subscribers' | 'custom' })}
                    className="w-4 h-4"
                  />
                  <span>All newsletter subscribers</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="recipientType"
                    value="custom"
                    checked={formData.recipientType === 'custom'}
                    onChange={(e) => setFormData({ ...formData, recipientType: e.target.value as 'all_subscribers' | 'custom' })}
                    className="w-4 h-4 mt-1"
                  />
                  <div className="flex-1">
                    <span className="block mb-2">Custom email list</span>
                    <textarea
                      value={formData.customEmails}
                      onChange={(e) => setFormData({ ...formData, customEmails: e.target.value })}
                      placeholder="Enter emails separated by commas"
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded bg-background resize-none"
                      disabled={formData.recipientType !== 'custom'}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Email Editor */}
            <EmailEditor
              initialTemplate={emailTemplate}
              initialData={emailData}
              products={products}
              loadingProducts={loadingProducts}
              onSave={(template, data) => {
                setEmailTemplate(template)
                setEmailData(data)
              }}
            />

            {/* Send Button */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                onClick={handleSendNewsletter}
                disabled={sending || !formData.subject || !emailData.headline || !emailData.bodyText}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Newsletter
                  </>
                )}
              </button>
            </div>
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
