# KAN-16 — Rollback

Al ser una tarea documental, el rollback es simple.

## Antes de commit
```bash
git checkout -- docs/task-packets/KAN-16
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-16-decision-registro-supabase
```

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
