module.exports = function(sequelize, dataTypes){
    var alias ="Roll";
    var cols = {
        idroll: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roll_name: {
            type: dataTypes.STRING
        }
    }
    var config = {
        tableName: "roll",
        timestamps: false
    }
    var Roll = sequelize.define(alias, cols, config);
    Roll.associate = function(models){
        Roll.hasMany(models.User,{
            as: "roll_user",
            foreignKey:"FK_roll",
            timestamps: false
        })
    }   
    return Roll;
}