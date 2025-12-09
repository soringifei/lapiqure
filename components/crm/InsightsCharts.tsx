'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

interface SegmentData {
  name: string
  value: number
  color: string
}

interface RFMData {
  range: string
  count: number
}

export function SegmentDistributionChart({ data }: { data: SegmentData[] }) {
  return (
    <div className="bg-card border border-border p-6">
      <h3 className="font-display tracking-luxury text-ink mb-4">Customer Segments</h3>
      <div className="w-full" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '0',
                color: '#1F1A17',
                fontSize: '12px',
                padding: '8px 12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function RFMDistributionChart({ data }: { data: RFMData[] }) {
  return (
    <div className="bg-card border border-border p-6">
      <h3 className="font-display tracking-luxury text-ink mb-4">RFM Score Distribution</h3>
      <div className="w-full" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#4F4843', fontSize: 11, fontWeight: 500 }}
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
                padding: '8px 12px',
              }}
            />
            <Bar dataKey="count" fill="#6B7445" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function CLVDistributionChart({ data }: { data: { range: string; count: number }[] }) {
  return (
    <div className="bg-card border border-border p-6">
      <h3 className="font-display tracking-luxury text-ink mb-4">Customer Lifetime Value</h3>
      <div className="w-full" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#4F4843', fontSize: 11, fontWeight: 500 }}
              angle={-35}
              textAnchor="end"
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
                padding: '8px 12px',
              }}
            />
            <Bar dataKey="count" fill="#6B7445" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


