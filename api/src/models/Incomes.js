const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('incomes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });
};