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
    var Image = sequelize.define(alias, cols, config);
    return Image;
}