# KAN-36 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Extracción del sub
- **Pasos:** con JWT válido, llamar a GET `/api/todos`; loggear `userId` (temporalmente).
- **Esperado:** el `userId` coincide con el `sub` del token (UUID del usuario Supabase).
- **Resultado:** _______

### T2 — Ignorar userId del frontend
- **Pasos:** POST con body que incluya `"userId":"00000000-0000-0000-0000-000000000000"`.
- **Esperado:** el backend usa el `sub` del token, no el del body.
- **Resultado:** _______

### T3 — sub → UUID
- **Pasos:** verificar el parseo del `sub`.
- **Esperado:** `UUID` válido sin excepción.
- **Resultado:** _______

### T4 — sub inválido
- **Pasos:** (simulado) token sin `sub` válido.
- **Esperado:** error 401/400 con cuerpo mínimo, sin stacktrace.
- **Resultado:** _______

### T5 — Sin token en logs
- **Pasos:** revisar logs tras varias peticiones.
- **Esperado:** aparece `userId`, nunca el token.
- **Resultado:** _______

### T6 — Compilación
- **Comando:** `mvn -q compile`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere Maven, JDK 21 y JWT de Supabase.
