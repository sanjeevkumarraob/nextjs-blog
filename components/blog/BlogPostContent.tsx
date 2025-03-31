'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Card } from "@/components/ui/card"
import ShareButtons from '@/components/blog/ShareButtons'
import { ArrowLeft, PenSquare, Trash2 } from 'lucide-react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import '@/app/styles/dracula.css'
import { ViewTracker } from './ViewTracker'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)

interface BlogPostProps {
  post: any;
  url: string;
}

export default function BlogPostContent({ post, url }: BlogPostProps) {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [supabase])

  useEffect(() => {
    // Apply syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  }, [post.content])

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)

      if (error) throw error

      toast.success('Post deleted successfully')
      window.location.href = '/blog'
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  return (
    <>
      <ViewTracker postId={post.id} />
      <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/blog" className="text-primary hover:underline inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
          {user && user.id === post.author_id && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 px-2"
              >
                <Link href={`/blog/${post.slug}/edit`}>
                  <PenSquare className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                onClick={handleDeletePost}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="relative py-12 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary/10"></div>
          <div className="container max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">{post.title}</h1>
            
            <div className="flex items-center text-sm text-slate-600 mb-4">
              <span>By {post.author?.username || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span>{format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}</span>
            </div>
            
            <div className="w-16 h-1 bg-accent mb-8"></div>
          </div>
        </div>
        
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-pre:bg-zinc-900 prose-pre:rounded-md prose-pre:my-6 prose-pre:shadow-lg prose-code:text-pink-300 prose-code:bg-zinc-800 prose-code:rounded prose-code:px-1 prose-a:text-blue-600 prose-img:rounded-lg prose-img:mx-auto prose-img:max-h-96 prose-img:object-contain"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        <div className="border-t pt-4">
          <ShareButtons post={post} url={url} />
        </div>
      </div>
    </>
  )
} 