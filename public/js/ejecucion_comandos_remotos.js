function ejecutarComandoRemoto(comando) {
    // Lógica para ejecutar el comando remoto
    console.log("Ejecutando comando remoto:", comando);
    return "Resultado del comando remoto: " + comando; // Esto es solo un ejemplo, reemplázalo con tu lógica real
}

function mostrarResultado(resultado) {
    console.log("Mostrando resultado:", resultado);
    const resultadoElemento = document.getElementById("resultado");
    resultadoElemento.innerText += resultado + "\n";
}

// Manejador de eventos para el envío del formulario
document.getElementById("comandoInput").addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir el envío del formulario
    
        const comandoInput = document.getElementById("comandoInput");
        const comando = comandoInput.value.trim(); // Obtener el comando y eliminar espacios en blanco
        
        if (comando) {
            const resultado = ejecutarComandoRemoto(comando);
            mostrarResultado(resultado);
            comandoInput.value = ''; // Limpiar el campo de entrada después de enviar el comando
        } else {
            mostrarResultado("Por favor, ingrese un comando remoto");
        }
    }
});
