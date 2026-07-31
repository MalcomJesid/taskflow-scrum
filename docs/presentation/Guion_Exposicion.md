# Guion de exposición — TaskFlow Scrum

> Texto hablado por diapositiva (~9–11 min). No se proyecta; es tu apoyo. Ajusta las cifras `[completar]` con datos
> reales de Jira antes de exponer. **No presentes números inventados.**

## Slide 1 — Portada (30 s)
"Buenas [días/tardes]. Les presento TaskFlow Scrum, la incorporación de autenticación segura a nuestra aplicación de
tareas. Lo desarrollamos como equipo Scrum siguiendo la guía SBOK, sobre el proyecto KAN en Jira."

## Slide 2 — Objetivo de la exposición (40 s)
"Esta presentación tiene tres metas: primero, mostrar cómo aplicamos Scrum de forma real; segundo, explicar la
decisión de arquitectura de seguridad y por qué la tomamos; y tercero, presentar con honestidad en qué punto estamos:
qué ya funciona y qué falta. Como es una entrega de curso, le damos tanto peso al **proceso** como al producto."

## Slide 3 — Marco metodológico Scrum/SBOK (60 s)
"Trabajamos con Scrum según SBOK. El trabajo se descompone en historias de usuario trazables en Jira. Avanzamos por
sprints, con entregas incrementales donde cada tarea aporta valor verificable. Mantenemos los artefactos del proceso:
un backlog priorizado, el tablero KAN y métricas como velocity, burndown, CFD y cycle time. Y algo clave para la
trazabilidad: cada cambio de código enlaza con su clave de Jira. Cada tarea, además, se documenta como un paquete
reproducible: el proceso es tan entregable como el código."

## Slide 4 — El problema (45 s)
"La aplicación funcionaba de forma anónima: no había usuarios, así que cualquiera podía ver y modificar todas las
tareas. No había privacidad ni trazabilidad. El objetivo del producto es claro: que cada persona acceda únicamente a
sus propias tareas, de forma segura."

## Slide 5 — La decisión arquitectónica (60 s)
"La decisión más importante fue tener **un solo emisor de tokens**: Supabase. Supabase se encarga del registro, el
login y de emitir el JWT. React gestiona la sesión y adjunta el token en cada petición. Y Spring Boot **no emite**
tokens: solo los **valida**. Esto evita un error común y peligroso —tener dos sistemas emitiendo tokens— que abre
huecos de seguridad."

## Slide 6 — Flujo de autenticación (60 s)
"Este es el flujo completo. El usuario se autentica contra Supabase, que emite el JWT. React lo guarda y lo envía en
la cabecera Authorization. Spring Boot valida la firma con las claves públicas de Supabase, comprueba el emisor y la
expiración, extrae la identidad del usuario del claim `sub`, y filtra las tareas por ese usuario."

## Slide 7 — Seguridad por diseño (60 s)
"La seguridad no es un añadido, está en el diseño. El backend nunca confía en un identificador de usuario que venga
del frontend: usa solo el `sub` del token verificado. Garantizamos aislamiento horizontal —un usuario no puede tocar
tareas de otro— con una consulta que exige coincidencia de id y usuario, devolviendo 404 si el recurso es ajeno.
Además: credenciales fuera del código, nada de la clave de servicio de Supabase en el frontend, y ni tokens ni
detalles de excepción en los logs o respuestas."

## Slide 8 — Alcance: 14 tareas (45 s)
"El trabajo se organizó en 14 tareas, en cuatro bloques: la base del backend, las decisiones de autenticación, el
frontend, y la integración segura. Cada una está documentada para poder ejecutarse de forma independiente."

## Slide 9 — Cómo trabaja el equipo (60 s)
"Cada tarea es un paquete reproducible con nueve documentos: qué implementar, qué archivos tocar, cómo probarlo, cómo
usar Git, cómo revertir y qué evidencia entregar. Seguimos convenciones estrictas: una rama por tarea, commits
convencionales, y un PR por cada clave de Jira. Una regla importante: frontend y backend nunca comparten rama. Y
tenemos guías de Git separadas para Windows y para Mac/Linux, pensadas para compañeros junior."

## Slide 10 — Orden de implementación (30 s)
"Las tareas tienen dependencias mapeadas, así los dos desarrolladores avanzan en paralelo sin bloquearse: la base
primero, luego el frontend por un lado y la cadena de seguridad del backend por otro."

## Slide 11 — Estado actual de la implementación (60 s)
"Ahora, dónde estamos. Ya está **completado y funcionando**: el proyecto Supabase está creado y operativo, y el
registro e inicio de sesión desde React funcionan de extremo a extremo —con sesión persistente, rutas protegidas y
cierre de sesión, que son las tareas KAN-29 a la 33. Lo que sigue **en curso** es la fase KAN-34 a la 37: validar el
JWT en el backend y aislar las tareas por usuario. Somos transparentes en esto: hasta terminar esa fase, las tareas
todavía se comparten entre usuarios."

## Slide 12 — Estado y métricas del proceso (45 s)
> Llenar con datos reales de Jira. Si aún no hay sprints cerrados, dilo tal cual — no inventes.
"En cuanto a métricas de proceso: hemos ejecutado [completar] sprints, con una velocidad promedio de [completar]
puntos y un cumplimiento del [completar]% en el último. [Si aún no hay sprints cerrados: 'Aún no tenemos sprints
cerrados con métricas consolidadas; las plantillas de velocity, burndown y CFD están listas en el repositorio y se
llenarán con los datos reales del Velocity Report de Jira en cuanto cerremos el primer sprint.']"

## Slide 13 — Riesgos gestionados (45 s)
"En la auditoría inicial detectamos varios riesgos técnicos y ya los gestionamos: la diferencia de versión de Java,
que alineamos a Java 21; archivos de compilación versionados por error, que sacamos del control de versiones; y
credenciales en texto plano, resuelto en la tarea KAN-15. El proyecto Supabase, que antes era un prerrequisito, ya
está creado. El riesgo que sigue activo es el aislamiento por usuario en el backend, que es justo nuestra próxima
fase."

## Slide 14 — Próximos pasos y cierre (40 s)
"Los siguientes pasos son ejecutar los paquetes KAN-34 a 37 para validar el token y aislar las tareas por usuario,
enviar el token desde el frontend, verificar el aislamiento con dos usuarios reales, y capturar las métricas y
evidencias. Con esto cerramos. El repositorio y el tablero de Jira están disponibles para quien quiera profundizar.
¿Preguntas?"

---

### Consejos de entrega
- Ritmo: ~45 s por diapositiva → ~9–11 min + preguntas.
- Si te preguntan por qué Supabase y no emitir el JWT en Spring: recalca "un solo emisor evita inconsistencias de
  validación y superficie de ataque duplicada".
- Ten a mano el diagrama del slide 6 por si piden detalle técnico.
- Sé honesto en el estado: mostrar que login/registro funciona y que el aislamiento está en curso es más creíble —y
  más *Scrum*— que aparentar que todo está terminado.
