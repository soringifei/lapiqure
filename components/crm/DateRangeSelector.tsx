'use client'

import { useState, useEffect } from 'react'

type DateRange = 7 | 30 | 90 | 'custom'

interface DateRangeSelectorProps {
  value: number
  onChange: (days: number) => void
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>(30)

  useEffect(() => {
    const saved = localStorage.getItem('crm-dashboard-date-range')
    if (saved) {
      const days = parseInt(saved, 10)
      if (days === 7 || days === 30 || days === 90) {
        setSelectedRange(days)
        onChange(days)
      } else {
        setSelectedRange('custom')
        onChange(days)
      }
    } else {
      onChange(30)
    }
  }, [onChange])

  const handleRangeChange = (range: DateRange) => {
    setSelectedRange(range)
    if (range !== 'custom') {
      onChange(range)
      localStorage.setItem('crm-dashboard-date-range', range.toString())
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Range</span>
      <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
        <button
          onClick={() => handleRangeChange(7)}
          className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
            selectedRange === 7
              ? 'bg-ink text-paper'
              : 'text-muted-foreground hover:text-ink'
          }`}
        >
          7d
        </button>
        <button
          onClick={() => handleRangeChange(30)}
          className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
            selectedRange === 30
              ? 'bg-ink text-paper'
              : 'text-muted-foreground hover:text-ink'
          }`}
        >
          30d
        </button>
        <button
          onClick={() => handleRangeChange(90)}
          className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
            selectedRange === 90
              ? 'bg-ink text-paper'
              : 'text-muted-foreground hover:text-ink'
          }`}
        >
          90d
        </button>
      </div>
    </div>
  )
}


