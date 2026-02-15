import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body>
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #ccc' }}>
            <h1>AetherHub</h1>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Entrar</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
