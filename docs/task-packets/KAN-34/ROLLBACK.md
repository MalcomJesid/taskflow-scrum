# KAN-34 — Rollback

## Antes de commit
```bash
git checkout -- backend/pom.xml
git checkout -- backend/src/main/resources/application.properties
git checkout -- backend/.env.example
rm backend/src/main/java/com/todo/config/SecurityConfig.java
```
Si eliminaste `CorsConfig.java`, restáuralo:
```bash
git checkout -- backend/src/main/java/com/todo/config/CorsConfig.java
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-34-resource-server
```

## Impacto
Revertir reabre `/api/**` sin autenticación. Coordina con KAN-35/36/37 (dependen de esta config).

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
