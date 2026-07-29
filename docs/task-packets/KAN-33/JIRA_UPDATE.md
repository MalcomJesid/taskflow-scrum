# KAN-33 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Instalar `react-router-dom`, definir el enrutado y crear `ProtectedRoute` que redirige a `/login` sin sesión,
respetando el estado `loading`.

### Historia de usuario
Como usuario no autenticado,
quiero ser redirigido al login al intentar entrar a una página privada,
para que solo usuarios con sesión accedan a las tareas.

### Alcance
- Incluye: `react-router-dom`, `ProtectedRoute.jsx`, enrutado en `App.jsx`, refactor a `TodoApp.jsx`.
- No incluye: cliente (KAN-29), sesión (KAN-32), pantallas (KAN-30/31), Bearer en Axios (KAN-37).

### Criterios de aceptación
1. Sin sesión en ruta privada → redirige a `/login`.
2. Con sesión → ve las tareas.
3. No redirige durante `loading`.
4. Login logueado → (opcional) redirige a la ruta privada.
5. Enrutado funciona sin errores.

### Implementación técnica
- Archivos creados: `src/components/ProtectedRoute.jsx`, `src/TodoApp.jsx` (refactor).
- Archivos modificados: `src/App.jsx`, `package.json`, `package-lock.json`.
- Decisión: el guard es UX; la seguridad real la impone el backend (KAN-34/35).

### Pruebas realizadas
- T1 privada sin sesión → **[completar]**
- T2 privada con sesión → **[completar]**
- T3 sin redirección en loading → **[completar]**
- T4 rutas públicas → **[completar]**
- T5 ruta desconocida → **[completar]**
- `npm run build` → **[completar]**

### Evidencias
- Captura de redirección a login y de tareas visibles con sesión.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: confiar solo en el guard. Mitigación: backend valida JWT (KAN-34/35). Responsable: Frontend/Backend.
- Bloqueo: requiere KAN-29 y KAN-32.

### Trazabilidad
- Rama: `KAN-33-rutas-privadas`
- Commit: `KAN-33 feat(auth): proteger rutas privadas con ProtectedRoute`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-29, KAN-32; integra KAN-30, KAN-31.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Build exitoso.
- [ ] Evidencia adjunta.
- [ ] Sin secretos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
