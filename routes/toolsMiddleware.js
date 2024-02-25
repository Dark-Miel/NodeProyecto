// En un archivo separado, por ejemplo, toolsMiddleware.js
const express = require('express');
const fs = require('fs');
const path = require('path');

// Ruta donde se encuentran las herramientas
const toolsPath = '/ruta/a/tus/herramientas';

// Función para obtener información sobre las herramientas
function getToolsInfo() {
    const tools = [];
    // Leer el contenido del directorio de herramientas
    const files = fs.readdirSync(toolsPath);
    // Recorrer los archivos y obtener información
    files.forEach(file => {
        const filePath = path.join(toolsPath, file);
        const stats = fs.statSync(filePath);
        // Agregar información de la herramienta al array
        tools.push({
            name: file,
            path: filePath,
            isDirectory: stats.isDirectory()
        });
    });
    return tools;
}

// Middleware para recopilar información sobre las herramientas
function toolsMiddleware(req, res, next) {
    // Obtener información sobre las herramientas
    const tools = getToolsInfo();
    // Agregar la información al objeto de solicitud
    req.tools = tools;
    next();
}

module.exports = toolsMiddleware;
