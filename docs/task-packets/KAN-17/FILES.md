# KAN-17 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| (ninguno de código) | — | Decisión "sin endpoint backend". Código de login en KAN-31/32. |
| `docs/task-packets/KAN-17/*` | **Nuevo** | Decisión + contrato de login. |

## No incluye
- Endpoint `/login` en Spring Boot (descartado).
- UI de login → **KAN-31**. Sesión → **KAN-32**. Cliente Supabase → **KAN-29**.
