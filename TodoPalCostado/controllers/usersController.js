const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
var db = require('../database/models');
var sequelize = db.sequelize;
let { check, validationResult, body} = require('express-validator');
const { brotliDecompress } = require('zlib');


const userControllers = {
    showLoginForm: (req,res,next)=>{
        res.render("formLogin");
    },
    processLoginForm: (req,res,next)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.findAll({
                where: {
                    email: req.body.email
                }
            })
            .then(function(user){
                if(bcrypt.compareSync(req.body.password, user[0].password)){
        
                    req.session.usuarioLogueado = user[0];
                    if(req.body.recordame != undefined) {
                         res.cookie('recordame', user[0].email, {maxAge: 60000})
                     };
                    res.redirect('/') 
                } else {
                    return res.render('users/login', {errors: [
                        {msg: 'Credenciales invalidas'}
                    ]});
                }
            })
            .catch(function(error){console.log(error)})
            
        } else {
            return res.render('users/login', {errors: errors.errors})
        }
            
       
    },
    create: (req,res,next)=>{
        res.render("formRegister");
    },
    store: (req,res,next)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            var user = {
                name: req.body.name,
                last_name: req.body.last_name,
                password: bcrypt.hashSync(req.body.password,10),
                email: req.body.email,
                avatar: req.files[0].filename,
                admin: 0
            };    
            if(bcrypt.compareSync(req.body.confirmPassword, user.password)){
                db.User.create(user)
                .then(user =>  {  
                    console.log("Nuevo Usuario registrado");
                    req.session.usuarioLogueado = user;
                    res.redirect('/users/perfil');
                })
            } 
        } else {
            return res.render('formRegister', {errors: errors.errors});
        } 
    
    },
    showProfile: function(req,res,next){
        var user;
        db.User.findByPk(req.session.usuarioLogueado.iduser)
        .then(function(userdb){
            if(req.session.usuarioLogueado.email == userdb.email || req.cookies.recordame == userdb.email){
                user = userdb;
            } 
            if(user != undefined){
                res.render('users/perfil', {user});
                
            } else {
                res.send('Usuario no registrado');
            }
        })
        console.log(user);
    }
}


module.exports = userControllers;