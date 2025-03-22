import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')

  if (token && type === 'email_verification') {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    })
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
} 