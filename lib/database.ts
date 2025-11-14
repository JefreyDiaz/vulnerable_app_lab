// Base de datos simulada en memoria (vulnerable)
// En producción, esto debería usar una base de datos real con consultas parametrizadas

interface User {
  id: number;
  username: string;
  password: string; // Vulnerabilidad: contraseñas en texto plano
  email: string;
  role: string;
  created_at: string;
}

interface Comment {
  id: number;
  username: string;
  content: string; // Vulnerabilidad: sin sanitización para XSS
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Datos simulados en memoria
let users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // Vulnerabilidad: contraseña débil y en texto plano
    email: 'admin@vulnerable-app.com',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    username: 'usuario1',
    password: 'password123',
    email: 'usuario1@test.com',
    role: 'user',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    username: 'test',
    password: 'test',
    email: 'test@test.com',
    role: 'user',
    created_at: new Date().toISOString()
  }
];

let comments: Comment[] = [
  {
    id: 1,
    username: 'admin',
    content: 'Bienvenidos al laboratorio de seguridad!',
    created_at: new Date().toISOString()
  }
];

let products: Product[] = [
  { id: 1, name: 'Producto A', description: 'Descripción del producto A', price: 100, category: 'Electrónica' },
  { id: 2, name: 'Producto B', description: 'Descripción del producto B', price: 200, category: 'Ropa' },
  { id: 3, name: 'Producto C', description: 'Descripción del producto C', price: 300, category: 'Electrónica' },
  { id: 4, name: 'Producto D', description: 'Descripción del producto D', price: 400, category: 'Hogar' },
];

// Simulación de consulta SQL vulnerable
export function searchProducts(query: string): Product[] {
  // VULNERABILIDAD: SQL Injection
  // En una aplicación real, esto ejecutaría algo como:
  // `SELECT * FROM products WHERE name LIKE '%${query}%'`
  // Permitiría inyección de SQL malicioso
  
  if (!query) return products;
  
  // Simulación básica de búsqueda vulnerable
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
}

// Simulación de consulta SQL vulnerable con más detalle
export function searchProductsSQL(query: string): any {
  // VULNERABILIDAD: Exposición de información sobre la estructura de la consulta
  const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${query}%' OR description LIKE '%${query}%'`;
  
  // Retornar información sensible sobre la consulta (vulnerabilidad)
  return {
    sql: sqlQuery,
    products: searchProducts(query),
    query_executed: true
  };
}

export function getAllUsers(): User[] {
  // VULNERABILIDAD: Exposición de todos los usuarios incluyendo contraseñas
  return users;
}

export function getUserByUsername(username: string): User | undefined {
  return users.find(u => u.username === username);
}

export function getUserById(id: number): User | undefined {
  return users.find(u => u.id === id);
}

export function authenticateUser(username: string, password: string): User | null {
  // VULNERABILIDAD: Autenticación débil, sin rate limiting, contraseñas en texto plano
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
}

export function addComment(username: string, content: string): Comment {
  // VULNERABILIDAD: Sin validación ni sanitización de entrada
  const newComment: Comment = {
    id: comments.length + 1,
    username,
    content, // Vulnerable a XSS
    created_at: new Date().toISOString()
  };
  comments.push(newComment);
  return newComment;
}

export function getAllComments(): Comment[] {
  return comments;
}

export function deleteComment(id: number): boolean {
  // VULNERABILIDAD: Sin verificación de autorización
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  return false;
}

