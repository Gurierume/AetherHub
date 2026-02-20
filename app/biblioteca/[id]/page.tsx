import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

// Configuração do cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function FichaPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const { id } = params;

  // Busca os dados desta ficha específica no banco
  const { data: ficha, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', id)
    .single();

  // Se a ficha não existir no banco, aí sim o 404 é correto
  if (!ficha || error) {
    return notFound();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <Link href="/biblioteca" style={{ color: "#0070f3", textDecoration: "none" }}>← Voltar para Biblioteca</Link>
        <h1 style={{ marginTop: "1rem" }}>{ficha.nome}</h1>
        <p style={{ color: "#888" }}>ID: {id} | Tema: <strong>{ficha.tema_id}</strong></p>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", backgroundColor: "#fff", padding: "2rem", borderRadius: "15px", border: "1px solid #eee" }}>
        {/* Lado Esquerdo: Atributos Base */}
        <section>
          <h2 style={{ borderBottom: "2px solid #0070f3", paddingBottom: "5px" }}>Atributos</h2>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"].map((attr) => (
              <div key={attr} style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <span>{attr}</span>
                <strong>10</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Lado Direito: Notas e Lore */}
        <section>
          <h2 style={{ borderBottom: "2px solid #0070f3", paddingBottom: "5px" }}>História & Notas</h2>
          <textarea 
            style={{ width: "100%", height: "200px", marginTop: "1rem", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
            placeholder="Escreva aqui o background do seu personagem..."
          />
        </section>
      </main>
    </div>
  );
}
