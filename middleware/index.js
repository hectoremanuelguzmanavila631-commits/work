// MIDDLEWARE DE LOGGING (5pts)
const logger = (req, res, next) => {
    const tiempo = new Date().toLocaleString();
    console.log(`[${tiempo}] ${req.method} solicitado en: ${req.url}`);
    next();
};

// MIDDLEWARE DE VALIDACIÓN (5pts)
const validarUsuario = (req, res, next) => {
    const { nombre, email } = req.body;

    if (!nombre || nombre.length < 3) {
        return res.status(400).json({ error: "Nombre inválido (mínimo 3 caracteres)." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato de email inválido." });
    }

    next(); // Si todo está bien, pasa al siguiente paso
};

module.exports = { logger, validarUsuario };
