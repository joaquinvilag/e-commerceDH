const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { brotliDecompress } = require('zlib');
const { runInNewContext } = require('vm');
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
                console.log('carrito encontrado!')
                db.Cart_Product.findAll({
                    where: {
                        FK_cart_id: cart.idcart
                    },
                    include: [{association: "product"}]
                })
                .then(cartProduct => {
                    var products = [];
                    req.session.cartProduct = cartProduct;
                    console.log(cartProduct);
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
                        res.render('users/carrito',{"cart": cartProduct, "total": total, "iva": iva})

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
                        console.log(cartProduct);
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
                            res.render('users/carrito',{"cart": cartProduct, "total": total, "iva": iva})
    
                        })
                    })
    
                });
            }
        });      
    },
    addToCart: (req, res, next) => { // Agregar un nuevo item al carrito
        var cart = req.session.cart;
        var cartProduct = req.session.cartProduct;
        var encontre = 1;
        var qty, priceT;
        for(let i = 0; i < cartProduct.length; i++){
            if(cartProduct[i].FK_products_id == req.body.id){
                encontre = 0;
                qty = cartProduct[i].quantity + 1;
                priceT = parseInt(cartProduct[i].product.price) * qty;
                db.Cart_Product.update({
                    quantity: qty,
                    price: priceT
                },{
                    where: {
                        FK_cart_id: cart.idcart,
                        FK_products_id: req.body.id
                    }
                });    
                res.redirect("/products");
                
            };
        };
        if(encontre == 1){
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
                    res.redirect("/products");
                })
            })
        }
        
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

        res.render('users/msj');
    },
    qtyMinus: (req, res, next) => {
        var cartId = req.session.cart.idcart;
        var productId = req.params.id;
        var qty, priceT;
        db.Cart_Product.findOne({
            where: {
                FK_cart_id: cartId,
                FK_products_id: productId
            },
            include: [{association: "product"}]
        })
        .then(cartProduct => {
            qty = cartProduct.quantity - 1;
            priceT = parseInt(cartProduct.product.price) * qty;
            db.Cart_Product.update({
                quantity: qty,
                price: priceT
            }, {
                where: {
                    FK_cart_id: cartId,
                    FK_products_id: productId
                }
            })
            res.redirect('/cart')
        })
    },
    qtyPlus: (req, res, next) => {
        var cartId = req.session.cart.idcart;
        var productId = req.params.id;
        var qty, priceT;
        db.Cart_Product.findOne({
            where: {
                FK_cart_id: cartId,
                FK_products_id: productId
            },
            include: [{association: "product"}]
        })
        .then(cartProduct => {
            qty = cartProduct.quantity + 1;
            priceT = parseInt(cartProduct.product.price) * qty;
            db.Cart_Product.update({
                quantity: qty,
                price: priceT
            }, {
                where: {
                    FK_cart_id: cartId,
                    FK_products_id: productId
                }
            })
            res.redirect('/cart')
        })
    },


    // Este controlador no cumple ninguna funcion solo es para probar cosas
    prueba: (req, res, next) => {
        var cartProduct = req.session.cartProduct;
        console.log(cartProduct);
    }
    
};


module.exports = controller;
