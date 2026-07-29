---
marp: true
title: TaskFlow Scrum — Autenticación segura
paginate: true
---

# TaskFlow Scrum
## Incorporación de autenticación segura

Equipo Scrum · Proyecto KAN
Fecha: `[completar]`

---

# El problema

- La aplicación de tareas era **anónima**: cualquiera veía y editaba todo.
- Sin identidad de usuario → sin privacidad ni responsabilidad.
- **Objetivo:** que cada persona vea y gestione **solo sus** tareas, de forma segura.

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

---

# Orden de implementación

```
KAN-15 → KAN-14 → KAN-29 → KAN-30/31 → KAN-32 → KAN-33
                    KAN-34 → KAN-35 → KAN-36 → KAN-37
```

Las dependencias están mapeadas para evitar bloqueos entre los dos desarrolladores.

---

# Estado y métricas

> Rellenar con datos reales de Jira antes de presentar.

- Sprints ejecutados: `[completar]`
- Velocidad promedio: `[completar]` SP
- % cumplimiento del último sprint: `[completar]`
- Tareas cerradas / totales: `[completar]`

---

# Riesgos gestionados

- JDK 17 en máquina vs. Java 21 requerido → `[estado]`
- `backend/target/` versionado en Git → `[estado]`
- Credenciales en texto plano → **resuelto (KAN-15)** `[confirmar]`
- Proyecto Supabase aún no creado → prerrequisito para pruebas de integración

---

# Próximos pasos

1. Crear el proyecto Supabase (URL + JWKS + claves).
2. Ejecutar los paquetes en orden (`EJECUTAR KAN-XX`).
3. Verificar pruebas de aislamiento con **dos usuarios**.
4. Capturar métricas reales y evidencias.

---

# Gracias

**TaskFlow Scrum — Autenticación segura**

Preguntas · Repositorio: `MalcomJesid/taskflow-scrum` · Jira: proyecto KAN
