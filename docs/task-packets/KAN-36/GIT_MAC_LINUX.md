# KAN-36 — Guía Git para macOS y Linux

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
git checkout -b KAN-36-identidad-usuario
```

## 3. Editar archivos
Modifica `TodoController.java` y crea (opcional) `security/AuthUtils.java` según [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## 4. Revisar antes de agregar
```bash
git status --short
```
```bash
git diff
```

## 5. Agregar solo lo de esta tarea
```bash
git add backend/src/main/java/com/todo/controller/TodoController.java
```
```bash
git add backend/src/main/java/com/todo/security/AuthUtils.java
```

## 6. Revisar lo agregado
```bash
git diff --cached
```
```bash
git status
```

## 7. Commit
```bash
git commit -m "KAN-36 feat(security): extraer identidad del usuario desde el claim sub"
```

## 8. Subir rama
```bash
git push -u origin KAN-36-identidad-usuario
```

## 9. Pull Request
- Título: `KAN-36 Extraer identidad del usuario desde el JWT`

## Detenerse sin dañar
```bash
git checkout -- <archivo>
git checkout main
```
