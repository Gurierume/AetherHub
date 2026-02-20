import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function FichaPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const { id } = params;

  // Busca os dados da ficha no Supabase
  const { data: ficha, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', id)
    .single();

  // Se a ficha não existir ou houver erro, mostra página 404
  if (!ficha || error) {
    return notFound();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif", color: "#333" }}>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/biblioteca" style={{ color: "#0070f3", textDecoration: "none" }}>← Minha Biblioteca</Link>
        <span style={{ backgroundColor: "#eee", padding: "5px 10px", borderRadius: "15px", fontSize: "0.8rem" }}>
          Tema: {ficha.tema_id}
        </span>
      </header>

      <main style={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <h1 style={{ margin: "0 0 0.5rem 0", color: "#000" }}>{ficha.nome}</h1>
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "2rem" }}>Criado em: {new Date(ficha.created_at).toLocaleDateString('pt-BR')}</p>

        <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "2rem 0" }} />

        {/* ESTRUTURA BASE DA FICHA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <section>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Atributos</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <span>💪 Força</span>
                <strong>10</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <span>🎯 Destreza</span>
                <strong>10</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <span>🧠 Inteligência</span>
                <strong>10</strong>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Informações</h2>
            <p style={{ color: "#666" }}>Aqui você poderá adicionar a história, equipamentos e magias do seu personagem conforme avançarmos.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
