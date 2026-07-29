# KAN-34 — Configurar Spring Boot como Resource Server

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-34 |
| **Nombre** | Configurar Spring Boot como OAuth2 Resource Server |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend |
| **Dependencias** | Materializa KAN-18. Habilita KAN-35/36/37. Requiere proyecto Supabase (URL/JWKS). |

## Objetivo
Añadir las dependencias de seguridad OAuth2 Resource Server y configurar Spring Boot para validar JWT emitidos por
Supabase (firma vía JWKS, issuer, expiración), definiendo un `SecurityFilterChain` base. **El backend no emite JWT.**

## Historia de usuario
> **Como** backend,
> **quiero** validar los tokens que emite Supabase,
> **para** aceptar únicamente peticiones autenticadas y confiables.

## Valor de negocio
Es la base de toda la seguridad del servidor: sin esto, KAN-35/36/37 no pueden proteger ni filtrar datos.

## Dependencias
- **Materializa:** KAN-18 (modelo JWT Supabase).
- **Habilita:** KAN-35 (proteger endpoints), KAN-36 (extraer `sub`), KAN-37 (asociar/filtrar por usuario).
- **Externa:** proyecto Supabase creado (para `issuer-uri`/`jwk-set-uri`).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| `issuer-uri` incorrecto | Todos los tokens rechazados | Verificar URL exacta del proyecto Supabase |
| Config de CORS rota al añadir security | Frontend bloqueado | Integrar CORS en el `SecurityFilterChain` |
| Exponer detalles de excepción | Fuga de información | Respuestas 401/403 sin stacktrace |

## Archivos afectados
- `backend/pom.xml` (añadir security + oauth2 resource server).
- `backend/src/main/resources/application.properties` (issuer/jwk).
- `backend/src/main/java/com/todo/config/SecurityConfig.java` (nuevo).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
La app arranca con seguridad activa; los endpoints exigen JWT válido de Supabase (el detalle de qué se protege
se afina en KAN-35).

## Criterios de aceptación (Given/When/Then)
1. **Dado** el `pom.xml`, **cuando** compilo, **entonces** están presentes `spring-boot-starter-security` y `...-oauth2-resource-server`.
2. **Dado** un JWT válido de Supabase, **cuando** llamo a un endpoint protegido, **entonces** pasa la validación (firma/issuer/exp).
3. **Dado** un token inválido o ausente, **cuando** llamo, **entonces** recibo 401 sin detalles internos.
4. **Dado** el frontend en `localhost:5173`, **cuando** llama con token, **entonces** CORS no lo bloquea.
5. **Dado** el arranque, **cuando** `issuer-uri` está configurado, **entonces** la app carga el JWKS de Supabase.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-34-resource-server`
- **Commit:** `KAN-34 feat(security): configurar resource server oauth2 con validacion de jwt`
- **Título PR:** `KAN-34 Configurar Spring Boot como Resource Server`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
