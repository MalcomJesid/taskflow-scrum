# KAN-37 — Pruebas

> Requiere DOS usuarios de Supabase (A y B) con sus JWT. Marca resultado real o **NO VERIFICADO** + causa.

### T1 — Crear asigna user_id del token
- **Pasos:** con token de A, POST tarea (incluir `"userId"` falso en el body).
- **Esperado:** la tarea se guarda con `user_id` = sub de A (se ignora el del body).
- **Resultado:** _______

### T2 — GET solo devuelve lo propio
- **Pasos:** A crea 2 tareas, B crea 1; GET con token de A.
- **Esperado:** A ve solo sus 2; no ve la de B.
- **Resultado:** _______

### T3 — PUT sobre tarea ajena
- **Pasos:** con token de B, PUT sobre una tarea de A.
- **Esperado:** 404 (o 403); la tarea de A no cambia.
- **Resultado:** _______

### T4 — DELETE sobre tarea ajena
- **Pasos:** con token de B, DELETE una tarea de A.
- **Esperado:** 404; la tarea de A sigue existiendo.
- **Resultado:** _______

### T5 — PATCH toggle sobre tarea ajena
- **Pasos:** con token de B, PATCH `/{idDeA}/toggle`.
- **Esperado:** 404; sin cambios en la tarea de A.
- **Resultado:** _______

### T6 — Operaciones propias funcionan
- **Pasos:** A edita/alterna/elimina sus propias tareas.
- **Esperado:** éxito (200/204).
- **Resultado:** _______

### T7 — Frontend adjunta Bearer (rama frontend)
- **Pasos:** revisar en Network que las peticiones llevan `Authorization: Bearer ...`.
- **Esperado:** header presente; sin `userId` en el body.
- **Resultado:** _______

### T8 — Compilación
- **Comando:** `mvn -q compile`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere Maven, JDK 21, Supabase y 2 usuarios.
