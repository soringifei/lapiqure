'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Calendar, DollarSign, Package } from 'lucide-react'
import { InsightCustomerScore } from '@/app/crm/insights/page'

interface CustomerInsightCardProps {
  item: InsightCustomerScore
  onViewDetails: () => void
}

export function CustomerInsightCard({ item, onViewDetails }: CustomerInsightCardProps) {
  const [expanded, setExpanded] = useState(false)

  const daysSinceLastPurchase = Math.floor(item.recency)
  const lastPurchaseText = daysSinceLastPurchase === 0
    ? 'Today'
    : daysSinceLastPurchase === 1
    ? 'Yesterday'
    : daysSinceLastPurchase < 30
    ? `${daysSinceLastPurchase} days ago`
    : daysSinceLastPurchase < 365
    ? `${Math.floor(daysSinceLastPurchase / 30)} months ago`
    : `${Math.floor(daysSinceLastPurchase / 365)} years ago`

  return (
    <div className="border border-border rounded">
      <div
        className="p-4 hover:bg-secondary/5 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails()
              }}
              className="font-medium hover:text-accent-olive transition-colors text-left"
            >
              {item.label}
            </button>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Last purchase: {lastPurchaseText}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                <span>{item.frequency} order{item.frequency !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>Total: ${item.monetary.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-secondary/20 rounded">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-border bg-secondary/5 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Recency</p>
              <p className="font-medium">{daysSinceLastPurchase} days</p>
              <p className="text-xs text-muted-foreground mt-1">
                Score: {((100 - (item.recency / 365) * 100)).toFixed(0)}/100
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Frequency</p>
              <p className="font-medium">{item.frequency} orders</p>
              <p className="text-xs text-muted-foreground mt-1">
                Average order value: ${item.frequency > 0 ? (item.monetary / item.frequency).toFixed(0) : 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Monetary</p>
              <p className="font-medium">${item.monetary.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Lifetime value: ${item.clv.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Churn Risk</p>
              <p className={`font-medium ${
                item.churnRisk >= 0.5 ? 'text-destructive' :
                item.churnRisk >= 0.3 ? 'text-accent-orange' :
                'text-accent-olive'
              }`}>
                {(item.churnRisk * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Next purchase probability: {(item.nextPurchaseProbability * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          {item.churnRisk >= 0.5 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
              <p className="text-xs font-medium text-destructive mb-1">High Churn Risk</p>
              <p className="text-xs text-muted-foreground">
                This customer hasn't purchased in {daysSinceLastPurchase} days. Consider sending a re-engagement campaign.
              </p>
            </div>
          )}
          {item.rfmScore >= 75 && (
            <div className="p-3 bg-accent-olive/10 border border-accent-olive/20 rounded">
              <p className="text-xs font-medium text-accent-olive mb-1">Champion Customer</p>
              <p className="text-xs text-muted-foreground">
                High-value, frequent customer. Consider VIP treatment and exclusive offers.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

