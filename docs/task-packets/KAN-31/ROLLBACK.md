# KAN-31 — Rollback

## Antes de commit
```bash
rm frontend/src/pages/Login.jsx
git checkout -- frontend/src/styles/index.css
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-31-pantalla-login
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
