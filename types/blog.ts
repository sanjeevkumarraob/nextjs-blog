export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  status: 'draft' | 'published' | 'archived'
  author_id: string
  published_at: string | null
  created_at: string
  updated_at: string
  tags: string[]
  author: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
} 