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
