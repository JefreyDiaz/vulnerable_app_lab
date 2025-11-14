export default function Home() {
  return (
    <div style={{ padding: '2rem', color: '#000' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#000' }}>
        🔓 Laboratorio de Seguridad Web
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#333' }}>
        Aplicación web vulnerable intencionalmente para fines educativos
      </p>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '2px solid #ffc107', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>⚠️ Advertencia</h2>
        <p style={{ color: '#000' }}>
          Esta aplicación contiene múltiples vulnerabilidades de seguridad 
          diseñadas específicamente para fines educativos. Úsala solo en un 
          entorno controlado y educativo.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ 
          background: '#fff', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>🔍 Búsqueda</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Página de búsqueda con posibles vulnerabilidades
          </p>
          <a href="/busqueda" style={{ 
            color: '#0066cc', 
            textDecoration: 'underline' 
          }}>
            Ir a Búsqueda →
          </a>
        </div>

        <div style={{ 
          background: '#fff', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>💬 Comentarios</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Sistema de comentarios interactivo
          </p>
          <a href="/comentarios" style={{ 
            color: '#0066cc', 
            textDecoration: 'underline' 
          }}>
            Ver Comentarios →
          </a>
        </div>

        <div style={{ 
          background: '#fff', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>🔐 Login</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Sistema de autenticación
          </p>
          <a href="/login" style={{ 
            color: '#0066cc', 
            textDecoration: 'underline' 
          }}>
            Iniciar Sesión →
          </a>
        </div>

        <div style={{ 
          background: '#fff', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>⚙️ Administración</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Panel de administración
          </p>
          <a href="/admin" style={{ 
            color: '#0066cc', 
            textDecoration: 'underline' 
          }}>
            Acceder →
          </a>
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: '#e7f3ff', 
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>📚 Objetivos de Aprendizaje</h2>
        <ul style={{ lineHeight: '1.8', color: '#000' }}>
          <li>Identificar vulnerabilidades comunes en aplicaciones web</li>
          <li>Practicar técnicas de explotación de forma ética y legal</li>
          <li>Entender cómo prevenir estas vulnerabilidades</li>
          <li>Aprender sobre OWASP Top 10</li>
        </ul>
      </div>
    </div>
  )
}

