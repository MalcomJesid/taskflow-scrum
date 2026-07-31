# KAN-14 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Compilación del backend con el nuevo campo
- **Comando:** `./mvnw -q -DskipTests package`
- **Esperado:** `BUILD SUCCESS` (la entidad con `UUID userId` compila).
- **Resultado:** _______

### T2 — La columna `user_id` se crea en la tabla
- **Comando (psql):**
  ```sql
  SELECT column_name, data_type FROM information_schema.columns
  WHERE table_name='todos' AND column_name='user_id';
  ```
- **Esperado:** una fila → `user_id | uuid`.
- **Resultado:** _______  · **Evidencia:** captura de la consulta.

### T3 — `schema.sql` se ejecuta sin errores en BD limpia
- **Comando:** `psql -U todouser -d tododb -f docs/task-packets/KAN-14/schema.sql`
- **Esperado:** `CREATE TABLE` / `CREATE INDEX` sin errores.
- **Resultado:** _______  · **Evidencia:** salida de psql.

### T4 — `profiles` no almacena contraseñas
- **Verificación:** revisar `schema.sql` → la tabla `profiles` **no** tiene columna de password/hash.
- **Esperado:** confirmado por inspección.
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — sin JDK 21/Maven/PostgreSQL disponibles.
