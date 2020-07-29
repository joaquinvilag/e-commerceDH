const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// const pdtosMasVendidos = products.filter(pdto => pdto.detail == 'mas-vendido');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//rutas de home y search
const controller = {
    root: function(req, res){
        db.Product.findAll({
            where: {
                detail: "mas-vendido"
              },
            include: [{association: "category"}, {association: "image"}]
        })
        .then(function(products){
            res.render("home", { "pdtosMasVendidos": products });
        });
        
    },
    search: function(req, res){
        res.send("Resultados de busqueda");
    },
    frutasDesecadas: function(req, res){
        db.Product.findAll({
            where: {
                FK_category_id: 2
              },
            include: [{association: "category"}, {association: "image"}]
        })
        .then(function(products){
            res.render("frutasDesecadas", { "products": products });
        });
    },
    frutosSecos: function(req, res){
        db.Product.findAll({
            where: {
                FK_category_id: 1
              },
            include: [{association: "category"}, {association: "image"}]
        })
        .then(function(products){
            res.render("frutosSecos", { "products": products });
        });
    },
    hamburguesas: function(req, res){
        db.Product.findAll({
            where: {
                FK_category_id: 3
              },
            include: [{association: "category"}, {association: "image"}]
        })
        .then(function(products){
            res.render("hamburguesas", { "products": products });
        });
    }
};



module.exports = controller;