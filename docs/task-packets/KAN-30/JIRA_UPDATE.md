# KAN-30 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Crear la pantalla de registro con `supabase.auth.signUp`, validaciones, manejo de "correo ya registrado",
estado de carga y aviso de confirmación por correo.

### Historia de usuario
Como persona nueva,
quiero una pantalla de registro clara con validaciones,
para crear mi cuenta sin errores ni confusión.

### Alcance
- Incluye: `Register.jsx`, validaciones de correo/contraseña/confirmación, manejo de errores, anti doble envío.
- No incluye: cliente Supabase (KAN-29), login (KAN-31), sesión (KAN-32), enrutado (KAN-33).

### Criterios de aceptación
1. Registro válido llama a `signUp` y muestra éxito/aviso de confirmación.
2. Correo inválido → error, sin llamada.
3. Contraseñas distintas → error, sin envío.
4. Correo ya registrado → mensaje claro.
5. Anti doble envío (botón deshabilitado en carga).

### Implementación técnica
- Archivos creados: `src/pages/Register.jsx`.
- Archivos modificados (opcional): `src/styles/index.css`.
- Decisión: validación en cliente + mensajes uniformes que no exponen detalles internos.

### Pruebas realizadas
- T1 registro válido → **[completar]**
- T2 correo inválido → **[completar]**
- T3 contraseñas distintas → **[completar]**
- T4 correo ya registrado → **[completar]**
- T5 anti doble envío → **[completar]**
- `npm run build` → **[completar]**
- Evidencia: **[capturas]**

### Evidencias
- Captura de cada caso (éxito, inválido, distintas, ya registrado, carga).
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: mensajes crudos de Supabase. Mitigación: mensajes amigables. Responsable: Frontend.
- Bloqueo: requiere KAN-29 y proyecto Supabase.

### Trazabilidad
- Rama: `KAN-30-pantalla-registro`
- Commit: `KAN-30 feat(auth): crear formulario de registro`
- Pull request: **[enlace]**
- Dependencias Jira: requiere KAN-29; relacionada con KAN-16.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Build exitoso.
- [ ] Evidencia adjunta.
- [ ] Sin secretos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
