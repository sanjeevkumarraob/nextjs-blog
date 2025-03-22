import type { Database } from './supabase';

// Extract common types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type PostView = Database['public']['Tables']['post_views']['Row'];
export type BlogSettings = Database['public']['Tables']['blog_settings']['Row'];

