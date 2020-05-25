const fs = require('fs');
const path = require('path');

const controller = {
    showLoginForm: function(req, res){
        res.render("formLogin.ejs");
    },
    showRegisterForm: function(req, res){
        res.render("formRegister.ejs");
    },
    processRegisterForm: function(req, res){
        res.send("Datos registrados");
    }

}



module.exports = controller;