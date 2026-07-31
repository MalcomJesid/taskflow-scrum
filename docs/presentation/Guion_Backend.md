# Guion — Exposición del BACKEND (Spring Boot)

> Para el expositor del backend (~4–5 min). Es tu apoyo hablado; no se proyecta.
> Regla: explica lo que el código **hace hoy**. Sé claro con lo que aún **está pendiente** (KAN-34→37).

---

## 1. Presentación (30 s)
"Yo les explico el **backend**. Es una API REST hecha con **Spring Boot 3.2.3** sobre **Java 21**, que
guarda las tareas en **PostgreSQL**. Su trabajo es recibir las peticiones del frontend, aplicar la lógica
y persistir los datos."

## 2. Stack y arranque (40 s)
"El proyecto se construye con **Maven**. Al arrancar levanta un **Tomcat embebido en el puerto 8080**.
Para la base de datos usamos **Spring Data JPA con Hibernate**, y el pool de conexiones es **HikariCP**.
La conexión se configura por variables de entorno —usuario, contraseña y URL— así que **no hay credenciales
escritas en el código**; eso fue parte de la tarea KAN-15."

## 3. Modelo de datos (40 s)
"La entidad principal es **`Todo`**, mapeada a la tabla `todos`. Tiene: id autogenerado, título, descripción,
un booleano `completed`, y dos fechas, `createdAt` y `updatedAt`, que se llenan solas con los hooks
`@PrePersist` y `@PreUpdate`. Hibernate crea y actualiza el esquema automáticamente con `ddl-auto=update`."

## 4. Las tres capas (60 s)
"La arquitectura sigue el patrón clásico en tres capas:
- El **Controller** (`TodoController`) expone los endpoints REST bajo `/api/todos`.
- El **Service** (`TodoService`) tiene la lógica de negocio.
- El **Repository** (`TodoRepository`) habla con la base de datos; extiende `JpaRepository`, así que las
  operaciones básicas ya vienen dadas, y definimos consultas como `findAllByOrderByCreatedAtDesc` solo
  declarando el método."

## 5. Endpoints (50 s)
"La API es un CRUD completo:
- **GET `/api/todos`** — lista las tareas; acepta un filtro opcional `?completed=true/false`.
- **POST `/api/todos`** — crea una tarea y responde **201 Created**.
- **PUT `/api/todos/{id}`** — actualiza título, descripción y estado.
- **PATCH `/api/todos/{id}/toggle`** — alterna completada / pendiente.
- **DELETE `/api/todos/{id}`** — la elimina y responde **204 No Content**.
Cada endpoint devuelve un `ResponseEntity` con su código HTTP correcto."

## 6. CORS (30 s)
"Como el frontend corre en otro puerto (5173 o 5174 en desarrollo), configuramos **CORS** en `CorsConfig`
para permitir explícitamente esos orígenes en las rutas `/api/**`. Sin esto, el navegador bloquearía las
peticiones del React."

## 7. Estado actual y lo que sigue — SÉ HONESTO (50 s)
"Un punto importante y transparente: **hoy el backend todavía no valida el token de Supabase ni filtra por
usuario**. Es decir, en este momento las tareas se comparten entre todos. Esa es justo nuestra **próxima
fase, KAN-34 a KAN-37**: convertir el backend en un **Resource Server** que valide la firma del JWT contra
las claves públicas de Supabase, extraiga la identidad del claim `sub`, y filtre las tareas por `user_id`
con una política de 404 para recursos ajenos. La decisión de diseño ya está tomada —**Spring Boot valida,
no emite tokens**— solo falta implementarla."

## 8. Cierre backend (20 s)
"En resumen: el backend es una API REST limpia en tres capas, con CRUD completo sobre PostgreSQL y las bases
de seguridad ya puestas —credenciales fuera del código y CORS controlado—, lista para incorporar la
validación de JWT. Con esto le paso la palabra al frontend."

---

### Por si preguntan
- **¿Por qué el backend no emite el token?** "Para tener un solo emisor —Supabase—. Dos emisores duplican la
  superficie de ataque y causan inconsistencias de validación."
- **¿Qué es un Resource Server?** "Un servicio que **consume y valida** tokens que emitió otro sistema; no
  gestiona login ni contraseñas."
- **¿Por qué 404 y no 403 para tareas ajenas?** "Para no revelar siquiera que el recurso existe."
