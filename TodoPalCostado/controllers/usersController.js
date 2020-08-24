const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
var db = require('../database/models');
var sequelize = db.sequelize;
let { check, validationResult, body} = require('express-validator');
const { brotliDecompress } = require('zlib');
const { request } = require('http');
const Favoritos = require('../database/models/Favoritos');

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
                if(bcryptjs.compareSync(req.body.password, user[0].password)){
        
                    req.session.usuarioLogueado = user[0];
                    if(req.body.recordame != undefined) {
                         res.cookie('recordame', user[0].email, {maxAge: 60000})
                     };            
                     res.redirect('/users/perfil');
                } else {
                    return res.render('formLogin', {errors: [
                        {msg: 'Credenciales invalidas'}
                    ]});
                }
            })
            // .catch(function(error){console.log(error)})
            
        } else {
            return res.render('formLogin', {errors: errors.errors})
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
                password: bcryptjs.hashSync(req.body.password,10),
                email: req.body.email,
                avatar: req.files[0].filename,
                admin: 0
            };    
            if(bcryptjs.compareSync(req.body.confirmPassword, user.password)){
                db.User.create(user)
                .then(user =>  {  
                    console.log("Nuevo Usuario registrado");
                    req.session.usuarioLogueado = user;
                    res.redirect('/users/perfil');
                });
                // db.Cart.create()
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
    },

    editProfile: function(req,res,next){
        res.render('users/perfil-edicion')
    },
    updateProfile: function(req,res,next){
        var user;
        db.User.update({

        email:req.body.email,
        name:req.body.name,
        last_name:req.body.last_name

        },{
            where: {
                id: req.session.usuarioLogueado.iduser
            }
        })
        res.redirect("users/perfil")
    },

    logout: (req, res, next) => {
        req.session.usuarioLogueado = undefined;
        res.redirect('/')
    },
    addFavourite: (req, res, next) => {
        var userId = req.session.usuarioLogueado.iduser;
        var productId = parseInt(req.params.id);
        // var encontre = true;
        db.Favoritos.findAll({
            where: {
                FK_iduser: userId,
                FK_idproduct: productId
            }
        })
        .then(products => {
            // for(var i = 0; i < products.length; i++){
            //     if(products[i].FK_idproduct === productId){
            //         res.redirect('http://localhost:3000/users/favoritos');
            //     } else {
            //         encontre = false;
            //     }
            // }
            console.log(products)
            if(products.length == 0){
                var productAdd = {
                    FK_iduser: userId,
                    FK_idproduct: productId
                };
                db.Favoritos.create(productAdd)
                .then(productAdd =>  {  
                    console.log("producto agregado a la lista de favoritos");
                    res.redirect('http://localhost:3000/users/favoritos')
                });
            } else {
                res.redirect('http://localhost:3000/users/favoritos')
            }
        })
        
        
        
    },
    deleteFavourite: (req, res, next) => {
        db.Favoritos.destroy({
            where: {
                FK_iduser: req.session.usuarioLogueado.iduser,
                FK_idproduct: parseInt(req.params.id)
            }
        })
        res.redirect('/users/favoritos')
    },
    listFavourite: (req, res, next) => {
        db.Favoritos.findAll({
            where: {
                FK_iduser: req.session.usuarioLogueado.iduser
            }, include: [{association: "product"}]
        })
        .then(products => {
            req.session.favoritos = products;  
            res.render('users/favoritos', {"products": products})
        })
    }   
}


module.exports = userControllers;