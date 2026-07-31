# KAN-16 — Pruebas

> Al ser decisión/contrato, la verificación es de revisión + se valida efectivamente en KAN-30.

### T1 — Revisión de arquitectura
- **Verificación:** no existe endpoint `/register` propio que emita JWT en el backend.
- **Esperado:** confirmado por inspección de `TodoController` y ausencia de `AuthController`.
- **Resultado:** _______

### T2 — Contrato cubre casos requeridos
- **Verificación:** el contrato incluye correo válido, reglas de contraseña, confirmación, "correo ya registrado", carga y anti-doble-envío.
- **Esperado:** checklist completo.
- **Resultado:** _______

### T3 — Seguridad de claves
- **Verificación:** el frontend solo usará `anon key`; no aparece `service_role_key`.
- **Esperado:** confirmado.
- **Resultado:** _______

> Pruebas funcionales del registro real: se ejecutan en **KAN-30** (registro válido/ inválido/ contraseñas distintas).
