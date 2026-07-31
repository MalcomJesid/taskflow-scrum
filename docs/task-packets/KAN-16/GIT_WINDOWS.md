# KAN-16 — Guía Git para Windows (PowerShell)

> Un comando por línea. No uses `&&`. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```powershell
git remote get-url origin
```
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`.

## 1. Actualizar main
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```

## 2. Crear rama
```powershell
git checkout -b KAN-16-decision-registro-supabase
```

## 3. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 4. Agregar la documentación de esta tarea
```powershell
git add docs/task-packets/KAN-16
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
git commit -m "KAN-16 docs(auth): documentar decision de registro via Supabase (sin endpoint propio)"
```

## 7. Subir rama
```powershell
git push -u origin KAN-16-decision-registro-supabase
```

## 8. Pull Request
- Título: `KAN-16 Crear endpoint Registro (decisión: Supabase Auth)`
- Descripción: plantilla del doc maestro §4.

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
