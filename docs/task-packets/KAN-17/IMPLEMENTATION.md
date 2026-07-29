# KAN-17 — Implementación (decisión y contrato)

## Opción A — RECOMENDADA: login con Supabase Auth desde el frontend
```js
// Contrato de login (lo implementa KAN-31 con el cliente de KAN-29)
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
// error → credenciales inválidas (mensaje uniforme, sin detalles internos)
// data.session.access_token → JWT que se enviará al backend como Bearer
```

Reglas del contrato (obligatorias para KAN-31):
- Campos correo y contraseña.
- Estado de carga (botón deshabilitado mientras envía).
- Manejo de credenciales incorrectas con mensaje genérico.
- Sesión persistente y recuperación al recargar (Supabase persiste en `localStorage` por defecto; KAN-32).
- Redirección a pantalla privada tras login.
- No mostrar datos privados antes de resolver la sesión.

## El token y el backend
- Tras login, el frontend adjunta `Authorization: Bearer <access_token>` en las llamadas a `/api/**`.
- El backend valida ese token como Resource Server (KAN-34). **No** lo emite ni lo renueva.
- La renovación (refresh) la gestiona `@supabase/supabase-js` automáticamente.

## Opción B — SOLO si se exige `/login` en backend (fachada)
- `POST /api/auth/login` → reenvía a `{SUPABASE_URL}/auth/v1/token?grant_type=password` con `apikey: anon`.
- Riesgos: el backend maneja credenciales; asegurar TLS, no loguear password/token, rate-limiting.
- No usar `service_role_key`.

## Recomendación
Opción A. Un solo emisor (Supabase), coherente con KAN-34.
