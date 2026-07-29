# KAN-36 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Extraer el identificador del usuario autenticado desde el claim `sub` del JWT validado (`@AuthenticationPrincipal
Jwt` / `jwt.getSubject()`), sin confiar en ningún `userId` enviado por el frontend.

### Historia de usuario
Como backend,
quiero conocer quién hace la petición a partir del token,
para asociar y filtrar datos por su identidad real.

### Alcance
- Incluye: inyección de `Jwt` en el controlador, helper `AuthUtils.currentUserId`, manejo de error y logging seguro.
- No incluye: validación (KAN-34), protección (KAN-35), uso real del `userId` para asociar/filtrar (KAN-37).

### Criterios de aceptación
1. Se obtiene el `sub` vía `jwt.getSubject()`.
2. Se ignora cualquier `userId` del frontend.
3. `sub` se parsea a `UUID` válido.
4. `sub` inválido/ausente → error controlado sin stacktrace.
5. Nunca se registra el token completo.

### Implementación técnica
- Archivos creados: `security/AuthUtils.java` (opcional).
- Archivos modificados: `controller/TodoController.java`.
- Decisión: única fuente de identidad = claim `sub`; logging solo del `userId`.

### Pruebas realizadas
- T1 extracción del sub → **[completar]**
- T2 ignorar userId del frontend → **[completar]**
- T3 sub→UUID → **[completar]**
- T4 sub inválido → **[completar]**
- T5 sin token en logs → **[completar]**
- `mvn compile` → **[completar]**

### Evidencias
- Log mostrando `userId` (sub) y ausencia de token.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: confiar en `userId` del body. Mitigación: ignorarlo, usar solo `sub`. Responsable: Backend.
- Bloqueo: requiere KAN-34/35 y JWT de Supabase.

### Trazabilidad
- Rama: `KAN-36-identidad-usuario`
- Commit: `KAN-36 feat(security): extraer identidad del usuario desde el claim sub`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-34/35; habilita KAN-37.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Compilación exitosa.
- [ ] Evidencia adjunta.
- [ ] Sin token en logs ni detalles de excepción expuestos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
