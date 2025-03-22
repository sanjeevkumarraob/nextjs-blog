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
import PostForm from './PostForm'
import { BlogPost } from '@/types/blog'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  status: 'draft' | 'published'
}

interface BlogEditorProps {
  post?: BlogPost
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter()

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <PostForm post={post} />
    </div>
  )
} 