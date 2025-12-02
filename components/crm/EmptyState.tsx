'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
    loading?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {icon && <div className="text-5xl mb-4 animate-fade-in">{icon}</div>}
      <h3 className="font-display text-xl tracking-luxury mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md text-center mb-6">{description}</p>
      <div className="flex gap-3">
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            disabled={primaryAction.loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {primaryAction.loading ? '...' : primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant="secondary"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}
