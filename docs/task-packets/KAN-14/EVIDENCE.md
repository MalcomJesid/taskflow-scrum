# KAN-14 — Evidencias requeridas

| # | Evidencia | Cómo obtenerla | Archivo sugerido |
|---|---|---|---|
| E1 | Columna `user_id` creada | Captura de la consulta a `information_schema.columns` | `evidence/kan-14-columna.png` |
| E2 | `schema.sql` ejecutado | Salida de `psql -f schema.sql` sin errores | `evidence/kan-14-schema.png` |
| E3 | Compilación OK | Captura de `BUILD SUCCESS` | `evidence/kan-14-build.png` |
| E4 | Diff revisado | `git diff --cached` antes del commit | `evidence/kan-14-diff.png` |
| E5 | Pull Request | Enlace al PR `KAN-14 ...` | (enlace en Jira) |

> Guardar en `docs/task-packets/KAN-14/evidence/`.
