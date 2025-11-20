'use client'

import React from 'react'
import { X, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BatchAction {
  id: string
  label: string
  icon?: React.ElementType
  variant?: 'default' | 'destructive'
  onClick: () => void
}

interface BatchActionsToolbarProps {
  selectedCount: number
  actions: BatchAction[]
  onClearSelection: () => void
  className?: string
}

export function BatchActionsToolbar({
  selectedCount,
  actions,
  onClearSelection,
  className = '',
}: BatchActionsToolbarProps) {
  if (selectedCount === 0) return null

  const visibleActions = actions.slice(0, 3)
  const moreActions = actions.slice(3)

  return (
    <div className={`animate-slide-in-up mb-4 rounded-lg border border-border bg-card/95 backdrop-blur-sm p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {selectedCount} selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          {visibleActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                size="sm"
                variant={action.variant === 'destructive' ? 'ghost' : 'ghost'}
                onClick={action.onClick}
                className={action.variant === 'destructive' ? 'text-red-500 hover:bg-red-500/10' : ''}
              >
                {Icon && <Icon size={16} className="mr-2" />}
                {action.label}
              </Button>
            )
          })}

          {moreActions.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="relative"
            >
              <MoreHorizontal size={16} />
            </Button>
          )}

          <div className="border-l border-border pl-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
