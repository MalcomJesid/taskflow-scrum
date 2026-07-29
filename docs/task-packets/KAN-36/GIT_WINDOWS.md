# KAN-36 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-36-identidad-usuario
```

## 3. Editar archivos
Modifica `TodoController.java` y crea (opcional) `security/AuthUtils.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add backend/src/main/java/com/todo/controller/TodoController.java
```
```powershell
git add backend/src/main/java/com/todo/security/AuthUtils.java
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
git commit -m "KAN-36 feat(security): extraer identidad del usuario desde el claim sub"
```

## 8. Subir rama
```powershell
git push -u origin KAN-36-identidad-usuario
```

## 9. Pull Request
- Título: `KAN-36 Extraer identidad del usuario desde el JWT`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
