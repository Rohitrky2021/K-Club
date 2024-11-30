import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/sidebar'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden w-full">
                <header className="flex items-center justify-between px-6 py-4 border-b">
                  <Link href="/" className="text-2xl font-bold text-primary">
                    Codeforces Dashboard
                  </Link>
                  <ModeToggle />
                </header>
                <main className="flex-1 overflow-auto p-6 ">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

