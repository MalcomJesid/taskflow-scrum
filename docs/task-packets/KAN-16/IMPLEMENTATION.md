# KAN-16 — Implementación (decisión y contrato)

## Opción A — RECOMENDADA: registro con Supabase Auth desde el frontend
No hay código de backend. El contrato que KAN-30 implementará:

```js
// Contrato de registro (lo implementa KAN-30 con el cliente de KAN-29)
const { data, error } = await supabase.auth.signUp({
  email,      // correo válido
  password,   // cumple reglas mínimas (p.ej. >= 8 caracteres)
})
// error?.message === 'User already registered'  → correo ya registrado
// Si la confirmación por email está activa: el usuario recibe un correo antes de poder iniciar sesión.
```

Reglas del contrato (obligatorias para KAN-30):
- Correo con formato válido.
- Contraseña con reglas claras (mínimo 8; recomendable mayúscula + número).
- Confirmación de contraseña en el formulario (dos campos coinciden).
- Manejo de "correo ya registrado" con mensaje claro.
- Estado de carga + prevención de envíos repetidos (deshabilitar botón mientras envía).
- Redirección coherente tras registro (a login o a confirmación de correo).

## Opción B — SOLO si el profesor exige endpoint `/register` en el backend (fachada)
Se documenta, **no** se implementa por defecto. Riesgos y forma segura:

- El backend expone `POST /api/auth/register` y **reenvía** a la API REST de Supabase
  (`POST {SUPABASE_URL}/auth/v1/signup`) usando la **`anon key`** (no la `service_role`).
- **Ventaja:** cumple el requisito literal de "endpoint backend".
- **Riesgos:** el backend se vuelve intermediario de credenciales; hay que asegurar TLS, no loguear
  contraseñas, rate-limiting y manejo de errores uniforme.
- **Nunca** poner `service_role_key` en el backend salvo necesidad justificada y bien protegida; para
  signup basta la `anon key`.

```java
// Boceto de fachada (Opción B) — NO se implementa salvo exigencia explícita
// POST /api/auth/register  -> WebClient/RestClient a  {SUPABASE_URL}/auth/v1/signup
// headers: apikey: {SUPABASE_ANON_KEY}
// body: { "email": ..., "password": ... }
```

## Recomendación
Usar **Opción A**. Mantiene un único emisor (Supabase) y es lo esperado por KAN-29/34.
