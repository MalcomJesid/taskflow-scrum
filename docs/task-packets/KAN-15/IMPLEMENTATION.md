# KAN-15 — Implementación

## Contexto
Hoy las credenciales están **en texto plano** en:
- `backend/src/main/resources/application.properties` (`todouser` / `todopass`)
- `docker-compose.yml` (`POSTGRES_PASSWORD: todopass`)

Objetivo: que Spring lea las credenciales desde variables de entorno con **valores por defecto** de
desarrollo, de modo que el arranque siga funcionando sin `.env`, pero permita sobreescribir en cada máquina.

## Requisitos de entorno
- **JDK 21** (el `pom.xml` fija `java.version=21`). En esta máquina hay Temurin 17 → instalar 21.
  - Con SDKMAN: `sdk install java 21.0.4-tem` y `sdk use java 21.0.4-tem`.
- **Maven**: no hay `mvn` ni wrapper. Opciones: instalar Maven (`brew install maven`) o añadir el wrapper
  `mvnw` (recomendado; se puede generar con `mvn -N wrapper:wrapper` desde una máquina con Maven).
- **PostgreSQL**: vía Docker (`docker compose up -d postgres`) o instalación local en `localhost:5432`.

## Paso 1 — Externalizar credenciales en `application.properties`
**Ruta:** `backend/src/main/resources/application.properties`

Reemplazar el contenido por:
```properties
# Conexion a la base de datos (credenciales externalizadas via variables de entorno)
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/tododb}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:todouser}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:todopass}
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate genera/actualiza la BD automaticamente (solo desarrollo)
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

server.port=${SERVER_PORT:8080}

# CORS permitir React en desarrollo
spring.web.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173}
```
> La sintaxis `${VAR:default}` usa la variable de entorno si existe; si no, el valor por defecto de desarrollo.
> Así el arranque no se rompe para quien aún no tenga `.env`.

## Paso 2 — Crear `.env.example`
**Ruta:** `backend/.env.example`
```dotenv
# Copia este archivo a .env y ajusta los valores. NUNCA subas .env a Git.
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tododb
SPRING_DATASOURCE_USERNAME=todouser
SPRING_DATASOURCE_PASSWORD=todopass
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

## Paso 3 — Endurecer `.gitignore`
**Ruta:** `.gitignore` (raíz). Asegurar que contiene:
```gitignore
node_modules/
.env
.env.local
.vscode/

# Backend build
backend/target/
target/
*.class
```
> **Nota:** `backend/target/` ya está versionado por error (hallazgo FASE 0). Su limpieza
> (`git rm -r --cached backend/target`) se trata como tarea de higiene separada para no mezclar alcances;
> aquí solo se añade al ignore.

## Paso 4 — Cómo cargar el `.env` (elige uno)
- **Opción simple (recomendada para principiantes):** exportar variables en la terminal antes de arrancar,
  o dejar los valores por defecto (no hacer nada).
- **Opción `.env` automática:** añadir la dependencia `spring-dotenv` (`me.paulschwarz:spring-dotenv`) —
  **no** se incluye aquí para no introducir librerías sin justificar; se documenta como opción.

## Validación
```bash
# con PostgreSQL arriba:
docker compose up -d postgres
# arrancar backend (según herramienta disponible):
./mvnw spring-boot:run      # si existe wrapper
# o
mvn spring-boot:run         # si Maven está instalado
```
Debe verse en logs: conexión establecida y `Started TodoApplication`. Ver [`TESTS.md`](TESTS.md).
