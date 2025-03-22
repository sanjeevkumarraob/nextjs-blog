import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }
    
    // Initialize Supabase client - fixed syntax
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Save email to subscribers table using our database function
    const { data: functionResult, error } = await supabase
      .rpc('add_subscriber', { subscriber_email: email })
    
    if (error) {
      console.error('Error saving subscriber:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      )
    }
    
    // Check if already subscribed (our function returns already_exists flag)
    if (functionResult && functionResult.already_exists) {
      return NextResponse.json(
        { message: 'You\'re already subscribed! Thank you for your interest.' },
        { status: 200 }
      )
    }
    
    // Send welcome email
    try {
      await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
        subject: 'Welcome to Our Newsletter!',
        text: 'Thank you for subscribing to our newsletter. You\'ll now receive updates on our latest content.',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">Welcome to Our Newsletter!</h1>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll now receive updates when we publish new articles and resources.</p>
            <p>Best regards,<br>Sanjeev Kumar Rao</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue despite email sending failure
    }
    
    // Success
    return NextResponse.json({
      message: 'Thank you for subscribing!', 
      data: functionResult.data
    })
    
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
} 