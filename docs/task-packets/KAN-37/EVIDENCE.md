# KAN-37 — Evidencias requeridas

| # | Evidencia | Cómo obtenerla | Archivo sugerido |
|---|---|---|---|
| E1 | Aislamiento en GET | `curl` con token A y con token B mostrando listas distintas | `evidence/kan-37-get-aislado.txt` |
| E2 | 404 sobre ajena | `curl` PUT/DELETE de B sobre tarea de A | `evidence/kan-37-404-ajena.txt` |
| E3 | user_id = sub | Registro/consulta mostrando `user_id` correcto | `evidence/kan-37-userid.txt` |
| E4 | Header Bearer (frontend) | Captura de Network con `Authorization: Bearer` | `evidence/kan-37-bearer.png` |
| E5 | Pull Requests | Enlaces a los PR backend y frontend | (enlaces en Jira) |

> Guardar en `docs/task-packets/KAN-37/evidence/`. **Redacta los tokens** en toda captura/log.
