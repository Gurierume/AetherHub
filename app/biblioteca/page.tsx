import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif' 
    }}>
      <h1>Bem-vindo ao AetherHub</h1>
      <p>Este é o seu painel de biblioteca em construção.</p>

      {/* Se o usuário NÃO estiver logado, mostra o botão de entrar */}
      <SignedOut>
        <SignInButton mode="modal">
          <button style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px' 
          }}>
            Entrar com Google
          </button>
        </SignInButton>
      </SignedOut>

      {/* Se o usuário JÁ estiver logado, mostra o botão para ir à biblioteca */}
      <SignedIn>
        <Link href="/biblioteca">
          <button style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px' 
          }}>
            Acessar Minha Biblioteca
          </button>
        </Link>
      </SignedIn>
    </main>
  );
}
