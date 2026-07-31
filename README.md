# TaskFlow Scrum

Aplicación web de gestión de tareas (To-Do) desarrollada bajo la metodología **Scrum (guía SBOK 5.ª edición)**, orientada a mejorar la organización y productividad de estudiantes y profesionales.

El proyecto integra **autenticación segura** mediante Supabase y un backend REST que persiste las tareas en PostgreSQL.

---

## 📌 Descripción

TaskFlow permite a cada usuario **registrarse, iniciar sesión** y gestionar sus tareas (crear, editar, completar y eliminar) desde una interfaz simple e intuitiva.

El proyecto se diseñó desde cero con un doble objetivo:

1. **Producto:** una aplicación funcional de gestión de tareas con autenticación.
2. **Proceso:** aplicar de forma práctica el marco Scrum según la guía SBOK, con trazabilidad total en Jira.

---

## 🛠 Tecnologías utilizadas

### Frontend
| Herramienta | Versión | Uso |
|---|---|---|
| React | 18.2 | Interfaz de usuario (SPA) |
| Vite | 5.1 | Servidor de desarrollo y build |
| React Router | 7.x | Navegación y rutas protegidas |
| Axios | 1.6 | Cliente HTTP hacia el backend |
| @supabase/supabase-js | 2.x | Autenticación (registro / login / sesión) |

### Backend
| Herramienta | Versión | Uso |
|---|---|---|
| Spring Boot | 3.2.3 | API REST |
| Java | 21 | Lenguaje |
| Spring Data JPA + Hibernate | — | Persistencia (ORM) |
| PostgreSQL | 15 | Base de datos |
| Maven | 3.9+ | Gestión de dependencias y build |

### Infraestructura y gestión
- **Docker / Docker Compose** — orquestación de Postgres + backend + frontend.
- **Supabase** — proveedor de autenticación (emisor único de JWT).
- **Git y GitHub** — control de versiones.
- **Jira Software** — gestión del proyecto (backlog, sprints, historias).

---

## 🏗 Arquitectura

```
Usuario → React (Vite)
            │  registro / login vía Supabase Auth
            ▼
        Supabase Auth  ──emite──►  JWT
            │
React guarda la sesión y llama a la API
            │  http://localhost:8080/api/todos
            ▼
     Spring Boot (API REST)
            │  Spring Data JPA
            ▼
       PostgreSQL (tabla `todos`)
```

**Decisión de diseño clave:** un **único emisor de tokens (Supabase)**. El backend **no** implementa login ni registro propios: Supabase autentica y emite el JWT; Spring Boot actúa como *Resource Server* (valida el token, no lo emite). Esto evita el antipatrón de "dos emisores de JWT" y su superficie de ataque duplicada.

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- **Java 21**, **Maven 3.9+**, **Node.js 18+**, **PostgreSQL 15** (o **Docker**).
- Un proyecto en [Supabase](https://supabase.com) (para las claves de autenticación).

### Opción A — Con Docker (recomendada)

```bash
docker compose up --build
```

Levanta Postgres, backend (`:8080`) y frontend (`:80`) en un solo comando.

### Opción B — Local (desarrollo)

**1. Base de datos** (si no usas Docker, crea la BD en Postgres local):

```bash
createdb tododb
```

**2. Backend** (Spring Boot en `:8080`):

```bash
cd backend
mvn spring-boot:run
```

> La conexión a la BD se configura por variables de entorno (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`); por defecto usa `localhost:5432/tododb`. **Nunca** se escriben credenciales en el código.

**3. Frontend** (React + Vite en `:5173`):

```bash
cd frontend
npm install
npm run dev
```

**4. Variables de entorno del frontend** — crea `frontend/.env` con tus claves de Supabase (este archivo está en `.gitignore` y **no** se sube):

```env
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key-publica>
```

> ⚠️ Usa únicamente la clave **pública (anon / publishable)** en el frontend. La `service_role` (secreta) **nunca** va en el cliente.

---

## ⚙️ Metodología Scrum (SBOK)

El proyecto sigue el marco Scrum según la guía SBOK:

- Creación de la visión del proyecto
- Identificación de roles Scrum
- Desarrollo de épicas
- Creación del Product Backlog
- Planificación de liberaciones
- Planificación y estimación de sprints
- Implementación iterativa

🔗 **Tablero Jira:** [proyecto KAN](https://malconyfigue.atlassian.net/jira/software/projects/KAN/list)

> El acceso al tablero puede requerir permisos.

---

## 👥 Roles del equipo

- **Product Owner:** Malcom YesiD
- **Scrum Master:** Carlos Ramírez
- **Equipo de desarrollo:** Frontend Developer · Backend Developer · QA Tester

> Algunos roles se definieron con fines académicos para simular un entorno real de trabajo Scrum.

---

## 📊 Resumen de la planificación

| Sprint | Total de tareas |
|---|---|
| Sprint 1 | 11 |
| Sprint 2 | 9 |
| Sprint 3 | 12 |
| Sprint 4 | 8 |
| Sprint 5 | 7 |
| Sprint 6 | 8 |
| Sprint 7 | 10 |
| **Total** | **65 tareas** |

> Planificación completa registrada en Jira. Las métricas reales (velocity, burndown, cumplimiento) se documentan en [`docs/metrics/`](docs/metrics/).

---

## ✅ Estado de la entrega

**Implementado y funcionando:**
- ✔️ Registro e inicio de sesión con Supabase (validaciones de correo y contraseña).
- ✔️ Gestión de sesión persistente y **rutas protegidas** (React Context).
- ✔️ **CRUD completo de tareas** (crear, listar, filtrar, editar, completar, eliminar) contra la API REST.
- ✔️ Seguridad de base: credenciales fuera del código, CORS controlado, mensajes de error genéricos (no revelan si un correo existe).

**Pendiente (próxima fase):**
- 🔄 Validación del JWT de Supabase en el backend y **aislamiento de tareas por usuario** (que cada persona vea solo las suyas). Hasta completarlo, las tareas se comparten entre usuarios.

---

## 📌 Definición de Hecho (Definition of Done)

Una historia de usuario se considera completada cuando:

- Cumple los criterios de aceptación.
- El código está integrado en el repositorio.
- Las pruebas son exitosas.
- La funcionalidad está documentada.
- El Product Owner aprueba la entrega.

---

## 📁 Estructura del repositorio

```
taskflow-scrum/
├── README.md
├── docker-compose.yml          # Orquestación Postgres + backend + frontend
├── backend/                    # API REST — Spring Boot + Java 21
│   ├── src/main/java/com/todo/ # Controller, Service, Repository, Model, Config
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # SPA — React + Vite
│   ├── src/                    # pages, components, context, api, lib
│   ├── Dockerfile
│   └── package.json
└── docs/                       # Documentación del proyecto
    ├── task-packets/           # Paquetes reproducibles por tarea (KAN-XX)
    ├── metrics/                # Velocity, burndown, CFD, cycle time
    ├── scrum/                  # Rituales: standups y retrospectivas
    └── presentation/           # Deck y guiones de exposición
```

---

## 📄 Documentación adicional

- **Paquetes de tareas** ([`docs/task-packets/`](docs/task-packets/)) — cada tarea documentada como paquete reproducible (implementación, pruebas, Git, rollback, evidencia).
- **Métricas** ([`docs/metrics/`](docs/metrics/)) — plantillas de velocity, burndown, CFD y cycle time (se llenan con datos reales de Jira).
- **Presentación** ([`docs/presentation/`](docs/presentation/)) — deck y guiones de exposición (general, backend y frontend).
