const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const WebSocket = require('ws');
const path = require('path');
const mysql = require('mysql');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));

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

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Redirigir la ruta raíz '/' a la página de inicio de sesión '/login'
app.get('/', (req, res) => {
    res.redirect('/login');
});

wss.on('connection', function connection(ws) {
    const terminal = spawn('cmd.exe');

    terminal.stdout.on('data', function(data) {
        ws.send(data.toString());
    });

    terminal.stderr.on('data', function(data) {
        ws.send(data.toString());
    });

    ws.on('message', function(message) {
        if (message === 'clear' || message === 'cls') {
            terminal.stdin.write('cls\n');
        } else {
            terminal.stdin.write(message + '\n');
        }
    });

    ws.on('close', function() {
        terminal.kill();
    });
});

app.post('/control/:scriptName', (req, res) => {
    const { scriptName } = req.params;
    const powershellScript = path.join(__dirname, 'public', 'pws', `${scriptName}.ps1`);
    const terminal = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', powershellScript]);

    terminal.stdout.on('data', function(data) {
        console.log(data.toString());
    });

    terminal.stderr.on('data', function(data) {
        console.error(data.toString());
    });

    terminal.on('close', function(code) {
        // No hacer nada aquí para evitar la impresión del mensaje en la consola del servidor
        // res.sendStatus(200); // No olvides enviar una respuesta al cliente si es necesario
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
