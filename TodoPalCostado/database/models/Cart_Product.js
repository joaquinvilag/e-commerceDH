module.exports = function(sequelize, dataTypes){
    var alias ="Cart_Product";
    var cols = {
        idcart_products: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FK_cart_id: {
            type: dataTypes.INTEGER

        },
        FK_products_id: {
            type: dataTypes.INTEGER

        },
        quantity: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DOUBLE
        }
    }
    var config = {
        tableName: "cart_products",
        timestamps: false
    }
    var Cart_Product = sequelize.define(alias, cols, config);

    
    return Cart_Product;
}