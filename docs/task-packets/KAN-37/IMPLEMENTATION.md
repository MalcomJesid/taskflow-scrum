# KAN-37 — Implementación

## Prerrequisitos
- KAN-14: `Todo` tiene `UUID userId` (`user_id`).
- KAN-34/35: JWT validado y endpoints protegidos.
- KAN-36: `AuthUtils.currentUserId(jwt)` disponible.

## 1. Repositorio — consultas por usuario
**Ruta:** `backend/src/main/java/com/todo/repository/TodoRepository.java`
```java
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<Todo> findByUserIdAndCompletedOrderByCreatedAtDesc(UUID userId, boolean completed);

    // Clave para operaciones puntuales: solo devuelve la tarea si es del usuario
    Optional<Todo> findByIdAndUserId(Long id, UUID userId);
}
```

## 2. Servicio — recibir y aplicar `userId`
**Ruta:** `backend/src/main/java/com/todo/service/TodoService.java`
```java
public List<Todo> getAllByUser(UUID userId) {
    return todoRepository.findByUserIdOrderByCreatedAtDesc(userId);
}

public Todo createForUser(Todo todo, UUID userId) {
    todo.setUserId(userId);      // la identidad manda; se ignora cualquier userId del body
    todo.setId(null);            // evita que el cliente fuerce un id
    return todoRepository.save(todo);
}

public Todo updateForUser(Long id, Todo data, UUID userId) {
    Todo existing = todoRepository.findByIdAndUserId(id, userId)
        .orElseThrow(() -> new java.util.NoSuchElementException("No encontrada"));
    existing.setTitle(data.getTitle());
    existing.setDescription(data.getDescription());
    existing.setCompleted(data.isCompleted());
    return todoRepository.save(existing);
}

public Todo toggleForUser(Long id, UUID userId) {
    Todo existing = todoRepository.findByIdAndUserId(id, userId)
        .orElseThrow(() -> new java.util.NoSuchElementException("No encontrada"));
    existing.setCompleted(!existing.isCompleted());
    return todoRepository.save(existing);
}

public void deleteForUser(Long id, UUID userId) {
    Todo existing = todoRepository.findByIdAndUserId(id, userId)
        .orElseThrow(() -> new java.util.NoSuchElementException("No encontrada"));
    todoRepository.delete(existing);
}
```

## 3. Controlador — pasar el `sub` a cada método
**Ruta:** `backend/src/main/java/com/todo/controller/TodoController.java`
```java
@GetMapping
public List<Todo> getAll(@AuthenticationPrincipal Jwt jwt) {
    return todoService.getAllByUser(AuthUtils.currentUserId(jwt));
}

@PostMapping
public ResponseEntity<Todo> create(@RequestBody Todo todo, @AuthenticationPrincipal Jwt jwt) {
    Todo created = todoService.createForUser(todo, AuthUtils.currentUserId(jwt));
    return ResponseEntity.status(201).body(created);
}

@PutMapping("/{id}")
public Todo update(@PathVariable Long id, @RequestBody Todo todo, @AuthenticationPrincipal Jwt jwt) {
    return todoService.updateForUser(id, todo, AuthUtils.currentUserId(jwt));
}

@PatchMapping("/{id}/toggle")
public Todo toggle(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
    return todoService.toggleForUser(id, AuthUtils.currentUserId(jwt));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
    todoService.deleteForUser(id, AuthUtils.currentUserId(jwt));
    return ResponseEntity.noContent().build();
}
```

## 4. Política 404 para recursos ajenos
Mapea `NoSuchElementException` a **404** (no revela si la tarea existe pero es de otro):
```java
@ExceptionHandler(java.util.NoSuchElementException.class)
public ResponseEntity<?> notFound() {
    return ResponseEntity.status(404).body(java.util.Map.of("error", "No encontrada"));
}
```

## Frontend (rama aparte) — enviar el Bearer
> Este cambio es de **frontend** y va en su propia rama (no compartir rama con backend). Documentado aquí para
> cerrar el flujo de integración.

En `frontend/src/api/todoApi.js`, adjunta el token de la sesión de Supabase en cada petición:
```js
import axios from 'axios'
import { supabase } from '../lib/supabaseClient'

const api = axios.create({ baseURL: 'http://localhost:8080/api/todos' })

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
```
> No se envía `userId` desde el frontend: el backend lo deriva del `sub`.

## Validación
Requiere DOS usuarios de Supabase para probar el aislamiento. Ver [`TESTS.md`](TESTS.md).
