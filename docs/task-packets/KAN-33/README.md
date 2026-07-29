# KAN-33 — Proteger rutas privadas (ProtectedRoute)

> Sigue las convenciones comunes de [`../README.md`](../README.md).

## Ficha Jira
| Campo | Valor |
|---|---|
| **Código Jira** | KAN-33 |
| **Nombre** | Proteger rutas privadas (ProtectedRoute) |
| **Tipo / Sprint / Épica / Prioridad / Estado / Story points** | `PENDIENTE DE VERIFICACIÓN EN JIRA` |
| **Responsable / rol** | Compañero Frontend |
| **Dependencias** | Requiere KAN-29 y KAN-32. Integra KAN-30 y KAN-31. |

## Objetivo
Instalar `react-router-dom`, definir el enrutado de la app y crear un componente `ProtectedRoute` (equivalente a
un Route Guard de Angular) que redirige a `/login` cuando no hay sesión, respetando el estado `loading`.

## Historia de usuario
> **Como** usuario no autenticado,
> **quiero** ser redirigido al login al intentar entrar a una página privada,
> **para** que solo usuarios con sesión accedan a las tareas.

## Valor de negocio
Impide el acceso a la interfaz privada sin sesión; complementa la protección real del backend (KAN-34/35).

## Dependencias
- **Previas:** KAN-29 (cliente), KAN-32 (sesión).
- **Integra:** KAN-30 (registro), KAN-31 (login).

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Redirigir antes de resolver sesión | Expulsa a usuarios válidos | Esperar a `loading=false` |
| Confiar solo en el guard de frontend | Falsa sensación de seguridad | La seguridad real la aplica el backend (KAN-34/35) |
| Rutas mal anidadas | Páginas inaccesibles | Probar cada ruta |

## Archivos afectados
- `frontend/package.json` / `package-lock.json` (react-router-dom).
- `frontend/src/components/ProtectedRoute.jsx` (nuevo).
- `frontend/src/App.jsx` (modificado: definir rutas).
- Ver [`FILES.md`](FILES.md).

## Resultado esperado
Rutas `/login`, `/register` públicas y ruta privada (tareas) protegida por sesión.

## Criterios de aceptación (Given/When/Then)
1. **Dado** que no hay sesión, **cuando** entro a una ruta privada, **entonces** soy redirigido a `/login`.
2. **Dado** que hay sesión, **cuando** entro a la ruta privada, **entonces** veo la página de tareas.
3. **Dado** el arranque con sesión persistida, **cuando** `loading=true`, **entonces** no se redirige prematuramente.
4. **Dado** que estoy logueado, **cuando** navego a `/login`, **entonces** (opcional) se me redirige a la ruta privada.
5. **Dado** `react-router-dom` instalado, **cuando** ejecuto la app, **entonces** el enrutado funciona sin errores.

## Definition of Ready / Done
Checklists comunes §5 y §6.

## Trazabilidad Git
- **Rama:** `KAN-33-rutas-privadas`
- **Commit:** `KAN-33 feat(auth): proteger rutas privadas con ProtectedRoute`
- **Título PR:** `KAN-33 Proteger rutas privadas (ProtectedRoute)`

## Evidencias requeridas
Ver [`EVIDENCE.md`](EVIDENCE.md).
