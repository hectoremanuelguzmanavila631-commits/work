# API de Gestión de Usuarios

Este proyecto es una API RESTful construida con **Node.js** y **Express**.

## Características
- **CRUD Completo**: Endpoints para gestionar usuarios (GET, POST, PUT, DELETE).
- **Middleware Personalizado**: Logging de peticiones en consola.
- **Validación de Datos**: Protección contra datos de usuario inválidos.
- **Desarrollado con Copilot**: Se utilizó GitHub Copilot para la depuración y optimización del código.

## Instalación
1. Clona el repositorio.
2. Ejecuta `npm install`.
3. Inicia el servidor con `npm start`.

## Endpoints
- `GET /usuarios`: Lista todos los usuarios.
- `POST /usuarios`: Crea un usuario (requiere `nombre` y `email`).
- `PUT /usuarios/:id`: Actualiza un usuario existente.
- `DELETE /usuarios/:id`: Elimina un usuario.
