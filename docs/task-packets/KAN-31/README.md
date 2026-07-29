# KAN-31 — Crear pantalla de Login

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-31 |
| **Nombre** | Crear pantalla de Login |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Frontend |
| **Dependencias** | Requiere KAN-29. Relacionada con KAN-17 (contrato), KAN-32 (sesión). |

## Objetivo
Crear la pantalla de inicio de sesión que usa `supabase.auth.signInWithPassword`, con manejo de credenciales
inválidas, estado de carga y mensajes uniformes que no exponen detalles internos.

## Historia de usuario
> **Como** usuario registrado,
> **quiero** iniciar sesión con mi correo y contraseña,
> **para** acceder a mis tareas de forma segura.

## Valor de negocio
Puerta de entrada a la aplicación autenticada; habilita el resto del flujo (sesión, rutas privadas, datos propios).

## Dependencias
- **Previas:** KAN-29.
- **Relacionada:** KAN-17 (contrato), KAN-30 (registro), KAN-32 (sesión), KAN-33 (enrutado).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Mensaje que revela si el correo existe | Enumeración de cuentas | Mensaje genérico "credenciales inválidas" |
| Doble envío | Errores/latencia | Botón deshabilitado en carga |
| Token en logs | Fuga de credenciales | Nunca registrar el token |

## Archivos afectados
- `frontend/src/pages/Login.jsx` (nuevo). Ver [`FILES.md`](FILES.md).

## Resultado esperado
Pantalla funcional de login conectada a Supabase.

## Criterios de aceptación (Given/When/Then)
1. **Dado** credenciales correctas, **cuando** envío, **entonces** se llama a `signInWithPassword` y se obtiene sesión.
2. **Dado** credenciales incorrectas, **cuando** envío, **entonces** se muestra "credenciales inválidas" (mensaje genérico).
3. **Dado** un correo con formato inválido, **cuando** envío, **entonces** se muestra error de validación y no se llama a Supabase.
4. **Dado** un envío en curso, **cuando** hago clic de nuevo, **entonces** el botón está deshabilitado.
5. **Dado** el login exitoso, **cuando** termina, **entonces** el token queda gestionado por Supabase (no se registra en logs).

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-31-pantalla-login`
- **Commit:** `KAN-31 feat(auth): crear formulario de login`
- **Título PR:** `KAN-31 Crear pantalla de Login`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
