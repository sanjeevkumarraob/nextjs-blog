import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProfileSettings } from '@/components/dashboard/ProfileSettings'
import { BlogSettings } from '@/components/dashboard/BlogSettings'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  // Create profile if it doesn't exist
  if (!profile) {
    await supabase
      .from('profiles')
      .insert({
        id: session.user.id,
        username: session.user.email?.split('@')[0],
        role: 'author'
      })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileSettings profile={profile || { id: session.user.id }} />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Blog Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogSettings />
        </CardContent>
      </Card>
    </div>
  )
} 