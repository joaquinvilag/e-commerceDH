const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { brotliDecompress } = require('zlib');
var sequelize = db.sequelize;
// const { DATE } = require('sequelize/types');
// const { Association } = require('sequelize/types');


//controladores de carrito
const controller = {
    cart: function(req, res, next){ // Busqueda o creacion de carrito
        var user = req.session.usuarioLogueado;
        db.Cart.findOne({ 
            where: { 
                FK_user_id: user.iduser, state: "open" 
            }
        })
        .then(cart => {
            if(cart != null){
                req.session.cart = cart;
                console.log('carrito encontrado!!!!!')
                db.Cart_Product.findAll({
                    where: {
                        FK_cart_id: cart.idcart
                    },
                    include: [{association: "product"}]
                })
                .then(cartProduct => {
                    var products = [];
                    req.session.cartProduct = cartProduct;
                    cartProduct.forEach( cart => {
                        products.push(cart.product)
                    });
                    db.Cart_Product.sum('price', {
                        where:{
                            FK_cart_id: cart.idcart
                        }
                    })
                    .then(resultado => {
                        var subtotal = parseInt(resultado)
                        var iva =  subtotal * 0.21; 
                        var total = subtotal + iva; 
                        req.session.total = total;
                        res.render('users/carrito',{"cart": products, "total": total, "iva": iva})

                    })
                    
                    
                })
                    
            } else {
                //Si cart es null, entonces creo el carrito
                var cartAdd = {
                    FK_user_id: user.iduser,
                    state: "open",
                };
                db.Cart.create(cartAdd)
                .then(cart => {
                    req.session.cart = cart;
                    console.log("Carrito creado!!!!");
                    db.Cart_Product.findAll({
                        where: {
                            FK_cart_id: cart.idcart
                        },
                        include: [{association: "product"}]
                    })
                    .then(cartProduct => {
                        var products = [];
                        req.session.cartProduct = cartProduct;
                        cartProduct.forEach( cart => {
                            products.push(cart.product)
                        });
                        db.Cart_Product.sum('price', {
                            where:{
                                FK_cart_id: cart.idcart
                            }
                        })
                        .then(resultado => {
                            var subtotal = parseInt(resultado)
                            var iva =  subtotal * 0.21; 
                            var total = subtotal + iva; 
                            req.session.total = total;
                            res.render('users/carrito',{"cart": products, "total": total, "iva": iva})
    
                        })
                    })
    
                });
            }
        });      
    },
    addToCart: (req, res, next) => { // Agregar un nuevo item al carrito
        this.cart;
        var cart = req.session.cart;
        db.Product.findByPk(req.body.id)
        .then(function(product){
            var productAddCart = {
                FK_cart_id: cart.idcart,
                FK_products_id: product.idproducts,
                quantity: 1,
                price: product.price
            };
            db.Cart_Product.create(productAddCart)
            .then(products => {
                console.log('Producto cargado al carrito exitosamente');
                res.redirect("/products")
            })
        })
    },
    removeFromCart: (req,res, next) => { // Remover item del carrito
        var cart = req.session.cart;
        db.Cart_Product.destroy({
            where: {
                FK_cart_id: cart.idcart,
                FK_products_id: req.params.id,
            }
        })
        res.redirect('/cart');
    },
    purchasePayment: (req, res ,next) => { // Finalización de compra
        const cart = req.session.cart;
        db.Cart.update({
            state: "close",
            total: req.session.total
        }, {
            where: {
                idcart: cart.idcart
            }
        });
        console.log("¡Compra finalizada, gracias por confiar en nosotros!");
        res.redirect('/');
    },


    // Este controlador no cumple ninguna funcion solo es para probar cosas
    prueba: (req, res, next) => {
        var subtotal = parseInt("200");
        var iva = subtotal * 0.21;
        var total = subtotal + iva;
        console.log(subtotal)
        console.log(iva)
        console.log(total)
    }
    
};


module.exports = controller;
