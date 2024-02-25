const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./database'); // Asegúrate de que la ruta sea correcta para tu módulo de conexión a la base de datos

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista de inicio de sesión
});

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta SQL para buscar el usuario en la base de datos
    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
    db.query(sql, [username], (error, results) => {
        if (error) {
            console.error('Error al buscar usuario en la base de datos:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Verifica si se encontró un usuario
        if (results.length === 0) {
            res.status(401).send('Usuario no encontrado');
            return;
        }

        // Verifica la contraseña
        const user = results[0];
        console.log('Contraseña proporcionada:', password);
        console.log('Contraseña almacenada:', user.contrasena);
        if (password !== user.contrasena) {
            res.status(401).send('Credenciales incorrectas');
            return;
        }

        // Iniciar sesión
        const sessionId = uuidv4();
        req.session.userId = user.id;
        req.session.sessionId = sessionId;
        res.redirect('/dashboard');
    });
});

module.exports = router;
