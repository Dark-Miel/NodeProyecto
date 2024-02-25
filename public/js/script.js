const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function() {
    console.log('Conexión establecida');
};

socket.onmessage = function(event) {
    const resultado = document.getElementById('resultado');
    if (event.data === 'clear' || event.data === 'cls') {
        resultado.innerHTML = ''; // Limpiar el contenido del resultado
    } else {
        resultado.innerHTML += event.data + '<br>'; // Agregar nuevo resultado
    }
    resultado.scrollTop = resultado.scrollHeight; // Desplazar al final
};

document.getElementById('comandoInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const comando = document.getElementById('comandoInput').value.trim();
        if (comando) {
            socket.send(comando);
            document.getElementById('comandoInput').value = ''; // Limpiar el campo de entrada
        }
    }
});
