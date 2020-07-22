var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.root);
router.get('/frutos-secos', mainController.frutosSecos);
router.get('/frutas-desecadas', mainController.frutasDesecadas);
router.get('/hamburguesas', mainController.hamburguesas);


module.exports = router;
