'use client'

import React from 'react'

type StatusType = 'active' | 'inactive' | 'draft' | 'published' | 'pending' | 'error' | 'processing' | 'completed' | 'cancelled'

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  active: { bg: 'bg-accent-olive/10', text: 'text-accent-olive', dot: 'bg-accent-olive', label: 'Active' },
  inactive: { bg: 'bg-muted/20', text: 'text-muted-foreground', dot: 'bg-muted-foreground', label: 'Inactive' },
  draft: { bg: 'bg-sand/40', text: 'text-ink-700', dot: 'bg-ink-700', label: 'Draft' },
  published: { bg: 'bg-accent-olive/10', text: 'text-accent-olive', dot: 'bg-accent-olive', label: 'Published' },
  pending: { bg: 'bg-accent-orange/10', text: 'text-accent-orange', dot: 'bg-accent-orange', label: 'Pending' },
  error: { bg: 'bg-accent-burgundy/10', text: 'text-accent-burgundy', dot: 'bg-accent-burgundy', label: 'Error' },
  processing: { bg: 'bg-ink/10', text: 'text-ink', dot: 'bg-ink', label: 'Processing' },
  completed: { bg: 'bg-accent-olive/10', text: 'text-accent-olive', dot: 'bg-accent-olive', label: 'Completed' },
  cancelled: { bg: 'bg-accent-burgundy/10', text: 'text-accent-burgundy', dot: 'bg-accent-burgundy', label: 'Cancelled' },
}

interface StatusBadgeProps {
  status: StatusType
  showDot?: boolean
  tooltip?: string
  className?: string
}

export function StatusBadge({
  status,
  showDot = true,
  tooltip,
  className = '',
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text} ${className}`}
      title={tooltip}
    >
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />}
      {config.label}
    </span>
  )
}
