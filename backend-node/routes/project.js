'use strinct'

var express = require('express');
var router = express.Router();
var ProjectController = require('../controllers/project');

// Multiparty es un modulo o paquete que sirve para la gestion de archivos
var multipart = require('connect-multiparty');
var multipartMiddelware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/getProject/:id?', ProjectController.getProject);
router.get('/listProjects', ProjectController.listProjects);
router.put('/update-project/:id?', ProjectController.updateProject);
router.delete('/delete-project/:id?', ProjectController.deleteProject);
router.post('/upload-project-image/:id?', multipartMiddelware, ProjectController.uploadImage);
router.get('/get-project-image/:image', ProjectController.getImageFile);

module.exports = router;
