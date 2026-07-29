# KAN-34 — Implementación

## Concepto clave
Supabase **emite** el JWT. Spring Boot lo **valida** como *OAuth2 Resource Server*: verifica firma (con las claves
públicas del JWKS de Supabase), el `issuer` y la expiración. El backend **nunca** emite tokens.

## 1. Dependencias — `backend/pom.xml`
Añadir dentro de `<dependencies>`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
```

## 2. Configuración — `application.properties`
Supabase expone el issuer en `https://<PROJECT_REF>.supabase.co/auth/v1` y el JWKS en
`.../auth/v1/.well-known/jwks.json`. Usa variables de entorno (coherente con KAN-15):
```properties
# OAuth2 Resource Server (Supabase)
spring.security.oauth2.resourceserver.jwt.issuer-uri=${SUPABASE_ISSUER_URI:https://TU_PROYECTO.supabase.co/auth/v1}
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=${SUPABASE_JWK_SET_URI:https://TU_PROYECTO.supabase.co/auth/v1/.well-known/jwks.json}
```

> Añade `SUPABASE_ISSUER_URI` y `SUPABASE_JWK_SET_URI` a `backend/.env.example` (creado en KAN-15).

## 3. SecurityConfig
**Ruta:** `backend/src/main/java/com/todo/config/SecurityConfig.java`
```java
package com.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {}) // usa el bean corsConfigurationSource de abajo
            .csrf(csrf -> csrf.disable()) // API stateless con JWT
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // En KAN-35 se afina qué se protege; base: exigir autenticación en /api/**
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {}));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
```

> **Nota sobre `CorsConfig` existente:** al activar Spring Security, el CORS debe integrarse en el
> `SecurityFilterChain`. Este bean sustituye funcionalmente al `CorsConfig` previo para las rutas `/api/**`.
> Coordina con el equipo si se elimina `CorsConfig.java` (documenta en el PR).

## 4. Manejo de errores sin fugas
Por defecto Spring devuelve 401 sin stacktrace. **No** añadas manejadores que impriman detalles de la excepción al
cliente (regla de seguridad del doc maestro).

## Validación
Ver [`TESTS.md`](TESTS.md). Requiere un JWT real de Supabase para la prueba de éxito.
