# KAN-14 — Guía Git para macOS y Linux

> Un comando por línea. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```bash
git remote get-url origin
```
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`. Si es otro, **detente** y corrige.

## 1. Actualizar main
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```

## 2. Crear rama
```bash
git checkout -b KAN-14-disenar-modelo-usuarios
```

## 3. Aplicar cambios
Edita `Todo.java` y crea `schema.sql` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md). Si hay parche:
```bash
git apply docs/task-packets/KAN-14/KAN-14.patch
```

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add backend/src/main/java/com/todo/model/Todo.java
```
```bash
git add docs/task-packets/KAN-14/schema.sql
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
git commit -m "KAN-14 docs(database): documentar modelo de usuarios y asociacion de tareas"
```

## 8. Subir rama
```bash
git push -u origin KAN-14-disenar-modelo-usuarios
```

## 9. Pull Request
- Título: `KAN-14 Diseñar tabla Users / Profiles`
- Descripción: plantilla del doc maestro §4.

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
