# KAN-36 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `backend/src/main/java/com/todo/controller/TodoController.java` | **Modificado** | Recibir `@AuthenticationPrincipal Jwt` y extraer `sub`. |
| `backend/src/main/java/com/todo/security/AuthUtils.java` | **Nuevo (opcional)** | Helper `currentUserId(jwt)` que parsea el `sub` a `UUID`. |

## No incluye
- Validación/base del resource server → **KAN-34**. Protección de endpoints → **KAN-35**.
- Uso real de `userId` para asociar/filtrar tareas → **KAN-37**.

## Regla clave
El backend **nunca** confía en un `userId` enviado por el frontend. La única fuente de identidad es `jwt.getSubject()`.
