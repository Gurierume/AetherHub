import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function FichaBasePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Busca os dados reais, mas tem um "Plano B" se falhar
  const { data: ficha } = await supabase
    .from('decks')
    .select('*')
    .eq('id', id)
    .single();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <Link href="/biblioteca" style={{ color: "#666", textDecoration: "none" }}>← Voltar para Galeria</Link>
      
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "20px", marginTop: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#333", borderBottom: "2px solid #0070f3", paddingBottom: "10px" }}>
          {ficha?.nome || "Carregando Herói..."}
        </h1>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
          <section>
            <h3 style={{ color: "#0070f3" }}>Atributos Principais</h3>
            {["Força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"].map(attr => (
              <div key={attr} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee" }}>
                <span>{attr}</span>
                <input type="number" defaultValue="10" style={{ width: "50px", textAlign: "center", borderRadius: "5px", border: "1px solid #ccc" }} />
              </div>
            ))}
          </section>

          <section>
            <h3 style={{ color: "#0070f3" }}>Informações do Personagem</h3>
            <label style={{ display: "block", marginBottom: "5px" }}>Classe/Raça:</label>
            <input type="text" placeholder="Ex: Guerreiro Humano" style={{ width: "100%", padding: "8px", marginBottom: "15px" }} />
            
            <label style={{ display: "block", marginBottom: "5px" }}>História:</label>
            <textarea style={{ width: "100%", height: "150px", padding: "8px" }} placeholder="Escreva aqui sua jornada..." />
          </section>
        </div>

        <button style={{ marginTop: "2rem", width: "100%", padding: "15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>
          💾 Salvar Alterações (Em Breve)
        </button>
      </div>
    </div>
  );
}
