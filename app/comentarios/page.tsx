'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: number;
  username: string;
  content: string;
  created_at: string;
}

export default function ComentariosPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments')
      const data = await res.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, content }),
      })

      if (res.ok) {
        setUsername('')
        setContent('')
        fetchComments()
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    // VULNERABILIDAD: Sin verificación de autorización en el cliente
    if (confirm('¿Estás seguro de eliminar este comentario?')) {
      try {
        const res = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          fetchComments()
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
      }
    }
  }

  return (
    <div style={{ padding: '2rem', color: '#000' }}>
      <h1 style={{ marginBottom: '1rem', color: '#000' }}>💬 Sistema de Comentarios</h1>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#000' }}>
          <strong>⚠️ Vulnerabilidad:</strong> Esta página es vulnerable a XSS (Cross-Site Scripting). 
          Intenta insertar código JavaScript en los comentarios.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#000' }}>
          Ejemplo: <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ 
        marginBottom: '3rem',
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>Agregar Comentario</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#000' }}>
            Usuario:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#000' }}>
            Comentario:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Enviando...' : 'Publicar Comentario'}
        </button>
      </form>

      <div>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>Comentarios ({comments.length})</h2>
        {comments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #ddd',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <strong style={{ color: '#0070f3' }}>{comment.username}</strong>
                    <span style={{ 
                      marginLeft: '1rem', 
                      fontSize: '0.875rem', 
                      color: '#666' 
                    }}>
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
                {/* VULNERABILIDAD: XSS - El contenido se renderiza sin sanitización */}
                <div 
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                  style={{ 
                    lineHeight: '1.6',
                    wordBreak: 'break-word'
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#000' }}>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#e7f3ff',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#000' }}>💡 Pruebas sugeridas (XSS):</h3>
        <ul style={{ lineHeight: '1.8', fontFamily: 'monospace', color: '#000' }}>
          <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
          <li><code>&lt;img src=x onerror=alert('XSS')&gt;</code></li>
          <li><code>&lt;svg onload=alert('XSS')&gt;&lt;/svg&gt;</code></li>
          <li><code>&lt;body onload=alert('XSS')&gt;</code></li>
        </ul>
      </div>
    </div>
  )
}

