# KAN-32 — Rollback

## Antes de commit
```bash
rm frontend/src/context/AuthContext.jsx
git checkout -- frontend/src/main.jsx
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-32-sesion-global
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
