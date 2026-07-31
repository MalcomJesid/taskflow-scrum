# KAN-15 — Guía Git para Windows (PowerShell)

> Un comando por línea. **No** uses `&&` (PowerShell antiguo no lo admite como separador).
> Antes de empezar, valida el repositorio (§4 del doc maestro).

## 0. Validar repositorio y ubicación
```powershell
git remote get-url origin
```
- **Qué hace:** muestra la URL del repositorio remoto.
- **Resultado esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git`
- **Error posible:** si muestra otra URL, **detente**, no hagas commit y corrige con
  `git remote set-url origin https://github.com/MalcomJesid/taskflow-scrum.git`.
- **Evidencia:** captura de esta salida.

```powershell
git branch --show-current
```
- **Qué hace:** muestra tu rama actual. **Esperado:** `main`.

## 1. Actualizar main
```powershell
git checkout main
```
```powershell
git pull --ff-only origin main
```
- **Qué hace:** trae los últimos cambios de main sin crear merges raros.
- **Esperado:** `Already up to date.` o un resumen de archivos actualizados.
- **Error posible:** si dice que no puede hacer fast-forward, **detente** y avisa; no fuerces.

## 2. Crear tu rama de trabajo
```powershell
git checkout -b KAN-15-configurar-conexion-bd
```
- **Esperado:** `Switched to a new branch 'KAN-15-configurar-conexion-bd'`.

## 3. Aplicar los cambios del paquete
Edita los archivos según [`IMPLEMENTATION.md`](IMPLEMENTATION.md), o aplica el parche si existe:
```powershell
git apply docs/task-packets/KAN-15/KAN-15.patch
```
- **Nota:** el `.patch` se entrega en FASE 2. Si aún no existe, haz los cambios a mano.

## 4. Revisar ANTES de agregar
```powershell
git status --short
```
```powershell
git diff
```
- **Qué hace:** te muestra exactamente qué cambió. **Nunca** uses `git add .` a ciegas.
- **Evidencia:** captura del `git diff`.

## 5. Agregar solo los archivos de esta tarea
```powershell
git add backend/src/main/resources/application.properties
```
```powershell
git add backend/.env.example
```
```powershell
git add .gitignore
```

## 6. Revisar lo agregado
```powershell
git diff --cached
```
```powershell
git status
```
- **Esperado:** solo aparecen los 3 archivos de arriba en verde.

## 7. Commit con clave Jira
```powershell
git commit -m "KAN-15 chore(config): externalizar credenciales de base de datos a variables de entorno"
```

## 8. Subir la rama
```powershell
git push -u origin KAN-15-configurar-conexion-bd
```
- **Esperado:** un enlace para crear el Pull Request.
- **Regla:** ❌ nunca `git push` a `main`, ❌ nunca `git push --force`.

## 9. Abrir el Pull Request
- Título exacto: `KAN-15 Configurar conexión a Base de Datos`
- Descripción: usa la plantilla del doc maestro §4 (Objetivo, Cambios, Cómo probar, Evidencias, DoD).

## Cómo detenerse sin dañar el repositorio
- Para descartar cambios no agregados de un archivo: `git checkout -- <archivo>`
- Para volver a main sin subir nada: `git checkout main` (tu rama queda intacta).
- Ante cualquier duda: **no** hagas push y consulta.
