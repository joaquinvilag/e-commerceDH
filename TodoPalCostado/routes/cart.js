var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const cartController = require('../controllers/cartController');
const db = require('../database/models');
var sequelize = db.sequelize;



/* GET users listing. */

// Show cart
router.get('/', cartController.cart);

// Add to shopping cart
router.post('/add-to-cart', cartController.addToCart);



module.exports = router;
