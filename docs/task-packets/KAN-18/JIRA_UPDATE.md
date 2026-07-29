# KAN-18 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Definir el modelo de autenticación JWT del proyecto: Supabase emite el token, Spring Boot lo valida como
Resource Server. Tarea paraguas que guía KAN-34/35/36.

### Historia de usuario
Como responsable de seguridad,
quiero un modelo JWT único (Supabase emite, Spring valida),
para proteger la API sin duplicar sistemas de autenticación.

### Alcance
- Incluye: flujo JWT extremo a extremo, requisitos de validación (firma/JWKS, issuer, exp, `sub`), reparto por tarea.
- No incluye: código (se implementa en KAN-34/35/36).

### Criterios de aceptación
1. El modelo define un único emisor (Supabase) y validación en Spring.
2. Enumera validaciones: firma (JWKS), issuer, expiración, claim `sub`.
3. Exige tomar la identidad del `sub`, nunca del body.

### Implementación técnica
- Archivos: solo documentación en `docs/task-packets/KAN-18/`.
- Materializado por: KAN-34 (validación), KAN-35 (protección), KAN-36 (sub).
- Decisión: soporte nativo de Spring Security OAuth2 Resource Server (sin librerías JWT alternativas).

### Pruebas realizadas
- Revisión del modelo (un solo emisor, validaciones, uso de `sub`) → **[completar]**
- Funcional real: KAN-34/35.

### Evidencias
- Enlace al PR con el modelo. Diagrama del flujo JWT.

### Riesgos o bloqueos
- Riesgo: dos emisores. Mitigación: modelo único. Responsable: Backend/Seguridad.
- Bloqueo: faltan issuer/JWKS de Supabase (proyecto no creado).

### Trazabilidad
- Rama: `KAN-18-modelo-jwt-supabase`
- Commit: `KAN-18 docs(security): definir modelo JWT (Supabase emite, Spring valida)`
- Pull request: **[enlace]**
- Dependencias Jira: materializada por KAN-34, KAN-35, KAN-36.

### Definition of Done
- [ ] Modelo documentado y aprobado por el PO.
- [ ] Coherente con KAN-34/35/36.
- [ ] Sin secretos.
- [ ] Pull request revisado.
