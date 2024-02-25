// Subir volumen
document.getElementById('subirVolumenBtn').addEventListener('click', async function() {
    await sendControlCommand('subirVolumen');
});

// Bajar volumen
document.getElementById('bajarVolumenBtn').addEventListener('click', async function() {
    await sendControlCommand('bajarVolumen');
});

// Mutear
document.getElementById('mutearBtn').addEventListener('click', async function() {
    await sendControlCommand('mutear');
});

// Siguiente pista
document.getElementById('siguienteBtn').addEventListener('click', async function() {
    await sendControlCommand('siguientePista');
});

// Pista anterior
document.getElementById('anteriorBtn').addEventListener('click', async function() {
    await sendControlCommand('anteriorPista');
});

// Parar/Reproducir
document.getElementById('pararBtn').addEventListener('click', async function() {
    await sendControlCommand('pararReproducir');
});

async function sendControlCommand(command) {
    try {
        const response = await fetch(`/control/${command}`, {
            method: 'POST',
            // Puedes incluir más opciones como headers y body según sea necesario
        });
        if (response.ok) {
            console.log(`Comando "${command}" ejecutado con éxito.`);
        } else {
            console.error(`Error al ejecutar el comando "${command}".`);
        }
    } catch (error) {
        console.error(`Error de red: ${error}`);
    }
}
