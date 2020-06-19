var express = require('express');
var router = express.Router();
const multer = require('multer');
let path = require('path');

var storage = multer.diskStorage({
    destination: function (req , file , cb){
        cb(null,'public/images/users')
    },
    filename: function (req , file , cb){
        cb(null, file.fieldname + 'avatar' + Date.now() + path.extname(file.originalname))
        
    }
});

var upload = multer ({storage:storage});

const usersController = require('../controllers/usersController');

/* GET users listing. */
//ruta de usuario (registro/login)

router.get('/login', usersController.showLoginForm);
router.post('/login', usersController.processLoginForm)

router.get('/register' , usersController.showRegisterForm);
router.post('/register', upload.any() , usersController.processRegisterForm);

module.exports = router;
