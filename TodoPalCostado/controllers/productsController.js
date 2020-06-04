const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//rutas de productos
const controller = {
    root: function(req, res){
        res.render("allProducts", { products });
    },
    detail: function(req, res){
        let product;
        products.forEach((idProduct) =>{
            if(idProduct.id == req.params.id){
                product = idProduct;
            }
        });
        res.render("productDetail", {product});
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