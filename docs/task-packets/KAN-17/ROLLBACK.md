# KAN-17 — Rollback

## Antes de commit
```bash
git checkout -- docs/task-packets/KAN-17
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-17-decision-login-supabase
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
