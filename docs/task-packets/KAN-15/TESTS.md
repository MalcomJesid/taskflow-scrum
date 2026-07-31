# KAN-15 — Pruebas

> Marca cada prueba con su resultado real. Si no puedes ejecutarla, escribe **NO VERIFICADO** y la causa.

## Prerrequisitos
- JDK 21 activo (`java -version` → 21).
- Maven o `./mvnw` disponible.
- PostgreSQL accesible en `localhost:5432` (o `docker compose up -d postgres`).

## Casos

### T1 — Arranque con valores por defecto (sin `.env`)
- **Comando:** `./mvnw spring-boot:run` (o `mvn spring-boot:run`)
- **Esperado:** el backend arranca; log `Started TodoApplication`; sin errores de conexión.
- **Resultado:** _______  · **Evidencia:** captura del log de arranque.

### T2 — Arranque con variables de entorno sobreescritas
- **Comando (macOS/Linux):**
  ```bash
  SPRING_DATASOURCE_PASSWORD=todopass ./mvnw spring-boot:run
  ```
- **Esperado:** arranca usando la variable exportada (no la del código).
- **Resultado:** _______  · **Evidencia:** captura del log.

### T3 — `.env` NO se versiona
- **Comando:**
  ```bash
  cp backend/.env.example backend/.env
  git status --short
  ```
- **Esperado:** `backend/.env` **no** aparece como archivo nuevo a agregar (está ignorado).
- **Resultado:** _______  · **Evidencia:** captura de `git status`.

### T4 — Conexión a PostgreSQL efectiva
- **Comando:** con backend arriba, `curl -i http://localhost:8080/api/todos`
- **Esperado:** HTTP `200` con lista JSON (vacía o con datos). Confirma que JPA conectó a la BD.
- **Resultado:** _______  · **Evidencia:** salida de `curl`.

## Compilación
- **Comando:** `./mvnw -q -DskipTests package`
- **Esperado:** `BUILD SUCCESS`.
- **Resultado:** _______

> Estado actual en la máquina de auditoría: **NO VERIFICADO** — no hay Maven ni JDK 21 instalados (ver FASE 0).
