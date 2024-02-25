const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '', 
    database: 'Logging', 
    port: '3307' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = connection;
