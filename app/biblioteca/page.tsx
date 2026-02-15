import { UserButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function BibliotecaPage() {
  const user = await currentUser();

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* Cabeçalho com Nome, Sair e Perfil */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        borderBottom: "1px solid #eaeaea",
        paddingBottom: "1rem" 
      }}>
        <div>
          <h1 style={{ margin: 0 }}>AetherHub</h1>
          <p style={{ color: "#666" }}>
            Bem-vindo, <strong>{user?.firstName || user?.emailAddresses[0].emailAddress}</strong>!
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Botão de Sair que você pediu para testar */}
          <SignOutButton redirectUrl="/">
            <button style={{ 
              padding: "8px 12px", 
              cursor: "pointer", 
              border: "1px solid #ccc", 
              borderRadius: "4px",
              backgroundColor: "white" 
            }}>
              Sair da Conta
            </button>
          </SignOutButton>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      
      <main style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Meus Decks</h2>
          <button style={{ 
            padding: "8px 16px", 
            backgroundColor: "#0070f3", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer" 
          }}>
            + Novo Deck
          </button>
        </div>

        <div style={{ marginTop: "1.5rem", padding: "2rem", border: "1px dashed #ccc", borderRadius: "8px", textAlign: "center" }}>
          <p style={{ color: "#999" }}>Sua biblioteca está pronta para receber decks.</p>
        </div>
      </main>
    </div>
  );
}
