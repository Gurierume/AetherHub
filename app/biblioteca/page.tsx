import { Botão do usuário, Botão de saída de assinatura } from "@clerk/nextjs";
import { Usuário atual } from "@clerk/nextjs/servidor";
import { criarCliente } from "@supabase/supabase-js";
import { revalidarCaminho } from "next/cache";

const supabase = criarCliente(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BibliotecaPágina() {
  const usuário = await Usuário atual();

  // Buscar as fichas do usuário no Supabase
  const { data: fichas } = await supabase
    .from('decks')
    .select('*')
    .eq('usuario_id', usuário?.id)
    .order('created_at', { ascending: false });

  // Função para criar uma nova ficha
  async function criarFicha() {
    "use server";
    await supabase
      .from('decks')
      .insert([{ nome: 'Nova Ficha Estratégica', usuario_id: usuário?.id }]);
    revalidarCaminho('/biblioteca');
  }

  // Função para remover uma ficha
  async function removerFicha(id: string) {
    "use server";
    await supabase
      .from('decks')
      .delete()
      .eq('id', id)
      .eq('usuario_id', usuário?.id);
    revalidarCaminho('/biblioteca');
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eaeaea", paddingBottom: "1rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>AetherHub</h1>
          <p style={{ color: "#666" }}>Bem-vindo à sua coleção, <strong>{usuário?.firstName || "Explorador"}</strong></p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Botão de saída de assinatura redirectUrl="/">
            <button style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px" }}>Sair</button>
          </Botão de saída de assinatura>
          <Botão do usuário afterSignOutUrl="/" />
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {fichas && fichas.map((ficha) => (
            <div key={ficha.id} style={{ 
              padding: "1.5rem", 
              border: "1px solid #ddd", 
              borderRadius: "10px", 
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              position: "relative"
            }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>{ficha.nome}</h3>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                Criada em: {new Date(ficha.created_at).toLocaleDateString('pt-BR')}
              </p>
              
              {/* Formulário de Remoção com Confirmação Nativa */}
              <form 
                action={removerFicha.bind(null, ficha.id)} 
                onSubmit={(e) => {
                  if (!confirm("Você tem certeza que deseja apagar esta ficha? Esta ação não pode ser desfeita.")) {
                    e.preventDefault();
                  }
                }}
                style={{ marginTop: "15px" }}
              >
                <button type="submit" style={{ 
                  backgroundColor: "#fff1f0", 
                  color: "#ff4d4f", 
                  border: "1px solid #ffccc7", 
                  borderRadius: "4px", 
                  padding: "6px 8px", 
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  width: "100%",
                  transition: "all 0.2s"
                }}>
                  🗑️ Remover Ficha
                </button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
