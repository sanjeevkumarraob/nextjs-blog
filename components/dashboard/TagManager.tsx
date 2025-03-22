'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from 'lucide-react'

interface Tag {
  id: string
  name: string
  slug: string
  posts: any[]
}

export function TagManager({ initialTags }: { initialTags: Tag[] }) {
  const [tags, setTags] = useState(initialTags)
  const [newTag, setNewTag] = useState('')
  const supabase = createClientComponentClient()

  const handleAddTag = async () => {
    if (!newTag.trim()) return

    const slug = newTag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const { data, error } = await supabase
      .from('tags')
      .insert([{ name: newTag.trim(), slug }])
      .select()
      .single()

    if (error) {
      toast.error('Failed to create tag')
      return
    }

    setTags([...tags, { ...data, posts: [] }])
    setNewTag('')
    toast.success('Tag created')
  }

  const handleDeleteTag = async (id: string) => {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete tag')
      return
    }

    setTags(tags.filter(tag => tag.id !== id))
    toast.success('Tag deleted')
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag name"
          className="max-w-sm"
        />
        <Button onClick={handleAddTag}>Add Tag</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.slug}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {tag.posts.length} posts
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTag(tag.id)}
                  disabled={tag.posts.length > 0}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 