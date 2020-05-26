var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.root);
router.get('/frutasdesecadas/ciruelasdesecadas', mainController.ciruelasdesecadas);

module.exports = router;
