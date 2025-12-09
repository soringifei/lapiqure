'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

export function RevenueTrendChart({
  data,
}: {
  data: { label: string; value: number }[]
}) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-card border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display tracking-luxury text-ink">Revenue Trend</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-[0.1em]">Time-based</span>
      </div>
      <div className="w-full" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B7445" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6B7445" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="label" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F4843', fontSize: 11, fontWeight: 500 }}
              angle={data.length > 7 ? -35 : 0}
              textAnchor={data.length > 7 ? 'end' : 'middle'}
              interval={data.length > 14 ? Math.floor(data.length / 7) : 0}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F4843', fontSize: 11 }}
              width={60}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '0',
                color: '#1F1A17',
                fontSize: '12px',
                padding: '8px 12px'
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6B7445"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function OrdersByStatusChart({
  data,
}: {
  data: { status: string; count: number }[]
}) {
  return (
    <div className="bg-card border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display tracking-luxury text-ink">Orders by Status</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-[0.1em]">Current pipeline</span>
      </div>
      <div className="w-full" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
            <XAxis 
              dataKey="status" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F4843', fontSize: 11, fontWeight: 500 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F4843', fontSize: 11 }}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '0',
                color: '#1F1A17',
                fontSize: '12px',
                padding: '8px 12px'
              }} 
            />
            <Bar 
              dataKey="count" 
              fill="#6B7445" 
              radius={[0, 0, 0, 0]}
              minPointSize={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
