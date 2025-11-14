import { NextRequest, NextResponse } from 'next/server'
import { deleteComment } from '@/lib/database'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    // VULNERABILIDAD: Sin verificación de autenticación
    // VULNERABILIDAD: Sin verificación de autorización (cualquiera puede eliminar)
    // VULNERABILIDAD: IDOR (Insecure Direct Object Reference)

    const success = deleteComment(id)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Comentario no encontrado' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar comentario' },
      { status: 500 }
    )
  }
}

