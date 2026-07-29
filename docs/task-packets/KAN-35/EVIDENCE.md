# KAN-35 — Evidencias requeridas

| # | Evidencia | Cómo obtenerla | Archivo sugerido |
|---|---|---|---|
| E1 | 401 por método | Salidas `curl -i` de GET/POST/PUT/PATCH/DELETE sin token | `evidence/kan-35-401.txt` |
| E2 | 200 con token | Salida `curl -i` con token (redactado) | `evidence/kan-35-200.txt` |
| E3 | Preflight OPTIONS | Salida `curl -i -X OPTIONS` | `evidence/kan-35-options.txt` |
| E4 | Cuerpo de error | Captura del JSON mínimo de error | `evidence/kan-35-error.png` |
| E5 | Pull Request | Enlace al PR `KAN-35 ...` | (enlace en Jira) |

> Guardar en `docs/task-packets/KAN-35/evidence/`. **Redacta los tokens**.
