import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      // Éxito: el AuthProvider actualizará la sesión; redirigimos a la app
      navigate('/')
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
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  )
}
