# KAN-17 — Pruebas

### T1 — Revisión de arquitectura
- **Verificación:** no existe endpoint `/login` propio que emita JWT.
- **Resultado:** _______

### T2 — Contrato cubre casos requeridos
- **Verificación:** correo, contraseña, carga, credenciales inválidas, sesión persistente, redirección.
- **Resultado:** _______

### T3 — Envío del token al backend
- **Verificación:** el contrato define `Authorization: Bearer <token>` hacia `/api/**`.
- **Resultado:** _______

> Funcional real (login válido/ inválido/ persistencia): se ejecuta en **KAN-31/32**.
