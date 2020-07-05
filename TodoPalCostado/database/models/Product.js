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
        birth_date: {
            type: dataTypes.DATE
        },
        price: {
            type: dataTypes.DOUBLE
        }
    }
    var config = {
        tableName: "products",
        timestamps: false
    }
    var Product = sequelize.define(alias, cols, config);
    // User.associate = function(models){
    //     User.belongsToMany(models.Movie,{
    //         as: "movies",
    //         through: "actor_movie",
    //         foreignKey:"actor_id",
    //         otherKey:"movie_id",
    //         timestamps: false
    //     })
    // }
    return Actor;
}