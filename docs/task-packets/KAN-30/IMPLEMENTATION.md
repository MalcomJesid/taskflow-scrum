# KAN-30 — Implementación

## Prerrequisito
KAN-29 completado (`src/lib/supabaseClient.js` disponible).

## Pantalla de Registro
**Ruta:** `frontend/src/pages/Register.jsx`
```jsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!EMAIL_RE.test(email)) return 'Introduce un correo válido.'
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    if (password !== confirm) return 'Las contraseñas no coinciden.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null); setInfo(null)
    const v = validate()
    if (v) { setError(v); return }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        // Mensaje uniforme; detecta correo ya registrado
        if (String(error.message).toLowerCase().includes('already')) {
          setError('El correo ya está registrado.')
        } else {
          setError('No se pudo completar el registro. Inténtalo de nuevo.')
        }
        return
      }
      // Si la confirmación por email está activa, no hay sesión inmediata:
      if (!data.session) {
        setInfo('Registro exitoso. Revisa tu correo para confirmar la cuenta.')
      } else {
        setInfo('Registro exitoso.')
      }
    } catch {
      setError('Error inesperado. Inténtalo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1>Crear cuenta</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña (mín. 8)" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirmar contraseña" value={confirm}
               onChange={(e) => setConfirm(e.target.value)} required />
        {error && <div className="error-msg">{error}</div>}
        {info && <div className="info-msg">{info}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Registrarme'}
        </button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
    </div>
  )
}
```

## Enrutado
El enlace a `/login` y el montaje de esta página requieren `react-router-dom` (se añade en KAN-33). Hasta
entonces, se puede probar renderizando `<Register />` temporalmente en `App.jsx`.

## Estilos (opcional)
Reutiliza `src/styles/index.css`; añade clases `.auth-container`, `.auth-form`, `.info-msg` si no existen.

## Validación
`npm run dev` y probar los 5 criterios de aceptación. Ver [`TESTS.md`](TESTS.md).
