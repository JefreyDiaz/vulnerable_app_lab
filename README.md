# 🔓 Proyecto Vulnerable - Laboratorio de Seguridad Web

Aplicación web Next.js diseñada intencionalmente con múltiples vulnerabilidades de seguridad para fines educativos en la clase de **Seguridad en Aplicaciones Web 1**.

## ⚠️ Advertencia Importante

**Esta aplicación contiene vulnerabilidades de seguridad INTENCIONALES** diseñadas específicamente para educación. 

- ✅ Úsala **SOLO** en entornos controlados y educativos
- ✅ **NO** uses contraseñas reales
- ✅ **NO** la uses en producción
- ✅ **NO** la expongas a internet sin protección adicional

## 🎯 Objetivos Educativos

Este laboratorio permite a los estudiantes:

1. Identificar vulnerabilidades comunes en aplicaciones web
2. Practicar técnicas de explotación de forma ética y legal
3. Entender cómo prevenir estas vulnerabilidades
4. Aprender sobre el OWASP Top 10

## 🚀 Despliegue en Vercel

### Paso 1: Preparar el Repositorio

```bash
# Clonar o inicializar el repositorio
git init
git add .
git commit -m "Initial commit - Proyecto vulnerable"
```

### Paso 2: Subir a GitHub

1. Crea un nuevo repositorio en GitHub
2. Conecta tu repositorio local:

```bash
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

### Paso 3: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New Project"
4. Selecciona el repositorio del proyecto
5. Vercel detectará automáticamente que es un proyecto Next.js
6. Haz clic en "Deploy"

### Configuración en Vercel

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Vercel (gratis)

## 🛠️ Instalación Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 🔍 Vulnerabilidades Incluidas

### 1. **SQL Injection** 
- **Ubicación**: `/busqueda`
- **Descripción**: Las consultas de búsqueda son vulnerables a inyección SQL
- **Prueba**: Usa `' OR '1'='1` en la búsqueda

### 2. **XSS (Cross-Site Scripting)**
- **Ubicación**: `/comentarios`
- **Descripción**: Los comentarios se renderizan sin sanitización
- **Prueba**: Inserta `<script>alert('XSS')</script>` en un comentario

### 3. **Autenticación Débil**
- **Ubicación**: `/login`
- **Descripciones**:
  - Contraseñas almacenadas en texto plano
  - Sin rate limiting (vulnerable a fuerza bruta)
  - Tokens inseguros
- **Prueba**: Intenta hacer fuerza bruta o accede directamente a `/api/users`

### 4. **Exposición de Información**
- **Ubicación**: `/api/users`, `/api`
- **Descripción**: Endpoints que exponen información sensible sin autenticación
- **Prueba**: Accede directamente a `/api/users` en el navegador

### 5. **IDOR (Insecure Direct Object Reference)**
- **Ubicación**: `/admin`, `/api/comments/[id]`
- **Descripción**: Acceso directo a recursos sin verificación de permisos
- **Prueba**: Accede a `/admin` sin autenticarte o elimina comentarios directamente

### 6. **Falta de Rate Limiting**
- **Ubicación**: `/api/login`
- **Descripción**: Sin límite de intentos de login
- **Prueba**: Intenta múltiples inicios de sesión fallidos

### 7. **Almacenamiento Inseguro**
- **Ubicación**: Cliente (localStorage)
- **Descripción**: Tokens y datos sensibles almacenados en localStorage sin encriptar
- **Prueba**: Abre las DevTools y revisa localStorage

### 8. **CSRF (Cross-Site Request Forgery)**
- **Ubicación**: Todos los endpoints POST/DELETE
- **Descripción**: Sin tokens CSRF
- **Prueba**: Crea una página HTML externa que haga requests a la API

## 👤 Credenciales de Prueba

```
Usuario: admin
Contraseña: admin123

Usuario: test
Contraseña: test
```

## 📚 Estructura del Proyecto

```
proyecto-vulnerable/
├── app/
│   ├── api/              # API routes (vulnerables)
│   ├── busqueda/         # Página con SQL Injection
│   ├── comentarios/      # Página con XSS
│   ├── login/           # Sistema de autenticación débil
│   ├── admin/           # Panel admin (sin protección)
│   └── layout.tsx       # Layout principal
├── lib/
│   └── database.ts      # Base de datos simulada (en memoria)
├── package.json
├── next.config.js
├── vercel.json
└── README.md
```

## 🔒 Buenas Prácticas (para la versión segura)

Cuando los estudiantes aprendan a arreglar estas vulnerabilidades, deberían:

1. **SQL Injection**: Usar consultas parametrizadas o ORMs
2. **XSS**: Sanitizar todas las entradas del usuario
3. **Autenticación**: Usar bcrypt para hashear contraseñas, implementar rate limiting
4. **Exposición**: Implementar autenticación y autorización en todos los endpoints
5. **IDOR**: Verificar permisos antes de acceder a recursos
6. **Rate Limiting**: Implementar límites de requests por IP/usuario
7. **Almacenamiento**: Usar httpOnly cookies para tokens, nunca localStorage
8. **CSRF**: Implementar tokens CSRF en todos los formularios

## 📖 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

## 📝 Licencia

Este proyecto es para uso educativo únicamente.

## 👨‍🏫 Para Instructores

Este laboratorio está diseñado para ser usado en un entorno de clase controlado. Los estudiantes deben:

1. Identificar las vulnerabilidades
2. Documentar cómo explotarlas
3. Proponer soluciones
4. Implementar las correcciones

**Nota**: Asegúrate de que los estudiantes entiendan que estas prácticas solo son éticas en este contexto educativo controlado.

---

**Desarrollado para educación en seguridad web** 🔐

