# KAN-31 — Guía Git para macOS y Linux

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
git checkout -b KAN-31-pantalla-login
```

## 3. Crear la pantalla
Crea `frontend/src/pages/Login.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add frontend/src/pages/Login.jsx
```
```bash
git add frontend/src/styles/index.css
```

## 6. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 7. Commit
```bash
git commit -m "KAN-31 feat(auth): crear formulario de login"
```

## 8. Subir rama
```bash
git push -u origin KAN-31-pantalla-login
```

## 9. Pull Request
- Título: `KAN-31 Crear pantalla de Login`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
