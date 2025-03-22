'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner' // Make sure to install this: npm install sonner

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }
      
      // Clear the form
      setEmail('')
      
      // Show success message
      toast.success(data.message || 'Thank you for subscribing!')
      
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="container max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Stay Updated</h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 mb-6">
          Get the latest articles and resources delivered directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-accent hover:bg-accent/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  )
} 