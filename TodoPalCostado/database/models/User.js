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
        adress: {
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
        tableName: "users",
        timestamps: false
    }
    var User = sequelize.define(alias, cols, config);
    User.associate = function(models){
        User.belongsTo(models.Roll,{
            as: "user_roll",
            foreignKey:"FK_roll",
            timestamps: false
        })
        
    }
    return User;
}