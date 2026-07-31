# KAN-35 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — GET sin token
- **Comando:** `curl -i http://localhost:8080/api/todos`
- **Esperado:** 401, cuerpo `{"error":"No autorizado"}`, sin stacktrace.
- **Resultado:** _______

### T2 — POST sin token
- **Comando:** `curl -i -X POST http://localhost:8080/api/todos -H "Content-Type: application/json" -d '{"title":"x"}'`
- **Esperado:** 401.
- **Resultado:** _______

### T3 — PUT/PATCH/DELETE sin token
- **Pasos:** repetir con `-X PUT`, `-X PATCH .../1/toggle`, `-X DELETE .../1`.
- **Esperado:** 401 en los tres.
- **Resultado:** _______

### T4 — GET con token válido
- **Comando:** `curl -i -H "Authorization: Bearer <JWT>" http://localhost:8080/api/todos`
- **Esperado:** 200.
- **Resultado:** _______

### T5 — Preflight OPTIONS
- **Comando:** `curl -i -X OPTIONS http://localhost:8080/api/todos -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: GET"`
- **Esperado:** no bloqueado (2xx).
- **Resultado:** _______

### T6 — Cuerpo de error sin fugas
- **Pasos:** revisar cuerpo de la respuesta 401.
- **Esperado:** JSON mínimo, sin clase de excepción ni stacktrace.
- **Resultado:** _______

### T7 — Compilación
- **Comando:** `mvn -q compile`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere Maven, JDK 21 y JWT de Supabase.
