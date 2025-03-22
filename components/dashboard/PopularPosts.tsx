'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface Post {
  id: string
  title: string
  slug: string
  view_count: number
  created_at: string
}

export function PopularPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('id, title, slug, view_count, created_at')
        .order('view_count', { ascending: false })
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
          <div className="text-sm text-muted-foreground">
            {post.view_count} views
          </div>
        </div>
      ))}
    </div>
  )
} 