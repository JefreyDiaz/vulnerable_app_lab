import { NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/database'

export async function GET() {
  // VULNERABILIDAD CRÍTICA: Sin verificación de autenticación
  // VULNERABILIDAD CRÍTICA: Sin verificación de permisos
  // Cualquiera puede acceder a todos los usuarios y sus contraseñas
  
  const users = getAllUsers()
  
  // VULNERABILIDAD: Exposición de información sensible (contraseñas en texto plano)
  return NextResponse.json(users)
}

