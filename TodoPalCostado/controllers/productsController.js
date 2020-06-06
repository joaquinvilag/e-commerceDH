const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, "../data/products.json");
let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//rutas de productos
const controller = {
    root: function(req, res){
        res.render("allProducts", { "products": products });
    },
    detail: function(req, res){
        let product;
        products.forEach((idProduct) =>{
            if(idProduct.id == req.params.id){
                product = idProduct;
            }
        });
        res.render("productDetail", {"product": product});
    },
    create: function(req, res){
        res.render("addProduct");
    },
    store: function(req, res){
        let productId = 1;
        products.forEach(function(product){
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
        products.push(product);
        products = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, products);
        res.redirect("/products");
        
    },
    edit: function(req, res){
        let product;

        products.forEach((pdto) => {
            if(pdto.id == req.params.id){
                product = pdto;
            };
            
        });
        res.render("editProduct", {product});
        
    },
    update: function(req, res){
        products.forEach((product) => {
            if(product.id == req.params.id){
                product.name = req.body.name;
                product.price = req.body.price;
                product.category = req.body.category,
                product.description = req.body.description;
            }
        });
        products = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, products);

        res.redirect("/products");
        
    },
    delete: function(req, res){
        let i = 1;
        products = products.filter(product => {
            return product.id != req.params.id;
        });
        products.forEach((product) =>{
            product.id = i;
            i++;
        });
        products = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, products);

        res.redirect("/products");
    }
}



module.exports = controller;