const fs = require('fs');
const path = require('path');

const controller = {
    root: function(req, res){
        res.send("Propuesta de inicio de sesión o registración");
    },
    login: function(req, res){
        res.send("Formulario de logeo");
    },
    showRegisterForm: function(req, res){
        res.send("Formulario de registro");
    },
    processRegisterForm: function(req, res){
        res.send("Datos registrados");
    }

}



module.exports = controller;