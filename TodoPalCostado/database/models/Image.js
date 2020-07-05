module.exports = function(sequelize, dataTypes){
    var alias ="Image";
    var cols = {
        idimages: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FK_product_id: {
            type: dataTypes.INTEGER

        },
        url: {
            type: dataTypes.STRING
        }
    }
    var config = {
        tableName: "images",
        timestamps: false
    }
    var User = sequelize.define(alias, cols, config);
    // User.associate = function(models){
    //     User.belongsToMany(models.Movie,{
    //         as: "movies",
    //         through: "actor_movie",
    //         foreignKey:"actor_id",
    //         otherKey:"movie_id",
    //         timestamps: false
    //     })
    // }
    return Image;
}