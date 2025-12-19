const express = require('express');
const { logger, validarUsuario } = require('./middleware/index'); // Importa tus middlewares

const app = express();
app.use(express.json()); // Permite que la API entienda JSON

// 1. MIDDLEWARE DE LOGGING (Punto 5 del proyecto)
app.use(logger);

// Base de datos temporal en memoria
let usuarios = [
    { id: 1, nombre: "Ana Garcia", email: "ana@example.com" }
];

// --- AQUÍ VAN LOS 4 MÉTODOS CRUD (Punto 2 del proyecto) ---

// GET: Listar usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST: Crear usuario (Incluye VALIDACIÓN - Punto 4 del proyecto)
app.post('/usuarios', validarUsuario, (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// PUT: Actualizar usuario (Usa validación también)
app.put('/usuarios/:id', validarUsuario, (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index !== -1) {
        usuarios[index] = { id, ...req.body };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

// DELETE: Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
