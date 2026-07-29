# KAN-32 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Sesión persistida al arrancar
- **Pasos:** iniciar sesión, recargar la página.
- **Esperado:** tras `loading=false`, `useAuth().user` no es nulo.
- **Resultado:** _______

### T2 — Actualización tras login
- **Pasos:** hacer login estando deslogueado.
- **Esperado:** `user`/`token` se actualizan sin recargar.
- **Resultado:** _______

### T3 — signOut
- **Pasos:** ejecutar `signOut()`.
- **Esperado:** `user`/`session`/`token` = null.
- **Resultado:** _______

### T4 — Limpieza del listener
- **Pasos:** montar/desmontar el provider (o navegar); revisar que no hay dobles eventos ni warnings.
- **Esperado:** sin fugas ni warnings de React.
- **Resultado:** _______

### T5 — loading inicial
- **Pasos:** observar `loading` al arranque.
- **Esperado:** `true` y luego `false` al resolver sesión.
- **Resultado:** _______

### T6 — Build
- **Comando:** `npm run build`
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere KAN-29 + proyecto Supabase.
