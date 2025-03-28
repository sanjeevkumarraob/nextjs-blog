'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { AuthError } from './types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<AuthError | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const loadingToastId = toast.loading('Signing in...')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.dismiss(loadingToastId)
      toast.success('Signed in successfully')
      
      router.push('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      const authError = error as AuthError
      setError(authError)
      toast.dismiss(loadingToastId)
      toast.error(authError.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-destructive text-sm">{error.message}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Link 
          href="/forgot-password" 
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={(e) => loading && e.preventDefault()}
        >
          Forgot your password?
        </Link>
        <Link 
          href="/magic-link" 
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={(e) => loading && e.preventDefault()}
        >
          Sign in with Magic Link
        </Link>
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-primary hover:underline"
            onClick={(e) => loading && e.preventDefault()}
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
} 