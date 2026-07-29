# KAN-18 — Pruebas

> Modelo/arquitectura: verificación por revisión. Las pruebas técnicas viven en KAN-34/35/36.

### T1 — Un solo emisor
- **Verificación:** el modelo establece que solo Supabase emite JWT; el backend no emite.
- **Resultado:** _______

### T2 — Validaciones completas definidas
- **Verificación:** el modelo exige validar firma (JWKS), issuer, expiración y claim `sub`.
- **Resultado:** _______

### T3 — Identidad desde el token
- **Verificación:** el modelo prohíbe usar `userId` del body; obliga a `jwt.getSubject()`.
- **Resultado:** _______

> Pruebas funcionales (401 sin token, token inválido/expirado, acceso con token válido): **KAN-34/35**.
