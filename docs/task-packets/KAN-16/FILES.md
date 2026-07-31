# KAN-16 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| (ninguno de código) | — | La decisión es "sin endpoint backend". El código de registro vive en KAN-29/30. |
| `docs/task-packets/KAN-16/*` | **Nuevo** | Decisión de arquitectura + contrato de registro. |

## No incluye
- Endpoint `/register` en Spring Boot (descartado para no duplicar emisor JWT).
- UI de registro → **KAN-30**.
- Cliente Supabase → **KAN-29**.

> Si se activara la Opción B (fachada), los archivos afectados serían un `AuthFacadeController` y un cliente
> HTTP; se detallaría en un paquete de implementación aparte.
