'use client';

import React, { useState } from 'react';

export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      backgroundColor: dark ? '#000000' : '#ffffff',
      color: dark ? '#ffffff' : '#000000',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: '0.3s'
    }}>
      <h1>Teste de Cor AetherHub</h1>
      <button 
        onClick={() => setDark(!dark)}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          border: '1px solid',
          borderColor: dark ? '#fff' : '#000',
          background: 'transparent',
          color: 'inherit'
        }}
      >
        Mudar para {dark ? 'Branco' : 'Preto'}
      </button>
    </div>
  );
}
