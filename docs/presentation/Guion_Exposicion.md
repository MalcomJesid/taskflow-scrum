# Guion de exposición — TaskFlow Scrum

> Texto hablado por diapositiva (~8–10 min). No se proyecta; es tu apoyo. Ajusta las cifras `[completar]` con datos
> reales antes de exponer. **No presentes números inventados.**

## Slide 1 — Portada (30 s)
"Buenas [días/tardes]. Les presento TaskFlow Scrum, el trabajo de incorporación de autenticación segura a nuestra
aplicación de tareas. Lo desarrollamos como equipo Scrum sobre el proyecto KAN."

## Slide 2 — El problema (45 s)
"La aplicación funcionaba de forma anónima: no había usuarios, así que cualquiera podía ver y modificar todas las
tareas. No había privacidad ni trazabilidad. El objetivo del proyecto es claro: que cada persona acceda únicamente a
sus propias tareas, de forma segura."

## Slide 3 — La decisión arquitectónica (60 s)
"La decisión más importante fue tener **un solo emisor de tokens**: Supabase. Supabase se encarga del registro, el
login y de emitir el JWT. React gestiona la sesión y adjunta el token en cada petición. Y Spring Boot **no emite**
tokens: solo los **valida**. Esto evita un error común y peligroso —tener dos sistemas emitiendo tokens— que abre
huecos de seguridad."

## Slide 4 — Flujo de autenticación (60 s)
"Este es el flujo completo. El usuario se autentica contra Supabase, que emite el JWT. React lo guarda y lo envía en
la cabecera Authorization. Spring Boot valida la firma con las claves públicas de Supabase, comprueba el emisor y la
expiración, extrae la identidad del usuario del claim `sub`, y filtra las tareas por ese usuario."

## Slide 5 — Seguridad por diseño (60 s)
"La seguridad no es un añadido, está en el diseño. El backend nunca confía en un identificador de usuario que venga
del frontend: usa solo el `sub` del token verificado. Garantizamos aislamiento horizontal —un usuario no puede tocar
tareas de otro— con una consulta que exige coincidencia de id y usuario, devolviendo 404 si el recurso es ajeno.
Además: credenciales fuera del código, nada de la clave de servicio de Supabase en el frontend, y ni tokens ni
detalles de excepción en los logs o respuestas."

## Slide 6 — Alcance: 14 tareas (45 s)
"El trabajo se organizó en 14 tareas, en cuatro bloques: la base del backend, las decisiones de autenticación, el
frontend, y la integración segura. Cada una está documentada para poder ejecutarse de forma independiente."

## Slide 7 — Cómo trabaja el equipo (60 s)
"Cada tarea es un paquete reproducible con nueve documentos: qué implementar, qué archivos tocar, cómo probarlo, cómo
usar Git, cómo revertir y qué evidencia entregar. Seguimos convenciones estrictas: una rama por tarea, commits
convencionales, y un PR por cada clave de Jira. Una regla importante: frontend y backend nunca comparten rama. Y
tenemos guías de Git separadas para Windows y para Mac/Linux, pensadas para compañeros junior."

## Slide 8 — Orden de implementación (30 s)
"Las tareas tienen dependencias mapeadas, así los dos desarrolladores avanzan en paralelo sin bloquearse: la base
primero, luego el frontend por un lado y la cadena de seguridad del backend por otro."

## Slide 9 — Estado y métricas (45 s)
> Llenar con datos reales de Jira.
"En cuanto a avance: hemos ejecutado [completar] sprints, con una velocidad promedio de [completar] puntos y un
cumplimiento del [completar]% en el último sprint. [Si aún no hay datos: 'Estamos en fase de documentación previa a
la implementación, por lo que las métricas se capturarán al ejecutar los primeros sprints.']"

## Slide 10 — Riesgos gestionados (45 s)
"Detectamos y gestionamos varios riesgos técnicos en la auditoría inicial: una diferencia de versión de Java,
archivos de compilación versionados por error, y credenciales en texto plano —esto último ya resuelto en la tarea
KAN-15. El único prerrequisito externo pendiente es crear el proyecto Supabase."

## Slide 11 — Próximos pasos (30 s)
"Los siguientes pasos: crear el proyecto Supabase, ejecutar los paquetes en orden, verificar el aislamiento con dos
usuarios reales, y capturar métricas y evidencias."

## Slide 12 — Cierre (20 s)
"Con esto cerramos. El repositorio y el tablero de Jira están disponibles para quien quiera profundizar. ¿Preguntas?"

---

### Consejos de entrega
- Ritmo: ~40 s por diapositiva → ~8 min + preguntas.
- Si te preguntan por qué Supabase y no emitir el JWT en Spring: recalca "un solo emisor evita inconsistencias de
  validación y superficie de ataque duplicada".
- Ten a mano el diagrama del slide 4 por si piden detalle técnico.
