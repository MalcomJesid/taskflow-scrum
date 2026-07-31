# TaskFlow Scrum — Paquetes de trabajo (Task Packets)

> Documento maestro de convenciones. **Todos** los paquetes `KAN-XX/` referencian este archivo
> para no duplicar arquitectura, reglas Git y Definiciones. Léelo una vez antes de tomar cualquier tarea.

- **Repositorio oficial:** https://github.com/MalcomJesid/taskflow-scrum.git
- **Tablero Jira:** https://malconyfigue.atlassian.net/jira/software/projects/KAN
- **Fecha de creación de estos paquetes:** 2026-07-28
- **Metodología:** Scrum según la **Guía SBOK, 5.ª edición** (control empírico: transparencia, inspección, adaptación).

---

## 0. Estado del proyecto al iniciar (auditoría FASE 0)

El repositorio **hoy** es un CRUD de tareas **anónimo** (sin autenticación):

- **Backend** `com.todo`: entidad `Todo` → tabla `todos`; controlador `/api/todos` abierto. **No hay** Spring Security, JWT, ni usuario.
- **Frontend** React 18 + Vite + Axios: CRUD contra `http://localhost:8080/api/todos`. **No hay** Supabase, router, ni sesión.

Todo el bloque KAN-14…KAN-37 (autenticación + aislamiento por usuario) **se construye desde cero** sobre esa base.

> ⚠️ Los metadatos de Jira (tipo, estado, story points, asignados, criterios oficiales) **no pudieron
> consultarse directamente** en esta sesión. Cada dato no confirmado aparece marcado como
> **`PENDIENTE DE VERIFICACIÓN EN JIRA`**. No se inventan valores.

---

## 1. Arquitectura final acordada (un solo emisor de identidad: Supabase)

Decisión de arquitectura tomada con el Product Owner (ver preguntas bloqueantes de FASE 0):

1. **Supabase Auth** registra y autentica al usuario y **emite el JWT** (access token). Es el **único emisor**.
2. **React** conserva la sesión con `@supabase/supabase-js` (contexto global `AuthContext`) y adjunta
   el token en cada llamada al backend: `Authorization: Bearer <access_token>`.
3. **Spring Boot = OAuth2 Resource Server**. Spring Security valida **firma (JWKS)**, **issuer**,
   **expiración** y **claims**. No emite tokens; solo los verifica.
4. El backend obtiene el identificador del usuario desde el claim **`sub`** (UUID de Supabase).
5. La entidad `Todo` gana columna **`user_id` (UUID)**. Toda consulta se filtra por el `sub` del token.
6. El backend **nunca** confía en un `userId` enviado por el frontend. Aislamiento horizontal:
   401 sin token válido, 403 al intentar tocar datos de otro usuario.
7. `service_role_key` de Supabase: **jamás** en el frontend ni en Git. El frontend usa solo la `anon key`.

### Decisiones de diseño confirmadas
| Tema | Decisión |
|---|---|
| Nombre de dominio | Se **mantiene** `Todo` / tabla `todos` y se le añade `user_id` (mínima ruptura). |
| Endpoints `/register` `/login` en backend | **No** se crean. Registro/login viven en el frontend contra Supabase (evita doble emisor JWT). |
| Router React | Se añade `react-router-dom` (necesario para KAN-33 `ProtectedRoute`). |
| Migraciones | `hibernate.ddl-auto=update` en desarrollo; el modelo se documenta en KAN-14. |

### Reinterpretación de KAN-16/17/18 (regla crítica del prompt)
KAN-16 (Registro), KAN-17 (Login) y KAN-18 (JWT) **no** implican un segundo sistema de autenticación
propio del backend. Se satisfacen con Supabase Auth (frontend) + validación del JWT (backend). Sus
paquetes son **de decisión y documentación**, no de código de emisor JWT. Se explica en cada paquete.

### Corrección de KAN-33 (Route Guard)
"Route Guard" proviene de Angular. En React se implementa un componente equivalente
**`ProtectedRoute`** (alias válidos: `RequireAuth`, `AuthGuard`). Se documenta la corrección en el paquete.

---

## 2. Mapa de dependencias

```
KAN-15 (conexión BD + env)
   └── KAN-14 (modelo profiles + user_id en todos)
          └── KAN-37 (asociar tareas al usuario)

KAN-29 (Supabase SDK)  ── requiere datos del proyecto Supabase (URL, anon key, issuer)
   ├── KAN-30 (pantalla Registro)
   ├── KAN-31 (pantalla Login)
   └── KAN-32 (sesión global AuthContext)
          └── KAN-33 (ProtectedRoute)   [+ react-router-dom]

KAN-34 (Spring Resource Server valida JWT Supabase)  ── requiere issuer/JWKS de Supabase
   └── KAN-35 (proteger endpoints 401/403)
          └── KAN-36 (extraer user_id del claim sub)
                 └── KAN-37 (asociar tareas + aislamiento)

KAN-26 (integración completa) ── depende de TODO lo anterior (solo si Jira lo confirma como tarea real)
```

**Orden de implementación recomendado:** 15 → 14 → 29 → 30 → 31 → 32 → 33 → 34 → 35 → 36 → 37 → (16/17/18 doc) → 26.

**Bloqueos externos actuales:**
- KAN-29, KAN-34 requieren un **proyecto Supabase** (URL, anon key, issuer/JWKS). Hoy **no existe** → placeholders.
- Build backend requiere **JDK 21** (local hay 17) y **Maven** (o wrapper `mvnw`), hoy ausentes.

