var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

/* GET users listing. */
//ruta de productos (productos-detalle de producto - ABM)
router.get('/', productsController.root);
router.get('/detail/:productId', productsController.detail);

router.get('/create', productsController.create);
router.post('/create', productsController.store);

router.get('/edit/:productId', productsController.edit);
router.put('/edit/:productId', productsController.update);

router.delete('/delete/:productId', productsController.delete);


module.exports = router;
