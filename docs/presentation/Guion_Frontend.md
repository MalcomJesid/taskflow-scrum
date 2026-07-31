# Guion — Exposición del FRONTEND (React)

> Para el expositor del frontend (~4–5 min). Es tu apoyo hablado; no se proyecta.
> Regla: explica lo que el código **hace hoy**. Sé claro con lo que aún **está pendiente** (enviar el token).

---

## 1. Presentación (30 s)
"Yo les explico el **frontend**. Es una aplicación de una sola página (SPA) hecha con **React 18** y
**Vite** como servidor de desarrollo. Se encarga de la interfaz: registro, inicio de sesión, y la pantalla
de tareas."

## 2. Stack (30 s)
"Las herramientas principales son: **React** para la interfaz, **React Router 7** para la navegación,
**Axios** para hablar con el backend, y **@supabase/supabase-js**, que es el cliente que nos conecta con
**Supabase Auth**. En desarrollo corre en el puerto **5173**."

## 3. Autenticación con Supabase (60 s)
"El registro y el login **no los maneja nuestro backend**: los maneja **Supabase**. En la pantalla de
registro llamamos a `supabase.auth.signUp` con correo y contraseña; validamos antes que el correo tenga
formato válido, que la contraseña tenga mínimo 8 caracteres y que coincida con la confirmación. En el login
usamos `supabase.auth.signInWithPassword`. Un detalle de seguridad: si el login falla, mostramos un mensaje
**genérico** —'credenciales inválidas'— para no revelar si el correo existe o no."

## 4. Manejo de la sesión (60 s)
"La sesión se gestiona en un **contexto de React**, el `AuthProvider`. Al arrancar, recupera la sesión
guardada con `getSession`, y se suscribe a `onAuthStateChange` para reaccionar automáticamente a cualquier
login, logout o refresco del token. Ese contexto expone al resto de la app el **usuario**, el **token** y la
función de **cerrar sesión**. Así cualquier componente sabe si hay alguien autenticado sin repetir lógica."

## 5. Rutas protegidas (45 s)
"Con eso montamos **rutas protegidas**. El componente `ProtectedRoute` revisa el contexto: mientras carga la
sesión muestra 'Cargando…' —para no expulsar por error a un usuario válido—, y si **no hay sesión**, redirige
al login. La pantalla de tareas solo se ve si estás autenticado. Arriba se muestra tu correo y el botón de
cerrar sesión."

## 6. Comunicación con el backend (40 s)
"Para las tareas usamos **Axios**, centralizado en `todoApi.js`, apuntando a `http://localhost:8080/api/todos`.
Ahí tenemos las funciones `getAll`, `create`, `update`, `toggle` y `remove`, que corresponden una a una con
los endpoints del backend. La pantalla de tareas las llama y refresca la lista tras cada cambio."

## 7. Estado actual y lo que sigue — SÉ HONESTO (45 s)
"Y aquí el punto transparente: **hoy Axios todavía no envía el token** de Supabase en las peticiones al
backend. Ya lo **tenemos disponible** en el contexto de sesión, pero aún no lo adjuntamos en la cabecera
`Authorization: Bearer`. Ese es el enganche con la próxima fase del backend: cuando este empiece a validar el
JWT, el frontend mandará el token en cada petición. Es un cambio pequeño porque la sesión ya está resuelta."

## 8. Cierre frontend (20 s)
"En resumen: el frontend ya tiene registro, login, sesión persistente y rutas protegidas funcionando de
extremo a extremo con Supabase, y el CRUD de tareas conectado al backend. Lo que falta es adjuntar el token,
que va de la mano con la validación del lado servidor."

---

### Por si preguntan
- **¿Por qué usar Supabase y no un login propio?** "Nos da autenticación segura probada —hash de contraseñas,
  emisión de JWT, confirmación por correo— sin que nosotros manejemos contraseñas."
- **¿Dónde se guarda el token?** "Lo gestiona el cliente de Supabase; nosotros lo leemos del contexto de
  sesión, nunca lo escribimos a mano ni lo logueamos."
- **¿Qué pasa si el token expira?** "`onAuthStateChange` detecta el refresco automático de la sesión."
