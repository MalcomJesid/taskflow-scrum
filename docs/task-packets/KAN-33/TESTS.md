# KAN-33 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Ruta privada sin sesión
- **Pasos:** deslogueado, ir a `/`.
- **Esperado:** redirección a `/login`.
- **Resultado:** _______

### T2 — Ruta privada con sesión
- **Pasos:** logueado, ir a `/`.
- **Esperado:** se ve la página de tareas.
- **Resultado:** _______

### T3 — No redirigir durante loading
- **Pasos:** con sesión persistida, recargar en `/`.
- **Esperado:** muestra "Cargando..." y luego las tareas (no salta a login).
- **Resultado:** _______

### T4 — Rutas públicas
- **Pasos:** ir a `/login` y `/register`.
- **Esperado:** ambas cargan sin sesión.
- **Resultado:** _______

### T5 — Ruta desconocida
- **Pasos:** ir a `/xyz`.
- **Esperado:** redirige a `/`.
- **Resultado:** _______

### T6 — Build
- **Comando:** `npm run build`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere KAN-29/32 + proyecto Supabase.
