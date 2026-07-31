# KAN-29 — Rollback

## Antes de commit
```bash
git checkout -- frontend/package.json frontend/package-lock.json
rm frontend/src/lib/supabaseClient.js
rm frontend/.env.example
```
Desinstalar el paquete (opcional):
```bash
cd frontend && npm uninstall @supabase/supabase-js && cd ..
```

## Después de commit (sin push)
```bash
git reset --hard HEAD~1
```

## Después de push
```bash
git revert <hash-del-commit>
git push origin KAN-29-configurar-supabase-sdk
```

## Si se subió una clave real por error (incidente)
1. Rota la clave en Supabase (Settings → API → reset).
2. Elimina el `.env` del control de versiones y del historial.
3. Documenta el incidente en el `risk-register`.

## Regla de oro
Nunca `--force` ni cambios directos en `main`.