---

## 3. División del trabajo (propuesta — PENDIENTE DE VERIFICACIÓN EN JIRA)

| Rol | Tareas |
|---|---|
| **Compañero Backend** | KAN-14, KAN-15, KAN-16, KAN-17, KAN-18, KAN-34, KAN-35, KAN-36, KAN-37 |
| **Compañero Frontend** | KAN-29, KAN-30, KAN-31, KAN-32, KAN-33 |
| **Integración conjunta** | KAN-26 (solo tras integrar front + back) |

No se reasignan tareas en Jira sin autorización. No se atribuye trabajo a quien no lo haya revisado y probado.

---

## 4. Convenciones Git (obligatorias)

### Ramas
Formato: `KAN-XX-descripcion-corta` (una rama por tarea; frontend y backend **nunca** comparten rama).

Ejemplos: `KAN-29-configurar-supabase-sdk`, `KAN-34-validar-jwt-supabase`, `KAN-37-asociar-tareas-usuario`.

### Commits (Conventional Commits + clave Jira al inicio)
Formato: `KAN-XX tipo(alcance): descripción concreta`

Tipos válidos: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, `build`, `ci`.

Ejemplos correctos:
```
KAN-29 feat(auth): configurar cliente de Supabase
KAN-34 feat(security): validar JWT emitido por Supabase
KAN-35 test(security): validar acceso no autorizado
KAN-14 docs(database): documentar modelo de usuarios
```
Mensajes **prohibidos**: `cambios`, `prueba`, `codigo`, `actualización`, `listo`, `final`, `commit backend`.

### Pull Request
- **Título:** debe incluir la clave Jira, p. ej. `KAN-34 Validar JWT de Supabase en Spring Boot`.
- **Descripción** debe contener: Objetivo · Tarea Jira · Cambios · Archivos · Cómo probar · Evidencias · Riesgos · Checklist DoD.

### Reglas duras
- ❌ No `git push` directo a `main`. ❌ No `git push --force`. ❌ No `git add .` sin revisar antes.
- Antes de agregar: `git status --short` y `git diff`. Después de agregar: `git diff --cached` y `git status`.

### Validación de repositorio (antes de cualquier aporte)
```
git remote get-url origin
```
Resultado esperado (exacto): `https://github.com/MalcomJesid/taskflow-scrum.git`
o `git@github.com:MalcomJesid/taskflow-scrum.git`. Si apunta a otro repo: **detente**, no hagas commit/push, corrige `origin` y vuelve a validar.

---

## 5. Definition of Ready (DoR) — común

Una tarea está lista para comenzar cuando:
- [ ] Tiene objetivo claro.
- [ ] Tiene criterios de aceptación objetivos.
- [ ] Tiene dependencias identificadas.
- [ ] Tiene diseño o contrato de API cuando aplica.
- [ ] Tiene responsable.
- [ ] Tiene estimación.
- [ ] No tiene bloqueos críticos sin documentar.

## 6. Definition of Done (DoD) — común

Una tarea pasa a Done **solo** cuando:
- [ ] Cumple **todos** sus criterios de aceptación.
- [ ] El código compila.
- [ ] Las pruebas pasan.
- [ ] No introduce errores conocidos.
- [ ] No contiene secretos.
- [ ] Sigue la arquitectura acordada (sección 1).
- [ ] Está documentada.
- [ ] Tiene evidencia verificable.
- [ ] El commit incluye la clave Jira.
- [ ] La rama incluye la clave Jira.
- [ ] El PR incluye la clave Jira.
- [ ] El código fue integrado correctamente.
- [ ] El Product Owner validó el entregable.

> Una tarea **no** se marca Done solo porque exista un commit.

---

## 7. Seguridad — requisitos transversales

- Variables de entorno + `.env.example`; `.env` excluido por `.gitignore`; **ningún secreto en Git**.
- Sin contraseñas en texto plano. No almacenar contraseñas en tablas propias (las gestiona Supabase Auth).
- Validación de entradas; manejo uniforme de errores; códigos HTTP correctos; CORS restringido.
- JWT: validar firma, issuer, expiración y claim `sub`. No registrar tokens completos en logs.
- Nunca exponer `service_role_key`. No aceptar `userId` manipulable desde el frontend.
- No retornar trazas internas de excepción al cliente.

---

## 8. Estructura de cada paquete `KAN-XX/`

| Archivo | Contenido |
|---|---|
| `README.md` | Ficha completa: Jira, historia de usuario, criterios, DoR/DoD, rama, commit, PR, texto Jira, evidencias. |
| `IMPLEMENTATION.md` | Pasos técnicos detallados y código completo a introducir. |
| `FILES.md` | Lista exacta de archivos creados/modificados y por qué. |
| `TESTS.md` | Pruebas a ejecutar, comando, resultado esperado, evidencia. |
| `GIT_WINDOWS.md` | Guía Git paso a paso para PowerShell (un comando por línea, sin `&&`). |
| `GIT_MAC_LINUX.md` | Guía Git paso a paso para macOS/Linux. |
| `JIRA_UPDATE.md` | Texto listo para copiar y pegar en Jira. |
| `EVIDENCE.md` | Lista de evidencias/capturas requeridas. |
| `ROLLBACK.md` | Cómo revertir con seguridad. |
| `KAN-XX.patch` | (Cuando sea posible) parche aplicable con `git apply`. Se genera en FASE 2, no antes. |

> Los `.patch` **no** se generan hasta conocer el estado real del código y las dependencias previas (FASE 2).
