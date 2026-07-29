# KAN-32 — Manejar sesión global (AuthContext)

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-32 |
| **Nombre** | Manejar sesión global (AuthContext) |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Frontend |
| **Dependencias** | Requiere KAN-29. Habilita KAN-31 (redirección), KAN-33 (rutas privadas), KAN-37 (Bearer). |

## Objetivo
Crear un contexto de sesión global que exponga `user`, `session`, `token`, `loading` y funciones `signOut`,
escuchando `onAuthStateChange` de Supabase, con limpieza del listener y carga inicial de sesión persistida.

## Historia de usuario
> **Como** aplicación,
> **quiero** conocer en todo momento si hay un usuario autenticado y su token,
> **para** proteger rutas y adjuntar el token en las peticiones al backend.

## Valor de negocio
Es la pieza central que conecta login/registro con rutas privadas y con las llamadas autenticadas al backend.

## Dependencias
- **Previas:** KAN-29.
- **Habilita:** KAN-31 (redirección tras login), KAN-33 (ProtectedRoute), KAN-37 (Authorization: Bearer).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Listener sin limpieza | Fugas de memoria / dobles eventos | `subscription.unsubscribe()` en cleanup |
| `loading` mal manejado | Parpadeo o rutas privadas visibles antes de tiempo | No renderizar hijos hasta resolver sesión inicial |
| Token expuesto en logs | Fuga | No `console.log` de token/sesión |

## Archivos afectados
- `frontend/src/context/AuthContext.jsx` (nuevo).
- `frontend/src/main.jsx` (modificado: envolver `<App/>` con `<AuthProvider>`).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
Contexto global disponible vía hook `useAuth()`.

## Criterios de aceptación (Given/When/Then)
1. **Dado** que la app arranca, **cuando** hay sesión persistida, **entonces** `useAuth()` la expone tras `loading=false`.
2. **Dado** un login exitoso, **cuando** cambia el estado de auth, **entonces** `user`/`session`/`token` se actualizan automáticamente.
3. **Dado** un `signOut`, **cuando** se ejecuta, **entonces** `user`/`session`/`token` quedan nulos.
4. **Dado** el desmontaje del provider, **cuando** ocurre, **entonces** el listener se limpia (sin fugas).
5. **Dado** el arranque, **cuando** la sesión aún no se resuelve, **entonces** `loading=true` (los consumidores pueden esperar).

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-32-sesion-global`
- **Commit:** `KAN-32 feat(auth): manejar sesion global con AuthContext`
- **Título PR:** `KAN-32 Manejar sesión global (AuthContext)`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
