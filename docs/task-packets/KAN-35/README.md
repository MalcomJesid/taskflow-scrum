# KAN-35 — Proteger los endpoints de tareas (401/403)

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-35 |
| **Nombre** | Proteger los endpoints de tareas |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend |
| **Dependencias** | Requiere KAN-34. Precede a KAN-36/37. |

## Objetivo
Afinar las reglas de autorización del `SecurityFilterChain`: todos los endpoints `/api/todos/**` exigen JWT válido
(401 si falta/es inválido) y devolver respuestas de error limpias (401/403) sin exponer detalles internos.

## Historia de usuario
> **Como** dueño de mis tareas,
> **quiero** que ningún endpoint responda sin un token válido,
> **para** que nadie acceda a datos sin autenticarse.

## Valor de negocio
Garantiza que la API no expone ni modifica datos sin autenticación; es el candado de la capa de servicio.

## Dependencias
- **Previas:** KAN-34 (resource server).
- **Precede:** KAN-36 (identidad), KAN-37 (aislamiento por usuario).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Dejar algún endpoint abierto | Fuga de datos | Regla `authenticated()` sobre `/api/todos/**` + prueba por método |
| CORS preflight bloqueado | Frontend roto | Permitir `OPTIONS` explícitamente |
| Mensajes de error con stacktrace | Fuga de información | `EntryPoint`/`AccessDeniedHandler` con cuerpo mínimo |

## Archivos afectados
- `backend/src/main/java/com/todo/config/SecurityConfig.java` (afinar reglas y handlers).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
Todos los métodos de `/api/todos` responden 401 sin token válido; con token válido, 200 (sin filtrar aún por
usuario, eso es KAN-37).

## Criterios de aceptación (Given/When/Then)
1. **Dado** GET/POST/PUT/PATCH/DELETE en `/api/todos/**` sin token, **cuando** llamo, **entonces** recibo 401.
2. **Dado** un token válido, **cuando** llamo a cualquiera de esos métodos, **entonces** recibo 200/201 (según el caso).
3. **Dado** un token válido pero sin permisos futuros (rol), **cuando** aplique, **entonces** 403 (preparado, no obligatorio ahora).
4. **Dado** una respuesta de error, **cuando** ocurre, **entonces** el cuerpo no contiene stacktrace ni detalles internos.
5. **Dado** un preflight `OPTIONS`, **cuando** el navegador lo envía, **entonces** no es bloqueado.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-35-proteger-endpoints`
- **Commit:** `KAN-35 feat(security): exigir jwt en endpoints de tareas`
- **Título PR:** `KAN-35 Proteger los endpoints de tareas`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
