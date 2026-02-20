import { UserButton, SignOutButton } from "@clerk/nextjs";
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

  if (!user || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <div style={{ padding: "2rem" }}>Carregando perfil...</div>;
  }

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
      nome: 'Nova Ficha Estratégica', 
      usuario_id: userAuth.id,
      tema_id: 'base' 
    }]);
    revalidatePath('/biblioteca');
  }

  async function removerFicha(id: string) {
    "use server";
    const userAuth = await currentUser();
    if (!userAuth) return;
    await supabase.from('decks').delete().eq('id', id).eq('usuario_id', userAuth.id);
    revalidatePath('/biblioteca');
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eaeaea", paddingBottom: "1rem" }}>
        <h1>AetherHub</h1>
        <div style={{ display: "flex", gap: "1rem" }}><UserButton afterSignOutUrl="/" /></div>
      </header>
      <main style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h2>Minhas Fichas</h2>
          <form action={criarFicha}><button type="submit" style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>+ Nova Ficha</button></form>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {fichas?.map((ficha) => (
            <div key={ficha.id} style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px" }}>
              <Link href={`/biblioteca/${ficha.id}`} style={{ textDecoration: 'none', color: '#0070f3' }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{ficha.nome}</h3>
              </Link>
              <form action={removerFicha.bind(null, ficha.id)}>
                <button type="submit" style={{ color: "#ff4d4f", background: "none", border: "1px solid #ffccc7", padding: "5px", width: "100%", cursor: "pointer" }}>🗑️ Remover</button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
