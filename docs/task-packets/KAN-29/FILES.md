# KAN-29 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/package.json` | **Modificado** | Añadir dependencia `@supabase/supabase-js`. |
| `frontend/package-lock.json` | **Modificado** | Lockfile actualizado por `npm install`. |
| `frontend/src/lib/supabaseClient.js` | **Nuevo** | Cliente único de Supabase configurado por env. |
| `frontend/.env.example` | **Nuevo** | Plantilla de variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). |
| `.gitignore` | **Verificado** | Asegurar que `.env` no se versiona. |

## No incluye
- Pantallas de registro/login → **KAN-30/31**.
- Contexto de sesión → **KAN-32**.
- Rutas protegidas → **KAN-33**.
