const fs = require('fs');
const path = require('path');


//rutas de home y search
const controller = {
    root: function(req, res){
        res.render("home");
    },
    ciruelasdesecadas: function(req, res){
        res.render("ciruelasdesecadas");
    },
    search: function(req, res){
        res.send("Resultados de busqueda");
    }
};



module.exports = controller;