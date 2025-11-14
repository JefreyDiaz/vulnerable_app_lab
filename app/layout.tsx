import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aplicación Vulnerable - Laboratorio de Seguridad',
  description: 'Aplicación web vulnerable para educación en seguridad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <nav style={{ 
          background: '#1a1a1a', 
          padding: '1rem', 
          borderBottom: '2px solid #333',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
              Inicio
            </Link>
            <Link href="/busqueda" style={{ color: '#fff', textDecoration: 'none' }}>
              Búsqueda
            </Link>
            <Link href="/comentarios" style={{ color: '#fff', textDecoration: 'none' }}>
              Comentarios
            </Link>
            <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              Login
            </Link>
            <Link href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>
              Admin
            </Link>
            <Link href="/api" style={{ color: '#fff', textDecoration: 'none' }}>
              API Info
            </Link>
          </div>
        </nav>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {children}
        </main>
        <footer style={{ 
          marginTop: '4rem', 
          padding: '2rem', 
          background: '#f5f5f5', 
          textAlign: 'center',
          borderTop: '2px solid #ddd'
        }}>
          <p style={{ color: '#000' }}>⚠️ Esta aplicación contiene vulnerabilidades intencionales para fines educativos</p>
        </footer>
      </body>
    </html>
  )
}

