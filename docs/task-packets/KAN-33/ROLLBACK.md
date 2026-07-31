# KAN-33 — Rollback

## Antes de commit
```bash
rm frontend/src/components/ProtectedRoute.jsx
git checkout -- frontend/src/App.jsx
git checkout -- frontend/package.json frontend/package-lock.json
```
Si extrajiste `TodoApp.jsx`, revierte el refactor devolviendo la UI a `App.jsx` o:
```bash
rm frontend/src/TodoApp.jsx
```

## Desinstalar la dependencia (opcional)
```bash
cd frontend
npm uninstall react-router-dom
cd ..
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-33-rutas-privadas
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
