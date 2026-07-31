# KAN-33 — Implementación

## Prerrequisito
KAN-29 (cliente) y KAN-32 (`useAuth()`).

## 1. Instalar react-router-dom
```bash
cd frontend
npm install react-router-dom
```

## 2. Crear ProtectedRoute
**Ruta:** `frontend/src/components/ProtectedRoute.jsx`
```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // Espera a resolver la sesión inicial para no expulsar a usuarios válidos
  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  // Sin sesión → al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

## 3. Definir el enrutado
**Ruta:** `frontend/src/App.jsx` — estructura de referencia (adapta al `App` existente que renderiza las tareas):
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import TodoApp from './TodoApp' // el componente actual de tareas (renómbralo si hace falta)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

> **Nota de refactor:** si hoy `App.jsx` contiene directamente la UI de tareas, extrae esa UI a `TodoApp.jsx` y deja
> `App.jsx` solo con el enrutado. Es un movimiento de código, sin cambiar la lógica de tareas.

## 4. Redirección tras login (opcional, cierra KAN-31)
En `Login.jsx`, tras un login exitoso, usar `useNavigate()` para ir a `/`. En `AuthProvider` ya se actualiza la
sesión; el `ProtectedRoute` hará el resto.

## Seguridad
- Este guard es **solo UX**. La protección real de datos la imponen KAN-34/35 (backend valida el JWT).

## Validación
`npm run dev`; probar rutas con y sin sesión. Ver [`TESTS.md`](TESTS.md).
