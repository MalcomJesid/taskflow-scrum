# KAN-30 — Pruebas

> Marca resultado real. Si no puedes ejecutar, escribe **NO VERIFICADO** + causa.

### T1 — Registro válido
- **Pasos:** correo válido + contraseñas coincidentes (≥8) → Registrarme.
- **Esperado:** mensaje de éxito o aviso "revisa tu correo".
- **Resultado:** _______  · **Evidencia:** captura.

### T2 — Correo inválido
- **Pasos:** correo `abc` → Registrarme.
- **Esperado:** "Introduce un correo válido."; no se llama a `signUp`.
- **Resultado:** _______

### T3 — Contraseñas distintas
- **Pasos:** contraseñas diferentes → Registrarme.
- **Esperado:** "Las contraseñas no coinciden."; no se envía.
- **Resultado:** _______

### T4 — Correo ya registrado
- **Pasos:** usar un correo ya dado de alta.
- **Esperado:** "El correo ya está registrado."
- **Resultado:** _______

### T5 — Anti doble envío
- **Pasos:** enviar y observar el botón.
- **Esperado:** botón deshabilitado mostrando "Creando...".
- **Resultado:** _______

### T6 — Build
- **Comando:** `npm run build`
- **Esperado:** sin errores.
- **Resultado:** _______

> Estado en máquina de auditoría: **NO VERIFICADO** — requiere KAN-29 + proyecto Supabase.
