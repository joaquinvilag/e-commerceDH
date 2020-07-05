module.exports = function(sequelize, dataTypes){
    var alias ="User";
    var cols = {
        iduser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING

        },
        last_name: {
            type: dataTypes.STRING
        },
        address: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        birth_date: {
            type: dataTypes.DATE
        },
        password: {
            type: dataTypes.STRING
        },
        FK_roll: {
            type: dataTypes.INTEGER
        },
        avatar: {
            type: dataTypes.STRING
        }
    }
    var config = {
        tableName: "user",
        timestamps: false
    }
    var User = sequelize.define(alias, cols, config);
    User.associate = function(models){
        User.belongsTo(models.Roll,{
            as: "user_roll",
            foreignKey:"FK_roll",
            timestamps: false
        })
        User.belongsTo(models.Cart,{
            as:"userCart",
            foreignKey:"iduser",
            timestamps:false
        })   
    }
    return User;
}