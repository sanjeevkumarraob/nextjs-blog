import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RSS from 'rss'

export async function GET() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(username, full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const feed = new RSS({
    title: 'Your Blog Name',
    description: 'Your blog description',
    feed_url: `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    site_url: process.env.NEXT_PUBLIC_SITE_URL,
    language: 'en',
  })

  posts?.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      author: post.author.full_name || post.author.username,
      date: post.published_at,
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 