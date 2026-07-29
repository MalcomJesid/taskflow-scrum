# KAN-37 — Rollback

## Backend — antes de commit
```bash
git checkout -- backend/src/main/java/com/todo/repository/TodoRepository.java
git checkout -- backend/src/main/java/com/todo/service/TodoService.java
git checkout -- backend/src/main/java/com/todo/controller/TodoController.java
```

## Frontend — antes de commit (rama aparte)
```bash
git checkout -- frontend/src/api/todoApi.js
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin <rama>
```

## Impacto
Revertir el backend hace que un token válido vuelva a ver todas las tareas (se pierde el aislamiento). Coordina el
revert de ambas ramas si es necesario.

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
