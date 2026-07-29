# KAN-16 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Definir el mecanismo de registro del proyecto con un único emisor de identidad (Supabase Auth), documentando
la decisión de **no** crear un endpoint `/register` propio y dejando el contrato para la pantalla de registro (KAN-30).

### Historia de usuario
Como persona nueva,
quiero crear una cuenta con correo y contraseña,
para acceder a la aplicación y gestionar mis propias tareas.

### Alcance
- Incluye: decisión de arquitectura (registro vía `supabase.auth.signUp`) y contrato para KAN-30.
- No incluye: endpoint backend `/register` (descartado para no duplicar emisor JWT); UI (KAN-30); cliente Supabase (KAN-29).
- Nota: si el profesor exige endpoint backend, se documenta fachada (Opción B) con sus riesgos.

### Criterios de aceptación
1. El registro usa `supabase.auth.signUp`; no existe endpoint `/register` propio que emita JWT.
2. El contrato cubre correo válido, reglas de contraseña, confirmación, "correo ya registrado", carga y anti-doble-envío.
3. El frontend usa solo `anon key`.

### Implementación técnica
- Archivos: solo documentación en `docs/task-packets/KAN-16/`.
- Decisión: Opción A (Supabase). Opción B (fachada) documentada como alternativa.

### Pruebas realizadas
- Revisión de arquitectura (sin endpoint propio) → **[completar]**
- Revisión del contrato → **[completar]**
- Funcional real: se valida en KAN-30.

### Evidencias
- Enlace al PR con la decisión documentada.
- Referencia cruzada a KAN-29 y KAN-30.

### Riesgos o bloqueos
- Riesgo: exigencia de endpoint backend. Mitigación: fachada documentada. Responsable: Backend + PO.
- Riesgo: confirmación por correo activa. Mitigación: documentar flujo.

### Trazabilidad
- Rama: `KAN-16-decision-registro-supabase`
- Commit: `KAN-16 docs(auth): documentar decision de registro via Supabase (sin endpoint propio)`
- Pull request: **[enlace]**
- Dependencias Jira: relacionada con KAN-29, KAN-30.

### Definition of Done
- [ ] Decisión documentada y aprobada por el PO.
- [ ] Contrato validado por Frontend (KAN-30).
- [ ] Sin secretos.
- [ ] Pull request revisado.
