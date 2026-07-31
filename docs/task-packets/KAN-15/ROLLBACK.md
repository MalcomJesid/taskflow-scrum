# KAN-15 — Rollback (revertir con seguridad)

## Si aún NO has hecho commit
Descartar los cambios de los archivos tocados:
```bash
git checkout -- backend/src/main/resources/application.properties
git checkout -- .gitignore
```
Eliminar el archivo nuevo:
```bash
rm backend/.env.example
```

## Si YA hiciste commit pero NO push
Deshacer el último commit conservando los archivos como estaban antes:
```bash
git reset --hard HEAD~1
```
> `--hard` descarta cambios. Úsalo solo si estás seguro de que ese commit es únicamente de KAN-15.

## Si YA hiciste push de la rama
No borres nada en `main`. Simplemente **no fusiones** el PR, o crea un commit de reversión:
```bash
git revert <hash-del-commit>
git push origin KAN-15-configurar-conexion-bd
```

## Si el `.env` real se subió por error (incidente de seguridad)
1. Rota inmediatamente las credenciales afectadas en PostgreSQL/Supabase.
2. Elimina el archivo del historial (coordinar con el equipo antes):
   ```bash
   git rm --cached backend/.env
   git commit -m "KAN-15 chore(security): remover .env versionado por error"
   ```
3. Documenta el incidente en el `risk-register`.

## Regla de oro
Ante cualquier duda, **no** hagas `--force` ni toques `main`. Consulta con el Scrum Master.
