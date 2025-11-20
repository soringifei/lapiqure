'use client'

import React from 'react'
import { Check, AlertCircle, Info } from 'lucide-react'

type ValidationState = 'success' | 'error' | 'warning' | 'info' | 'none'

interface ValidationFeedbackProps {
  state: ValidationState
  message?: string
  className?: string
}

export function ValidationFeedback({
  state,
  message,
  className = '',
}: ValidationFeedbackProps) {
  if (state === 'none' || !message) return null

  const config = {
    success: {
      icon: Check,
      color: 'text-accent-olive',
      bg: 'bg-accent-olive/10',
      border: 'border-accent-olive/20',
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
    },
    info: {
      icon: Info,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
  }

  const cfg = config[state]
  const Icon = cfg.icon

  return (
    <div
      className={`mt-2 flex items-start gap-2 rounded border p-3 ${cfg.bg} ${cfg.border} text-sm ${className}`}
    >
      <Icon size={16} className={`flex-shrink-0 mt-0.5 ${cfg.color}`} />
      <p className={cfg.color}>{message}</p>
    </div>
  )
}
