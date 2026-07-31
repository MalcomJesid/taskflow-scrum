# KAN-37 — Archivos afectados

## Backend (rama `KAN-37-aislar-tareas-por-usuario`)
| Archivo | Acción | Motivo |
|---|---|---|
| `backend/src/main/java/com/todo/repository/TodoRepository.java` | **Modificado** | Consultas `findByUserId...` y `findByIdAndUserId`. |
| `backend/src/main/java/com/todo/service/TodoService.java` | **Modificado** | Métodos `...ForUser(userId)` que aplican el aislamiento. |
| `backend/src/main/java/com/todo/controller/TodoController.java` | **Modificado** | Pasar `sub` a cada método; política 404 para ajenas. |

## Frontend (rama SEPARADA — no mezclar)
| Archivo | Acción | Motivo |
|---|---|---|
| `frontend/src/api/todoApi.js` | **Modificado** | Interceptor Axios que adjunta `Authorization: Bearer <token>`. |

## No incluye
- Columna `user_id` en la entidad → **KAN-14**. Validación/protección/identidad → **KAN-34/35/36**.

## Regla clave
- El backend deriva la identidad **solo** del `sub`. Nunca del body/query.
- Frontend y backend **no comparten rama** (regla del doc maestro). Este paquete describe ambos, pero cada cambio va en su rama.
