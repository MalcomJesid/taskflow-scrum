# KAN-35 — Implementación

## Prerrequisito
KAN-34 (Resource Server activo).

## 1. Afinar reglas de autorización
En `SecurityConfig.java`, ajusta `authorizeHttpRequests` para ser explícito con `/api/todos/**` y permitir el
preflight `OPTIONS`:
```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
    .requestMatchers("/api/todos/**").authenticated()
    .anyRequest().denyAll()
)
```

> `denyAll()` en el resto cierra rutas no previstas por defecto (más seguro que `permitAll`). Si hay un endpoint
> público legítimo (p. ej. health check), decláralo explícitamente antes.

## 2. Respuestas de error limpias (sin fugas)
Define un `AuthenticationEntryPoint` (401) y un `AccessDeniedHandler` (403) con cuerpo mínimo:
```java
import org.springframework.http.MediaType;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

@Bean
public AuthenticationEntryPoint authEntryPoint() {
    return (request, response, authException) -> {
        response.setStatus(401);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"error\":\"No autorizado\"}");
    };
}

@Bean
public AccessDeniedHandler accessDeniedHandler() {
    return (request, response, ex) -> {
        response.setStatus(403);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"error\":\"Acceso denegado\"}");
    };
}
```
Y enlázalos en el filter chain:
```java
.exceptionHandling(e -> e
    .authenticationEntryPoint(authEntryPoint())
    .accessDeniedHandler(accessDeniedHandler())
)
```
> El cuerpo **no** incluye `authException.getMessage()` ni stacktrace (regla de seguridad del doc maestro).

## 3. Verificación por método
Probar los 5 verbos (GET, POST, PUT, PATCH `/toggle`, DELETE) sin token → 401 y con token → OK. Ver [`TESTS.md`](TESTS.md).

## Nota de alcance
Aquí solo se exige **autenticación**. El **aislamiento por usuario** (que un usuario no vea/edite tareas de otro)
se implementa en KAN-37. Sin KAN-37, un token válido ve todas las tareas.
