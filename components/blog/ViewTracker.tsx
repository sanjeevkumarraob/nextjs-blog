'use client'

import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function ViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    const trackView = async () => {
      // Check if we've tracked this post recently
      const viewKey = `post-view-${postId}`
      const lastView = localStorage.getItem(viewKey)
      const now = Date.now()
      
      // If viewed in last 30 minutes, don't count it
      if (lastView && now - parseInt(lastView) < 30 * 60 * 1000) {
        return
      }

      const supabase = createClientComponentClient()
      
      // Get country from Vercel geo headers if available
      let country = null
      try {
        const res = await fetch('/api/geo')
        const data = await res.json()
        country = data.country
      } catch (error) {
        console.error('Error getting country:', error)
      }

      // Record the view
      const { error } = await supabase
        .from('post_views')
        .insert([{ 
          post_id: postId,
          country
        }])

      if (error) {
        console.error('Error recording view:', error)
      } else {
        // Store timestamp of this view
        localStorage.setItem(viewKey, now.toString())
      }
    }

    trackView()
  }, [postId])

  return null
} 