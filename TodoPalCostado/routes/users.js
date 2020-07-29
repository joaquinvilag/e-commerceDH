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
const userControllers = require('../controllers/usersController');

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
  // CRUD
  //login de usuario
router.get('/login', guestMiddleware, usersController.showLoginForm);

router.post('/login', [
  check('email').isEmail().withMessage('Usuario no registrado'),
  check('password').isLength({min: 8}).withMessage('Contraseña invalida')
], usersController.processLoginForm);


  //registro de usuario
router.get('/register', guestMiddleware, usersController.create);

router.post('/register', upload.any(), [
  check('name').isLength({min: 2}).withMessage('El campo Nombre no puede estar vacio'),
  check('last_name').isLength({min: 2}).withMessage('El campo Apellido no puede estar vacio'),
  check('email').isEmail().withMessage('Email incorrecto'),
  check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('email').custom(function(value){
    db.User.findAll({
      where: {
        email: value
      }  
    })
    .then(function(user){
      console.log(user)
      console.log(value)
      if(user.email === value){
        return false;
      }
    })
    return true;
  }).withMessage('Usuario ya existente')
      

] ,usersController.store);

  // END CRUD //

  // Datos de perfil
router.get('/perfil', authMiddleware, usersController.showProfile);
router.get('/perfil-edicion', authMiddleware, userControllers.editProfile);
// router.post('/perfil-edicion',[
//   check('name').isLength({min: 2}).withMessage('El campo Nombre no puede estar vacio'),
//   check('email').isEmail().withMessage('Email incorrecto'),

//   body('email').custom(function(value){
//   db.User.findAll({
//     where: {
//       email: value
//     }  
//   })
//   .then(function(user){
//     console.log(user)
//     console.log(value)
//     if(user.email === value){
//       return false;
//     }
//   })
//   return true;
// }).withMessage('Usuario ya existente')], usersControllers.updateProfile);


// Rutas de Logout
router.get('/log-out', usersController.logout);




module.exports = router;