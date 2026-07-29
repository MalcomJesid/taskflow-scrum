# KAN-18 — Rollback

## Antes de commit
```bash
git checkout -- docs/task-packets/KAN-18
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-18-modelo-jwt-supabase
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
