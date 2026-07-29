# KAN-35 — Rollback

## Antes de commit
```bash
git checkout -- backend/src/main/java/com/todo/config/SecurityConfig.java
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-35-proteger-endpoints
```

## Impacto
Revertir vuelve a la regla base de KAN-34 (menos granular). No reabre del todo si KAN-34 sigue activo.

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
