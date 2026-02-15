import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function BibliotecaPage() {
  const user = await currentUser();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Minha Biblioteca</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      
      <main style={{ marginTop: "3rem" }}>
        <p>Bem-vindo, <strong>{user?.firstName || user?.emailAddresses[0].emailAddress}</strong>!</p>
        <p>Sua coleção de decks do AetherHub aparecerá aqui em breve.</p>
      </main>
    </div>
  );
}
