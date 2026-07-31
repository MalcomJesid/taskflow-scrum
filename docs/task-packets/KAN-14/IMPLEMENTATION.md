# KAN-14 — Implementación

## Alcance
Diseño del modelo. Se **documenta** el esquema y se prepara la entidad `Todo` con `user_id`. La lógica que
**rellena** `user_id` desde el token es KAN-37 (aquí solo el campo y la estructura).

## Paso 1 — Añadir `userId` a la entidad `Todo`
**Ruta:** `backend/src/main/java/com/todo/model/Todo.java`

Añadir el campo (columna `user_id`, tipo UUID) con su getter/setter:
```java
import java.util.UUID;

// ... dentro de la clase Todo, junto a los demás @Column:
@Column(name = "user_id", nullable = false, columnDefinition = "uuid")
private UUID userId;

// getters/setters:
public UUID getUserId() { return userId; }
public void setUserId(UUID userId) { this.userId = userId; }
```
> Se usa `UUID` porque el identificador de Supabase (`sub`) es un UUID. **No** usar `Long`.
> Durante desarrollo `ddl-auto=update` añadirá la columna. Si ya hay filas, ver "Migración de datos".

## Paso 2 — SQL de referencia (reproducibilidad)
**Ruta:** `docs/task-packets/KAN-14/schema.sql`
```sql
-- Tabla de perfiles (datos NO sensibles del usuario). La identidad vive en auth.users (Supabase).
CREATE TABLE IF NOT EXISTS profiles (
    id          uuid PRIMARY KEY,              -- = auth.users.id (Supabase)
    full_name   varchar(120),
    created_at  timestamp NOT NULL DEFAULT now(),
    updated_at  timestamp NOT NULL DEFAULT now()
);

-- Tabla de tareas con dueño.
CREATE TABLE IF NOT EXISTS todos (
    id          bigserial PRIMARY KEY,
    title       varchar(255) NOT NULL,
    description varchar(500),
    completed   boolean NOT NULL DEFAULT false,
    user_id     uuid NOT NULL,                 -- = claim sub del JWT de Supabase
    created_at  timestamp,
    updated_at  timestamp
);

CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos (user_id);
```

## Paso 3 — (Opcional, Supabase) Row Level Security
Si las tareas se leyeran directamente desde Supabase (no es el caso aquí, las sirve el backend), se
activaría RLS. Como el **backend** filtra por `user_id`, RLS es opcional. Se documenta como nota:
```sql
-- Opcional, solo si se accediera a todos desde el cliente Supabase:
-- ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY todos_owner ON todos USING (user_id = auth.uid());
```

## Migración de datos existentes
Si `todos` ya tiene filas sin `user_id`, `NOT NULL` fallará. Estrategias:
- Entorno académico limpio: recrear la tabla (`DROP TABLE todos;`) — se pierde data de prueba.
- Alternativa: crear columna nullable, backfill con un usuario dummy, luego `SET NOT NULL`.

## Validación
Tras iniciar el backend con la BD, comprobar la columna:
```sql
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'todos' AND column_name = 'user_id';
```
Ver [`TESTS.md`](TESTS.md).
