# Métricas del proyecto — TaskFlow Scrum

> **Regla de oro:** este directorio contiene **plantillas**. No se inventan valores. Cada celda marcada
> `[completar]` debe llenarse con datos **reales** obtenidos de Jira (tablero KAN de `malconyfigue.atlassian.net`)
> o de la ejecución verificada. Mientras no haya dato real, se mantiene `[completar]` o `PENDIENTE DE VERIFICACIÓN
> EN JIRA`.

## Contenido
| Archivo | Métrica | Fuente del dato |
|---|---|---|
| [`velocity.md`](velocity.md) | Velocidad por sprint (story points completados) | Jira: SP de issues `Done` por sprint |
| [`burndown.md`](burndown.md) | Burndown del sprint (trabajo restante por día) | Jira: Sprint Report / Burndown |
| [`cfd.md`](cfd.md) | Cumulative Flow Diagram (issues por estado en el tiempo) | Jira: Control Chart / conteo diario por columna |
| [`cycle-time.md`](cycle-time.md) | Cycle time / lead time por issue | Jira: fechas de transición de estado |
| [`sprint-summary.md`](sprint-summary.md) | Resumen ejecutivo del sprint (compromiso vs. entregado) | Consolida las anteriores |

## Cómo obtener los datos en Jira
1. **Velocidad:** Backlog → *Reports* → *Velocity Report* (compromiso vs. completado por sprint).
2. **Burndown:** *Reports* → *Burndown Chart* del sprint activo.
3. **CFD:** *Reports* → *Cumulative Flow Diagram*.
4. **Cycle/Lead time:** *Reports* → *Control Chart*, o exportar issues con sus fechas de transición.
5. Exporta a CSV si necesitas cálculos propios (Backlog → *...* → *Export issues*).

## Estado actual
- **Sprints ejecutados:** `PENDIENTE DE VERIFICACIÓN EN JIRA`.
- **Datos capturados:** ninguno aún; las plantillas están vacías a propósito.
- Cuando registres un sprint real, llena la fila correspondiente y adjunta la captura del reporte de Jira como evidencia.

## Convención de evidencias
Guarda las capturas de los reportes de Jira en `docs/metrics/evidence/` con nombre `metrica-sprint-N.png`
(p. ej. `velocity-sprint-1.png`). No incluyas datos sensibles ni tokens.
