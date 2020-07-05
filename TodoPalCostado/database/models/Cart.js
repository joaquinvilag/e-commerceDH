module.exports = function(sequelize, dataTypes){
    var alias ="Cart";
    var cols = {
        idcart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FK_user_id: {
            type: dataTypes.INTEGER

        },
        state: {
            type: dataTypes.STRING
        },
        purchase_date: {
            type: dataTypes.DATE
        },
        total: {
            type: dataTypes.DOUBLE
        }
    }
    var config = {
        tableName: "cart",
        timestamps: false
    }
    var Cart = sequelize.define(alias, cols, config);
    Cart.associate = function(models){
        Cart.belongsTo(models.User,{
            as: "user",
            foreignKey:"FK_user_id",
            timestamps: false
        })
        Cart.belongsToMany(models.Product,{
            as:"product",
            through:"cart_products",
            foreignKey:"FK_cart_id",
            otherKey:"FK_products_id",
            timestamps: false            
        })

    }
    return Cart;
}