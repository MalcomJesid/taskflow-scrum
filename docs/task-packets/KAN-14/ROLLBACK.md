# KAN-14 — Rollback

## Antes de commit
```bash
git checkout -- backend/src/main/java/com/todo/model/Todo.java
rm docs/task-packets/KAN-14/schema.sql
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```
> Solo si el commit es exclusivamente de KAN-14.

## Después de push
No toques `main`. No fusiones el PR, o revierte:
```bash
git revert <hash-del-commit>
git push origin KAN-14-disenar-modelo-usuarios
```

## Rollback de la base de datos
Si la columna `user_id NOT NULL` bloquea inserciones existentes:
```sql
ALTER TABLE todos ALTER COLUMN user_id DROP NOT NULL;   -- temporal
-- o revertir el campo en la entidad y reiniciar el backend
```
> En entorno académico limpio se puede `DROP TABLE todos;` y dejar que Hibernate la recree.

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
