# KAN-31 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Crear la pantalla de login con `supabase.auth.signInWithPassword`, manejo de credenciales inválidas (mensaje
genérico), estado de carga y sin registro de tokens en logs.

### Historia de usuario
Como usuario registrado,
quiero iniciar sesión con mi correo y contraseña,
para acceder a mis tareas de forma segura.

### Alcance
- Incluye: `Login.jsx`, validación de correo, manejo de error genérico, anti doble envío.
- No incluye: cliente Supabase (KAN-29), registro (KAN-30), sesión/redirección (KAN-32), rutas privadas (KAN-33).

### Criterios de aceptación
1. Login válido llama a `signInWithPassword` y obtiene sesión.
2. Credenciales incorrectas → "Credenciales inválidas." (genérico).
3. Correo inválido → error, sin llamada.
4. Anti doble envío.
5. Token gestionado por Supabase, nunca en logs.

### Implementación técnica
- Archivos creados: `src/pages/Login.jsx`.
- Archivos modificados (opcional): `src/styles/index.css`.
- Decisión: mensaje de error genérico para evitar enumeración de cuentas.

### Pruebas realizadas
- T1 login válido → **[completar]**
- T2 credenciales incorrectas → **[completar]**
- T3 correo inválido → **[completar]**
- T4 anti doble envío → **[completar]**
- T5 sin token en logs → **[completar]**
- `npm run build` → **[completar]**
- Evidencia: **[capturas]**

### Evidencias
- Captura de login exitoso y de error genérico.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: enumeración de cuentas. Mitigación: mensaje genérico. Responsable: Frontend.
- Bloqueo: requiere KAN-29 y proyecto Supabase.

### Trazabilidad
- Rama: `KAN-31-pantalla-login`
- Commit: `KAN-31 feat(auth): crear formulario de login`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-29; relacionada con KAN-17.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Build exitoso.
- [ ] Evidencia adjunta.
- [ ] Sin secretos ni tokens en logs.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
