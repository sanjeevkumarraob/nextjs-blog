'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Eye } from 'lucide-react'

export function RecentPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          created_at,
          view_count
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      if (data) setPosts(data)
    }

    fetchPosts()
  }, [supabase])

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <div className="space-y-1 flex-1">
            <Link 
              href={`/blog/${post.slug}`}
              className="text-sm font-medium leading-none hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-sm">{post.view_count || 0}</span>
          </div>
        </div>
      ))}
    </div>
  )
} 