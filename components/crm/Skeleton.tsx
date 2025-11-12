'use client'

export function MetricSkeleton() {
  return (
    <div className="bg-card border border-border rounded p-6 animate-pulse">
      <div className="h-4 bg-secondary/20 rounded w-24 mb-4"></div>
      <div className="h-8 bg-secondary/20 rounded w-16"></div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex gap-4 p-4 border-b border-border animate-pulse">
      <div className="h-4 bg-secondary/20 rounded flex-1"></div>
      <div className="h-4 bg-secondary/20 rounded flex-1"></div>
      <div className="h-4 bg-secondary/20 rounded flex-1"></div>
      <div className="h-4 bg-secondary/20 rounded w-20"></div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="p-6 border-b border-border animate-pulse">
        <div className="h-6 bg-secondary/20 rounded w-32 mb-2"></div>
        <div className="h-3 bg-secondary/20 rounded w-48"></div>
      </div>
      <div className="space-y-3 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-secondary/20 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    </div>
  )
}
