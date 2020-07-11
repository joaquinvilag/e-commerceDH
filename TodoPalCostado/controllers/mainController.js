const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const pdtosMasVendidos = products.filter(pdto => pdto.detail == 'mas-vendido');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//rutas de home y search
const controller = {
    root: function(req, res){
        res.render("home", {
            "pdtosMasVendidos": pdtosMasVendidos
        });
    },
    search: function(req, res){
        res.send("Resultados de busqueda");
    }
};



module.exports = controller;