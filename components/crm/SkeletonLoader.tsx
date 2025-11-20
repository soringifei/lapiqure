'use client'

import React from 'react'

interface SkeletonLoaderProps {
  rows?: number
  columns?: number
  variant?: 'table' | 'list' | 'card' | 'form'
  className?: string
}

export function SkeletonLoader({
  rows = 5,
  columns = 4,
  variant = 'table',
  className = '',
}: SkeletonLoaderProps) {
  if (variant === 'table') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-10 bg-secondary/20 rounded animate-shimmer" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div
                key={colIdx}
                className="h-12 bg-secondary/10 rounded animate-shimmer"
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-secondary/20 rounded w-3/4 animate-shimmer" />
            <div className="h-3 bg-secondary/10 rounded w-1/2 animate-shimmer" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-3">
            <div className="h-6 bg-secondary/20 rounded animate-shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-secondary/10 rounded animate-shimmer" />
              <div className="h-4 bg-secondary/10 rounded w-4/5 animate-shimmer" />
            </div>
            <div className="h-10 bg-secondary/15 rounded animate-shimmer mt-4" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-secondary/20 rounded w-1/4 animate-shimmer" />
            <div className="h-10 bg-secondary/10 rounded animate-shimmer" />
          </div>
        ))}
      </div>
    )
  }

  return null
}
