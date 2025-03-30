import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { Card } from "@/components/ui/card"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] m-4 gap-4 rounded-lg border bg-card">
      <DashboardNav />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
} 