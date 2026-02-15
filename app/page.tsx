'use client'

import React from 'react'

export default function Page() {
  const [isBlack, setIsBlack] = React.useState(false)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      backgroundColor: isBlack ? '#000' : '#fff',
      color: isBlack ? '#fff' : '#000',
      transition: 'all 0.3s ease',
      borderRadius: '8px',
      border: '1px solid #eaeaea'
    }}>
      <h2>Bem-vindo ao AetherHub</h2>
      <p>Este é o seu painel de biblioteca em construção.</p>
      
      <button 
        onClick={() => setIsBlack(!isBlack)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: isBlack ? '#fff' : '#333',
          color: isBlack ? '#000' : '#fff'
        }}
      >
        Mudar para {isBlack ? 'Branco' : 'Preto'}
      </button>
    </div>
  )
}
