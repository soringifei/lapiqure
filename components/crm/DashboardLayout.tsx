'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, Package, Mail, Settings, LogOut, Menu, X, Zap, Layers, FileText, Palette } from 'lucide-react'
import './animations.css'

const NAVIGATION = [
  { href: '/crm', label: 'Dashboard', icon: BarChart3 },
  { href: '/crm/insights', label: 'Insights', icon: Zap },
  { href: '/crm/customers', label: 'Customers', icon: Users },
  { href: '/crm/orders', label: 'Orders', icon: Package },
  { href: '/crm/products', label: 'Products', icon: Layers },
  { href: '/crm/collections', label: 'Collections', icon: Palette },
  { href: '/crm/campaigns', label: 'Campaigns', icon: Mail },
  { href: '/crm/content', label: 'Content', icon: FileText },
  { href: '/crm/staff', label: 'Staff', icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sidebarClass = `transition-all duration-300 bg-primary text-primary-foreground ${
    sidebarOpen ? 'w-64' : 'w-20'
  }`

  return (
    <div className="flex h-screen bg-background">
      <aside className={sidebarClass}>
        <div className="flex items-center justify-between p-6">
          {sidebarOpen && (
            <h1 className="font-display text-xl tracking-luxury">LA PIQÛRE CRM</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary/90 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-3">
          {NAVIGATION.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive ? 'bg-secondary text-primary' : 'hover:bg-primary/90'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-primary/90 transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto flex flex-col">
        <header className="h-12 flex items-center justify-between border-b border-border px-8">
          <div className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
            LA PIQÛRE CRM
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Back to Storefront
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium">
                LP
              </div>
              <span>Admin</span>
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
