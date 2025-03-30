export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
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
          view_count: number
          comment_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          excerpt?: string
          slug: string
          author_id: string
          status?: 'draft' | 'published'
          published_at?: string
          tags?: string[]
          view_count?: number
          comment_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          author_id?: string
          status?: 'draft' | 'published'
          published_at?: string
          tags?: string[]
          view_count?: number
          comment_count?: number
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name?: string
          avatar_url?: string
          bio?: string
          website?: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string
          avatar_url?: string
          bio?: string
          website?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string
          avatar_url?: string
          bio?: string
          website?: string
        }
      }
      subscribers: {
        Row: {
          id: string
          created_at: string
          email: string
          status: 'subscribed' | 'unsubscribed'
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          status?: 'subscribed' | 'unsubscribed'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          status?: 'subscribed' | 'unsubscribed'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_post_by_slug: {
        Args: { post_slug: string }
        Returns: {
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
          author: {
            username: string
            full_name?: string
            avatar_url?: string
          }
        }[]
      }
      get_published_posts_with_authors: {
        Args: Record<string, never>
        Returns: {
          id: string
          title: string
          excerpt: string | null
          slug: string
          created_at: string
          published_at: string | null
          tags: string[] | null
          author: {
            username: string
            full_name: string | null
          }
        }[]
      }
      add_subscriber: {
        Args: { subscriber_email: string }
        Returns: { id: string }
      }
    }
  }
} 