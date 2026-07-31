# KAN-32 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Crear un contexto de sesión global (`AuthContext`) que exponga `user`, `session`, `token`, `loading` y `signOut`,
usando `onAuthStateChange` con limpieza del listener y carga inicial de sesión persistida.

### Historia de usuario
Como aplicación,
quiero conocer en todo momento si hay un usuario autenticado y su token,
para proteger rutas y adjuntar el token en las peticiones al backend.

### Alcance
- Incluye: `AuthContext.jsx`, hook `useAuth()`, envoltura en `main.jsx`.
- No incluye: rutas privadas (KAN-33), adjuntar Bearer en Axios (KAN-37).

### Criterios de aceptación
1. Sesión persistida disponible tras `loading=false`.
2. `user`/`session`/`token` se actualizan tras login.
3. `signOut` limpia el estado.
4. Listener limpiado en desmontaje.
5. `loading=true` hasta resolver sesión inicial.

### Implementación técnica
- Archivos creados: `src/context/AuthContext.jsx`.
- Archivos modificados: `src/main.jsx`.
- Decisión: token solo en memoria del contexto; nunca en logs; persistencia delegada a Supabase.

### Pruebas realizadas
- T1 sesión persistida → **[completar]**
- T2 actualización tras login → **[completar]**
- T3 signOut → **[completar]**
- T4 limpieza del listener → **[completar]**
- T5 loading inicial → **[completar]**
- `npm run build` → **[completar]**

### Evidencias
- Captura mostrando `user` tras recarga y estado nulo tras `signOut`.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: fugas por listener sin limpiar. Mitigación: `unsubscribe()` en cleanup. Responsable: Frontend.
- Bloqueo: requiere KAN-29 y proyecto Supabase.

### Trazabilidad
- Rama: `KAN-32-sesion-global`
- Commit: `KAN-32 feat(auth): manejar sesion global con AuthContext`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-29; habilita KAN-33 y KAN-37.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Build exitoso.
- [ ] Evidencia adjunta.
- [ ] Sin tokens en logs.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
