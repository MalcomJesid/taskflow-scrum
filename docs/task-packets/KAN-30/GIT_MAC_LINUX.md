# KAN-30 — Guía Git para macOS y Linux

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
git checkout -b KAN-30-pantalla-registro
```

## 3. Crear la pantalla
Crea `frontend/src/pages/Register.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add frontend/src/pages/Register.jsx
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
git commit -m "KAN-30 feat(auth): crear formulario de registro"
```

## 8. Subir rama
```bash
git push -u origin KAN-30-pantalla-registro
```

## 9. Pull Request
- Título: `KAN-30 Crear pantalla de Registro`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
