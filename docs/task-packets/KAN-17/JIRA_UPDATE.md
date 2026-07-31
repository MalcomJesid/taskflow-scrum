# KAN-17 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Definir el inicio de sesión con un único emisor (Supabase Auth), documentando que no se crea un endpoint
`/login` propio y dejando el contrato para la pantalla de login (KAN-31).

### Historia de usuario
Como usuario registrado,
quiero iniciar sesión con mi correo y contraseña,
para acceder a mis tareas de forma segura.

### Alcance
- Incluye: decisión (login vía `signInWithPassword`) y contrato para KAN-31; definición del envío del token al backend.
- No incluye: endpoint backend `/login`; UI (KAN-31); sesión global (KAN-32).

### Criterios de aceptación
1. El login usa `signInWithPassword`; no existe `/login` propio que emita JWT.
2. El contrato cubre correo, contraseña, carga, credenciales inválidas, persistencia y redirección.
3. El frontend envía `Authorization: Bearer <token>` al backend.

### Implementación técnica
- Archivos: solo documentación en `docs/task-packets/KAN-17/`.
- Decisión: Opción A (Supabase). Opción B (fachada) documentada.

### Pruebas realizadas
- Revisión de arquitectura → **[completar]**
- Revisión del contrato → **[completar]**
- Funcional real: se valida en KAN-31/32.

### Evidencias
- Enlace al PR. Referencia cruzada a KAN-31 y KAN-34.

### Riesgos o bloqueos
- Riesgo: token en logs. Mitigación: no loguear tokens. Responsable: Backend/Frontend.

### Trazabilidad
- Rama: `KAN-17-decision-login-supabase`
- Commit: `KAN-17 docs(auth): documentar decision de login via Supabase (sin endpoint propio)`
- Pull request: **[enlace]**
- Dependencias Jira: relacionada con KAN-29, KAN-31, KAN-32, KAN-34.

### Definition of Done
- [ ] Decisión documentada y aprobada por el PO.
- [ ] Contrato validado por Frontend (KAN-31).
- [ ] Sin secretos.
- [ ] Pull request revisado.
