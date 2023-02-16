const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("urgency", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        symptomatology: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attended: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}