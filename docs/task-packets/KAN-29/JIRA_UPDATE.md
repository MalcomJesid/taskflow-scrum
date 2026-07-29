# KAN-29 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Instalar `@supabase/supabase-js` y crear un cliente único configurado por variables de entorno, base de la
autenticación del frontend, sin exponer secretos.

### Historia de usuario
Como desarrollador frontend,
quiero un cliente Supabase configurado de forma segura,
para implementar registro, login y sesión sin exponer secretos.

### Alcance
- Incluye: instalación del SDK, `supabaseClient.js`, `frontend/.env.example`, verificación de `.gitignore`.
- No incluye: pantallas (KAN-30/31), sesión global (KAN-32), rutas protegidas (KAN-33).

### Criterios de aceptación
1. `@supabase/supabase-js` instalado y en `package.json`.
2. Cliente creado con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (nunca `service_role`).
3. `.env` no se versiona; `.env.example` sí.
4. `npm run build` compila sin errores.

### Implementación técnica
- Archivos creados: `src/lib/supabaseClient.js`, `frontend/.env.example`.
- Archivos modificados: `package.json`, `package-lock.json`.
- Decisión: `persistSession` + `autoRefreshToken` activados para recuperar/renovar sesión.

### Pruebas realizadas
- `npm ls @supabase/supabase-js` → **[completar]**
- `npm run build` → **[completar]**
- `git status` con `.env` creado → **[completar]**
- `grep -ri service_role frontend/src` → **[completar]**
- Evidencia: **[adjuntar capturas]**

### Evidencias
- Captura de instalación del SDK.
- Captura de `npm run build` exitoso.
- Captura de `.env` ignorado.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: exponer `service_role`. Mitigación: solo `anon key`. Responsable: Frontend.
- Bloqueo: proyecto Supabase inexistente (falta URL + anon key).

### Trazabilidad
- Rama: `KAN-29-configurar-supabase-sdk`
- Commit: `KAN-29 feat(auth): configurar cliente de Supabase`
- Pull request: **[enlace]**
- Dependencias Jira: habilita KAN-30, KAN-31, KAN-32, KAN-33.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Build exitoso.
- [ ] Evidencia adjunta.
- [ ] Sin secretos (verificado `service_role` ausente).
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
