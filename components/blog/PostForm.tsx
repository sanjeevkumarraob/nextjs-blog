'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Editor } from './Editor'
import { BlogPost } from '@/types/blog'
import TagSelector from './TagSelector'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface PostFormProps {
  post?: BlogPost
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || [])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const postData = {
        title,
        content,
        excerpt,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status,
        author_id: user.id,
        ...(status === 'published' ? { published_at: new Date().toISOString() } : {}),
      }

      let postResult
      // Insert or update the post
      if (post) {
        const { data, error: postError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id)
          .select()
          .single()

        if (postError) throw postError
        postResult = data
      } else {
        const { data, error: postError } = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single()

        if (postError) throw postError
        postResult = data
      }

      if (!postResult) throw new Error('Failed to save post')

      // Delete existing tag associations if updating
      if (post) {
        const { error: deleteError } = await supabase
          .from('posts_tags')
          .delete()
          .eq('post_id', post.id)

        if (deleteError) throw deleteError
      }

      // Insert new tag associations
      if (selectedTags.length > 0) {
        // First, get the tag IDs for the selected tag names
        const { data: tagData, error: tagQueryError } = await supabase
          .from('tags')
          .select('id')
          .in('name', selectedTags)

        if (tagQueryError) throw tagQueryError

        if (tagData && tagData.length > 0) {
          const tagAssociations = tagData.map(tag => ({
            post_id: postResult.id,
            tag_id: tag.id
          }))

          const { error: tagError } = await supabase
            .from('posts_tags')
            .insert(tagAssociations)

          if (tagError) throw tagError

          // Update the tags array in the posts table
          const { error: updateError } = await supabase
            .from('posts')
            .update({ tags: selectedTags })
            .eq('id', postResult.id)

          if (updateError) throw updateError
        }
      } else {
        // If no tags are selected, update the tags array to be empty
        const { error: updateError } = await supabase
          .from('posts')
          .update({ tags: [] })
          .eq('id', postResult.id)

        if (updateError) throw updateError
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving post:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              rows={3}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              initialContent={content}
              onChange={setContent}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </div>

          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'draft')}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'published')}
            >
              Publish
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 