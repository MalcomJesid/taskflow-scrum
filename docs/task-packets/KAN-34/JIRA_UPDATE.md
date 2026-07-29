# KAN-34 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Configurar Spring Boot como OAuth2 Resource Server para validar los JWT emitidos por Supabase (firma vía JWKS,
issuer, expiración), con un `SecurityFilterChain` base. El backend no emite tokens.

### Historia de usuario
Como backend,
quiero validar los tokens que emite Supabase,
para aceptar únicamente peticiones autenticadas y confiables.

### Alcance
- Incluye: dependencias security + oauth2 resource server, `issuer-uri`/`jwk-set-uri`, `SecurityConfig`, CORS integrado.
- No incluye: detalle de endpoints protegidos (KAN-35), extracción del `sub` (KAN-36), filtro por usuario (KAN-37).

### Criterios de aceptación
1. Dependencias presentes en `pom.xml`.
2. JWT válido de Supabase pasa validación.
3. Token inválido/ausente → 401 sin detalles internos.
4. CORS no bloquea al frontend.
5. La app carga el JWKS al arrancar.

### Implementación técnica
- Archivos creados: `config/SecurityConfig.java`.
- Archivos modificados: `pom.xml`, `application.properties`, `.env.example`; revisar `CorsConfig.java`.
- Decisión: API stateless, CSRF deshabilitado, CORS en el filter chain; validación por JWKS.

### Pruebas realizadas
- T1 dependencias → **[completar]**
- T2 arranque + JWKS → **[completar]**
- T3 sin token 401 → **[completar]**
- T4 token válido 200 → **[completar]**
- T5 token inválido 401 → **[completar]**
- T6 CORS → **[completar]**
- `mvn compile` → **[completar]**

### Evidencias
- Salidas `curl` de 401 y 200.
- Log de arranque cargando JWKS.
- Enlace al PR.

### Riesgos o bloqueos
- Riesgo: `issuer-uri` incorrecto. Mitigación: verificar URL del proyecto. Responsable: Backend.
- Bloqueo: requiere proyecto Supabase (URL/JWKS) y JDK 21 + Maven.

### Trazabilidad
- Rama: `KAN-34-resource-server`
- Commit: `KAN-34 feat(security): configurar resource server oauth2 con validacion de jwt`
- Pull request: **[enlace]**
- Dependencias Jira: materializa KAN-18; habilita KAN-35/36/37.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Compilación y arranque exitosos.
- [ ] 401/200 verificados con evidencia.
- [ ] Sin secretos ni detalles de excepción expuestos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.
