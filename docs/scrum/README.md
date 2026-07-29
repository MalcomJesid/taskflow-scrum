# Rituales Scrum — TaskFlow Scrum (SBOK 5.ª ed.)

> Plantillas para los eventos del equipo. **No inventar asistentes, fechas ni compromisos**: se llenan en cada
> ceremonia real. Equipo: Product Owner, Scrum Master y dos desarrolladores (Frontend y Backend).

## Contenido
| Carpeta / archivo | Ritual | Cadencia |
|---|---|---|
| [`daily/PLANTILLA_DAILY.md`](daily/PLANTILLA_DAILY.md) | Daily Standup | Diaria |
| [`retrospectives/PLANTILLA_RETROSPECTIVA.md`](retrospectives/PLANTILLA_RETROSPECTIVA.md) | Retrospectiva | Fin de sprint |
| [`sprint-planning/PLANTILLA_SPRINT_PLANNING.md`](sprint-planning/PLANTILLA_SPRINT_PLANNING.md) | Sprint Planning | Inicio de sprint |
| [`sprint-review/PLANTILLA_SPRINT_REVIEW.md`](sprint-review/PLANTILLA_SPRINT_REVIEW.md) | Sprint Review | Fin de sprint |

## Cómo usar
1. Copia la plantilla correspondiente.
2. Renómbrala con la fecha: `daily/2026-07-28.md`, `retrospectives/sprint-1.md`, etc.
3. Rellena solo con lo ocurrido realmente. Enlaza issues como `KAN-XX`.
4. Los acuerdos accionables se convierten en issues de Jira (no quedan solo en el acta).

## Vínculo con métricas
Los datos discutidos (velocidad, bloqueos, cycle time) deben ser consistentes con [`../metrics/`](../metrics/).
La retrospectiva es el lugar para registrar deuda técnica detectada en la auditoría (JDK 17→21, `target/` versionado,
credenciales en texto plano → resuelto en KAN-15).
