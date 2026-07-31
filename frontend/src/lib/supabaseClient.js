import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Falla temprano y claro si faltan variables (no exponer valores en el mensaje)
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copia frontend/.env.example a frontend/.env.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,       // recupera sesión al recargar
    autoRefreshToken: true,     // renueva el access_token automáticamente
    detectSessionInUrl: true,   // maneja el callback de confirmación por email
  },
})
