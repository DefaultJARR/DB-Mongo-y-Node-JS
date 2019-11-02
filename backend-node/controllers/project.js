'use strict'

var Project = require('../models/project');
var fs = require("fs"); // Libreria "File System", se utilizó para borrar las imagenes que no tenian una extension valida
var path = require('path'); // Permite Cargar Rutas Físicas de nuestro sistema de Archivos

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la Home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test de Project'
        });
    },
    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        //++ Asignando los valores a la instacia de la Modelo(Entidad) Project
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        //-- Asignando los valores a la instacia de la Modelo(Entidad) Project

        //++ Método para guardar el objeto en la DB
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'error al Guardar el Documento.' });
            if (!projectStored) return res.status(404).send({ message: 'No se ha podido Guardar el Proyecto.' });
            return res.status(200).send({ project: projectStored });
        });
        //-- Método para guardar el objeto en la DB
    },
    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(500).send({ message: 'No se puede Buscar el Proyecto, el ID ingresado es Nulo' });

        // findBy para buscar por un atributo un Documento de una colección de la DB
        Project.findById(projectId, (err, projectFound) => {
            if (err) return res.status(500).send({ message: 'Error en la Consulta del Proyecto, puede que el Formato del ID Ingresado sea Invalido' });
            if (!projectFound) return res.status(404).send({ message: 'El Proyecto con el id [' + projectId + '] no Existe' });
            return res.status(200).send({ project: projectFound });
        })
    },
    listProjects: function (req, res) {
        // find consulta todos los documentos con la forma del modelo y los lista
        // sort ordena la lista obtenida, con respecto a un atributo del modelo
        Project.find({}).sort('year').exec((err, listProjects) => {
            if (err) return res.status(500).send({ message: 'Error en la Consulta de la Lista de Proyectos' });
            if (!listProjects) return res.status(404).send({ message: 'No existen Proyectos para Listar' });
            return res.status(200).send({ projects: listProjects });
        });
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var projectBody = req.body;

        if (projectId == null) return res.status(500).send({ message: 'No se puede Modificar el Proyecto, el ID ingresado es Nulo' });

        Project.findByIdAndUpdate(projectId, projectBody, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al Actualizar el Proyecto, puede que el Formato del ID Ingresado sea invalido' });
            if (!projectUpdated) return res.status(404).send({ message: 'No existe el Proyecto a Actualizar' });
            return res.status(200).send({ projectUpdated: projectUpdated, message: 'Información Anterior del Proyecto' });
        });
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(500).send({ message: 'No se puede Modificar el Proyecto, el ID ingresado es Nulo' });

        Project.findByIdAndDelete(projectId, (err, deletedProject) => {
            if (err) return res.status(500).send({ message: 'Error al Eliminar el Proyecto, puede que el Formato del ID Ingresado sea invalido' });
            if (!deletedProject) return res.status(404).send({ message: 'No existe el Proyecto a Eliminar' });
            return res.status(200).send({ deletedProject: deletedProject });
        })
    },
    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagén no Subida';

        if (projectId == null) return res.status(500).send({ message: 'No se puede Modificar la Imagen del Proyecto, el ID ingresado es Nulo' });

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            // Coprobando si la Extencion de la imagen es valida...
            if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
                // Guardando la imagen...
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectImageUpdated) => {
                    if (err) return res.status(500).send({ message: 'Error al Subir la Imagen del Proyecto, puede que el Formato del ID Ingresado sea invalido' });
                    if (!projectImageUpdated) return res.status(404).send({ message: 'No existe el Proyecto para asignarle la Imagén' });
                    return res.status(200).send({ projectImageUpdated: projectImageUpdated });
                });
            }
            else {
                fs.unlink(filePath, err => {
                    return res.status(200).send({ message: 'Extensión del Archivo no valida' });
                });
            }


        }
        else {
            return res.status(200).send({ message: fileName });
        }
    },
    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(path_file));
            }
            else {
                return res.status(200).send({ message: 'No existe la Imagén...' });
            }
        });
    }
};

module.exports = controller;