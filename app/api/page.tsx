export default function ApiInfoPage() {
  return (
    <div style={{ padding: '2rem', color: '#000' }}>
      <h1 style={{ marginBottom: '1rem', color: '#000' }}>🔌 Información de la API</h1>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#000' }}>
          <strong>⚠️ Vulnerabilidad:</strong> Esta página expone información sensible 
          sobre los endpoints de la API y su estructura.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#000' }}>📋 Endpoints Disponibles</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>POST /api/login</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Autenticación de usuarios
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.875rem'
            }}>
{`Body: {
  "username": "string",
  "password": "string"
}

Response: {
  "user": { ... },
  "token": "string"
}`}
            </pre>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>GET /api/users</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Lista todos los usuarios (vulnerable - sin autenticación)
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.875rem'
            }}>
{`Response: [
  {
    "id": 1,
    "username": "string",
    "password": "string",
    "email": "string",
    "role": "string"
  }
]`}
            </pre>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>GET /api/comments</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Obtiene todos los comentarios
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.875rem'
            }}>
{`Response: [
  {
    "id": 1,
    "username": "string",
    "content": "string",
    "created_at": "string"
  }
]`}
            </pre>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>POST /api/comments</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Crea un nuevo comentario (vulnerable a XSS)
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.875rem'
            }}>
{`Body: {
  "username": "string",
  "content": "string"
}

Response: {
  "id": 1,
  "username": "string",
  "content": "string",
  "created_at": "string"
}`}
            </pre>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#0070f3' }}>DELETE /api/comments/[id]</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Elimina un comentario (vulnerable - sin autorización)
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.875rem'
            }}>
{`Response: {
  "success": true
}`}
            </pre>
          </div>
        </div>

        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#000' }}>🔓 Vulnerabilidades Identificadas</h2>
          <ul style={{ lineHeight: '2', color: '#000' }}>
            <li>✅ <strong>SQL Injection</strong> - Endpoints de búsqueda</li>
            <li>✅ <strong>XSS (Cross-Site Scripting)</strong> - Sistema de comentarios</li>
            <li>✅ <strong>Autenticación Débil</strong> - Sin hashing de contraseñas</li>
            <li>✅ <strong>Exposición de Información</strong> - Endpoints sin protección</li>
            <li>✅ <strong>IDOR</strong> - Acceso directo a recursos</li>
            <li>✅ <strong>Falta de Rate Limiting</strong> - Ataques de fuerza bruta</li>
            <li>✅ <strong>Almacenamiento Inseguro</strong> - Tokens en localStorage</li>
            <li>✅ <strong>CSRF</strong> - Sin tokens de protección</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

