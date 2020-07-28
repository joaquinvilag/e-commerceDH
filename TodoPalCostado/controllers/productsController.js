const fs = require('fs');
const path = require('path');
const { brotliDecompress } = require('zlib');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

// let productsFilePath = path.join(__dirname, "../data/products.json");
// let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//rutas de productos
const controller = {
    root: function(req, res, next){
        db.Product.findAll({
            include: [{association: "category"}, {association: "image"}]
        })
        .then(function(products){
            res.render("allProducts", { "products": products });
        });
    },
    detail: function(req, res, next){
        db.Product.findByPk(req.params.id, {
            
            include:[{association: "category"}]
        })
        .then(function(product){
            res.render("productDetail", {product: product});
        });
        
    },
    create: function(req, res, next){
        res.render("addProduct");
    },
    store: function(req, res, next){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            var newProduct = {
                name: req.body.name,
                price: req.body.price,
                Fk_category_id: parseInt(req.body.category),
                detail: req.body.detail,
                descr: req.body.descr,
                images: req.body.images
            }
            db.Product.create(newProduct)
            .then(product => {
            console.log('Nuevo producto cargado al sistema')
            res.redirect('/')
            })
        }else{
            res.render('addProduct',{errors: errors.errors})
        }
        
    },
    edit: function(req, res, next){
        db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        .then(function(product){
            // res.send(product)
            res.render("editProduct", {product: product});
        })
        .catch(error => {
            console.log(error);
        });
        
        
    },
    update: function(req, res, next){
        db.Product.update({
            name: req.body.name,
            Fk_category_id: req.body.category,
            descr: req.body.descr,
            price: req.body.price,
            detail: req.body.detail
        }, {
            where: {
                idproducts: req.params.id
            }
        })
        .then(product => {
            res.redirect('/products/'+req.params.id)
        })
        .catch(error => {
            console.log(error);
        })
        
        // res.redirect("/products/" + req.params.id);
     
    },
    destroy: function(req, res, next){
        db.Product.destroy({
            where:{
                idproducts: req.params.id
            }
        })
        .then(data => {
            res.redirect('/products')
        })
        .catch(error => {
            console.log(error)
        })
    }
}



module.exports = controller;