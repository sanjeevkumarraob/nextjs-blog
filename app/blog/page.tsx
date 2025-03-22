import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'
import type { Post } from '@/types/blog'

export default async function BlogsPage() {
  const supabase = createServerComponentClient({ cookies })

  const cookieStore = await cookies()
  const token = await cookieStore.get('sb-localhost-auth-token')

  // First, check if posts query works without the join
  const { data: postsOnly } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published");
  console.log("Posts without join:", postsOnly);

  // Then try the join
  const { data, error } = await supabase
    .rpc('get_published_posts_with_authors');

  console.log("RPC error:", error);
  console.log("RPC data:", data);

  const posts = (data as Post[] || []);

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:underline text-primary"
                >
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-4">
              {/* Render HTML content safely */}
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
              />
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <span>By {post.author?.username || 'Unknown'}</span>
                <span className="mx-2">•</span>
                <span>
                  {post.published_at ? 
                    formatDistanceToNow(new Date(post.published_at), { addSuffix: true }) : 
                    formatDistanceToNow(new Date(post.created_at || ''), { addSuffix: true })}
                </span>
                
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <Button asChild variant="outline" size="sm">
                <Link href={`/blog/${post.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  )
}
