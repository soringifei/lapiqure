'use client'

import { AlertTriangle, Package, CreditCard, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface DashboardAlertsProps {
  lowStockProducts?: number
  urgentOrders?: number
  paymentFailures?: number
  highOrderVolume?: boolean
}

export function DashboardAlerts({
  lowStockProducts = 0,
  urgentOrders = 0,
  paymentFailures = 0,
  highOrderVolume = false,
}: DashboardAlertsProps) {
  const alerts: Array<{
    type: 'warning' | 'error' | 'info'
    icon: React.ElementType
    message: string
    link?: string
    linkText?: string
  }> = []

  if (urgentOrders > 0) {
    alerts.push({
      type: 'error',
      icon: AlertTriangle,
      message: `${urgentOrders} order${urgentOrders > 1 ? 's' : ''} require${urgentOrders === 1 ? 's' : ''} immediate attention`,
      link: '/crm/orders?status=pending',
      linkText: 'View orders',
    })
  }

  if (paymentFailures > 0) {
    alerts.push({
      type: 'error',
      icon: CreditCard,
      message: `${paymentFailures} payment${paymentFailures > 1 ? 's' : ''} failed`,
      link: '/crm/orders?paymentStatus=failed',
      linkText: 'Review payments',
    })
  }

  if (lowStockProducts > 0) {
    alerts.push({
      type: 'warning',
      icon: Package,
      message: `${lowStockProducts} product${lowStockProducts > 1 ? 's' : ''} running low on stock`,
      link: '/crm/products?filter=low-stock',
      linkText: 'View products',
    })
  }

  if (highOrderVolume) {
    alerts.push({
      type: 'info',
      icon: TrendingUp,
      message: 'High order volume detected - some products may be automatically marked unavailable',
      link: '/crm/products?filter=auto-unavailable',
      linkText: 'View products',
    })
  }

  if (alerts.length === 0) return null

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const Icon = alert.icon
        const bgColor =
          alert.type === 'error'
            ? 'bg-accent-burgundy/10 border-accent-burgundy/20'
            : alert.type === 'warning'
            ? 'bg-accent-orange/10 border-accent-orange/20'
            : 'bg-accent-olive/10 border-accent-olive/20'
        const textColor =
          alert.type === 'error'
            ? 'text-accent-burgundy'
            : alert.type === 'warning'
            ? 'text-accent-orange'
            : 'text-accent-olive'

        return (
          <div
            key={index}
            className={`${bgColor} border rounded p-4 flex items-start gap-3`}
          >
            <Icon className={`h-5 w-5 ${textColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${textColor} mb-1`}>{alert.message}</p>
              {alert.link && (
                <Link
                  href={alert.link}
                  className={`text-xs ${textColor} hover:underline font-medium`}
                >
                  {alert.linkText} →
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}


