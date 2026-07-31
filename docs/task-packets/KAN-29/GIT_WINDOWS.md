# KAN-29 — Guía Git para Windows (PowerShell)

> Un comando por línea. No uses `&&`. Valida el repositorio primero (§4 doc maestro).

## 0. Validar repositorio
```powershell
git remote get-url origin
```
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`.

## 1. Actualizar main
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```

## 2. Crear rama
```powershell
git checkout -b KAN-29-configurar-supabase-sdk
```

## 3. Instalar y crear archivos
```powershell
cd frontend
```
```powershell
npm install @supabase/supabase-js
```
Crea `src/lib/supabaseClient.js` y `.env.example` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).
```powershell
cd ..
```

## 4. Revisar antes de agregar
```powershell
git status --short
```
```powershell
git diff
```

## 5. Agregar solo lo de esta tarea
```powershell
git add frontend/package.json
```
```powershell
git add frontend/package-lock.json
```
```powershell
git add frontend/src/lib/supabaseClient.js
```
```powershell
git add frontend/.env.example
```

## 6. Revisar lo agregado
```powershell
git diff --cached
```
```powershell
git status
```
- **Importante:** confirma que `frontend/.env` **no** aparece (no debe subirse).

## 7. Commit
```powershell
git commit -m "KAN-29 feat(auth): configurar cliente de Supabase"
```

## 8. Subir rama
```powershell
git push -u origin KAN-29-configurar-supabase-sdk
```

## 9. Pull Request
- Título: `KAN-29 Instalar y configurar Supabase SDK`

## Detenerse sin dañar
- `git checkout -- <archivo>` / `git checkout main`.
