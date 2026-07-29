# KAN-33 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/package.json` | **Modificado** | Añade dependencia `react-router-dom`. |
| `frontend/package-lock.json` | **Modificado** | Lockfile actualizado por `npm install`. |
| `frontend/src/components/ProtectedRoute.jsx` | **Nuevo** | Guard de rutas privadas. |
| `frontend/src/App.jsx` | **Modificado** | Define el enrutado (`/login`, `/register`, ruta privada). |
| `frontend/src/TodoApp.jsx` | **Nuevo (refactor)** | UI de tareas extraída de `App.jsx` (si hoy está inline). |

## No incluye
- Cliente Supabase → **KAN-29**. Sesión → **KAN-32**. Pantallas → **KAN-30/31**.
- Adjuntar Bearer en las peticiones → **KAN-37**.

## Nota
El refactor a `TodoApp.jsx` es un **movimiento de código** sin cambios de lógica de tareas. Verifícalo con `git diff`.
