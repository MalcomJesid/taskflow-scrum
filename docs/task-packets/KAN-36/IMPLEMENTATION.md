# KAN-36 — Implementación

## Prerrequisito
KAN-34/35 (JWT validado y endpoints protegidos).

## Concepto
Spring Security ya validó el token; el principal es un `org.springframework.security.oauth2.jwt.Jwt`. El
identificador del usuario en Supabase es el claim estándar `sub` (un UUID). **Nunca** se usa un `userId` enviado
por el frontend.

## 1. (Opcional) Helper de identidad
**Ruta:** `backend/src/main/java/com/todo/security/AuthUtils.java`
```java
package com.todo.security;

import org.springframework.security.oauth2.jwt.Jwt;
import java.util.UUID;

public final class AuthUtils {
    private AuthUtils() {}

    /** Obtiene el UUID del usuario autenticado desde el claim `sub`. */
    public static UUID currentUserId(Jwt jwt) {
        String sub = jwt.getSubject();
        if (sub == null || sub.isBlank()) {
            throw new IllegalStateException("Token sin claim sub");
        }
        return UUID.fromString(sub); // lanza IllegalArgumentException si no es UUID
    }
}
```

## 2. Inyectar el JWT en el controlador
**Ruta:** `backend/src/main/java/com/todo/controller/TodoController.java` — añade el principal a cada método:
```java
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import com.todo.security.AuthUtils;
import java.util.UUID;

@GetMapping
public List<Todo> getAll(@AuthenticationPrincipal Jwt jwt) {
    UUID userId = AuthUtils.currentUserId(jwt);
    // En KAN-37 se usa userId para filtrar. Aquí solo se demuestra la extracción.
    return todoService.getAll(); // (se cambiará por getAllByUser(userId) en KAN-37)
}
```
> Repite el patrón `@AuthenticationPrincipal Jwt jwt` en POST/PUT/PATCH/DELETE. El uso real de `userId` para
> filtrar/asociar llega en KAN-37; aquí solo se garantiza que la identidad está disponible y es fiable.

## 3. Manejo de error controlado
Un `sub` inválido/ausente debe traducirse a un error limpio (p. ej. 401/400) sin exponer stacktrace. Puedes usar un
`@ExceptionHandler` que devuelva un cuerpo JSON mínimo:
```java
@org.springframework.web.bind.annotation.ExceptionHandler({IllegalStateException.class, IllegalArgumentException.class})
public org.springframework.http.ResponseEntity<?> handleAuth(RuntimeException ex) {
    // No exponer ex.getMessage() si contiene detalles internos
    return org.springframework.http.ResponseEntity.status(401).body(java.util.Map.of("error", "Token inválido"));
}
```

## 4. Logging seguro
Si necesitas trazar, registra **solo** `userId` (el `sub`), nunca el token:
```java
// OK: log.info("Petición del usuario {}", userId);
// PROHIBIDO: log.info("token={}", jwt.getTokenValue());
```

## Validación
Ver [`TESTS.md`](TESTS.md). Requiere un JWT real de Supabase.
