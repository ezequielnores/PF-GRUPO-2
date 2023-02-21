const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Turns', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("Virtual", "Face-to-face"),
            allowNull: false
        },
        ubication: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doctorSpecialty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attended: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, { timestamps: false });
};