var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var { check, validationResult, body} = require('express-validator');
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
router.post('/create',[
    check('name').notEmpty().isLength({min:4}).withMessage('El campo nombre del producto no puede estar vacío'),
    check('price').notEmpty().isNumeric().withMessage('El campo precio solo acepta numeros y no puede estar vacío'),
    // check('detail').
    check('descr').notEmpty().isLength({min:8}).withMessage('Descripcion demasiado corta')


], productsController.store);

// Edición de producto seleccionado
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);

// Eliminación de producto
router.delete('/:id/delete', productsController.destroy);


module.exports = router;