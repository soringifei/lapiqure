'use client'

import React from 'react'

type StatusType = 'active' | 'inactive' | 'draft' | 'published' | 'pending' | 'error' | 'processing' | 'completed' | 'cancelled'

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  active: { bg: 'bg-accent-olive/10', text: 'text-accent-olive', dot: 'bg-accent-olive', label: 'Active' },
  inactive: { bg: 'bg-muted/20', text: 'text-muted-foreground', dot: 'bg-muted-foreground', label: 'Inactive' },
  draft: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', dot: 'bg-yellow-500', label: 'Draft' },
  published: { bg: 'bg-blue-500/10', text: 'text-blue-500', dot: 'bg-blue-500', label: 'Published' },
  pending: { bg: 'bg-orange-500/10', text: 'text-orange-500', dot: 'bg-orange-500', label: 'Pending' },
  error: { bg: 'bg-red-500/10', text: 'text-red-500', dot: 'bg-red-500', label: 'Error' },
  processing: { bg: 'bg-blue-500/10', text: 'text-blue-500', dot: 'bg-blue-500', label: 'Processing' },
  completed: { bg: 'bg-accent-olive/10', text: 'text-accent-olive', dot: 'bg-accent-olive', label: 'Completed' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', dot: 'bg-red-500', label: 'Cancelled' },
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
