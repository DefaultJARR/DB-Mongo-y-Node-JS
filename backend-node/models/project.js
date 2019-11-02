'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectSchema = Schema({ // Molde para crear Documentos (Objetos) de tipo Proyecto
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String],
    image: String
});

module.exports = mongoose.model('Project', ProyectSchema);