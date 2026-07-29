# KAN-36 — Extraer la identidad del usuario desde el JWT (claim `sub`)

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-36 |
| **Nombre** | Extraer identidad del usuario desde el JWT |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend |
| **Dependencias** | Requiere KAN-34/35. Habilita KAN-37. |

## Objetivo
Obtener el identificador del usuario autenticado desde el claim `sub` del JWT validado (vía `@AuthenticationPrincipal
Jwt` / `jwt.getSubject()`), sin confiar en ningún `userId` enviado por el frontend.

## Historia de usuario
> **Como** backend,
> **quiero** conocer quién hace la petición a partir del token,
> **para** asociar y filtrar datos por su identidad real.

## Valor de negocio
Es el puente entre "token válido" y "datos de este usuario"; sin él, no hay aislamiento posible (KAN-37).

## Dependencias
- **Previas:** KAN-34 (validación), KAN-35 (protección).
- **Habilita:** KAN-37 (asociar/filtrar por `user_id`).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Confiar en `userId` del body/query | Suplantación | Ignorarlo siempre; usar solo `jwt.getSubject()` |
| `sub` no es UUID válido | Error al mapear a `Todo.userId` | Parsear a `UUID` con manejo de error controlado |
| Registrar el token completo | Fuga | Loggear como máximo el `sub`, nunca el token |

## Archivos afectados
- `backend/src/main/java/com/todo/controller/TodoController.java` (recibir `@AuthenticationPrincipal Jwt`).
- (Opcional) `backend/src/main/java/com/todo/security/AuthUtils.java` (helper para extraer/parsear `sub`).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
El controlador dispone del `UUID` del usuario autenticado en cada petición, listo para KAN-37.

## Criterios de aceptación (Given/When/Then)
1. **Dado** un JWT válido, **cuando** llega una petición, **entonces** el controlador obtiene el `sub` vía `jwt.getSubject()`.
2. **Dado** que el frontend envía un `userId` en el body, **cuando** llega, **entonces** el backend **lo ignora** y usa el `sub`.
3. **Dado** un `sub` con formato UUID, **cuando** se parsea, **entonces** se obtiene un `UUID` válido.
4. **Dado** un `sub` inválido/ausente, **cuando** se procesa, **entonces** se responde error controlado (sin stacktrace).
5. **Dado** el logging, **cuando** ocurre, **entonces** nunca se registra el token completo.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-36-identidad-usuario`
- **Commit:** `KAN-36 feat(security): extraer identidad del usuario desde el claim sub`
- **Título PR:** `KAN-36 Extraer identidad del usuario desde el JWT`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
