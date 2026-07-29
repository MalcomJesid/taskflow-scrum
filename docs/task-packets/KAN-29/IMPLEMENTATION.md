# KAN-29 — Implementación

## Prerrequisito (BLOQUEANTE)
Necesitas del proyecto Supabase:
- **Project URL:** `https://<PROJECT_REF>.supabase.co`
- **anon public key** (Settings → API). **NUNCA** el `service_role`.

Si aún no existe el proyecto, crea uno en https://supabase.com (gratis) y toma esos dos valores.

## Paso 1 — Instalar el SDK
```bash
cd frontend
npm install @supabase/supabase-js
```
Esto añade la dependencia a `package.json` y `package-lock.json`.

## Paso 2 — Crear el cliente único
**Ruta:** `frontend/src/lib/supabaseClient.js`
```js
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
```

## Paso 3 — Variables de entorno
**Ruta:** `frontend/.env.example`
```dotenv
# Copia a frontend/.env y rellena con los valores de tu proyecto Supabase.
# Usa SOLO la anon public key. NUNCA el service_role_key.
VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
VITE_SUPABASE_ANON_KEY=<TU_ANON_PUBLIC_KEY>
```
Crea tu `.env` local:
```bash
cp .env.example .env
# edita .env con tus valores reales
```

## Paso 4 — Verificar `.gitignore`
El `.gitignore` raíz ya ignora `.env`. Confirmar que `frontend/.env` no se versiona (ver TESTS T3).

## Validación
```bash
npm run build
```
Debe compilar sin errores. Ver [`TESTS.md`](TESTS.md).

## Nota de seguridad
La `anon key` es pública por diseño (se usa en el navegador) y está protegida por las políticas RLS de
Supabase. El `service_role_key` **jamás** debe salir del servidor ni entrar al frontend/Git.
