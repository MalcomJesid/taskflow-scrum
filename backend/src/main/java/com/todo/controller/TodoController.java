package com.todo.controller;

import com.todo.model.Todo;
import com.todo.security.AuthUtils;
import com.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAll(
            @RequestParam(required = false) Boolean completed,
            @AuthenticationPrincipal Jwt jwt) {
        UUID userId = AuthUtils.currentUserId(jwt);
        if (completed != null) {
            return ResponseEntity.ok(todoService.getByStatusForUser(completed, userId));
        }
        return ResponseEntity.ok(todoService.getAllByUser(userId));
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo, @AuthenticationPrincipal Jwt jwt) {
        Todo created = todoService.createForUser(todo, AuthUtils.currentUserId(jwt));
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo todo, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(todoService.updateForUser(id, todo, AuthUtils.currentUserId(jwt)));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggle(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(todoService.toggleForUser(id, AuthUtils.currentUserId(jwt)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        todoService.deleteForUser(id, AuthUtils.currentUserId(jwt));
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler({IllegalStateException.class, IllegalArgumentException.class})
    public ResponseEntity<?> handleAuth(RuntimeException ex) {
        return ResponseEntity.status(401).body(Map.of("error", "Token inv\u00e1lido"));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> notFound() {
        return ResponseEntity.status(404).body(Map.of("error", "No encontrada"));
    }
}
