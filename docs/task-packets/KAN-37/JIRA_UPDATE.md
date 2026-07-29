# KAN-37 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Asociar cada tarea al usuario autenticado (`user_id = sub`) y filtrar todas las operaciones por ese usuario, de modo
que ningún usuario pueda ver ni modificar tareas de otro (sin acceso horizontal).

### Historia de usuario
Como usuario autenticado,
quiero ver y gestionar únicamente mis propias tareas,
para que mis datos estén aislados de los de otros usuarios.

### Alcance
- Backend: consultas por `user_id`, servicio `...ForUser`, controlador que usa el `sub`, política 404 para ajenas.
- Frontend (rama aparte): interceptor Axios que adjunta `Authorization: Bearer`.
- No incluye: columna `user_id` (KAN-14), validación/protección/identidad (KAN-34/35/36).

### Criterios de aceptación
1. POST guarda `user_id` = sub del token (ignora body).
2. GET solo devuelve tareas propias.
3. PUT/PATCH/DELETE sobre ajenas → 404, sin cambios.
4. Operaciones propias → éxito.
5. Identidad siempre desde el `sub`.

### Implementación técnica
- Archivos modificados (backend): `TodoRepository.java`, `TodoService.java`, `TodoController.java`.
- Archivos modificados (frontend, rama aparte): `api/todoApi.js`.
- Decisión: `findByIdAndUserId` como candado; 404 para no revelar existencia.

### Pruebas realizadas
- T1 crear asigna sub → **[completar]**
- T2 GET solo propio → **[completar]**
- T3 PUT ajena 404 → **[completar]**
- T4 DELETE ajena 404 → **[completar]**
- T5 toggle ajena 404 → **[completar]**
- T6 operaciones propias → **[completar]**
- T7 frontend Bearer → **[completar]**
- `mvn compile` → **[completar]**

### Evidencias
- Salidas `curl` con dos usuarios (A/B) mostrando aislamiento.
- Network del frontend con el header Bearer.
- Enlaces a los dos PR (backend y frontend).

### Riesgos o bloqueos
- Riesgo: filtrar solo en algunos métodos. Mitigación: aplicar en todos. Responsable: Backend.
- Bloqueo: requiere KAN-14/34/35/36 y 2 usuarios de Supabase.

### Trazabilidad
- Rama backend: `KAN-37-aislar-tareas-por-usuario`
- Rama frontend: `KAN-37-frontend-bearer`
- Commit backend: `KAN-37 feat(security): asociar y filtrar tareas por usuario autenticado`
- Commit frontend: `KAN-37 feat(auth): adjuntar token bearer en peticiones al backend`
- Pull requests: **[enlaces]**
- Dependencias Jira: requiere KAN-14/34/35/36.

### Definition of Done
- [ ] Criterios de aceptación cumplidos (aislamiento verificado con 2 usuarios).
- [ ] Compilación exitosa.
- [ ] Evidencia adjunta.
- [ ] Sin `userId` de cliente; sin tokens en logs.
- [ ] Pull requests revisados.
- [ ] Entregable aprobado por el Product Owner.
