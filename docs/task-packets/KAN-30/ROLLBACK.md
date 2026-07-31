# KAN-30 — Rollback

## Antes de commit
```bash
rm frontend/src/pages/Register.jsx
git checkout -- frontend/src/styles/index.css
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-30-pantalla-registro
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
