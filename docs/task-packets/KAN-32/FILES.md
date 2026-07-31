# KAN-32 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/src/context/AuthContext.jsx` | **Nuevo** | Contexto global de sesión con `useAuth()`. |
| `frontend/src/main.jsx` | **Modificado** | Envolver `<App/>` con `<AuthProvider>`. |

## No incluye
- Cliente Supabase → **KAN-29**.
- Rutas privadas → **KAN-33**. Adjuntar Bearer en Axios → **KAN-37**.

## Contrato expuesto por `useAuth()`
| Campo | Tipo | Descripción |
|---|---|---|
| `session` | objeto\|null | Sesión completa de Supabase. |
| `user` | objeto\|null | `session.user`. |
| `token` | string\|null | `session.access_token` (para Bearer). |
| `loading` | boolean | `true` hasta resolver la sesión inicial. |
| `signOut` | función | Cierra sesión. |
