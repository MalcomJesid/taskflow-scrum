# KAN-29 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Dependencia instalada
- **Comando:** `cd frontend && npm ls @supabase/supabase-js`
- **Esperado:** muestra la versión instalada sin errores.
- **Resultado:** _______  · **Evidencia:** captura.

### T2 — El cliente importa sin fallar (con `.env` configurado)
- **Comando:** `npm run dev` y abrir la app; la consola no muestra el error de "Faltan variables".
- **Esperado:** app carga; `supabase` disponible.
- **Resultado:** _______

### T3 — `.env` no se versiona
- **Comando:**
  ```bash
  cp frontend/.env.example frontend/.env
  git status --short
  ```
- **Esperado:** `frontend/.env` no aparece como archivo nuevo (ignorado).
- **Resultado:** _______  · **Evidencia:** captura de `git status`.

### T4 — Build de producción
- **Comando:** `npm run build`
- **Esperado:** `built in ...` sin errores.
- **Resultado:** _______  · **Evidencia:** captura.

### T5 — Sin `service_role` en el código
- **Comando:** `grep -ri "service_role" frontend/src` 
- **Esperado:** sin coincidencias.
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — proyecto Supabase inexistente y `node_modules` no instalado.
