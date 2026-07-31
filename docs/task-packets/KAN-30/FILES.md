# KAN-30 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/src/pages/Register.jsx` | **Nuevo** | Pantalla de registro conectada a `supabase.auth.signUp`. |
| `frontend/src/styles/index.css` | **Modificado (opcional)** | Clases `.auth-container`, `.auth-form`, `.info-msg`. |

## No incluye
- Cliente Supabase → **KAN-29**.
- Login → **KAN-31**. Sesión global → **KAN-32**. Enrutado/rutas privadas → **KAN-33**.

## Nota
El enlace a `/login` funciona plenamente cuando `react-router-dom` esté instalado (KAN-33). Antes, se prueba
montando el componente directamente.
