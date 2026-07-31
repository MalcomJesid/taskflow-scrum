# KAN-29 — Evidencias requeridas

| # | Evidencia | Cómo obtenerla | Archivo sugerido |
|---|---|---|---|
| E1 | SDK instalado | Captura de `npm ls @supabase/supabase-js` | `evidence/kan-29-npm.png` |
| E2 | Build exitoso | Captura de `npm run build` | `evidence/kan-29-build.png` |
| E3 | `.env` ignorado | Captura de `git status --short` con `.env` creado | `evidence/kan-29-env.png` |
| E4 | Sin `service_role` | Salida de `grep -ri service_role frontend/src` (vacía) | `evidence/kan-29-grep.png` |
| E5 | Pull Request | Enlace al PR `KAN-29 ...` | (enlace en Jira) |

> Guardar en `docs/task-packets/KAN-29/evidence/`. No incluir la `anon key` real en capturas.
