const fs = require('fs');
const path = require('path');
const db = require('../database/models');
var sequelize = db.sequelize;
cartProduct = [];

//rutas de home y search
const controller = {
    cart: function(req, res){
        if(req.session.usuarioLogueado != undefined || req.cookies.recordame != undefined){
            res.render('users/carrito');
        } else {
            res.redirect('/');
        }    
    },
    addToCart: (req, res, next) => {
        db.Product.findByPk(req.body.id)
        .then(function(product){
            cartProduct.push(product);
            req.session.cart = cartProduct;
            console.log(res.locals.cart);
            res.redirect("/products");
        })
    },
    removeFromCart: (req,res, next) => {
        cartProduct = cartProduct.filter(product => product.name != req.params.name);
        req.session.cart = cartProduct;
        res.redirect('/cart');
    }    
};


module.exports = controller;
