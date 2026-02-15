import { UserButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BibliotecaPage() {
  const user = await currentUser();

  // 1. Buscar as fichas (decks) do banco de dados
  const { data: fichas } = await supabase
    .from('decks')
    .select('*')
    .eq('usuario_id', user?.id)
    .order('created_at', { ascending: false });

  // 2. Função para criar uma nova ficha
  async function criarFicha() {
    "use server";
    await supabase
      .from('decks')
      .insert([{ nome: 'Nova Ficha de Deck', usuario_id: user?.id }]);
    revalidatePath('/biblioteca');
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eaeaea", paddingBottom: "1rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>AetherHub</h1>
          <p style={{ color: "#666" }}>Bem-vindo à sua coleção, <strong>{user?.firstName}</strong></p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <SignOutButton redirectUrl="/"><button style={{ padding: "8px 12px", cursor: "pointer" }}>Sair</button></SignOutButton>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2>Minhas Fichas</h2>
          <form action={criarFicha}>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              + Nova Ficha
            </button>
          </form>
        </div>

        {/* Exibição das Fichas em Grade */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {fichas && fichas.length > 0 ? (
            fichas.map((ficha) => (
              <div key={ficha.id} style={{ 
                padding: "1.5rem", 
                border: "1px solid #ddd", 
                borderRadius: "10px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                backgroundColor: "#f9f9f9"
              }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>{ficha.nome}</h3>
                <p style={{ fontSize: "0.85rem", color: "#888" }}>
                  Criada em: {new Date(ficha.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: "#999", gridColumn: "1 / -1", textAlign: "center" }}>
              Você ainda não tem fichas criadas.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
