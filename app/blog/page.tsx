'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { formatDistanceToNow, format, parseISO } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import type { Database } from '@/types/database'

type Post = Database['public']['Functions']['get_published_posts_with_authors']['Returns'][0]

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase.rpc('get_published_posts_with_authors')
      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [supabase])

  // Generate archive data
  const archives = posts.reduce<Record<string, number>>((acc, post: Post) => {
    if (!post.published_at && !post.created_at) return acc
    const date = parseISO(post.published_at || post.created_at)
    const yearMonth = format(date, 'MMMM yyyy')
    acc[yearMonth] = (acc[yearMonth] || 0) + 1
    return acc
  }, {})

  // Count posts per tag
  const tagCounts = posts.reduce<Record<string, number>>((acc, post: Post) => {
    if (!post.tags) return acc
    post.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})

  // Filter posts based on selected tag and month
  const filteredPosts = posts.filter((post: Post) => {
    if (selectedTag && (!post.tags || !post.tags.includes(selectedTag))) {
      return false
    }
    if (selectedMonth) {
      const postDate = parseISO(post.published_at || post.created_at)
      const postMonth = format(postDate, 'MMMM yyyy')
      if (postMonth !== selectedMonth) {
        return false
      }
    }
    return true
  })

  // Clear filters
  const clearFilters = () => {
    setSelectedTag(null)
    setSelectedMonth(null)
  }

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        {(selectedTag || selectedMonth) && (
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              {selectedTag && (
                <Badge variant="outline" className="gap-1">
                  Tag: {selectedTag}
                  <button onClick={() => setSelectedTag(null)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedMonth && (
                <Badge variant="outline" className="gap-1">
                  Archive: {selectedMonth}
                  <button onClick={() => setSelectedMonth(null)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post: Post) => (
                <Card key={post.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:underline text-primary line-clamp-2"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-4 flex-grow">
                    <div 
                      className="prose prose-sm max-w-none line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                    />
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant={selectedTag === tag ? "default" : "secondary"}
                            className="text-xs cursor-pointer hover:bg-secondary/80"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span>By {post.author?.username || 'Unknown'}</span>
                        <span>
                          {post.published_at ? 
                            formatDistanceToNow(new Date(post.published_at), { addSuffix: true }) : 
                            formatDistanceToNow(new Date(post.created_at || ''), { addSuffix: true })}
                        </span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4 space-y-8">
          {/* Tags Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tagCounts).map(([tag, count]) => (
                  <Badge 
                    key={tag} 
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  >
                    {tag} ({count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Archives Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Archives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(archives).map(([yearMonth, count]) => (
                  <div 
                    key={yearMonth} 
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-secondary/50 ${
                      selectedMonth === yearMonth ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setSelectedMonth(yearMonth === selectedMonth ? null : yearMonth)}
                  >
                    <span>{yearMonth}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
