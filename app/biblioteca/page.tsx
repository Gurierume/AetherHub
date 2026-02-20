import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function BibliotecaPage() {
  const user = await currentUser();
  if (!user) return <div style={{ padding: "2rem" }}>Carregando...</div>;

  const { data: fichas } = await supabase
    .from('decks')
    .select('*')
    .eq('usuario_id', user.id)
    .order('created_at', { ascending: false });

  async function criarFicha() {
    "use server";
    const userAuth = await currentUser();
    if (!userAuth) return;
    await supabase.from('decks').insert([{ 
      nome: 'Nova Ficha de Herói', 
      usuario_id: userAuth.id,
      tema_id: 'base' 
    }]);
    revalidatePath('/biblioteca');
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <h1>Minha Estante de Fichas</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      
      <div style={{ marginTop: "2rem" }}>
        <form action={criarFicha}>
          <button type="submit" style={{ padding: "12px 24px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
            + Criar Nova Ficha
          </button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
        {fichas?.map((ficha) => (
          <div key={ficha.id} style={{ padding: "1rem", border: "2px solid #0070f3", borderRadius: "12px", textAlign: "center" }}>
            {/* O BOTÃO AZUL: Link para a ficha dinâmica */}
            <Link href={`/biblioteca/${ficha.id}`} style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {ficha.nome}
            </Link>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>ID: {ficha.id.substring(0,8)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
