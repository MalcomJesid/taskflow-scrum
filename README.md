## 📊 Gestión del proyecto (Jira)

El seguimiento del proyecto se realiza mediante Jira Software, donde se gestionan:

- Product Backlog  
- Sprint Backlog  
- Historias de usuario  
- Progreso del sprint  

🔗 **Tablero Jira:** https://malconyfigue.atlassian.net/jira/software/projects/KAN/list?jql=project+%3D+KAN+ORDER+BY+cf%5B10019%5D+ASC&atlOrigin=eyJpIjoiNDBlMTBmMWFhMDc0NGZiMmE4ZThiNzg3ZmRkNzRmMzgiLCJwIjoiaiJ9

> Nota: El acceso al tablero puede requerir permisos.

---


# TaskFlow Scrum

Aplicación web de gestión de tareas desarrollada bajo la metodología Scrum, orientada a mejorar la organización y productividad de estudiantes y profesionales.

---

## 📌 Descripción del proyecto

TaskFlow es una aplicación tipo To-Do que permite a los usuarios crear, organizar, editar y completar tareas de manera sencilla.  
Este proyecto fue diseñado desde cero con el objetivo de aplicar de forma práctica la metodología Scrum basada en la guía SBOK.

---

## 🎯 Objetivo general

Desarrollar una aplicación de gestión de tareas que ayude a los usuarios a organizar sus actividades diarias mediante una interfaz simple, intuitiva y funcional.

---

## 🚀 Visión del proyecto

Nuestra aplicación permitirá a estudiantes y profesionales organizar sus tareas diarias y mejorar su productividad mediante una plataforma simple, intuitiva y accesible desde cualquier dispositivo.

---

## ⚙️ Metodología

El proyecto se desarrolla utilizando el marco de trabajo Scrum, siguiendo las fases establecidas en la guía SBOK:

- Creación de la visión del proyecto  
- Identificación de roles Scrum  
- Desarrollo de épicas  
- Creación del Product Backlog  
- Planificación de liberaciones  
- Planificación y estimación de sprints  
- Implementación iterativa  

---

## 👥 Roles del equipo

- **Product Owner:** Malcom YesiD  
- **Scrum Master:** Carlos Ramírez  
- **Equipo de Desarrollo:**  
  - Frontend Developer  
  - Backend Developer  
  - QA Tester  

> Nota: Algunos roles fueron definidos con fines académicos para simular un entorno real de trabajo Scrum.

---

## 🧩 Épicas del proyecto

1. Gestión de usuarios  
2. Gestión de tareas  
3. Organización de tareas  
4. Notificaciones y recordatorios 


---

## 📊 Resumen del Proyecto

| Sprint    | Total de Tareas |
| --------- | --------------- |
| Sprint 1  | 11              |
| Sprint 2  | 9               |
| Sprint 3  | 12              |
| Sprint 4  | 8               |
| Sprint 5  | 7               |
| Sprint 6  | 8               |
| Sprint 7  | 10              |
| **Total** | **65 Tareas**   |

---

# 🏃 Planificación de Sprints

## Sprint 1 - Planeación y Diseño

### Objetivo

Definir la estructura, documentación y diseño inicial del proyecto.

### Tareas

* Crear visión del proyecto.
* Elaborar Product Backlog.
* Elaborar Sprint Backlog.
* Diseñar Wireframes.
* Diseñar Casos de Uso.
* Diseñar Arquitectura del Sistema.
* Definir Paleta de Colores.
* Diseñar Componentes UI.
* Configurar Jira.
* Crear repositorio GitHub.

---

## Sprint 2 - Gestión de Usuarios

### Objetivo

Implementar el módulo de autenticación y gestión de usuarios.

### Tareas

* Crear tabla `users`.
* Implementar endpoint de registro.
* Implementar endpoint de login.
* Configurar autenticación JWT.
* Desarrollar pantalla de inicio de sesión.
* Desarrollar pantalla de registro.
* Implementar módulo de perfil.
* Realizar validaciones frontend y backend.

---

## Sprint 3 - Gestión de Tareas

### Objetivo

Implementar el CRUD completo de tareas.

### Tareas

* Crear tabla `tasks`.
* Implementar API CRUD de tareas.
* Crear formulario de tareas.
* Crear vista detalle de tarea.
* Implementar dashboard principal.
* Implementar filtros de tareas.
* Implementar estado completada/en progreso.

---

## Sprint 4 - Categorías y Calendario

### Objetivo

Implementar organización avanzada de tareas.

### Tareas

* Crear tabla `categories`.
* Implementar CRUD de categorías.
* Asignar categorías a tareas.
* Implementar módulo calendario.
* Gestionar fechas límite.
* Implementar filtros por fecha.

---

## Sprint 5 - Recordatorios y Cierre

### Objetivo

Completar funcionalidades finales y realizar pruebas.

### Tareas

* Implementar recordatorios.
* Implementar notificaciones.
* Optimizar interfaz responsive.
* Ejecutar pruebas funcionales.
* Corregir errores encontrados.
* Elaborar documentación final.
* Preparar presentación del proyecto.

---

# 📌 Definición de Hecho (Definition of Done)

Una historia de usuario se considerará completada cuando:

* Cumpla los criterios de aceptación.
* El código esté integrado en el repositorio.
* Las pruebas sean exitosas.
* La funcionalidad esté documentada.
* El Product Owner apruebe la entrega.

---

## 🗓 Plan de liberación

| Sprint | Entregable |
|--------|------------|
| Sprint 1 | Estructura del proyecto y documentación Scrum |
| Sprint 2 | Interfaz base y creación de tareas |
| Sprint 3 | Edición, eliminación y estado de tareas |
| Sprint 4 | Mejoras finales y documentación |

---

## 🛠 Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript  
- Git y GitHub  
- Jira Software (gestión del proyecto)  

---

## 📁 Estructura del repositorio

```bash
taskflow-scrum/
├── README.md
├── docs/
├── assets/
├── frontend/
└── backend/
