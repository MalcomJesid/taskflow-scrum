# KAN-29 — Guía Git para macOS y Linux

> Un comando por línea. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```bash
git remote get-url origin
```

## 1. Actualizar main
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```

## 2. Crear rama
```bash
git checkout -b KAN-29-configurar-supabase-sdk
```

## 3. Instalar y crear archivos
```bash
cd frontend
```
```bash
npm install @supabase/supabase-js
```
Crea `src/lib/supabaseClient.js` y `.env.example` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).
```bash
cd ..
```

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add frontend/package.json
```
```bash
git add frontend/package-lock.json
```
```bash
git add frontend/src/lib/supabaseClient.js
```
```bash
git add frontend/.env.example
```

## 6. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```
- **Importante:** confirma que `frontend/.env` **no** aparece.

## 7. Commit
```bash
git commit -m "KAN-29 feat(auth): configurar cliente de Supabase"
```

## 8. Subir rama
```bash
git push -u origin KAN-29-configurar-supabase-sdk
```

## 9. Pull Request
- Título: `KAN-29 Instalar y configurar Supabase SDK`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
