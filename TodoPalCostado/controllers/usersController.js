const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let { check, validationResult, body} = require('express-validator');


const userControllers = {
    showLoginForm: (req,res,next)=>{
        res.render("formLogin");
    },
    processLoginForm: (req,res,next)=>{
        let usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
        let usersJS;
        var usuarioALoguearse;
        if (usersJSON == "") {
            usersJS = [];
        } else {
            usersJS = JSON.parse(usersJSON);
        };
        
        for(let i = 0; i < usersJS.length; i++) {
            if (usersJS[i].email == req.body.email && bcrypt.compareSync(req.body.password, usersJS[i].password)){
                usuarioALoguearse = usersJS[i];
                break;
            }
        };
        // console.log(usuarioALoguearse);

        if(usuarioALoguearse == undefined){
            return res.render('formLogin', {errors: [
                {msg:'Datos invalidos'}
            ]});
        };

        req.session.usuarioLogueado = usuarioALoguearse;
        // req.locals.user = usuarioALoguearse;
        
        if(req.body.recordame != undefined) {
            res.cookie('recordame', usuarioALoguearse.email, {maxAge: 60000})
        };
        // Hasta aca todo bien
        // console.log(usuarioALoguearse.name);
        res.redirect('/users/perfil')
    },
    showRegisterForm: (req,res,next)=>{
        res.render("formRegister");
    },
    processRegisterForm: (req,res,next)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let usersJSON = fs.readFileSync("./data/users.JSON");
            let usersJS = JSON.parse(usersJSON);
            
            var user = {
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password,10),
                email: req.body.email,
                avatar: req.files[0].filename
            };

            if(bcrypt.compareSync(req.body.confirmPassword, user.password)){
                usersJS.push(user);
                usersJSON = JSON.stringify(usersJS);
                fs.writeFileSync("./data/users.JSON", usersJSON);
                req.session.usuarioLogueado = user;
                res.redirect('/users/perfil');
            }
        } else {
            return res.render('formRegister', {errors: errors.errors});
        }
    
    },
    showProfile: function(req,res,next){
        let usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
        let usersJS = JSON.parse(usersJSON);
        var user;
        for(var i = 0; i < usersJS.length; i++){
            if(req.session.usuarioLogueado.email == usersJS[i].email || req.cookies.recordame == usersJS[i].email){
                user = usersJS[i];
                break;
            } 
        
        }
        if(user != undefined){
            res.render('users/perfil', {user});
        } else {
            res.send('Usuario no registrado');
        }
        console.log(user);
    },
    showCart: function(req,res,next){
        if(req.session.usuarioLogueado != undefined || req.cookies.recordame != undefined){
            res.render('users/carrito');
        } else {
            res.redirect('/');
        }
        
    }
}


module.exports = userControllers;