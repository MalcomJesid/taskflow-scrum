# KAN-14 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `backend/src/main/java/com/todo/model/Todo.java` | **Modificado** | Añadir campo `userId` (columna `user_id uuid NOT NULL`). |
| `docs/task-packets/KAN-14/schema.sql` | **Nuevo** | SQL de referencia para reproducir el esquema (`profiles`, `todos`, índice). |

## No incluye
- Rellenar `user_id` desde el token en runtime → **KAN-37**.
- Filtrado de consultas por usuario → **KAN-37**.
- Proteger endpoints → **KAN-35**.

## Nota sobre `profiles`
La tabla `profiles` es de diseño/documentación. Su creación efectiva puede hacerse en Supabase (SQL editor)
o mediante `schema.sql`. En este backend no se crea una entidad JPA `Profile` salvo que una tarea posterior
lo requiera (no está en el alcance actual).
