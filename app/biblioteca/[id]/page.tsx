import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function FichaPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // 1. Busca os dados atuais do banco
  const { data: ficha } = await supabase.from('decks').select('*').eq('id', id).single();

  async function salvarTudo(formData: FormData) {
    "use server";
    
    // 2. Coleta os dados garantindo que os nomes batem com o banco (image_d43ebf)
    const updates = {
      nome: formData.get("nome"),
      força: parseInt(formData.get("força") as string) || 10,
      destreza: parseInt(formData.get("destreza") as string) || 10,
      constituição: parseInt(formData.get("constituição") as string) || 10,
      inteligência: parseInt(formData.get("inteligência") as string) || 10,
      sabedoria: parseInt(formData.get("sabedoria") as string) || 10,
      carisma: parseInt(formData.get("carisma") as string) || 10,
      historia: formData.get("historia")
    };

    // 3. Envia para o Supabase
    const { error } = await supabase.from('decks').update(updates).eq('id', id);
    
    if (!error) {
      revalidatePath(`/biblioteca/${id}`);
      revalidatePath('/biblioteca'); // Isso atualiza o nome na galeria!
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Link href="/biblioteca" style={{ color: "#0070f3", textDecoration: "none" }}>← Voltar para Estante</Link>
      
      <form action={salvarTudo} style={{ backgroundColor: "white", padding: "2rem", borderRadius: "20px", marginTop: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        {/* NOME DO PERSONAGEM */}
        <div style={{ marginBottom: "2rem" }}>
          <input 
            name="nome" 
            defaultValue={ficha?.nome} 
            placeholder="Nome do Herói"
            style={{ width: "100%", fontSize: "2rem", fontWeight: "bold", border: "none", borderBottom: "2px solid #0070f3", outline: "none" }} 
          />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* COLUNA DE ATRIBUTOS */}
          <section>
            <h3 style={{ color: "#0070f3", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Atributos</h3>
            {[
              { label: "Força", key: "força" },
              { label: "Destreza", key: "destreza" },
              { label: "Constituição", key: "constituição" },
              { label: "Inteligência", key: "inteligência" },
              { label: "Sabedoria", key: "sabedoria" },
              { label: "Carisma", key: "carisma" }
            ].map(attr => (
              <div key={attr.key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <label>{attr.label}</label>
                <input 
                  name={attr.key} 
                  type="number" 
                  defaultValue={ficha?.[attr.key] || 10} 
                  style={{ width: "60px", textAlign: "center", borderRadius: "4px", border: "1px solid #ddd" }} 
                />
              </div>
            ))}
          </section>

          {/* COLUNA DE HISTÓRIA */}
          <section>
            <h3 style={{ color: "#0070f3", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Sua Jornada</h3>
            <textarea 
              name="historia" 
              defaultValue={ficha?.historia} 
              placeholder="Escreva aqui sua jornada..." 
              style={{ width: "100%", height: "240px", marginTop: "10px", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", resize: "none" }} 
            />
          </section>
        </div>

        <button type="submit" style={{ marginTop: "2rem", width: "100%", padding: "15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
          💾 Salvar Alterações
        </button>
      </form>
    </div>
  );
}
