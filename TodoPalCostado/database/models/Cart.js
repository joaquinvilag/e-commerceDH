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
    // User.associate = function(models){
    //     User.belongsToMany(models.Movie,{
    //         as: "movies",
    //         through: "actor_movie",
    //         foreignKey:"actor_id",
    //         otherKey:"movie_id",
    //         timestamps: false
    //     })
    // }
    return Cart;
}