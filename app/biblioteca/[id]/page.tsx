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

  const { data: ficha, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', id)
    .single();

  if (!ficha || error) return notFound();

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Link href="/biblioteca" style={{ color: "#0070f3", textDecoration: "none" }}>← Voltar</Link>
      <h1 style={{ marginTop: "1rem" }}>{ficha.nome}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem", padding: "2rem", border: "1px solid #eee", borderRadius: "15px" }}>
        <section>
          <h2>Atributos</h2>
          {["Força", "Destreza", "Inteligência"].map(attr => (
            <div key={attr} style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f9f9f9", marginBottom: "5px" }}>
              <span>{attr}</span><strong>10</strong>
            </div>
          ))}
        </section>
        <section>
          <h2>Notas</h2>
          <textarea style={{ width: "100%", height: "150px" }} placeholder="História do personagem..." />
        </section>
      </div>
    </div>
  );
}
