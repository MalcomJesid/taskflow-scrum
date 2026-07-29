# KAN-37 — Guía Git para macOS y Linux

> Un comando por línea. **Frontend y backend en ramas separadas.** Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```bash
git remote get-url origin
```

## 1. Actualizar main
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```

## 2. Crear rama (BACKEND)
```bash
git checkout -b KAN-37-aislar-tareas-por-usuario
```

## 3. Editar backend
Modifica `TodoRepository.java`, `TodoService.java`, `TodoController.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo backend
```bash
git add backend/src/main/java/com/todo/repository/TodoRepository.java
```
```bash
git add backend/src/main/java/com/todo/service/TodoService.java
```
```bash
git add backend/src/main/java/com/todo/controller/TodoController.java
```

## 6. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 7. Commit
```bash
git commit -m "KAN-37 feat(security): asociar y filtrar tareas por usuario autenticado"
```

## 8. Subir rama
```bash
git push -u origin KAN-37-aislar-tareas-por-usuario
```

## 9. Pull Request
- Título: `KAN-37 Asociar y filtrar tareas por usuario`

## 10. Cambio de FRONTEND (rama aparte)
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```
```bash
git checkout -b KAN-37-frontend-bearer
```
Edita `frontend/src/api/todoApi.js` (interceptor Bearer).
```bash
git add frontend/src/api/todoApi.js
```
```bash
git commit -m "KAN-37 feat(auth): adjuntar token bearer en peticiones al backend"
```
```bash
git push -u origin KAN-37-frontend-bearer
```

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
