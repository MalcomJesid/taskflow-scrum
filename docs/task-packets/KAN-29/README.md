# KAN-29 — Instalar y configurar Supabase SDK

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-29 |
| **Nombre** | Instalar y configurar Supabase SDK |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Frontend |
| **Dependencias** | Ninguna previa de código. **Bloqueada** por: datos del proyecto Supabase (URL + anon key). Habilita KAN-30/31/32/33. |

## Objetivo
Instalar `@supabase/supabase-js` en el frontend y crear un cliente único configurado por variables de
entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), base para registro, login, sesión y rutas privadas.

## Historia de usuario
> **Como** desarrollador frontend,
> **quiero** un cliente Supabase configurado de forma segura,
> **para** implementar registro, login y sesión sin exponer secretos.

## Valor de negocio
Habilita toda la autenticación del frontend con un único punto de configuración y sin claves en el código.

## Dependencias
- **Bloqueada por:** existencia de un proyecto Supabase (URL + `anon key`). Hoy **no existe** → placeholders.
- **Habilita:** KAN-30, KAN-31, KAN-32, KAN-33.

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Poner `service_role_key` en el frontend | Fuga total de la BD | Usar **solo** `anon key` |
| Hardcodear claves en el código | Fuga en Git | Variables `VITE_*` + `.env` ignorado |
| Variables sin prefijo `VITE_` | Vite no las expone | Usar prefijo `VITE_` obligatorio |

## Archivos afectados
- `frontend/package.json` (modificado — dependencia `@supabase/supabase-js`).
- `frontend/src/lib/supabaseClient.js` (nuevo).
- `frontend/.env.example` (nuevo). `.gitignore` (verificar `.env`).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
`import { supabase } from './lib/supabaseClient'` funciona y el build de Vite pasa.

## Criterios de aceptación (Given/When/Then)
1. **Dado** `npm install`, **cuando** finaliza, **entonces** `@supabase/supabase-js` aparece en `package.json` y `node_modules`.
2. **Dado** el cliente, **cuando** se importa `supabase`, **entonces** se crea con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (nunca `service_role`).
3. **Dado** el repositorio, **cuando** se ejecuta `git status`, **entonces** `.env` no se versiona y `.env.example` sí.
4. **Dado** `npm run build`, **cuando** finaliza, **entonces** compila sin errores.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-29-configurar-supabase-sdk`
- **Commit:** `KAN-29 feat(auth): configurar cliente de Supabase`
- **Título PR:** `KAN-29 Instalar y configurar Supabase SDK`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
