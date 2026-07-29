# KAN-34 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `backend/pom.xml` | **Modificado** | Añade `spring-boot-starter-security` y `spring-boot-starter-oauth2-resource-server`. |
| `backend/src/main/resources/application.properties` | **Modificado** | `issuer-uri` y `jwk-set-uri` de Supabase (vía variables). |
| `backend/.env.example` | **Modificado** | Añade `SUPABASE_ISSUER_URI`, `SUPABASE_JWK_SET_URI`. |
| `backend/src/main/java/com/todo/config/SecurityConfig.java` | **Nuevo** | `SecurityFilterChain` + CORS + validación JWT. |
| `backend/src/main/java/com/todo/config/CorsConfig.java` | **Revisar/Eliminar** | El CORS pasa al `SecurityFilterChain`; coordinar. |

## No incluye
- Detalle de qué endpoints se protegen y respuestas 401/403 finas → **KAN-35**.
- Extraer identidad del `sub` → **KAN-36**. Filtrar tareas por usuario → **KAN-37**.

## Advertencia
No versionar `target/`. Confirmar que `.gitignore` incluye `target/` (endurecido en KAN-15).
