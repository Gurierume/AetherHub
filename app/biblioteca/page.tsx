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
