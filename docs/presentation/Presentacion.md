---
marp: true
title: TaskFlow Scrum — Autenticación segura
paginate: true
---

# TaskFlow Scrum
## Incorporación de autenticación segura

Equipo Scrum · Proyecto KAN
Marco: **SBOK 5.ª edición** · Entrega académica
Fecha: `[completar]`

---

# Objetivo de la exposición

- Mostrar **cómo aplicamos Scrum (SBOK)** a un proyecto de software real.
- Explicar la **decisión de arquitectura** de seguridad y por qué.
- Presentar el **estado actual** de la implementación con honestidad: qué ya funciona y qué falta.

> Foco académico: el **proceso** (roles, artefactos, flujo de trabajo) tanto como el producto.

---

# Marco metodológico — Scrum (SBOK)

- **Producto (Product Backlog):** el trabajo se descompone en *user stories* trazables en Jira (proyecto KAN).
- **Sprints:** entregas incrementales; cada tarea aporta valor verificable.
- **Artefactos de proceso:** backlog priorizado, tablero KAN, métricas (velocity, burndown, CFD, cycle time).
- **Trazabilidad total:** cada cambio de código enlaza con su clave de Jira (`KAN-XX`).

> Cada tarea se documenta como un **paquete reproducible** — el proceso es tan entregable como el código.

---

# El problema

- La aplicación de tareas era **anónima**: cualquiera veía y editaba todo.
- Sin identidad de usuario → sin privacidad ni responsabilidad.
- **Objetivo del producto:** que cada persona vea y gestione **solo sus** tareas, de forma segura.

---

# La decisión arquitectónica clave

**Un único emisor de tokens (JWT): Supabase.**

- **Supabase Auth** registra, autentica y emite el JWT.
- **React** gestiona la sesión y envía `Authorization: Bearer <token>`.
- **Spring Boot** actúa como *Resource Server*: **valida**, no emite.

> Evita el antipatrón de "dos emisores de JWT" y sus fallos de seguridad.

---

# Flujo de autenticación

```
Usuario → React → Supabase Auth  (signUp / signInWithPassword)
                      │  emite JWT
                      ▼
React guarda sesión ──► Authorization: Bearer <token>
                      ▼
Spring Boot (Resource Server)
  valida firma (JWKS) · issuer · expiración
  extrae identidad del claim `sub`
  filtra tareas por user_id
```

---

# Seguridad por diseño

- El backend **nunca** confía en un `userId` enviado por el frontend → usa solo el claim `sub`.
- **Aislamiento horizontal:** `findByIdAndUserId` + política 404 para recursos ajenos.
- Credenciales fuera del código (variables de entorno) — **KAN-15**.
- Sin `service_role_key` en el frontend · sin tokens en logs · sin stacktraces al cliente.

---

# Alcance del trabajo: 14 tareas

| Bloque | Tareas |
|---|---|
| Base backend | KAN-15, KAN-14 |
| Decisión de auth | KAN-16, KAN-17, KAN-18 |
| Frontend | KAN-29, KAN-30, KAN-31, KAN-32, KAN-33 |
| Integración segura | KAN-34, KAN-35, KAN-36, KAN-37 |

---

# Cómo trabaja el equipo

- Cada tarea = **paquete reproducible** de 9 documentos (implementación, pruebas, Git, rollback, evidencia…).
- Convenciones Git estrictas: rama por tarea, Conventional Commits, PR por Jira key.
- **Frontend y backend nunca comparten rama.**
- Guías de Git separadas para Windows (sin `&&`) y macOS/Linux.

> Diseñado para que un compañero *junior* reproduzca cada paso sin ambigüedad.

---

# Orden de implementación

```
KAN-15 → KAN-14 → KAN-29 → KAN-30/31 → KAN-32 → KAN-33
                    KAN-34 → KAN-35 → KAN-36 → KAN-37
```

Las dependencias están mapeadas para evitar bloqueos entre los dos desarrolladores.

---

# Estado actual de la implementación

**✅ Completado y funcionando**
- Proyecto **Supabase creado** y operativo (Auth activo).
- **Registro e inicio de sesión** desde React (KAN-29 → KAN-33): sesión persistente, rutas protegidas, cierre de sesión.

**🔄 En curso — próxima fase (KAN-34 → KAN-37)**
- Validación del JWT y **aislamiento de tareas por usuario** en el backend.
- Hasta completarla, las tareas aún se **comparten** entre usuarios.

---

# Estado y métricas del proceso

> Las métricas se llenan **solo** con datos reales de Jira (`docs/metrics/`). No se presentan cifras inventadas.

- Sprints ejecutados: `[completar — Jira]`
- Velocidad promedio: `[completar — Jira]` SP
- % cumplimiento del último sprint: `[completar — Jira]`
- Tareas cerradas / totales: `[completar — Jira]`

> Fuente: *Velocity Report* y *Sprint Report* del tablero KAN.

---

# Riesgos gestionados

- Diferencia JDK 17 vs. Java 21 requerido → **resuelto** (entorno alineado a Java 21).
- `backend/target/` versionado en Git → **resuelto** (`git rm --cached` + `.gitignore`).
- Credenciales en texto plano → **resuelto** (variables de entorno, **KAN-15**).
- Proyecto Supabase → **creado** ✅ (ya no es un bloqueo).

> Riesgo activo: el aislamiento por usuario (KAN-34→37) sigue pendiente.

---

# Próximos pasos

1. Ejecutar los paquetes **KAN-34 → KAN-37** (validación JWT + aislamiento por usuario).
2. Enviar el `Bearer <token>` desde el frontend en cada petición.
3. Verificar el aislamiento con **dos usuarios** reales (usuario A no ve tareas de B).
4. Capturar **métricas reales** de Jira y adjuntar evidencias.

---

# Gracias

**TaskFlow Scrum — Autenticación segura**

Preguntas · Repositorio: `MalcomJesid/taskflow-scrum` · Jira: proyecto KAN
