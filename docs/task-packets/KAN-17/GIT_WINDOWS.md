# KAN-17 — Guía Git para Windows (PowerShell)

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
git checkout -b KAN-17-decision-login-supabase
```

## 3. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 4. Agregar la documentación
```powershell
git add docs/task-packets/KAN-17
```

## 5. Revisar lo agregado
```powershell
git diff --cached
```
```powershell
git status
```

## 6. Commit
```powershell
git commit -m "KAN-17 docs(auth): documentar decision de login via Supabase (sin endpoint propio)"
```

## 7. Subir rama
```powershell
git push -u origin KAN-17-decision-login-supabase
```

## 8. Pull Request
- Título: `KAN-17 Crear endpoint Login (decisión: Supabase Auth)`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
