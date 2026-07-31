# KAN-34 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Dependencias presentes
- **Pasos:** revisar `pom.xml`; `mvn -q dependency:tree | grep oauth2`.
- **Esperado:** aparecen security y oauth2-resource-server.
- **Resultado:** _______

### T2 — Arranque con seguridad
- **Comando:** `mvn spring-boot:run` (con `SUPABASE_ISSUER_URI`/`JWK_SET_URI`).
- **Esperado:** la app arranca y carga el JWKS.
- **Resultado:** _______

### T3 — Sin token → 401
- **Comando:** `curl -i http://localhost:8080/api/todos`
- **Esperado:** `401 Unauthorized`, sin stacktrace en el cuerpo.
- **Resultado:** _______

### T4 — Token válido → 200
- **Comando:** `curl -i -H "Authorization: Bearer <JWT_SUPABASE>" http://localhost:8080/api/todos`
- **Esperado:** `200 OK` (pasa validación firma/issuer/exp).
- **Resultado:** _______

### T5 — Token inválido → 401
- **Comando:** `curl -i -H "Authorization: Bearer token.falso.xxx" http://localhost:8080/api/todos`
- **Esperado:** `401 Unauthorized`.
- **Resultado:** _______

### T6 — CORS
- **Pasos:** llamada desde el frontend `localhost:5173` con token.
- **Esperado:** sin error de CORS.
- **Resultado:** _______

### T7 — Compilación
- **Comando:** `mvn -q compile`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere Maven, JDK 21 y proyecto Supabase con JWT real.
