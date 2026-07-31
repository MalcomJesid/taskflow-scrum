# KAN-18 — Implementación (modelo/arquitectura JWT)

Esta tarea **no** aporta código nuevo por sí misma: fija el modelo que implementan KAN-34/35/36. Aquí se
documenta la configuración objetivo para que esas tareas la ejecuten.

## Modelo objetivo (Spring Boot como OAuth2 Resource Server)
- Dependencias a añadir (en KAN-34): `spring-boot-starter-security`,
  `spring-boot-starter-oauth2-resource-server`.
- Validación por **issuer** (descubre JWKS automáticamente):
  ```properties
  # application.properties (se configura en KAN-34)
  spring.security.oauth2.resourceserver.jwt.issuer-uri=${SUPABASE_ISSUER:https://<PROJECT_REF>.supabase.co/auth/v1}
  # Alternativa explícita por JWKS:
  # spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://<PROJECT_REF>.supabase.co/auth/v1/keys
  ```
- `SecurityFilterChain` (KAN-35) exige autenticación en `/api/**`, responde 401/403.
- Identidad desde el token (KAN-36): `@AuthenticationPrincipal Jwt jwt` → `jwt.getSubject()` (claim `sub`).

## Requisitos de validación (obligatorios)
- **Firma:** verificada contra el JWKS público de Supabase.
- **Issuer:** debe coincidir con el issuer de Supabase.
- **Expiración (`exp`):** tokens expirados → 401.
- **Claim `sub`:** UUID del usuario; es la única fuente del identificador.

## Reglas de seguridad
- No emitir JWT en el backend. No añadir librerías JWT alternativas (usar el soporte nativo de Spring Security).
- No loguear tokens completos. No retornar trazas de excepción al cliente.
- CORS restringido (unificar en el `SecurityFilterChain`, KAN-35).

## Dónde se implementa cada parte
| Parte del modelo | Tarea |
|---|---|
| Añadir dependencias + configurar issuer/JWKS + validar firma/issuer/exp | **KAN-34** |
| `SecurityFilterChain`, 401/403, CORS | **KAN-35** |
| Extraer `sub` (`jwt.getSubject()`) | **KAN-36** |
| Asociar/filtrar tareas por `sub` | **KAN-37** |

## Bloqueo actual
Requiere datos del proyecto Supabase (issuer/JWKS). Hoy **no existe** → se usan placeholders `<PROJECT_REF>`.
