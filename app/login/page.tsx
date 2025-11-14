'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // VULNERABILIDAD: Almacenamiento inseguro de sesión
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token || 'fake-token')
        router.push('/admin')
      } else {
        setError(data.error || 'Credenciales incorrectas')
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', color: '#000' }}>
      <h1 style={{ marginBottom: '1rem', color: '#000' }}>🔐 Iniciar Sesión</h1>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#000' }}>
          <strong>⚠️ Vulnerabilidades:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8', color: '#000' }}>
          <li>Contraseñas en texto plano</li>
          <li>Sin rate limiting (fuerza bruta posible)</li>
          <li>Mensajes de error informativos</li>
          <li>Almacenamiento inseguro de tokens</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#000' }}>
            Usuario:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
            autoComplete="username"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#000' }}>
            Contraseña:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#e7f3ff',
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <p style={{ color: '#000' }}><strong>💡 Credenciales de prueba:</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8', color: '#000' }}>
          <li>Usuario: <code>admin</code> / Contraseña: <code>admin123</code></li>
          <li>Usuario: <code>test</code> / Contraseña: <code>test</code></li>
        </ul>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fff3cd',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#000' }}><strong>🔓 Pruebas sugeridas:</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8', fontSize: '0.875rem', color: '#000' }}>
          <li>Intenta hacer fuerza bruta con diferentes contraseñas</li>
          <li>Observa los mensajes de error (timing attacks)</li>
          <li>Verifica el almacenamiento local del navegador</li>
        </ul>
      </div>
    </div>
  )
}

