# KAN-32 — Guía Git para macOS y Linux

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
git checkout -b KAN-32-sesion-global
```

## 3. Crear/editar archivos
Crea `frontend/src/context/AuthContext.jsx` y edita `frontend/src/main.jsx` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add frontend/src/context/AuthContext.jsx
```
```bash
git add frontend/src/main.jsx
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
git commit -m "KAN-32 feat(auth): manejar sesion global con AuthContext"
```

## 8. Subir rama
```bash
git push -u origin KAN-32-sesion-global
```

## 9. Pull Request
- Título: `KAN-32 Manejar sesión global (AuthContext)`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
