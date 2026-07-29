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
