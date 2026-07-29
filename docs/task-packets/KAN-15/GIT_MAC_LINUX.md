# KAN-15 — Guía Git para macOS y Linux

> Un comando por línea para mayor claridad. Antes de empezar, valida el repositorio (§4 del doc maestro).

## 0. Validar repositorio y ubicación
```bash
git remote get-url origin
```
- **Qué hace:** muestra la URL del remoto.
- **Esperado:** `https://github.com/MalcomJesid/taskflow-scrum.git` (o la variante SSH `git@github.com:MalcomJesid/taskflow-scrum.git`).
- **Error posible:** si es otra URL, **detente** y corrige:
  `git remote set-url origin https://github.com/MalcomJesid/taskflow-scrum.git`.
- **Evidencia:** captura de la salida.

```bash
git branch --show-current
```
- **Esperado:** `main`.

## 1. Actualizar main
```bash
git checkout main
```
```bash
git pull --ff-only origin main
```
- **Esperado:** `Already up to date.` o resumen de cambios.
- **Error posible:** si no puede hacer fast-forward, **detente** y avisa.

## 2. Crear tu rama
```bash
git checkout -b KAN-15-configurar-conexion-bd
```

## 3. Aplicar cambios
Edita los archivos según [`IMPLEMENTATION.md`](IMPLEMENTATION.md), o aplica el parche (si ya existe):
```bash
git apply docs/task-packets/KAN-15/KAN-15.patch
```

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```
- **Evidencia:** captura del `git diff`.

## 5. Agregar solo los archivos de esta tarea
```bash
git add backend/src/main/resources/application.properties
```
```bash
git add backend/.env.example
```
```bash
git add .gitignore
```

## 6. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 7. Commit con clave Jira
```bash
git commit -m "KAN-15 chore(config): externalizar credenciales de base de datos a variables de entorno"
```

## 8. Subir la rama
```bash
git push -u origin KAN-15-configurar-conexion-bd
```
- **Regla:** ❌ nunca push a `main`, ❌ nunca `--force`.

## 9. Abrir el Pull Request
- Título: `KAN-15 Configurar conexión a Base de Datos`
- Descripción: plantilla del doc maestro §4.

## Cómo detenerse sin dañar el repositorio
```bash
git checkout -- <archivo>   # descartar cambios de un archivo no agregado
git checkout main           # volver a main sin subir nada
```
