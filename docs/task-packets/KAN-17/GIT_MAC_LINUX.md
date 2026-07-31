# KAN-17 — Guía Git para macOS y Linux

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
git checkout -b KAN-17-decision-login-supabase
```

## 3. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 4. Agregar la documentación
```bash
git add docs/task-packets/KAN-17
```

## 5. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 6. Commit
```bash
git commit -m "KAN-17 docs(auth): documentar decision de login via Supabase (sin endpoint propio)"
```

## 7. Subir rama
```bash
git push -u origin KAN-17-decision-login-supabase
```

## 8. Pull Request
- Título: `KAN-17 Crear endpoint Login (decisión: Supabase Auth)`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
