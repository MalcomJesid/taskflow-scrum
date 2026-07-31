# KAN-35 — Guía Git para macOS y Linux

> Un comando por línea. Valida el repositorio primero (§4 doc maestro).

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

## 2. Crear rama
```bash
git checkout -b KAN-35-proteger-endpoints
```

## 3. Editar SecurityConfig
Ajusta `SecurityConfig.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add backend/src/main/java/com/todo/config/SecurityConfig.java
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
git commit -m "KAN-35 feat(security): exigir jwt en endpoints de tareas"
```

## 8. Subir rama
```bash
git push -u origin KAN-35-proteger-endpoints
```

## 9. Pull Request
- Título: `KAN-35 Proteger los endpoints de tareas`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
