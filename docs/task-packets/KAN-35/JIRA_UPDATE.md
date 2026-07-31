# KAN-35 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Afinar las reglas de autorización para exigir JWT válido en `/api/todos/**` (401 si falta/es inválido) y devolver
respuestas de error limpias (401/403) sin exponer detalles internos.

### Historia de usuario
Como dueño de mis tareas,
quiero que ningún endpoint responda sin un token válido,
para que nadie acceda a datos sin autenticarse.

### Alcance
- Incluye: reglas `authenticated()` sobre `/api/todos/**`, `OPTIONS` permitido, handlers 401/403 sin fugas.
- No incluye: base del resource server (KAN-34), identidad `sub` (KAN-36), aislamiento por usuario (KAN-37).

### Criterios de aceptación
1. Los 5 verbos sin token → 401.
2. Con token válido → 200/201.
3. 403 preparado para roles futuros.
4. Cuerpo de error sin stacktrace.
5. Preflight OPTIONS no bloqueado.

### Implementación técnica
- Archivos modificados: `config/SecurityConfig.java`.
- Decisión: `denyAll()` por defecto; handlers con cuerpo JSON mínimo.

### Pruebas realizadas
- T1 GET sin token → **[completar]**
- T2 POST sin token → **[completar]**
- T3 PUT/PATCH/DELETE sin token → **[completar]**
- T4 GET con token → **[completar]**
- T5 OPTIONS → **[completar]**
- T6 error sin fugas → **[completar]**
- `mvn compile` → **[completar]**

### Evidencias
- Salidas `curl` de 401 por método y 200 con token.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: endpoint abierto por olvido. Mitigación: `denyAll()` + prueba por método. Responsable: Backend.
- Bloqueo: requiere KAN-34 y JWT de Supabase.

### Trazabilidad
- Rama: `KAN-35-proteger-endpoints`
- Commit: `KAN-35 feat(security): exigir jwt en endpoints de tareas`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-34; precede a KAN-36/37.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Compilación exitosa.
- [ ] 401/200 verificados con evidencia.
- [ ] Sin detalles de excepción expuestos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
