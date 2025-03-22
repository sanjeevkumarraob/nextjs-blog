import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Eye, MessageSquare, TrendingUp } from "lucide-react"
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentPosts } from '@/components/dashboard/RecentPosts'
import { ViewsChart } from '@/components/dashboard/ViewsChart'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: stats } = await supabase.rpc('get_blog_stats')
  const { data: recentViews } = await supabase
    .from('post_views')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(30)

  const statsCards = [
    {
      title: "Total Posts",
      value: stats?.total_posts || 0,
      icon: BookOpen,
      description: "Posts published"
    },
    {
      title: "Total Views",
      value: stats?.total_views || 0,
      icon: Eye,
      description: "All-time views"
    },
    {
      title: "Comments",
      value: stats?.total_comments || 0,
      icon: MessageSquare,
      description: "Total comments"
    },
    {
      title: "Engagement Rate",
      value: `${((stats?.engagement_rate || 0) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      description: "Avg. engagement"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <DashboardStats key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ViewsChart data={recentViews || []} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentPosts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 