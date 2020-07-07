var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const productsController = require('../controllers/productsController');
const db = require('../database/models');


/* GET users listing. */
//ruta de productos (productos-detalle de producto - ABM)
// Show all products
router.get('/', productsController.root);

// Detalle de producto selecionado
router.get('/:id', productsController.detail);


// Creación de nuevo producto
router.get('/create/admin', productsController.create);
router.post('/create', productsController.store);

// Edición de producto seleccionado
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);

// Eliminación de producto
router.delete('/:id/delete', productsController.destroy);


module.exports = router;
