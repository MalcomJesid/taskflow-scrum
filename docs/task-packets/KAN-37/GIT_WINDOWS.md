# KAN-37 — Guía Git para Windows (PowerShell)

> Un comando por línea. No uses `&&`. **Frontend y backend en ramas separadas.** Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```powershell
git remote get-url origin
```

## 1. Actualizar main
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```

## 2. Crear rama (BACKEND)
```powershell
git checkout -b KAN-37-aislar-tareas-por-usuario
```

## 3. Editar backend
Modifica `TodoRepository.java`, `TodoService.java`, `TodoController.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo backend
```powershell
git add backend/src/main/java/com/todo/repository/TodoRepository.java
```
```powershell
git add backend/src/main/java/com/todo/service/TodoService.java
```
```powershell
git add backend/src/main/java/com/todo/controller/TodoController.java
```

## 6. Revisar lo agregado
```powershell
git diff --cached
```
```powershell
git status
```

## 7. Commit
```powershell
git commit -m "KAN-37 feat(security): asociar y filtrar tareas por usuario autenticado"
```

## 8. Subir rama
```powershell
git push -u origin KAN-37-aislar-tareas-por-usuario
```

## 9. Pull Request
- Título: `KAN-37 Asociar y filtrar tareas por usuario`

## 10. Cambio de FRONTEND (rama aparte)
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```
```powershell
git checkout -b KAN-37-frontend-bearer
```
Edita `frontend/src/api/todoApi.js` (interceptor Bearer).
```powershell
git add frontend/src/api/todoApi.js
```
```powershell
git commit -m "KAN-37 feat(auth): adjuntar token bearer en peticiones al backend"
```
```powershell
git push -u origin KAN-37-frontend-bearer
```

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
