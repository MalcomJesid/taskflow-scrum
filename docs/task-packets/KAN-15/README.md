# KAN-15 — Configurar conexión a Base de Datos

> Este paquete sigue las convenciones comunes de [`../README.md`](../README.md) (arquitectura, Git, DoR/DoD, seguridad).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-15 |
| **Nombre** | Configurar conexión a Base de Datos |
| **Tipo** | `PENDIENTE DE VERIFICACIÓN EN JIRA` (probable: Tarea / Historia técnica) |
| **Responsable / rol** | Compañero Backend |
| **Sprint** | `PENDIENTE DE VERIFICACIÓN EN JIRA` (probable: Sprint 2 — Gestión de usuarios) |
| **Épica / padre** | Gestión de usuarios · `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Prioridad** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Estado** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Dependencias** | Ninguna (tarea base). Habilita KAN-14. |

## Objetivo
Dejar la conexión a PostgreSQL **funcional y reproducible**, **externalizando las credenciales** a variables
de entorno (hoy están en texto plano en `application.properties` y `docker-compose.yml`), y creando un
`.env.example` para que cualquier compañero levante el entorno sin exponer secretos.

## Historia de usuario
> **Como** desarrollador del equipo,
> **quiero** que la aplicación se conecte a PostgreSQL mediante variables de entorno,
> **para** poder levantar el proyecto de forma segura y reproducible sin credenciales en el código.

## Valor de negocio
Base indispensable para persistir usuarios y tareas. Reduce el riesgo de fuga de credenciales y facilita
que dos compañeros con conocimientos básicos configuren el entorno de forma idéntica.

## Dependencias
- **Previas:** ninguna.
- **Habilita:** KAN-14 (modelo de datos), y por transitividad todo el backend.

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Credenciales quedan en Git | Fuga de secretos | Externalizar a env + `.env` en `.gitignore` |
| PostgreSQL no disponible localmente | Backend no arranca | Documentar `docker compose up postgres` o Postgres local |
| Java 21 ausente (hay 17) | No compila | Instalar JDK 21 (ver IMPLEMENTATION.md) |

## Archivos afectados
- `backend/src/main/resources/application.properties` (modificado — usa `${VAR:default}`).
- `backend/.env.example` (nuevo).
- `.gitignore` (modificado — asegurar `.env` y `target/`).
- Ver detalle en [`FILES.md`](FILES.md).

## Resultado esperado
El backend arranca leyendo la URL/usuario/clave desde variables de entorno; sin `.env`, usa valores por
defecto de desarrollo; ningún secreto nuevo entra a Git.

## Criterios de aceptación (Given/When/Then)
1. **Dado** un entorno con las variables definidas, **cuando** se inicia el backend, **entonces** conecta a
   PostgreSQL sin credenciales embebidas en el código.
2. **Dado** que no existe `.env`, **cuando** se inicia el backend en desarrollo, **entonces** usa los valores
   por defecto (`localhost:5432/tododb`) y arranca igualmente.
3. **Dado** el repositorio, **cuando** se ejecuta `git status`, **entonces** `.env` **no** aparece como
   archivo a versionar (está ignorado) y `.env.example` **sí** existe versionado.
4. **Dado** `docker compose up postgres`, **cuando** el contenedor está healthy, **entonces** el backend
   conecta correctamente.

## Definition of Ready / Done
Se aplican las checklists comunes de [`../README.md`](../README.md) §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-15-configurar-conexion-bd`
- **Commit:** `KAN-15 chore(config): externalizar credenciales de base de datos a variables de entorno`
- **Título PR:** `KAN-15 Configurar conexión a Base de Datos`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
