# KAN-35 — Archivos afectados

| Archivo | Acción | Motivo |
|---|---|---|
| `backend/src/main/java/com/todo/config/SecurityConfig.java` | **Modificado** | Reglas explícitas `/api/todos/**`, `OPTIONS` permitido, handlers 401/403. |

## No incluye
- Configuración base del Resource Server → **KAN-34**.
- Extracción de identidad (`sub`) → **KAN-36**. Aislamiento por usuario → **KAN-37**.

## Nota
Con un solo archivo tocado, el `git diff` debe ser pequeño y revisable. No mezclar con lógica de KAN-36/37.
