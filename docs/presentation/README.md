# Presentación ejecutiva — TaskFlow Scrum

> Entregables para exponer el proyecto de autenticación ante stakeholders.

## Contenido
| Archivo | Qué es | Cómo usarlo |
|---|---|---|
| [`Presentacion.md`](Presentacion.md) | Deck en Markdown (formato **Marp**) | Exportar a `.pptx`/PDF (ver abajo) |
| [`Guion_Exposicion.md`](Guion_Exposicion.md) | Guion hablado por diapositiva | Leer/ensayar; no se proyecta |
| [`generate_pptx.py`](generate_pptx.py) | Script que crea `Presentacion.pptx` | `python3 generate_pptx.py` (requiere `python-pptx`) |

## Por qué no hay `.pptx` incluido
El entorno de generación **no tenía** `python-pptx`, `pandoc` ni `libreoffice`, y sin acceso a red no se pudieron
instalar. Conforme a la regla de **no entregar artefactos no verificados**, se entregan las fuentes y el script para
que generes el binario en tu máquina. Elige **una** de estas rutas:

### Opción A — Marp (recomendada, sin Python)
1. Instala la extensión **Marp for VS Code** (o la CLI `@marp-team/marp-cli`).
2. Abre `Presentacion.md`.
3. Exporta: *Command Palette → Marp: Export Slide Deck →* elige **PPTX** o **PDF**.

CLI equivalente:
```bash
npx @marp-team/marp-cli Presentacion.md --pptx -o Presentacion.pptx
```

### Opción B — Script Python
```bash
pip install python-pptx
python3 generate_pptx.py
```
Genera `Presentacion.pptx` en esta carpeta.

### Opción C — Pandoc
```bash
pandoc Presentacion.md -o Presentacion.pptx
```

## Regla de datos
El deck deja marcadores `[completar]` en las cifras (velocidad, fechas, resultados de pruebas). **No los inventes**:
llénalos con datos reales de Jira y de la ejecución antes de presentar.
