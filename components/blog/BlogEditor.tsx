'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Editor } from './Editor'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TagSelector from './TagSelector'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Settings2, ArrowLeft } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  status: 'draft' | 'published'
}

export function BlogEditor({ post }: { post?: Post }) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || [])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSave = async (status: 'draft' | 'published') => {
    if (!title) {
      toast.error('Please enter a title')
      return
    }

    if (!content) {
      toast.error('Please add some content')
      return
    }

    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const postData = {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tags: selectedTags,
        status,
      }

      const { error } = await supabase
        .from('posts')
        .upsert({
          id: post?.id,
          ...postData,
          author_id: user.id,
          ...(status === 'published' ? { published_at: new Date().toISOString() } : {})
        })

      if (error) throw error

      toast.success(status === 'published' ? 'Post published!' : 'Draft saved!')
      router.push('/dashboard/posts')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const autoSave = useCallback(async () => {
    if (!title || !content) return
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('posts')
        .upsert([{
          title,
          content,
          excerpt: excerpt || content.substring(0, 150) + '...',
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          tags: selectedTags,
          status: 'draft',
          author_id: user.id,
          is_autosave: true
        }])

      if (!error) {
        toast.success('Draft autosaved', { duration: 2000 })
      }
    } catch (error) {
      console.error('Autosave failed:', error)
    }
  }, [title, content, excerpt, slug, selectedTags])

  useEffect(() => {
    const timer = setTimeout(autoSave, 30000) // Autosave every 30 seconds
    return () => clearTimeout(timer)
  }, [autoSave])

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch(e.key) {
          case 's':
            e.preventDefault()
            handleSave('draft')
            break
          case 'p':
            e.preventDefault()
            handleSave('published')
            break
          case 'h':
            e.preventDefault()
            setShowPreview(prev => !prev)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="text-3xl font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto bg-transparent placeholder:text-muted-foreground/60"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowPreview(!showPreview)}
              className="h-9"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Post Settings</SheetTitle>
                  <SheetDescription>
                    Configure your post settings here.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="your-post-url"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt</label>
                    <Input
                      type="text"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief description of your post"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <TagSelector
                      selectedTags={selectedTags}
                      onChange={setSelectedTags}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button 
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="h-9"
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave('published')}
              disabled={loading}
              className="h-9"
            >
              Publish
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 pt-24 px-4">
        {showPreview ? (
          <div className="prose prose-lg max-w-screen-lg mx-auto">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ) : (
          <Editor
            initialContent={content}
            onChange={setContent}
          />
        )}
      </main>
      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
        <kbd className="px-2 py-1 bg-muted rounded">⌘S</kbd> to save &nbsp;
        <kbd className="px-2 py-1 bg-muted rounded">⌘P</kbd> to publish &nbsp;
        <kbd className="px-2 py-1 bg-muted rounded">⌘H</kbd> to preview
      </div>
    </div>
  )
} 