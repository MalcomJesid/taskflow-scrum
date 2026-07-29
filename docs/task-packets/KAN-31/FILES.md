# KAN-31 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/src/pages/Login.jsx` | **Nuevo** | Pantalla de login conectada a `supabase.auth.signInWithPassword`. |
| `frontend/src/styles/index.css` | **Modificado (opcional)** | Reutilizar clases `.auth-container`, `.auth-form`. |

## No incluye
- Cliente Supabase → **KAN-29**.
- Registro → **KAN-30**. Sesión global/redirección → **KAN-32**. Rutas privadas → **KAN-33**.
