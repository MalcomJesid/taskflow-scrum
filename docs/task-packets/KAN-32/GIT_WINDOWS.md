# KAN-32 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-32-sesion-global
```

## 3. Crear/editar archivos
Crea `frontend/src/context/AuthContext.jsx` y edita `frontend/src/main.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add frontend/src/context/AuthContext.jsx
```
```powershell
git add frontend/src/main.jsx
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
git commit -m "KAN-32 feat(auth): manejar sesion global con AuthContext"
```

## 8. Subir rama
```powershell
git push -u origin KAN-32-sesion-global
```

## 9. Pull Request
- Título: `KAN-32 Manejar sesión global (AuthContext)`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
