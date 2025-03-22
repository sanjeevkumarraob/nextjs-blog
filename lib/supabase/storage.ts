import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(file: File) {
  const supabase = createClientComponentClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(`images/${fileName}`, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(`images/${fileName}`)

  return publicUrl
} 