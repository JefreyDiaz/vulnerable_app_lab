import { NextRequest, NextResponse } from 'next/server'
import { getAllComments, addComment } from '@/lib/database'

export async function GET() {
  // VULNERABILIDAD: Sin autenticación requerida
  const comments = getAllComments()
  return NextResponse.json(comments)
}

export async function POST(request: NextRequest) {
  try {
    const { username, content } = await request.json()

    // VULNERABILIDAD: Sin validación de entrada
    // VULNERABILIDAD: Sin sanitización (XSS)
    // VULNERABILIDAD: Sin verificación CSRF
    
    if (!username || !content) {
      return NextResponse.json(
        { error: 'Usuario y contenido son requeridos' },
        { status: 400 }
      )
    }

    const comment = addComment(username, content)
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear comentario' },
      { status: 500 }
    )
  }
}

