# KAN-30 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-30-pantalla-registro
```

## 3. Crear la pantalla
Crea `frontend/src/pages/Register.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add frontend/src/pages/Register.jsx
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
git commit -m "KAN-30 feat(auth): crear formulario de registro"
```

## 8. Subir rama
```powershell
git push -u origin KAN-30-pantalla-registro
```

## 9. Pull Request
- Título: `KAN-30 Crear pantalla de Registro`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
