module.exports = function(sequelize, dataTypes){
    var alias = "Favoritos";
    var cols = {
        idfav: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FK_iduser: {
            type: dataTypes.INTEGER
        },
        Fk_idProduct: {
            type: dataTypes.INTEGER
        }
    }
    var config = {
        tableName: "favoritos",
        timestamps: false
    }
    var Favoritos = sequelize.define(alias, cols, config);
    
    Favoritos.associate = function(models){
        Favoritos.belongsTo(models.Product, {
            as: "product",
            foreignKey: "FK_idproduct",
            timestamps: false
        })
        Favoritos.belongsTo(models.User, {
            as: "user",
            foreignKey: "FK_iduser",
            timestamps: false
        })
    }
    return Favoritos;
}