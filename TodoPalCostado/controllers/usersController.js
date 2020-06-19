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
        let usuarioALoguearse;
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

        if(usuarioALoguearse == undefined){
            return res.render('formLogin', {errors: [
                {msg: 'Datos invalidos'}
            ]});
        };

        req.session.usuarioLogueado = usuarioALoguearse;

        if(req.body.recordame != undefined) {
            res.cookie('recordame', usuarioALoguearse.email, {maxAge: 60000})
        };

        res.redirect('/')
    },
    showRegisterForm: (req,res,next)=>{
        res.render("formRegister");
    },
    processRegisterForm: (req,res,next)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let usersJSON = fs.readFileSync("./data/users.JSON");
            let usersJS = JSON.parse(usersJSON);
            
            let user = {
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password,10),
                email: req.body.email,
                avatar: req.files[0].filename
            };

            if(bcrypt.compareSync(req.body.confirmPassword, user.password)){
                usersJS.push(user);
                usersJSON = JSON.stringify(usersJS);
                fs.writeFileSync("./data/users.JSON", usersJSON);
                res.redirect('/')
            }
        } else {
            return res.render('formRegister', {errors: errors.errors});
        }
    
    }
}


module.exports = userControllers;