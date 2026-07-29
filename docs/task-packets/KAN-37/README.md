# KAN-37 — Asociar y filtrar tareas por usuario (aislamiento horizontal)

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-37 |
| **Nombre** | Asociar y filtrar tareas por usuario |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend |
| **Dependencias** | Requiere KAN-14 (columna `user_id`), KAN-34/35 (seguridad), KAN-36 (identidad). |

## Objetivo
Hacer que cada tarea pertenezca al usuario autenticado: al **crear**, asignar `user_id = sub`; al **leer/actualizar/
eliminar/alternar**, operar **solo** sobre tareas de ese usuario. Ningún usuario puede ver ni tocar tareas de otro
(no hay acceso horizontal).

## Historia de usuario
> **Como** usuario autenticado,
> **quiero** ver y gestionar únicamente mis propias tareas,
> **para** que mis datos estén aislados de los de otros usuarios.

## Valor de negocio
Es el requisito de seguridad central del proyecto: convierte la app multiusuario en realmente privada por usuario.

## Dependencias
- **Previas:** KAN-14 (`Todo.userId`), KAN-34 (validación), KAN-35 (protección), KAN-36 (identidad `sub`).
- **Frontend (prerrequisito operativo):** el token debe viajar en `Authorization: Bearer` (interceptor Axios; ver §Frontend en [`IMPLEMENTATION.md`](IMPLEMENTATION.md)). Ese cambio de frontend va en **rama de frontend aparte**.

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Filtrar solo en algunos métodos | Fuga/edición cruzada | Aplicar `user_id` en TODOS los métodos |
| Confiar en `userId` del cliente | Suplantación | Usar solo `sub` (KAN-36) |
| Devolver 404 vs 403 inconsistente | Fuga de existencia | Definir política: 404 para recursos ajenos |

## Archivos afectados
- `backend/.../repository/TodoRepository.java` (consultas por `user_id`).
- `backend/.../service/TodoService.java` (recibir `userId`).
- `backend/.../controller/TodoController.java` (pasar `userId` del `sub`).
- (Frontend, rama aparte) `frontend/src/api/todoApi.js` (interceptor Bearer).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
Un usuario A nunca ve, edita, alterna ni elimina tareas del usuario B.

## Criterios de aceptación (Given/When/Then)
1. **Dado** un POST, **cuando** creo una tarea, **entonces** se guarda con `user_id = sub` del token (no del body).
2. **Dado** un GET, **cuando** listo tareas, **entonces** solo aparecen las del usuario autenticado.
3. **Dado** un PUT/PATCH/DELETE sobre una tarea de **otro** usuario, **cuando** llamo, **entonces** recibo 404 (o 403) y **no** se modifica.
4. **Dado** un PUT/PATCH/DELETE sobre una tarea **propia**, **cuando** llamo, **entonces** la operación tiene éxito.
5. **Dado** cualquier método, **cuando** se ejecuta, **entonces** la identidad proviene del `sub`, nunca del cuerpo/consulta.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama (backend):** `KAN-37-aislar-tareas-por-usuario`
- **Commit:** `KAN-37 feat(security): asociar y filtrar tareas por usuario autenticado`
- **Título PR:** `KAN-37 Asociar y filtrar tareas por usuario`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
