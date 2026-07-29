# KAN-16 — Crear endpoint Registro

> Sigue las convenciones comunes de [`../README.md`](../README.md).
> ⚠️ **Tarea de DECISIÓN/DOCUMENTACIÓN, no de código de emisor JWT.** Ver "Reinterpretación" abajo.

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-16 |
| **Nombre** | Crear endpoint Registro |
| **Tipo** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend (coord. con Frontend) |
| **Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Dependencias** | Relacionada con KAN-29 (Supabase SDK) y KAN-30 (pantalla registro). |

## Reinterpretación (regla crítica de arquitectura)
El título "Crear endpoint Registro" sugería un endpoint `/register` propio en Spring Boot que emitiera su
propio JWT. **Eso crearía un segundo emisor de identidad**, incompatible con KAN-29/34 (Supabase Auth).

**Decisión (confirmada con el PO):** el registro lo realiza **Supabase Auth desde el frontend**
(`supabase.auth.signUp`). **No** se crea un endpoint `/register` en el backend. Esta tarea entrega la
**decisión documentada** y el **contrato** que la pantalla de registro (KAN-30) debe cumplir.

> Si el profesor exigiera explícitamente un endpoint `/register` en el backend, se implementaría una
> **fachada** que reenvía a la API de Supabase (ver [`IMPLEMENTATION.md`](IMPLEMENTATION.md), Opción B), con sus riesgos.

## Objetivo
Definir y documentar el mecanismo de **registro de usuarios** del proyecto, garantizando un único emisor de
identidad (Supabase), y dejar el contrato que consumirá KAN-30.

## Historia de usuario
> **Como** persona nueva,
> **quiero** poder crear una cuenta con correo y contraseña,
> **para** acceder a la aplicación y gestionar mis propias tareas.

## Valor de negocio
Sin registro no hay usuarios. Centralizarlo en Supabase evita duplicar seguridad y reduce superficie de ataque.

## Dependencias
- **Relacionada:** KAN-29 (cliente Supabase), KAN-30 (UI de registro), KAN-14 (perfil).
- **Habilita:** el flujo de alta de usuarios.

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Interpretar como segundo emisor JWT | Arquitectura incoherente | Esta decisión: solo Supabase |
| Confirmación por correo activada en Supabase | El usuario no puede entrar al instante | Documentar el flujo de confirmación |
| Exponer `service_role_key` | Fuga total | Solo `anon key` en frontend |

## Archivos afectados
- Solo documentación en este paquete. El código real vive en KAN-29/30. Ver [`FILES.md`](FILES.md).

## Resultado esperado
Decisión documentada + contrato de registro. **No** hay endpoint backend nuevo.

## Criterios de aceptación (Given/When/Then)
1. **Dado** el diseño, **cuando** se revisa la arquitectura, **entonces** el registro usa `supabase.auth.signUp` y **no** existe endpoint `/register` propio con emisión de JWT.
2. **Dado** el contrato, **cuando** KAN-30 lo implemente, **entonces** cubre correo válido, reglas de contraseña y manejo de "correo ya registrado".
3. **Dado** el requisito de seguridad, **cuando** se revisa el frontend, **entonces** solo se usa la `anon key` (nunca `service_role_key`).

## Definition of Ready / Done
Checklists comunes de [`../README.md`](../README.md) §5 y §6 (para esta tarea, "compila/pruebas" aplica al entregable de KAN-30).

## Trazabilidad Git
- **Rama:** `KAN-16-decision-registro-supabase`
- **Commit:** `KAN-16 docs(auth): documentar decision de registro via Supabase (sin endpoint propio)`
- **Título PR:** `KAN-16 Crear endpoint Registro (decisión: Supabase Auth)`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
