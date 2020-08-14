var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const cartController = require('../controllers/cartController');
const db = require('../database/models');
var sequelize = db.sequelize;
var authMiddleware = require('../middlewares/authMiddleware');
const { cart } = require('../controllers/cartController');


/* GET users listing. */

// Show cart
router.get('/', authMiddleware, cartController.cart);

// Add to shopping cart
router.post('/add-to-cart', authMiddleware, cartController.addToCart);

// Remove item-cart
router.get('/remove-from-cart/:id', cartController.removeFromCart);

// Purchase closing
router.post('/finalizar-compra', cartController.purchasePayment);



router.get('/qty-minus/:id', cartController.qtyMinus);

router.get('/qty-plus/:id', cartController.qtyPlus);



router.get('/prueba', cartController.prueba);





module.exports = router;
