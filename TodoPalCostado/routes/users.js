var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
//ruta de usuario (registro/login)
router.get('/', usersController.root);

router.get('/login', usersController.login);

router.get('/register',usersController.showRegisterForm);
router.post('/register',usersController.processRegisterForm);

module.exports = router;
