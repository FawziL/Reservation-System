# Sistema de Reservas

## Descripción
Este proyecto es un sistema de reservas para hoteles o restaurantes, desarrollado con Next.js para el frontend y NestJS para el backend. Permite a los usuarios registrarse, autenticarse, buscar disponibilidad de habitaciones o mesas, hacer reservas, y gestionar sus reservas. También incluye un panel de administración para gestionar reservas, usuarios, y disponibilidad.

## Requisitos Funcionales

- **Registro y autenticación de usuarios:** Los usuarios pueden registrarse y autenticarse en la plataforma.
- **Búsqueda de disponibilidad:** Los usuarios pueden buscar la disponibilidad de habitaciones o mesas.
- **Sistema de reservas:** Los usuarios pueden hacer reservas seleccionando fecha, hora, etc.
- **Gestión de usuarios y reservas:** Los usuarios pueden gestionar sus reservas y ver su historial.
- **Notificaciones y confirmaciones por email:** Se enviarán notificaciones y confirmaciones de las reservas por email.
- **Panel de administración:** Un panel de administración permite gestionar reservas, usuarios y disponibilidad.

## Requisitos No Funcionales

- **Seguridad:** Implementación de autenticación y autorización para proteger los datos del usuario.
- **Escalabilidad y rendimiento:** El sistema está diseñado para escalar y manejar una alta carga de usuarios.
- **Diseño responsive:** El frontend está diseñado para ser responsivo y funcionar bien en dispositivos móviles.
- **SEO optimizado:** El frontend utiliza SSR (Server-Side Rendering) y SSG (Static Site Generation) para optimizar el SEO.

## Diseño del Sistema

### Arquitectura

- **Frontend:** 
  - **Framework:** Next.js.
  - **Estilos:** Tailwind CSS para el diseño y la estilización.
  - **Características:** Páginas estáticas y dinámicas, usando SSR y SSG según sea necesario.

- **Backend:** 
  - **Framework:** NestJS.
  - **Arquitectura:** Modular, con módulos para autenticación, reservas, usuarios, etc.
  - **Seguridad:** JWT.
  
- **Base de Datos:** 
  - **Sistema:** PostgreSQL.