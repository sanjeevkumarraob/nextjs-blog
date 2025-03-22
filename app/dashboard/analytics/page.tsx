import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ViewsChart } from '@/components/dashboard/ViewsChart'
import { PopularPosts } from '@/components/dashboard/PopularPosts'
import { ViewsByCountry } from '@/components/dashboard/ViewsByCountry'

export default async function AnalyticsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: viewStats } = await supabase
    .from('post_views')
    .select('created_at, post_id, country')
    .order('created_at', { ascending: false })
    .limit(1000)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ViewsChart data={viewStats || []} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <PopularPosts />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Views by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewsByCountry data={viewStats || []} />
        </CardContent>
      </Card>
    </div>
  )
} 