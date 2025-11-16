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
  return (
    <div className="bg-card border border-border rounded p-6 h-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display tracking-luxury">Revenue Trend</h3>
        <span className="text-xs text-muted-foreground">Recent orders</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0479c8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0479c8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0479c8"
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function OrdersByStatusChart({
  data,
}: {
  data: { status: string; count: number }[]
}) {
  return (
    <div className="bg-card border border-border rounded p-6 h-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display tracking-luxury">Orders by Status</h3>
        <span className="text-xs text-muted-foreground">Current pipeline</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="status" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#0479c8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
