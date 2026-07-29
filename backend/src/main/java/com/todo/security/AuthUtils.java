package com.todo.security;

import org.springframework.security.oauth2.jwt.Jwt;
import java.util.UUID;

public final class AuthUtils {
    private AuthUtils() {}

    public static UUID currentUserId(Jwt jwt) {
        String sub = jwt.getSubject();
        if (sub == null || sub.isBlank()) {
            throw new IllegalStateException("Token sin claim sub");
        }
        return UUID.fromString(sub);
    }
}
