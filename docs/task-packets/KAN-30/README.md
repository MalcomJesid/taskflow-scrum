# KAN-30 — Crear pantalla de Registro

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-30 |
| **Nombre** | Crear pantalla de Registro |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Frontend |
| **Dependencias** | Requiere KAN-29 (cliente Supabase). Relacionada con KAN-16 (contrato). |

## Objetivo
Crear la pantalla de registro que usa `supabase.auth.signUp` con validación de correo, reglas de contraseña,
confirmación, manejo de "correo ya registrado", estado de carga y redirección coherente.

## Historia de usuario
> **Como** persona nueva,
> **quiero** una pantalla de registro clara con validaciones,
> **para** crear mi cuenta sin errores ni confusión.

## Valor de negocio
Primer punto de contacto del usuario. Un registro robusto reduce soporte y errores de alta.

## Dependencias
- **Previas:** KAN-29.
- **Relacionada:** KAN-16 (contrato), KAN-32 (sesión), KAN-31 (login).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Doble envío del formulario | Usuarios duplicados/errores | Deshabilitar botón mientras carga |
| Mensajes de error crudos de Supabase | Mala UX / fuga de detalles | Mensajes amigables y uniformes |
| Confirmación por email activa no comunicada | Usuario cree que falló | Mostrar aviso "revisa tu correo" |

## Archivos afectados
- `frontend/src/pages/Register.jsx` (nuevo). Estilos y rutas según KAN-33. Ver [`FILES.md`](FILES.md).

## Resultado esperado
Pantalla funcional de registro conectada a Supabase.

## Criterios de aceptación (Given/When/Then)
1. **Dado** un correo válido y contraseñas coincidentes, **cuando** envío, **entonces** se llama a `signUp` y se muestra éxito (o aviso de confirmación por correo).
2. **Dado** un correo inválido, **cuando** envío, **entonces** se muestra error de validación y **no** se llama a `signUp`.
3. **Dado** contraseñas distintas, **cuando** envío, **entonces** se muestra "las contraseñas no coinciden" y no se envía.
4. **Dado** un correo ya registrado, **cuando** envío, **entonces** se muestra "el correo ya está registrado".
5. **Dado** un envío en curso, **cuando** hago clic de nuevo, **entonces** el botón está deshabilitado (sin doble envío).

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-30-pantalla-registro`
- **Commit:** `KAN-30 feat(auth): crear formulario de registro`
- **Título PR:** `KAN-30 Crear pantalla de Registro`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
