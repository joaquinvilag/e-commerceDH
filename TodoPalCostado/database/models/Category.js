module.exports = function(sequelize, dataTypes){
    var alias ="Category";
    var cols = {
        idcategory: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING

        }
    }
    var config = {
        tableName: "category",
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
    return Category;
}