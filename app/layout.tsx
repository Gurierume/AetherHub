import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AetherHub',
  description: 'Sua biblioteca de RPG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem 2rem', 
            borderBottom: '1px solid #eaeaea',
            backgroundColor: '#fff'
          }}>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>AetherHub</h1>
            <nav>
              {/* O Clerk gerencia os botões de login automaticamente aqui */}
            </nav>
          </header>
          <main style={{ padding: '2rem' }}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
