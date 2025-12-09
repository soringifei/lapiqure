'use client'

import { Mail, Phone, Gift, Star, ArrowUp, Users } from 'lucide-react'

interface InsightRecommendationsProps {
  segment: 'atRisk' | 'highValue' | 'growth'
  customerCount: number
}

export function InsightRecommendations({ segment, customerCount }: InsightRecommendationsProps) {
  if (customerCount === 0) return null

  const recommendations = {
    atRisk: [
      { icon: Mail, label: 'Send re-engagement email', action: 'email' },
      { icon: Gift, label: 'Offer exclusive discount', action: 'discount' },
      { icon: Phone, label: 'Schedule follow-up call', action: 'call' },
    ],
    highValue: [
      { icon: Star, label: 'VIP exclusive offer', action: 'vip' },
      { icon: Users, label: 'Personal shopping session', action: 'personal' },
      { icon: Gift, label: 'Early access to new collection', action: 'early' },
    ],
    growth: [
      { icon: ArrowUp, label: 'Upsell recommendation', action: 'upsell' },
      { icon: Gift, label: 'Cross-sell products', action: 'crosssell' },
      { icon: Star, label: 'Loyalty program invite', action: 'loyalty' },
    ],
  }

  const segmentRecommendations = recommendations[segment]

  return (
    <div className="mt-4 p-4 bg-secondary/5 border border-border rounded">
      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
        Recommended Actions
      </p>
      <div className="space-y-2">
        {segmentRecommendations.map((rec, index) => {
          const Icon = rec.icon
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-2 hover:bg-secondary/10 rounded text-left transition-colors group"
              onClick={() => {
                // TODO: Implement action handlers
                console.log(`Action: ${rec.action} for ${customerCount} customers`)
              }}
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-olive transition-colors" />
              <span className="text-xs text-ink-700 group-hover:text-ink">{rec.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}


