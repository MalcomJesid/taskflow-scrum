# KAN-15 — Texto para actualizar Jira (copiar y pegar)

### Objetivo
Configurar la conexión a PostgreSQL externalizando las credenciales a variables de entorno y creando un
`.env.example`, para un arranque seguro y reproducible sin secretos en el código.

### Historia de usuario
Como desarrollador del equipo,
quiero que la aplicación se conecte a PostgreSQL mediante variables de entorno,
para levantar el proyecto de forma segura y reproducible sin credenciales en el código.

### Alcance
- Incluye: externalizar `url/username/password/ddl-auto/port/cors` en `application.properties`.
- Incluye: `backend/.env.example` y endurecer `.gitignore` (`.env`, `target/`).
- No incluye: limpieza de `backend/target/` ya versionado (tarea de higiene aparte).
- No incluye: migraciones SQL (KAN-14) ni cambios de código Java.

### Criterios de aceptación
1. El backend arranca leyendo credenciales desde variables de entorno.
2. Sin `.env`, arranca con valores por defecto de desarrollo.
3. `.env` no se versiona; `.env.example` sí existe versionado.
4. Con `docker compose up postgres`, el backend conecta correctamente.

### Implementación técnica
- Archivos modificados: `application.properties`, `.gitignore`.
- Archivos creados: `backend/.env.example`.
- Dependencias: ninguna nueva (opción `spring-dotenv` documentada, no aplicada).
- Decisión técnica: sintaxis `${VAR:default}` para no romper el arranque de quien no tenga `.env`.

### Pruebas realizadas
- Comando: `./mvnw spring-boot:run` → **[completar resultado]**
- Comando: `curl -i http://localhost:8080/api/todos` → **[completar resultado]**
- Comando: `git status --short` tras crear `.env` → **[completar resultado]**
- Evidencia: **[adjuntar capturas]**

### Evidencias
- Captura del log de arranque.
- Captura de `git status` mostrando `.env` ignorado.
- Salida de `curl` al endpoint.
- Enlace al Pull Request.

### Riesgos o bloqueos
- Riesgo: credenciales en Git. Impacto: fuga. Mitigación: env + `.gitignore`. Responsable: Backend.
- Bloqueo: JDK 21 y Maven ausentes en algún entorno. Mitigación: instalar (ver IMPLEMENTATION.md).

### Trazabilidad
- Rama: `KAN-15-configurar-conexion-bd`
- Commit: `KAN-15 chore(config): externalizar credenciales de base de datos a variables de entorno`
- Pull request: **[enlace]**
- Dependencias Jira: habilita KAN-14.

### Definition of Done
- [ ] Criterios de aceptación cumplidos.
- [ ] Código compilado.
- [ ] Pruebas exitosas.
- [ ] Evidencia adjunta.
- [ ] Documentación actualizada.
- [ ] Sin secretos.
- [ ] Pull request revisado.
- [ ] Entregable aprobado por el Product Owner.

> No cambiar el estado a Done si algún punto anterior no se cumple.
