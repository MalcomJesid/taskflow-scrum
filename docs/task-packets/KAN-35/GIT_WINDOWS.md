# KAN-35 — Guía Git para Windows (PowerShell)

> Un comando por línea. No uses `&&`. Valida el repositorio primero (§4 doc maestro).

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

## 2. Crear rama
```powershell
git checkout -b KAN-35-proteger-endpoints
```

## 3. Editar SecurityConfig
Ajusta `SecurityConfig.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add backend/src/main/java/com/todo/config/SecurityConfig.java
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
git commit -m "KAN-35 feat(security): exigir jwt en endpoints de tareas"
```

## 8. Subir rama
```powershell
git push -u origin KAN-35-proteger-endpoints
```

## 9. Pull Request
- Título: `KAN-35 Proteger los endpoints de tareas`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
