'use client';

import React, { useState } from 'react';

export default function TestPage() {
  const [isBlack, setIsBlack] = useState(false);

  const toggleBackground = () => {
    setIsBlack(!isBlack);
  };

  return (
    <div style={{
      backgroundColor: isBlack ? '#000000' : '#ffffff',
      color: isBlack ? '#ffffff' : '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
      fontFamily: 'sans-serif'
    }}>
      <h1>Teste de Cor: AetherHub</h1>
      <p>O fundo atual é: <strong>{isBlack ? 'Preto' : 'Branco'}</strong></p>
      
      <button
        onClick={toggleBackground}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '2px solid',
          borderColor: isBlack ? '#ffffff' : '#000000',
          backgroundColor: 'transparent',
          color: 'inherit',
          fontWeight: 'bold'
        }}
      >
        Mudar para {isBlack ? 'Branco' : 'Preto'}
      </button>
    </div>
  );
}
