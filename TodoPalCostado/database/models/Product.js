module.exports = function(sequelize, dataTypes){
    var alias ="Product";
    var cols = {
        idproducts: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING

        },
        EAN: {
            type: dataTypes.INTEGER
        },
        FK_category_id: {
            type: dataTypes.INTEGER
        },
        descr: {
            type: dataTypes.STRING
        },
        images: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DOUBLE
        },
        detail: {
            type: dataTypes.STRING
        }
    }
    var config = {
        tableName: "products",
        timestamps: false
    }
    var Product = sequelize.define(alias, cols, config);
    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as: "category",            
            foreignKey:"FK_category_id",
            timestamps: false
        })
        Product.hasMany(models.Image,{
            as:"image",
            foreignKey:"FK_product_id",
            timestamps: false
        })
    
        Product.belongsToMany(models.Cart,{
            as: "cart",
            through: "cart_products",
            foreignKey:"FK_products_id",
            otherKey:"FK_cart_id ",
            timestamps: false
        })
        Product.belongsToMany(models.User, {
            as: "favUser",
            through: "favoritos",
            foreignKey: "FK_idproduct",
            otherKey: "FK_iduser",
            timestamps: false
        })
    }
    return Product;
}