# KAN-16 — Guía Git para macOS y Linux

> Un comando por línea. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```bash
git remote get-url origin
```
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`.

## 1. Actualizar main
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```

## 2. Crear rama
```bash
git checkout -b KAN-16-decision-registro-supabase
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
git add docs/task-packets/KAN-16
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
git commit -m "KAN-16 docs(auth): documentar decision de registro via Supabase (sin endpoint propio)"
```

## 7. Subir rama
```bash
git push -u origin KAN-16-decision-registro-supabase
```

## 8. Pull Request
- Título: `KAN-16 Crear endpoint Registro (decisión: Supabase Auth)`
- Descripción: plantilla del doc maestro §4.

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
