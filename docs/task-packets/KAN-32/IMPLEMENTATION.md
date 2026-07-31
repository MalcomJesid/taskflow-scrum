# KAN-32 — Implementación

## Prerrequisito
KAN-29 completado (`src/lib/supabaseClient.js`).

## 1. Crear el contexto
**Ruta:** `frontend/src/context/AuthContext.jsx`
```jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Carga inicial de la sesión persistida
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null)
        setLoading(false)
      }
    })

    // Escucha cambios de autenticación (login, logout, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
    })

    // Limpieza: evita fugas y dobles suscripciones
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    // El listener actualizará session a null automáticamente
  }

  const value = {
    session,
    user: session?.user ?? null,
    token: session?.access_token ?? null,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === null) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}
```

## 2. Envolver la app
**Ruta:** `frontend/src/main.jsx` — envolver `<App/>` con `<AuthProvider>`:
```jsx
import { AuthProvider } from './context/AuthContext'
// ...
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

## 3. Uso en login (KAN-31) — redirección
Con enrutado (KAN-33), tras `signInWithPassword` el listener actualizará `session`; un consumidor puede redirigir
al detectar `user`.

## Notas de seguridad
- El `token` se expone en el contexto **solo en memoria** para adjuntarlo a peticiones (KAN-37). Nunca se registra.
- No persistas el token manualmente: Supabase ya lo hace con `persistSession`.

## Validación
`npm run dev`; comprobar que `useAuth()` refleja los cambios de sesión. Ver [`TESTS.md`](TESTS.md).
