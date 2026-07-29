# KAN-14 — Guía Git para Windows (PowerShell)

> Un comando por línea. No uses `&&`. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```powershell
git remote get-url origin
```
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`. Si es otro, **detente** y corrige.

## 1. Actualizar main
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```

## 2. Crear rama
```powershell
git checkout -b KAN-14-disenar-modelo-usuarios
```

## 3. Aplicar cambios
Edita `Todo.java` y crea `schema.sql` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md). Si hay parche:
```powershell
git apply docs/task-packets/KAN-14/KAN-14.patch
```

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add backend/src/main/java/com/todo/model/Todo.java
```
```powershell
git add docs/task-packets/KAN-14/schema.sql
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
git commit -m "KAN-14 docs(database): documentar modelo de usuarios y asociacion de tareas"
```

## 8. Subir rama
```powershell
git push -u origin KAN-14-disenar-modelo-usuarios
```

## 9. Pull Request
- Título: `KAN-14 Diseñar tabla Users / Profiles`
- Descripción: plantilla del doc maestro §4.

## Detenerse sin dañar
- `git checkout -- <archivo>` descarta cambios no agregados.
- `git checkout main` vuelve a main sin subir nada.
