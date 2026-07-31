# KAN-15 — Evidencias requeridas

| # | Evidencia | Cómo obtenerla | Archivo sugerido |
|---|---|---|---|
| E1 | Log de arranque del backend | Captura de la terminal con `Started TodoApplication` | `evidence/kan-15-arranque.png` |
| E2 | `.env` ignorado por Git | Captura de `git status --short` tras crear `backend/.env` | `evidence/kan-15-gitignore.png` |
| E3 | Conexión a BD efectiva | Salida de `curl -i http://localhost:8080/api/todos` (HTTP 200) | `evidence/kan-15-curl.png` |
| E4 | Diff revisado | Captura de `git diff --cached` antes del commit | `evidence/kan-15-diff.png` |
| E5 | Pull Request | Enlace al PR con título `KAN-15 ...` | (enlace en Jira) |

> Guarda las capturas en `docs/task-packets/KAN-15/evidence/`. No incluyas contraseñas reales en las capturas.
