import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Script from 'next/script'

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
      <head>
        <Script strategy="afterInteractive" id="microsoft-clarity">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qws6umbzzb");
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <Providers>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
} 