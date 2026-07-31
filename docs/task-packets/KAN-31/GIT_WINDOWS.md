# KAN-31 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-31-pantalla-login
```

## 3. Crear la pantalla
Crea `frontend/src/pages/Login.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add frontend/src/pages/Login.jsx
```
```powershell
git add frontend/src/styles/index.css
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
git commit -m "KAN-31 feat(auth): crear formulario de login"
```

## 8. Subir rama
```powershell
git push -u origin KAN-31-pantalla-login
```

## 9. Pull Request
- Título: `KAN-31 Crear pantalla de Login`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
