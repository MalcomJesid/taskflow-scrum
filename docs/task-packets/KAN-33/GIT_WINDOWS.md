# KAN-33 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-33-rutas-privadas
```

## 3. Instalar dependencia
```powershell
cd frontend
```
```powershell
npm install react-router-dom
```
```powershell
cd ..
```

## 4. Crear/editar archivos
Crea `ProtectedRoute.jsx`, edita `App.jsx` y (si aplica) extrae `TodoApp.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 5. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 6. Agregar solo lo de esta tarea
```powershell
git add frontend/package.json
```
```powershell
git add frontend/package-lock.json
```
```powershell
git add frontend/src/components/ProtectedRoute.jsx
```
```powershell
git add frontend/src/App.jsx
```
```powershell
git add frontend/src/TodoApp.jsx
```

## 7. Revisar lo agregado
```powershell
git diff --cached
```
```powershell
git status
```

## 8. Commit
```powershell
git commit -m "KAN-33 feat(auth): proteger rutas privadas con ProtectedRoute"
```

## 9. Subir rama
```powershell
git push -u origin KAN-33-rutas-privadas
```

## 10. Pull Request
- Título: `KAN-33 Proteger rutas privadas (ProtectedRoute)`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
