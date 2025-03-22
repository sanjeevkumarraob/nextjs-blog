'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Tag {
  id: string
  name: string
  slug: string
}

interface TagSelectorProps {
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState('')
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase
        .from('tags')
        .select('*')
        .order('name')

      if (data) setTags(data)
    }

    fetchTags()
  }, [supabase])

  const handleAddTag = async () => {
    if (!newTag.trim()) return

    const slug = newTag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const { data, error } = await supabase
      .from('tags')
      .insert([{ 
        name: newTag.trim(), 
        slug 
      }])
      .select()
      .single()

    if (!error && data) {
      setTags([...tags, data])
      onChange([...selectedTags, data.id])
      setNewTag('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "secondary"}
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              const isSelected = selectedTags.includes(tag.id)
              onChange(
                isSelected
                  ? selectedTags.filter((id) => id !== tag.id)
                  : [...selectedTags, tag.id]
              )
            }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add new tag"
        />
        <Button onClick={handleAddTag}>
          Add
        </Button>
      </div>
    </div>
  )
} 