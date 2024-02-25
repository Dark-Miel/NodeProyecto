const express = require('express');
const router = express.Router();

// Ruta para mostrar el panel de control
router.get('/', (req, res) => {
    res.render('dashboard'); // Renderiza la vista del panel de control
});

// Otras rutas del panel de control pueden ir aquí

module.exports = router;
