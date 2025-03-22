'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { format, subDays } from "date-fns"

interface ViewsChartProps {
  data: { created_at: string }[]
}

export function ViewsChart({ data }: ViewsChartProps) {
  // Process data to count views per day
  const viewsByDay = data.reduce((acc, view) => {
    const date = format(new Date(view.created_at), 'MMM d')
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Create array of last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = format(subDays(new Date(), i), 'MMM d')
    return {
      date,
      views: viewsByDay[date] || 0
    }
  }).reverse()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={last30Days}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 