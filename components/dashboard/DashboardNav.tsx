'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart,
  Tags,
} from 'lucide-react'

const routes = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/posts',
    label: 'Posts',
    icon: FileText,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: BarChart,
  },
  {
    href: '/dashboard/tags',
    label: 'Tags',
    icon: Tags,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 p-6 border-r overflow-y-auto">
      <div className="space-y-4">
        <div className="pb-2">
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-colors",
                pathname === route.href 
                  ? "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn(
                  "w-4 h-4 mr-2",
                  pathname === route.href 
                    ? "text-primary"
                    : "text-muted-foreground"
                )} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
} 