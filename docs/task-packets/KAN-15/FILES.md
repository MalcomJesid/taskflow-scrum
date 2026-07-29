# KAN-15 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `backend/src/main/resources/application.properties` | **Modificado** | Externalizar credenciales a `${VAR:default}`; sin secretos embebidos. |
| `backend/.env.example` | **Nuevo** | Plantilla de variables para que cada compañero cree su `.env` local. |
| `.gitignore` | **Modificado** | Asegurar que `.env` y `backend/target/` queden ignorados. |

## No incluye
- Limpieza de `backend/target/` ya versionado (`git rm --cached`) → tarea de higiene aparte.
- Migraciones SQL (se documentan en KAN-14).
- Cambios de código Java (esta tarea es solo configuración).

## Verificación de "sin secretos"
Tras los cambios, ejecutar:
```bash
git status --short
git diff
```
Confirmar que **no** aparece ningún `.env` real ni contraseñas nuevas en el diff.
