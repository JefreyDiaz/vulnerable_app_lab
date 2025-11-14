'use client'

import { useState } from 'react'
import { searchProductsSQL } from '@/lib/database'

export default function BusquedaPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [showSQL, setShowSQL] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // VULNERABILIDAD: SQL Injection
    // El query se pasa directamente sin sanitización
    const searchResults = searchProductsSQL(query)
    setResults(searchResults)
  }

  return (
    <div style={{ padding: '2rem', color: '#000' }}>
      <h1 style={{ marginBottom: '1rem', color: '#000' }}>🔍 Búsqueda de Productos</h1>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#000' }}>
          <strong>⚠️ Vulnerabilidad:</strong> Esta página es vulnerable a SQL Injection. 
          Intenta buscar usando caracteres SQL como: <code>' OR '1'='1</code>
        </p>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Buscar
          </button>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
          <input
            type="checkbox"
            checked={showSQL}
            onChange={(e) => setShowSQL(e.target.checked)}
          />
          Mostrar consulta SQL (debug)
        </label>
      </form>

      {results && (
        <div>
          {showSQL && results.sql && (
            <div style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontFamily: 'monospace',
              border: '1px solid #ddd'
            }}>
              <strong style={{ color: '#000' }}>SQL Query ejecutada:</strong>
              <pre style={{ marginTop: '0.5rem', color: '#000' }}>{results.sql}</pre>
            </div>
          )}

          <h2 style={{ marginBottom: '1rem', color: '#000' }}>
            Resultados ({results.products?.length || 0})
          </h2>

          {results.products && results.products.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.products.map((product: any) => (
                <div
                  key={product.id}
                  style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #ddd'
                  }}
                >
                  <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>{product.name}</h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <p style={{ fontWeight: 'bold', color: '#0070f3', margin: 0 }}>
                      ${product.price}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: '#e7f3ff',
                      borderRadius: '12px',
                      fontSize: '0.875rem'
                    }}>
                      {product.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#000' }}>No se encontraron resultados.</p>
          )}
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#e7f3ff',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#000' }}>💡 Pruebas sugeridas:</h3>
        <ul style={{ lineHeight: '1.8', color: '#000' }}>
          <li><code>' OR '1'='1</code> - Intento básico de SQL Injection</li>
          <li><code>' UNION SELECT null, null, null, null --</code> - Union-based SQL Injection</li>
          <li><code>'; DROP TABLE products; --</code> - Intentar eliminar tablas</li>
          <li>Activa la opción "Mostrar consulta SQL" para ver cómo se construye la consulta</li>
        </ul>
      </div>
    </div>
  )
}

