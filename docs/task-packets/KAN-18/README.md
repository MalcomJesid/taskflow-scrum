# KAN-18 — Implementar autenticación JWT

> Sigue las convenciones comunes de [`../README.md`](../README.md).
> ⚠️ **Tarea de DECISIÓN/ARQUITECTURA.** Define el modelo JWT global; se materializa en KAN-34/35/36.

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-18 |
| **Nombre** | Implementar autenticación JWT |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend |
| **Dependencias** | Se materializa en KAN-34 (validación), KAN-35 (protección), KAN-36 (sub). |

## Reinterpretación (regla crítica)
"Implementar autenticación JWT" **no** significa que el backend **emita** JWT. Significa definir el
**modelo de autenticación JWT del proyecto**: **Supabase emite**, **Spring valida**. Es la tarea
"paraguas" que fija la arquitectura JWT y cuyas piezas concretas son KAN-34/35/36.

## Objetivo
Documentar el flujo JWT extremo a extremo y los requisitos de validación (firma/JWKS, issuer, expiración,
claim `sub`), sirviendo de guía para las tareas de implementación del Resource Server.

## Historia de usuario
> **Como** responsable de seguridad,
> **quiero** un modelo JWT único y bien definido (Supabase emite, Spring valida),
> **para** proteger la API sin duplicar sistemas de autenticación.

## Valor de negocio
Evita el error clásico de dos emisores de JWT. Define el estándar de seguridad que reutilizan todas las
tareas de integración.

## Dependencias
- **Materializada por:** KAN-34, KAN-35, KAN-36.
- **Requiere (para implementar):** proyecto Supabase (issuer/JWKS).

## Flujo JWT (resumen)
```
[Usuario] → login en React → Supabase Auth → access_token (JWT firmado por Supabase)
[React] → Authorization: Bearer <token> → [Spring Boot Resource Server]
[Spring] valida: firma (JWKS) + issuer + exp + claims → extrae sub (UUID) → autoriza
```

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Dos emisores de JWT | Arquitectura rota | Esta decisión: solo Supabase emite |
| Validación incompleta (solo firma) | Tokens de otro issuer aceptados | Validar issuer + exp + claims |
| Confiar en `userId` del body | Acceso horizontal | Usar solo `sub` del token (KAN-36) |

## Archivos afectados
- Solo documentación aquí. Implementación en KAN-34/35/36. Ver [`FILES.md`](FILES.md).

## Resultado esperado
Modelo JWT documentado y aprobado, que guía KAN-34/35/36.

## Criterios de aceptación (Given/When/Then)
1. **Dado** el modelo, **cuando** se revisa, **entonces** define claramente que Supabase emite y Spring valida (un solo emisor).
2. **Dado** el modelo, **cuando** se listan las validaciones, **entonces** incluye firma (JWKS), issuer, expiración y claim `sub`.
3. **Dado** el modelo, **cuando** se revisa el uso del identificador, **entonces** exige tomar el usuario del `sub` (nunca del body).

## Definition of Ready / Done
Checklists comunes §5 y §6 (la verificación técnica se realiza en KAN-34/35/36).

## Trazabilidad Git
- **Rama:** `KAN-18-modelo-jwt-supabase`
- **Commit:** `KAN-18 docs(security): definir modelo JWT (Supabase emite, Spring valida)`
- **Título PR:** `KAN-18 Implementar autenticación JWT (modelo Supabase + Resource Server)`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
