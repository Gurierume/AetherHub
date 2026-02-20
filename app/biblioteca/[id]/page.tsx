import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function FichaPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const { id } = params;

  // Busca os detalhes da ficha específica
  const { data: ficha, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', id)
    .single();

  if (!ficha || error) {
    return <div style={{ padding: "2rem" }}>Ficha não encontrada.</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Link href="/biblioteca" style={{ color: "#0070f3", textDecoration: "none" }}>← Voltar para Biblioteca</Link>
      
      <header style={{ marginTop: "2rem", borderBottom: "2px solid #eee", paddingBottom: "1rem" }}>
        <h1>{ficha.nome}</h1>
        <p>ID da Ficha: {id}</p>
        <p>Tema Atual: <strong>{ficha.tema_id}</strong></p>
      </header>

      <section style={{ marginTop: "2rem" }}>
        {/* Aqui entra a estrutura da ficha (Atributos, Inventário, etc) */}
        <div style={{ padding: "20px", border: "1px dashed #ccc", borderRadius: "8px", textAlign: "center" }}>
           <p>Área de Edição da Ficha (Em breve)</p>
        </div>
      </section>
    </div>
  );
}
