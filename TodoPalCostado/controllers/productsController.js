const fs = require('fs');
const path = require('path');

// let productsFilePath = path.join(__dirname, "../data/products.json");
// let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//rutas de productos
const controller = {
    root: function(req, res, next){
        res.render("allProducts", { "products": products });
    },
    detail: function(req, res, next){
        let productsJSON = fs.readFileSync("./data/users.JSON");
        let productsJS = JSON.parse(productsJSON);
        let product;
        productsJS.forEach((idProduct) =>{
            if(idProduct.id == req.params.id){
                product = idProduct;
            }
        });
        res.render("productDetail", {product});
    },
    create: function(req, res, next){
        res.render("addProduct");
    },
    store: function(req, res, next){
        let productsJSON = fs.readFileSync("./data/products.JSON");
        let productsJS = JSON.parse(productsJSON);
        let productId = 1;
        let product;
        productsJS.forEach(function(product){
            if(productId == product.id){
                productId++;
            };
        });

        product = {
            id: productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            detail: req.body.detail
        };
        productsJS.push(product);
        productsJSON = JSON.stringify(productsJS);
        fs.writeFileSync('./data/products.json', productsJSON);
        return res.redirect("/products/" + productId);
        
    },
    edit: function(req, res, next){
        let productsJSON = fs.readFileSync("./data/products.JSON");
        let productsJS = JSON.parse(productsJSON);
        let product;

        productsJS.forEach((pdto) => {
            if(pdto.id == req.params.id){
                product = pdto;
            };
            
        });
        res.render("editProduct", {product: product});
        
    },
    update: function(req, res, next){
        let productsJSON = fs.readFileSync("./data/products.JSON");
        let productsJS = JSON.parse(productsJSON);
        productsJS.forEach((product) => {
            if(product.id == req.params.id){
                product.name = req.body.name;
                product.price = req.body.price;
                product.category = req.body.category,
                product.description = req.body.description;
            }
        });
        productsJSON = JSON.stringify(productsJS);
        fs.writeFileSync('./data/products.json', productsJSON);
        res.redirect("/products/" + req.params.id);
     
    },
    delete: function(req, res, next){
        let productsJSON = fs.readFileSync("./data/products.JSON");
        let productsJS = JSON.parse(productsJSON);
        let i = 1;
        productsJS = productsJS.filter(product => {
            return product.id != req.params.id;
        });
        productsJS.forEach((product) =>{
            product.id = i;
            i++;
        });
        productsJSON = JSON.stringify(productsJS);
        fs.writeFileSync('./data/products.json', productsJSON);
        res.redirect('/products');
    }
}



module.exports = controller;