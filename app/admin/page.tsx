'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // VULNERABILIDAD: Verificación de autenticación solo en el cliente
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      fetchUsers()
    } else {
      router.push('/login')
    }
  }, [router])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      // VULNERABILIDAD: Exposición de información sensible sin verificación de permisos
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#000' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', color: '#000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#000' }}>⚙️ Panel de Administración</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user && (
            <span style={{ color: '#666' }}>
              Bienvenido, <strong>{user.username}</strong> ({user.role})
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

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
          <li>Verificación de autenticación solo en el cliente</li>
          <li>Sin verificación de permisos en el servidor</li>
          <li>Exposición de información sensible (contraseñas en texto plano)</li>
          <li>IDOR (Insecure Direct Object Reference)</li>
        </ul>
      </div>

      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>👥 Lista de Usuarios</h2>
        
        {users.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>Usuario</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>Contraseña</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>Rol</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd', color: '#000' }}>Fecha Creación</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ padding: '1rem', border: '1px solid #ddd', color: '#000' }}>{u.id}</td>
                    <td style={{ padding: '1rem', border: '1px solid #ddd', color: '#000' }}>{u.username}</td>
                    <td style={{ padding: '1rem', border: '1px solid #ddd', color: '#000' }}>{u.email}</td>
                    <td style={{ padding: '1rem', border: '1px solid #ddd', fontFamily: 'monospace', color: '#dc3545' }}>
                      {u.password}
                    </td>
                    <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        background: u.role === 'admin' ? '#d4edda' : '#e7f3ff',
                        color: u.role === 'admin' ? '#155724' : '#004085'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', border: '1px solid #ddd', color: '#000' }}>
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#000' }}>No hay usuarios registrados.</p>
        )}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#e7f3ff',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#000' }}>🔓 Pruebas sugeridas:</h3>
        <ul style={{ lineHeight: '1.8', color: '#000' }}>
          <li>Accede directamente a <code>/admin</code> sin autenticarte (IDOR)</li>
          <li>Modifica el localStorage para cambiar tu rol a "admin"</li>
          <li>Accede a <code>/api/users</code> directamente desde el navegador</li>
          <li>Observa cómo las contraseñas se exponen en texto plano</li>
        </ul>
      </div>
    </div>
  )
}

