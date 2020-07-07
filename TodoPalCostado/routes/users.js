var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var { check, validationResult, body} = require('express-validator');
var guestMiddleware = require('../middlewares/guestMiddleware');
var authMiddleware = require('../middlewares/authMiddleware');
const usersController = require('../controllers/usersController');
const db = require('../database/models');

var storage = multer.diskStorage({
    destination: function (req , file , cb){
        cb(null,'public/images/users')
    },
    filename: function (req , file , cb){
        cb(null, file.fieldname + 'avatar' + Date.now() + path.extname(file.originalname))
        
    }
});

var upload = multer ({storage:storage});



/* GET users listing. */
//ruta de usuario (registro/login)

router.get('/login', guestMiddleware, usersController.showLoginForm);

router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
], usersController.processLoginForm);


  // Datos de perfil
router.get('/perfil', authMiddleware, usersController.showProfile);
  // Carrito de compras
router.get('/carrito', authMiddleware, usersController.showCart );

  // CRUD
  //login de usuario
router.get('/login', guestMiddleware, usersController.showLoginForm);

router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
], usersController.processLoginForm);


  //registro de usuario
  router.get('/register', guestMiddleware, usersController.create);

  router.post('/register', upload.any(), [
    check('name').isLength({min: 1}).withMessage('Este campo no puede estar vacio'),
    check('last_name').isLength({min: 1}).withMessage('Este campo no puede estar vacio'),
    check('email').isEmail().withMessage('Email incorrecto'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('email').custom(function(value){
      let userDb;
      db.User.findAll({
        where: {
          email: value
        }  
      })
      .then(function(user){
        userDb = user;
      })
      if(userDb.email == value){
        return false;
      }
      return true;
    }).withMessage('Usuario ya existente')
      

  ],usersController.store);

  // END CRUD //

 router.get('/alluser',usersController.allUser);

 router.get('/alluser/:id', usersController.showUser)




module.exports = router;