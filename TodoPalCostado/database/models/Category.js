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
    var Category = sequelize.define(alias, cols, config);
    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as: "products",            
            foreignKey:"FK_category_id",
            timestamps: false
        })
    }
    return Category;
}