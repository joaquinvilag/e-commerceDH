const fs = require('fs');
const path = require('path');


//rutas de productos
const controller = {
    root: function(req, res){
        res.send("Todos los productos");
    },
    detail: function(req, res){
        res.send("Detalle de producto seleccionado");
    },
    create: function(req, res){
        res.render("addProduct");
    },
    store: function(req, res){
        res.send("Guardar nuevo producto por POST");
    },
    edit: function(req, res){
        res.send("Formulario de edición");
    },
    update: function(req, res){
        res.send("Guardar cambios por PUT");
    },
    delete: function(req, res){
        res.send("Eliminación de producto");
    }
}



module.exports = controller;