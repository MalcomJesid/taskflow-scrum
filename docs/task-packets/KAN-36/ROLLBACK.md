# KAN-36 — Rollback

## Antes de commit
```bash
git checkout -- backend/src/main/java/com/todo/controller/TodoController.java
rm backend/src/main/java/com/todo/security/AuthUtils.java
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-36-identidad-usuario
```

## Impacto
Revertir deja los endpoints protegidos (KAN-34/35) pero sin identidad de usuario disponible; KAN-37 quedaría bloqueado.

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
