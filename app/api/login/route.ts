import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // VULNERABILIDAD: Sin validación de entrada
    // VULNERABILIDAD: Sin rate limiting
    // VULNERABILIDAD: Mensajes de error informativos (timing attacks)

    const user = authenticateUser(username, password)

    if (user) {
      // VULNERABILIDAD: Token inseguro y predecible
      const token = Buffer.from(`${username}:${password}`).toString('base64')
      
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token: token
      })
    } else {
      // VULNERABILIDAD: Mensaje de error que revela si el usuario existe
      return NextResponse.json(
        { 
          success: false, 
          error: 'Credenciales incorrectas',
          // Vulnerabilidad adicional: información extra
          hint: 'Verifica tu usuario y contraseña'
        },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}

