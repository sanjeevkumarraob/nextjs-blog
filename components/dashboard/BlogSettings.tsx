'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function BlogSettings() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    blog_title: '',
    blog_description: '',
    enable_comments: true,
    enable_newsletter: false,
  })
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('blog_settings')
        .upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast.success('Settings updated')
    } catch (error: any) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="blogTitle">Blog Title</Label>
        <Input
          id="blogTitle"
          value={settings.blog_title}
          onChange={(e) => setSettings({ ...settings, blog_title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blogDescription">Blog Description</Label>
        <Input
          id="blogDescription"
          value={settings.blog_description}
          onChange={(e) => setSettings({ ...settings, blog_description: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="comments"
          checked={settings.enable_comments}
          onCheckedChange={(checked) => setSettings({ ...settings, enable_comments: checked })}
        />
        <Label htmlFor="comments">Enable Comments</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="newsletter"
          checked={settings.enable_newsletter}
          onCheckedChange={(checked) => setSettings({ ...settings, enable_newsletter: checked })}
        />
        <Label htmlFor="newsletter">Enable Newsletter</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
} 