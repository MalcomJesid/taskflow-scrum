# KAN-31 — Implementación

## Prerrequisito
KAN-29 completado (`src/lib/supabaseClient.js`).

## Pantalla de Login
**Ruta:** `frontend/src/pages/Login.jsx`
```jsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!EMAIL_RE.test(email)) { setError('Introduce un correo válido.'); return }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        // Mensaje genérico: no revela si el correo existe
        setError('Credenciales inválidas.')
        return
      }
      // Éxito: la sesión la gestiona Supabase; la redirección se maneja en KAN-32/33.
    } catch {
      setError('Error inesperado. Inténtalo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1>Iniciar sesión</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error-msg">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </div>
  )
}
```

## Notas de seguridad
- **Nunca** hagas `console.log` de la sesión, el `access_token` o el objeto `data`.
- El mensaje de error es **genérico** para evitar enumeración de cuentas.
- La redirección tras login se implementa cuando exista `AuthContext` (KAN-32) y enrutado (KAN-33).

## Validación
`npm run dev` y probar los criterios de aceptación. Ver [`TESTS.md`](TESTS.md).
