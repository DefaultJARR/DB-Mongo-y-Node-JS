// Archivo para la configuración de Express y peticiones de Body-Parser

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//++ Carga de Archivos de ruta
var project_routes = require('./routes/project');
//-- Carga de Archivos de ruta


//++ middlewears (es una capa o metodo que se ejecuta antes de ejecutar la acción de un controlador)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-- middlewears


//++ CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//-- CORS


//++ rutas
app.use('/', project_routes);
//-- rutas


//++ exportar
module.exports = app;
//-- exportar