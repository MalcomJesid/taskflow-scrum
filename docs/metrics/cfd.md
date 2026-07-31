# Cumulative Flow Diagram (CFD)

> Nº de issues en cada estado del tablero a lo largo del tiempo. Permite ver cuellos de botella (bandas que se
> ensanchan). Fuente: Jira *Cumulative Flow Diagram*. **No inventar valores.**

## Estados del tablero KAN
`[completar]` — enumerar las columnas reales del tablero (p. ej. To Do / In Progress / In Review / Done).

## Conteo diario por estado
| Fecha | To Do | In Progress | In Review | Done | WIP total |
|---|---|---|---|---|---|
| `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` |
| `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` |
| `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` |

> WIP total = suma de estados intermedios (todo lo que no es To Do ni Done).

## Señales a vigilar (a redactar con datos reales)
- **Banda "In Progress" o "In Review" que crece:** cuello de botella; revisa capacidad o política de WIP.
- **"Done" plano varios días:** nada se está cerrando; posible bloqueo.
- **Distancia vertical entre curvas:** aproxima el WIP; cuanto mayor, más multitarea.

> **Evidencia:** `evidence/cfd-sprint-N.png`.
> **Estado:** `PENDIENTE DE VERIFICACIÓN EN JIRA`.
