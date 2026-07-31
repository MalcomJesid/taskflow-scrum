# KAN-14 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Diseñar el modelo de datos de identidad coherente con Supabase Auth: tabla `profiles` (sin contraseñas) con
`id` UUID = usuario de Supabase, y columna `user_id UUID` en `todos` para asociar cada tarea a su dueño.

### Historia de usuario
Como arquitecto del sistema,
quiero un modelo que relacione cada tarea con el usuario autenticado por Supabase,
para garantizar que cada usuario solo vea y gestione sus propias tareas.

### Alcance
- Incluye: campo `userId` (UUID) en la entidad `Todo`; `schema.sql` de referencia (`profiles`, `todos`, índice).
- No incluye: rellenar `user_id` desde el token (KAN-37), filtrado por usuario (KAN-37), protección de endpoints (KAN-35).

### Criterios de aceptación
1. `profiles.id` es UUID y referencia al usuario de Supabase; no almacena contraseñas.
2. `todos` tiene `user_id UUID NOT NULL` con índice.
3. Con `ddl-auto=update`, la columna `user_id` existe en `todos`.
4. `schema.sql` se ejecuta en BD limpia sin errores.

### Implementación técnica
- Archivos modificados: `model/Todo.java`.
- Archivos creados: `docs/task-packets/KAN-14/schema.sql`.
- Decisión: `UUID` (no `Long`) por compatibilidad con `sub` de Supabase. Sin tabla `users` propia con contraseñas.

### Pruebas realizadas
- Comando: `./mvnw -q -DskipTests package` → **[completar]**
- Consulta `information_schema` de `user_id` → **[completar]**
- Evidencia: **[adjuntar capturas]**

### Evidencias
- Captura de la columna `user_id` en la tabla.
- Salida de ejecutar `schema.sql`.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: tipo incompatible. Mitigación: UUID. Responsable: Backend.
- Riesgo: filas previas sin `user_id`. Mitigación: estrategia de migración documentada.

### Trazabilidad
- Rama: `KAN-14-disenar-modelo-usuarios`
- Commit: `KAN-14 docs(database): documentar modelo de usuarios y asociacion de tareas`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-15; habilita KAN-37.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Código compilado.
- [ ] Pruebas exitosas.
- [ ] Evidencia adjunta.
- [ ] Documentación actualizada.
- [ ] Sin secretos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
