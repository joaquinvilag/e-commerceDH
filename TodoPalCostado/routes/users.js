var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var { check, validationResult, body} = require('express-validator');

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

router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
], usersController.processLoginForm);



router.get('/register' , usersController.showRegisterForm);

router.post('/register', upload.any(), [
  check('name').isLength({min: 1}).withMessage('Este campo no puede estar vacio'),
  check('email').isEmail().withMessage('Email incorrecto'),
  check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
  
  body('email').custom(function(value){
    let usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'})
    let users;
    if (usersJSON == "") {
      users = [];
    } else {
      users = JSON.parse(usersJSON);
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == value) {
        return false; 
      }
    }
    return true;
  }).withMessage('Usuario ya existente')


], usersController.processRegisterForm);

// router.get('/perfil',usersController.showProfile);
// router.post('/perfil',usersController.processProfile);

module.exports = router;
