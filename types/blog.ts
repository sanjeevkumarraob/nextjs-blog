export interface BlogPost {
  view_count?: number
  comment_count?: number
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
  excerpt?: string
  slug: string
  author_id: string
  status: 'draft' | 'published'
  published_at?: string
  tags?: string[]
  author?: {
    username: string
    full_name?: string
    avatar_url?: string
  }
}

export type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  created_at: string
  updated_at: string
  published_at?: string
  status: 'draft' | 'published'
  author_id: string
  author?: {
    username: string
    full_name?: string
    avatar_url?: string
  }
  tags?: string[]
} 