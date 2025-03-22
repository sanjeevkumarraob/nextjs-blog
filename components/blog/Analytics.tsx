'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ViewCount {
  date: string
  count: number
}

export default function Analytics({ postId }: { postId: string }) {
  const [viewCounts, setViewCounts] = useState<ViewCount[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchViewCounts = async () => {
      const { data } = await supabase
        .from('post_views')
        .select('created_at')
        .eq('post_id', postId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      // Group by date and count
      const counts = data?.reduce((acc, view) => {
        const date = new Date(view.created_at).toLocaleDateString()
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const formattedData = Object.entries(counts || {}).map(([date, count]) => ({
        date,
        count,
      }))

      setViewCounts(formattedData)
    }

    fetchViewCounts()
  }, [postId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Views</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={viewCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 