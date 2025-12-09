'use client'

import { Plus, Package, Users, TrendingUp, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {

  const actions = [
    {
      icon: ShoppingCart,
      label: 'New Order',
      href: '/crm/orders/new',
      description: 'Create a new order',
    },
    {
      icon: Plus,
      label: 'Add Product',
      href: '/crm/products',
      description: 'Add a new product',
    },
    {
      icon: Package,
      label: 'Pending Orders',
      href: '/crm/orders?status=pending',
      description: 'View pending orders',
    },
    {
      icon: TrendingUp,
      label: 'Low Stock',
      href: '/crm/products?filter=low-stock',
      description: 'Products running low',
    },
    {
      icon: Users,
      label: 'Customer Insights',
      href: '/crm/insights',
      description: 'View customer analytics',
    },
  ]

  return (
    <div className="bg-card border border-border rounded p-6">
      <h3 className="font-display tracking-luxury text-ink mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group p-4 border border-border rounded hover:border-accent-olive/30 hover:bg-accent-olive/5 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 group-hover:bg-accent-olive/10 rounded transition-colors">
                  <Icon className="h-4 w-4 text-ink-700 group-hover:text-accent-olive transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink text-sm mb-1">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


