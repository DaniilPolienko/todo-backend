module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            
        },
        done:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return Task;
}