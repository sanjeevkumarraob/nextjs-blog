import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { TagManager } from '@/components/dashboard/TagManager'

export default async function TagsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: tags } = await supabase
    .from('tags')
    .select(`
      *,
      posts:posts_tags(post_id)
    `)
    .order('name')

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Tags</h1>
      <TagManager initialTags={tags || []} />
    </div>
  )
} 