var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

/* GET users listing. */
//ruta de productos (productos-detalle de producto - ABM)
// Show all products
router.get('/', productsController.root);

// Detalle de producto selecionado
router.get('/:id', productsController.detail);
// router.get('/frutasdesecadas/ciruelasdesecadas', productsController.detail);


// Creación de nuevo producto
// router.get('/create', productsController.create);
// router.post('/', productsController.store);

// Edición de producto seleccionado
// router.get('/:id/edit', productsController.edit);
// router.put('/:id', productsController.update);

// Eliminación de producto
// router.delete('/:id', productsController.delete);


module.exports = router;
