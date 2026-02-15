import { UserButton, SignOutButton } from "@clerk/nextjs";

// ... dentro do return
<header style={{ 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  borderBottom: "1px solid #eaeaea",
  paddingBottom: "1rem" 
}}>
  <div>
    <h1 style={{ margin: 0 }}>AetherHub</h1>
    <p style={{ color: "#666" }}>Bem-vindo de volta, <strong>{user?.firstName || user?.emailAddresses[0].emailAddress}</strong>!</p>
  </div>
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <SignOutButton redirectUrl="/">
      <button style={{ 
        padding: "8px 12px", 
        cursor: "pointer", 
        border: "1px solid #ccc", 
        borderRadius: "4px",
        backgroundColor: "white" 
      }}>
        Sair da Conta
      </button>
    </SignOutButton>
    <UserButton afterSignOutUrl="/" />
  </div>
</header>
