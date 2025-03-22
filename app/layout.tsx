import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sanjeev.Tech",
  description:
    "A blog about technology, programming, and everything in between.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Providers>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 