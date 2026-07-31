# KAN-17 — Crear endpoint Login

> Sigue las convenciones comunes de [`../README.md`](../README.md).
> ⚠️ **Tarea de DECISIÓN/DOCUMENTACIÓN, no de código de emisor JWT.**

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-17 |
| **Nombre** | Crear endpoint Login |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Backend (coord. con Frontend) |
| **Dependencias** | Relacionada con KAN-29 (SDK), KAN-31 (pantalla login), KAN-32 (sesión). |

## Reinterpretación (regla crítica)
"Crear endpoint Login" no implica un `/login` propio en Spring Boot que emita JWT. El login lo realiza
**Supabase Auth** (`supabase.auth.signInWithPassword`) desde el frontend; Supabase devuelve el **access token**.
El backend **no** emite tokens: solo los valida (KAN-34). Esta tarea documenta la decisión + contrato para KAN-31.

> Opción B (fachada `/api/auth/login` que reenvía a Supabase) queda documentada en [`IMPLEMENTATION.md`](IMPLEMENTATION.md), solo si el profesor la exige.

## Objetivo
Definir el mecanismo de inicio de sesión con un único emisor (Supabase) y el contrato que consumirá KAN-31.

## Historia de usuario
> **Como** usuario registrado,
> **quiero** iniciar sesión con mi correo y contraseña,
> **para** acceder a mis tareas de forma segura.

## Valor de negocio
Puerta de entrada a la app. Centralizar en Supabase evita gestionar credenciales/JWT propios.

## Dependencias
- **Relacionada:** KAN-29, KAN-31, KAN-32.
- **Habilita:** obtención del token que el backend validará (KAN-34).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Interpretar como emisor propio | Doble sistema | Solo Supabase |
| Fugar el token en logs | Robo de sesión | No loguear tokens |
| Credenciales incorrectas sin manejo | Mala UX | Mensaje uniforme "credenciales inválidas" |

## Archivos afectados
- Solo documentación. Código en KAN-31/32. Ver [`FILES.md`](FILES.md).

## Resultado esperado
Decisión documentada + contrato de login. Sin endpoint backend nuevo.

## Criterios de aceptación (Given/When/Then)
1. **Dado** el diseño, **cuando** se revisa, **entonces** el login usa `signInWithPassword` y **no** hay `/login` propio que emita JWT.
2. **Dado** el contrato, **cuando** KAN-31 lo implemente, **entonces** cubre correo, contraseña, estado de carga, credenciales inválidas y persistencia de sesión.
3. **Dado** el token recibido, **cuando** el frontend llame al backend, **entonces** lo envía en `Authorization: Bearer <token>`.

## Definition of Ready / Done
Checklists comunes §5 y §6 (funcional real se valida en KAN-31).

## Trazabilidad Git
- **Rama:** `KAN-17-decision-login-supabase`
- **Commit:** `KAN-17 docs(auth): documentar decision de login via Supabase (sin endpoint propio)`
- **Título PR:** `KAN-17 Crear endpoint Login (decisión: Supabase Auth)`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
