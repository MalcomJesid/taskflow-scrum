# KAN-14 — Diseñar tabla Users / Profiles

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-14 |
| **Nombre** | Diseñar tabla Users |
| **Tipo** | `PENDIENTE DE VERIFICACIÓN EN JIRA` (probable: Tarea / Diseño de datos) |
| **Responsable / rol** | Compañero Backend |
| **Sprint** | `PENDIENTE DE VERIFICACIÓN EN JIRA` (probable: Sprint 2 — Gestión de usuarios) |
| **Épica / padre** | Gestión de usuarios · `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Dependencias** | Requiere KAN-15 (conexión BD). Habilita KAN-37. |

## Objetivo
Diseñar el modelo de datos de identidad y su relación con las tareas, **coherente con Supabase Auth**:
la identidad la gestiona `auth.users` (Supabase); creamos una tabla pública **`profiles`** para datos de
perfil, y añadimos **`user_id` (UUID)** a la tabla `todos` para asociar cada tarea a su dueño.

## Historia de usuario
> **Como** arquitecto del sistema,
> **quiero** un modelo de datos que relacione cada tarea con el usuario autenticado por Supabase,
> **para** garantizar que cada usuario solo vea y gestione sus propias tareas.

## Valor de negocio
Es la base del aislamiento de datos por usuario (multi-tenant lógico). Sin `user_id` en `todos`, no puede
cumplirse KAN-37 ni la seguridad horizontal.

## Decisión de diseño (importante)
- **No** se crea una tabla `users` propia con contraseñas: **Supabase Auth** es la fuente de identidad
  (`auth.users`). Guardar contraseñas aquí sería inseguro y redundante (ver §7 doc maestro).
- Tabla pública **`profiles`**: `id UUID` (= `auth.users.id`), `full_name`, `created_at`, `updated_at`.
- Tabla **`todos`**: se añade `user_id UUID NOT NULL` (= `sub` del JWT). Índice por `user_id`.
- En desarrollo el esquema lo genera Hibernate (`ddl-auto=update`); se documenta el SQL equivalente para
  reproducibilidad y (opcional) RLS en Supabase.

## Dependencias
- **Previas:** KAN-15.
- **Habilita:** KAN-37 (asociar tareas), KAN-36 (usa el `user_id`).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Tipo de `user_id` incompatible con UUID de Supabase | Fallos de relación | Usar `UUID`, no `Long` |
| `ddl-auto=update` no crea índices/FK ideales | Rendimiento/integridad | Documentar SQL manual + índice |
| Datos existentes en `todos` sin `user_id` | Nulls en columna NOT NULL | Estrategia de migración documentada |

## Archivos afectados
- `backend/src/main/java/com/todo/model/Todo.java` (modificado — añadir `userId`).
- `docs/task-packets/KAN-14/schema.sql` (nuevo — SQL de referencia).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
Modelo documentado y entidad `Todo` con `user_id`. (La *asociación efectiva* en runtime es KAN-37.)

## Criterios de aceptación (Given/When/Then)
1. **Dado** el modelo, **cuando** se revisa `profiles`, **entonces** su `id` es UUID y referencia al usuario de Supabase; **no** almacena contraseñas.
2. **Dado** el modelo, **cuando** se revisa `todos`, **entonces** tiene `user_id UUID NOT NULL` con índice.
3. **Dado** el arranque con `ddl-auto=update`, **cuando** inicia el backend, **entonces** la columna `user_id` existe en la tabla `todos`.
4. **Dado** el `schema.sql` de referencia, **cuando** se ejecuta en una BD limpia, **entonces** crea las tablas sin errores.

## Definition of Ready / Done
Checklists comunes de [`../README.md`](../README.md) §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-14-disenar-modelo-usuarios`
- **Commit:** `KAN-14 docs(database): documentar modelo de usuarios y asociacion de tareas`
- **Título PR:** `KAN-14 Diseñar tabla Users / Profiles`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
