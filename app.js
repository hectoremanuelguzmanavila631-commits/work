const express = require('express');
const { logger, validarUsuario } = require('./middleware/index'); // Importa tus middlewares

const app = express();
app.use(express.json()); // Permite que la API entienda archivos JSON

// USAR MIDDLEWARE DE LOGGING (Punto 5 del proyecto)
app.use(logger);

// Base de datos temporal en memoria
let usuarios = [
    { id: 1, nombre: "Ana García", email: "ana@example.com" }
];

// --- AQUÍ VAN LOS 4 MÉTODOS CRUD ---

// 1. GET: Listar usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// 2. POST: Crear usuario (Usa validación)
app.post('/usuarios', validarUsuario, (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// 3. PUT: Actualizar usuario
app.put('/usuarios/:id', validarUsuario, (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    usuarios[index] = { id, ...req.body };
    res.json(usuarios[index]);
});

// 4. DELETE: Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(204).send();
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
