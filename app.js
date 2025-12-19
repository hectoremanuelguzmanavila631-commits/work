const express = require('express');
const { logger, validarUsuario } = require('./middleware/index');

const app = express();
app.use(express.json());

// Uso del middleware de logging global
app.use(logger);

let usuarios = [
    { id: 1, nombre: "Ana García", email: "ana@example.com" }
];

// GET: Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST: Crear usuario (Incluye VALIDACIÓN adicional)
app.post('/usuarios', validarUsuario, (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// PUT: Actualizar usuario
app.put('/usuarios/:id', validarUsuario, (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    usuarios[index] = { id, ...req.body };
    res.json(usuarios[index]);
});

// DELETE: Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
