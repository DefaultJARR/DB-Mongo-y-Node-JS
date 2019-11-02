'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log("\nConexión a la Base de Datos Establecida con Éxito :D\n");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor Corriendo Correctamente en la URL localhost:3700")
        });

    })
    .catch(er => console.log("\n\n¡¡Error al Conectar con las Base de Datos!!\n\n" + er))