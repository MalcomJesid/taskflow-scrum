# KAN-33 — Guía Git para macOS y Linux

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
git checkout -b KAN-33-rutas-privadas
```

## 3. Instalar dependencia
```bash
cd frontend
```
```bash
npm install react-router-dom
```
```bash
cd ..
```

## 4. Crear/editar archivos
Crea `ProtectedRoute.jsx`, edita `App.jsx` y (si aplica) extrae `TodoApp.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 5. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 6. Agregar solo lo de esta tarea
```bash
git add frontend/package.json
```
```bash
git add frontend/package-lock.json
```
```bash
git add frontend/src/components/ProtectedRoute.jsx
```
```bash
git add frontend/src/App.jsx
```
```bash
git add frontend/src/TodoApp.jsx
```

## 7. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 8. Commit
```bash
git commit -m "KAN-33 feat(auth): proteger rutas privadas con ProtectedRoute"
```

## 9. Subir rama
```bash
git push -u origin KAN-33-rutas-privadas
```

## 10. Pull Request
- Título: `KAN-33 Proteger rutas privadas (ProtectedRoute)`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
