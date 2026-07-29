# KAN-31 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Login válido
- **Pasos:** credenciales correctas → Entrar.
- **Esperado:** `signInWithPassword` devuelve sesión, sin error.
- **Resultado:** _______  · **Evidencia:** captura.

### T2 — Credenciales incorrectas
- **Pasos:** contraseña incorrecta → Entrar.
- **Esperado:** "Credenciales inválidas." (genérico).
- **Resultado:** _______

### T3 — Correo inválido
- **Pasos:** correo `abc` → Entrar.
- **Esperado:** "Introduce un correo válido."; sin llamada a Supabase.
- **Resultado:** _______

### T4 — Anti doble envío
- **Pasos:** enviar y observar botón.
- **Esperado:** botón deshabilitado ("Entrando...").
- **Resultado:** _______

### T5 — Sin token en logs
- **Pasos:** revisar consola tras login.
- **Esperado:** no aparece `access_token` ni sesión en consola.
- **Resultado:** _______

### T6 — Build
- **Comando:** `npm run build`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere KAN-29 + proyecto Supabase.
